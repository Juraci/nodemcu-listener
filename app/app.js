const express = require('express');
const bodyParser = require('body-parser');
const sse = require('./middlewares/sse');
const cors = require('cors');

const app = express();

const urlencoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(sse);

let count = 0;
let connections = [];

app.post('/motion', urlencoded, (req, res) => {
  count++;
  const message = `Motion counter: ${count} from sensor: ${req.body.boardId}`;
  console.log(message);
  connections.forEach((c) => {
    c.sseSend(message);
  });
  res.sendStatus(201);
});

app.get('/stream', (req, res) => {
  res.sseSetup();
  res.sseSend('sse ready');
  connections.push(res);
});

module.exports = app;
