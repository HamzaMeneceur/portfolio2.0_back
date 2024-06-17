import client from "../services/pg.js";
import APIError from "../services/error/APIError.js";
export default {
    async getUser(){
        const sqlQuerry = `SELECT * FROM "user";`;
        const result= await client.query(sqlQuerry);
        console.log("i'm here")
        return result.rows
    },
    async ifUser(user: any){
        let result;
        let error;
        try{
            const sqlQuery = `
            SELECT EXISTS(
                SELECT 1 FROM "user"
	            WHERE email = $1
            )`;
            const values = [user.email];
            result = await client.query(sqlQuery,values);
            console.log(result.rows[0])
            return result = result.rows[0]
        } catch(err){
            return error = err;
        }
    },
    async addUser(user: any){
        let result;
        let error;
        try{
            const sqlQuery = 
                            `
                            INSERT INTO "user" ("email","password")
                            VALUES ($1,$2)`;
            const values = [user.email, user.password];
            result = await client.query(sqlQuery, values);
            console.log(result)
            return result
        }catch(err : any){
            return error = err
        }
        
    } 
}