import "dotenv/config";

import { Worker } from "bullmq";

import { createRedis } from "../config/redis.js";

const redis = createRedis();


import {
transformImage
}
from "../services/replicateService.js";


import {
upscaleImage
}
from "../services/upscaleService.js";


import {
uploadBufferToR2,
getR2Url
}
from "../services/storageService.js";

import {
    createArtwork
} from "../services/artworkService.js";



const worker =
new Worker(


"image-transform",


async(job)=>{


console.log(
"JOB START:",
job.id
);

if(!job.data.image){

 throw new Error(
   "No image data in job"
 );

}

const buffer =
Buffer.from(

job.data.image,

"base64"

);






// AI transform

const transformed =
await transformImage(
buffer
);





// upscale

const upscaled =
await upscaleImage(
transformed.buffer
);







// save R2

const key =
await uploadBufferToR2(

upscaled.buffer,


`${job.data.username}/${Date.now()}-inkpainter.png`,


upscaled.contentType

);

console.log("Saving artwork...");

console.log(job.data);

await createArtwork({

    ownerId: job.data.ownerId || null,

    guestUuid: job.data.ownerId
        ? null
        : job.data.username,

    r2Key: key

});



const url =
await getR2Url(key);





return {

key,

url

};



},


{

connection:redis,

concurrency:1

}



);





worker.on(
"completed",

(job)=>{

console.log(
"JOB DONE:",
job.id
);

}

);



worker.on(
"failed",

(job,err)=>{

console.error(err);

console.log(
"JOB FAILED:",
err
);

}

);