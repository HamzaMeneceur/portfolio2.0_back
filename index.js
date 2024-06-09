"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mainRouter = require('./app/routers');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/v1/'), mainRouter;
app.use('/v1/api', mainRouter);
app.listen(PORT, () => {
    console.log(`here : http://localhost:${PORT}`);
});
