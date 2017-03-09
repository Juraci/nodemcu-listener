const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.post('/', (req, res) => {
  console.log('Post received!');
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
