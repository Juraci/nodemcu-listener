const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;
const urlencoded = bodyParser.urlencoded({ extended: true });
let count = 0;

app.post('/motion', urlencoded, (req, res) => {
  count++;
  console.log(`Motion counter: ${count} from sensor: ${req.body.boardId}`);
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
