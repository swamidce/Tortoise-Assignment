require("dotenv").configs();

import express from "express";
const app = express();
import cors from "cors";
import { json } from 'body-parser';
const jsonParser = json();

import router from './src/module/user/router';
import router from './src/module/partner/router';

app.use(cors());

app.get('/', (req, res) => res.status(200).json({
    success: 1,
    message: 'Testing',
}));

app.use('/v1/customer', jsonParser, router);
app.use('/v1/partner', jsonParser, router);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log("Server up and running on port :", port);
});