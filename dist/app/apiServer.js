import app from '../index.js';
const API_PORT = process.env.API_PORT;
app.listen(API_PORT, () => {
    console.log(`here : http://localhost:${API_PORT}`);
});
