import express from 'express';
import EventEmitter from 'events';
import bodyParser from 'body-parser';
import cors from 'cors';
import moment from 'moment-timezone';
import sse from './middlewares/sse';
import auth from './middlewares/auth';

const app = express();
const sensorEmiter = new EventEmitter;
const urlencoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(sse);

let count = 0;
let connections = [];

app.post('/motion', urlencoded, auth, (req, res) => {
  const timeHappened = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY, h:mm:ss a');
  const message = `Motion ${timeHappened}`;

  count++;
  sensorEmiter.emit('movement', count, message);

  res.sendStatus(201);
});

app.get('/stream', (req, res) => {
  res.sseSetup();

  sensorEmiter.on('movement', (id, message) => {
    res.sseSend(id, message);
  });

 res.sseSend(0, 'sse ready');
});

export default app;
