import client from "../services/pg.js";
export default {
    async getUser() {
        const sqlQuerry = `SELECT * FROM "user";`;
        const result = await client.query(sqlQuerry);
        return result.rows;
    }
};
