const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.post('/motion', (req, res) => {
  console.log('motion detected');
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
