import app from '../index.js';
import router from './routers/index.js'
const API_PORT = process.env.API_PORT;
app.use('/v1/api', router);
app.listen(API_PORT, () => {
    console.log(`here : http://localhost:${API_PORT}`);
});