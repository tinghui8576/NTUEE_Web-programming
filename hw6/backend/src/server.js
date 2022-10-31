import dotenv from "dotenv-defaults";

import express from 'express' 
import cors from 'cors'
import routes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
res.send('Hello, World!');
});
app.listen(port, () =>
console.log(`Example app listening on port ${port}!`),
);

app.use(cors());
app.use(express.json());
app.use('/', routes);

import db from './db';
db.connect();


