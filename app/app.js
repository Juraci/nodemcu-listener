import express from 'express';
import cors from 'cors';
import sse from './middlewares/sse';
import cards from './routes/cards';

const app = express();

app.use(cors());
app.use(sse);

const appMaker = (enabledCards) => app.use('/cards', cards({ enabledCards }));

export default appMaker;
