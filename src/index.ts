import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import bodyProtect from './app/services/bodyXss.js';
import router from './app/routers/index.js';
const app = express();
const PORT = process.env.PORT;
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(helmet());
app.use(bodyProtect);
app.use('/v1/', router);
app.use('/v1/api', router);
app.listen(PORT, () => {
    console.log(`here : http://localhost:${PORT}`);
});