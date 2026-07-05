import pg from "pg";

const { Pool } = pg;

const pool = new Pool({

    host: process.env.DATABASE_HOST,

    port: process.env.DATABASE_PORT,

    user: process.env.DATABASE_USER,

    password: process.env.DATABASE_PASSWORD,

    database: process.env.DATABASE_NAME

});

pool.connect()

.then(()=>{

    console.log("PostgreSQL connected");

})

.catch(err=>{

    console.error(
        "PostgreSQL error:",
        err
    );

});

export default pool;