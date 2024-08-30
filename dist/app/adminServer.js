import express from 'express';
import app from '../index.js';
import router from './routers/index.js';
const ADMIN_PORT = process.env.ADMIN_PORT;
app.set("view engine", "ejs");
app.set("views", "./dist/app/views");
app.use(express.static("./dist/public"));
app.use('/v1/admin', router);
app.listen(ADMIN_PORT, () => {
    console.log(`here : http://localhost:${ADMIN_PORT}/v1/admin/s`);
});
