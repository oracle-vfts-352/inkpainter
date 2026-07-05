import { Queue } from "bullmq";
import { createRedis } from "../config/redis.js";

const redis = createRedis();


export const imageQueue =
new Queue(
"image-transform",
{
connection:redis
}
);