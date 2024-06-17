import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import bodyProtect from './app/services/bodyXss.js';
import {adminRouter, apiRouter} from './app/routers/index.js';
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(helmet());
app.use(bodyProtect);
app.use('/v1/api', apiRouter);
app.use('/v1/admin', adminRouter);
export default app

