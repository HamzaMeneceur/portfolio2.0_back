import client from "../services/pg.js";

export default {
    async getUser(){
        console.log('4')
        const sqlQuerry = `SELECT * FROM "user";`;
        const result= await client.query(sqlQuerry);
        return result.rows
    }
}