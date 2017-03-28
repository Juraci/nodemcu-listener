const port = process.env.PORT || 3000;
const appMaker = require('./build/app').default;

const cardIds = process.env.ALLOWED_CARDS.split(',');
const app = appMaker(cardIds);

app.listen(port, () =>  console.log(`Listening on port ${port}`));
