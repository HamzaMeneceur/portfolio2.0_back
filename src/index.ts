import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import bodyProtect from './app/services/bodyXss.js';
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(helmet());
app.use(bodyProtect);
export default app

