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

const isEnabled = (cardId, enabledCards, res) => {
  if (!cardId || !enabledCards.includes(cardId)) {
    return res.sendStatus(404);
  }
};

const appMaker = (enabledCards) => {
  let count = 0;
  let connections = [];

  app.post('/cards/:id/motion', auth, (req, res) => {
    const cardId = req.params.id;
    isEnabled(cardId, enabledCards, res);
    const timeHappened = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY, h:mm:ss a');
    const message = `Motion ${timeHappened}`;

    count =+ 1;
    sensorEmiter.emit(`motion-${cardId}`, count, message);

    res.sendStatus(204);
  });

  app.get('/cards/:id/stream', (req, res) => {
    const cardId = req.params.id;
    isEnabled(req.params.id, enabledCards, res);
    res.sseSetup();

    sensorEmiter.on(`motion-${cardId}`, (id, message) => res.sseSend(id, message));

    res.sseSend(0, 'sse ready');
  });

  return app;
};

export default appMaker;
