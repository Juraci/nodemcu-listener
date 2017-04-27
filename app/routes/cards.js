import express from 'express';
import moment from 'moment-timezone';
import EventEmitter from 'events';
import auth from '../middlewares/auth';
import sse from '../middlewares/sse';
import config from  '../../config/environment';

const router =  express.Router();
const sensorEmiter = new EventEmitter;

export default ({ enabledCards }) => {
  let count = 0;

  const isEnabled = (cardId, enabledCards, res) => {
    if (!cardId || !enabledCards.includes(cardId)) {
      return res.sendStatus(404);
    }
  };

  router.route('/:id/motion')
    .post(auth, (req, res) => {
      const cardId = req.params.id;
      isEnabled(cardId, enabledCards, res);

      const timeHappened = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY, h:mm:ss a');
      const message = `Motion ${timeHappened}`;

      count += 1;
      sensorEmiter.emit(`motion-${cardId}`, count, message);

      res.sendStatus(204);
    });

  router.route('/:id/stream')
    .get((req, res) => {
      const cardId = req.params.id;
      isEnabled(req.params.id, enabledCards, res);
      res.sseSetup();

      sensorEmiter.on(`motion-${cardId}`, res.sseSend);

      res.sseSend(0, 'sse ready');

      const intervalId = setInterval(() => {
        res.sseSend(0, 'sse ready');
      }, config.ENV.sseRefreshTime);

      res.on('close', () => {
        console.log('number of listeners: ', sensorEmiter.listeners(`motion-${cardId}`).length);
        sensorEmiter.removeListener(`motion-${cardId}`, res.sseSend);
        clearInterval(intervalId);
      });
    });

  return router;
};
