import { createClient } from "redis";

const sessionRedis = createClient({

    url: process.env.REDIS_URL || "redis://127.0.0.1:6379"

});

sessionRedis.on("connect",()=>{

    console.log("Session Redis connected");

});

sessionRedis.on("error",(err)=>{

    console.log("Session Redis error:",err);

});

await sessionRedis.connect();

export default sessionRedis;