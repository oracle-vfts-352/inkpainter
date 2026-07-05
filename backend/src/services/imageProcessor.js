import {
  transformImage
} from "./huggingfaceService.js";


import {
  uploadToR2
} from "./storageService.js";



export async function processImage(
  imageUrl
){


  const transformed =
  await transformImage(
    imageUrl
  );


  if(!transformed){

    throw new Error(
      "Transform failed"
    );

  }



  const saved =
  await uploadToR2(
    transformed
  );



  return saved;

}