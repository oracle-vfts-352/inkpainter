import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand
} from "@aws-sdk/client-s3";

import {
  getSignedUrl
} from "@aws-sdk/s3-request-presigner";



const s3 = new S3Client({

  region:"auto",

  endpoint:
  process.env.R2_ENDPOINT,

  credentials:{

    accessKeyId:
    process.env.R2_ACCESS_KEY_ID,

    secretAccessKey:
    process.env.R2_SECRET_ACCESS_KEY

  }

});





// =====================
// Upload normal file
// =====================

export async function uploadFileToR2(file){


const key =
`${Date.now()}-${file.originalname}`;



await s3.send(

new PutObjectCommand({

Bucket:
process.env.R2_BUCKET_NAME,

Key:key,

Body:
file.buffer,

ContentType:
file.mimetype

})

);



return key;

}





// =====================
// Upload AI result
// =====================

export async function uploadBufferToR2(
buffer,
filename,
contentType="image/png"
){


const key =
`${filename}`;



await s3.send(

new PutObjectCommand({

Bucket:
process.env.R2_BUCKET_NAME,

Key:key,

Body:buffer,

ContentType:contentType

})

);



console.log(
"R2 SAVED:",
key
);



return key;

}







// =====================
// Signed temporary URL
// =====================

export async function getR2Url(key){


const command =
new GetObjectCommand({

Bucket:
process.env.R2_BUCKET_NAME,

Key:key

});



const url =
await getSignedUrl(

s3,

command,

{
expiresIn:60 * 10
}

);



return url;

}







// =====================
// Gallery fetch
// =====================

export async function listR2Images(
username="guest"
){


const command =
new ListObjectsV2Command({

Bucket:
process.env.R2_BUCKET_NAME

});



const response =
await s3.send(command);



if(!response.Contents){

return [];

}





const images =
await Promise.all(

response.Contents

.filter(

item =>
item.Key.startsWith(
username + "/"
)

)

.map(

async(item)=>{


const url =
await getR2Url(
item.Key
);



return {

key:item.Key,

url,

createdAt:
item.LastModified

};


}

)

);



return images;


}

// =====================
// Delete image
// =====================

export async function deleteR2Object(key){

    await s3.send(

        new DeleteObjectCommand({

            Bucket: process.env.R2_BUCKET_NAME,

            Key: key

        })

    );

    console.log(

        "R2 DELETED:",

        key

    );

}