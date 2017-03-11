const port = process.env.PORT || 3000;
const app = require('./app/app');

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
