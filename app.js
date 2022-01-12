import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './src/routes/public';

import errorHandler from './src/middleware/errorHandler';


import db from "./src/models";


db.sequelize.sync().then(result => {
}).catch(err => {
  console.log(err);
});

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use('/resources/static/assets/uploads', express.static('resources/static/assets/uploads'));


app.use(errorHandler);

module.exports = app;
