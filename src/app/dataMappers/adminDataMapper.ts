import client from "../services/pg.js";
export default {
    async authUser(email: string){
        const sqlQuerry = `
                            SELECT * FROM "user"
                            WHERE "email" = $1;`;
        const data = [email]
        const result= await client.query(sqlQuerry, data);
        console.log("i'm here")
        return result.rows[0]
    },
    async ifUser(user: any){
        // Elle permet de vérifier l'existence d'un utilisateur en BDD.
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
            return result = result.rows[0].exists
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
            return result
        }catch(err : any){
            return error = err
        }
        
    } 
}