import app from '../index.js';
import router from './routers/index.js';
const ADMIN_PORT = process.env.ADMIN_PORT;
app.use('/v1/admin', router);
app.listen(ADMIN_PORT, () => {
    console.log(`here : http://localhost:${ADMIN_PORT}`);
});
