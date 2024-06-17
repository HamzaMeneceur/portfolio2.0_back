import app from '../index.js'
const ADMIN_PORT = process.env.ADMIN_PORT;

app.listen(ADMIN_PORT, () => {
    console.log(`here : http://localhost:${ADMIN_PORT}`);
})