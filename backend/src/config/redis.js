import Redis from "ioredis";

export function createRedis(){

const redis = new Redis(

process.env.REDIS_URL ||

"redis://127.0.0.1:6379",

{

maxRetriesPerRequest:null

}

);

redis.on(

"connect",

()=>{

console.log("Redis connected");

}

);

redis.on(

"error",

(err)=>{

console.log(

"Redis error:",

err

);

}

);

return redis;

}