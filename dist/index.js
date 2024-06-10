import 'dotenv/config';
import express from 'express';
const app = express();
const PORT = process.env.PORT;
import router from './app/routers/index.js';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
console.log('1');
app.use('/v1/', router);
app.use('/v1/api', router);
app.listen(PORT, () => {
    console.log(`here : http://localhost:${PORT}`);
});
