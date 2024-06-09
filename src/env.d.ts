declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: number;
        PG_PORT: number;
        PGDATABASE: string;
        PGUSER: string;
        PGPASSWORD: string;
    }
}