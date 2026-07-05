import express from "express";
import multer from "multer";


import {
 imageQueue
}
from "../queues/imageQueue.js";

import {
    canAddArtwork
} from "../services/artworkService.js";

const router =
express.Router();



const upload =
multer({

 storage:
 multer.memoryStorage()

});





router.post(

"/",

upload.single("image"),


async(req,res)=>{


try{


if(!req.file){

return res.status(400).json({

error:"No image"

});

}

const limit = await canAddArtwork({

    guestUuid: req.body.username

});

if(!limit.allowed){

    return res.status(409).json({

        success:false,

        code:"GALLERY_FULL",

        count:limit.count,

        limit:limit.limit

    });

}


const job = await imageQueue.add("transform",{

    image: req.file.buffer.toString("base64"),

    username: req.body.username || "guest",

    ownerId: req.user?.id || null,

    contentType: req.file.mimetype

});




res.json({

success:true,

jobId:
job.id,

status:"queued"

});




}
catch(err){


console.error(err);


res.status(500).json({

error:
err.message

});


}


});


export default router;