const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment-timezone');

const sse = require('./middlewares/sse');
const app = express();

const EventEmitter = require('events');
const sensorEmiter = new EventEmitter;

const urlencoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(sse);

let count = 0;
let connections = [];

app.post('/motion', urlencoded, (req, res) => {
  count++;
  const timeHappened = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY, h:mm:ss a');
  const message = `Motion ${timeHappened}`;

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

module.exports = app;
