declare namespace NodeJS {
    interface ProcessEnv {
        ADMIN_PORT?: number;
        API_PORT?: number;
        PG_PORT: number;
        PGDATABASE: string;
        PGUSER: string;
        PGPASSWORD: string;
        BCRYPT_SALT: number;
    }
}