import express from "express";

import {
    getR2Url
} from "../services/storageService.js";

import {

    getGuestGallery,
    getUserGallery

} from "../services/galleryService.js";
/*
import {

    countGuestArtworks,
    countUserArtworks

} from "../services/artworkService.js";*/

import {
    countGuestArtworks,
    countUserArtworks,
    getArtworkById,
    deleteArtwork
} from "../services/artworkService.js";

import {
    deleteR2Object
} from "../services/storageService.js";

const router =
express.Router();


/*
// GET all gallery images
router.get(
"/",

async(req,res)=>{

try{


const images =
await listR2Images();


console.log(
"R2 IMAGES:",
images
);



res.json({

success:true,

images

});


}


catch(err){


console.error(
"Gallery error:",
err
);



res.status(500).json({

error:
err.message

});


}


});

*/


// GET user gallery later
router.get(

"/",

async(req,res)=>{

try{

    let artworks;

    if(req.isAuthenticated()){

        artworks =
        await getUserGallery(
            req.user.id
        );

    }

    else{

        const guestUuid =
        req.query.guestUuid;

        artworks =
        await getGuestGallery(
            guestUuid
        );

    }

    const images =
    await Promise.all(

    artworks.map(async(item)=>({

        id:item.id,

        url:await getR2Url(item.r2_key),

        createdAt:item.created_at,

        artist:item.artist

    }))

);

    res.json({

        success:true,

        images

    });

}

catch(err){

    console.error(err);

    res.status(500).json({

        error:err.message

    });

}

});


//Storage Route

router.get("/storage", async (req, res) => {

    try{

        let count;

        if(req.isAuthenticated()){

            console.log("req.query.guestUuid:", req.query.guestUuid);
            console.log("Authenticated:", req.isAuthenticated());

            count = await countUserArtworks(
                req.user.id
            );

        }
        else{

            count = await countGuestArtworks(
                req.query.guestUuid
            );

        }

        res.json({

            success:true,

            count,

            limit:20

        });

    }
    catch(err){

        console.error(err);

        res.status(500).json({

            error:err.message

        });

    }

});


//DELETE Route

router.delete(

"/:id",

async(req,res)=>{

try{

const artwork =
await getArtworkById(
req.params.id
);

if(!artwork){

return res.status(404).json({

error:"Artwork not found"

});

}


// Ownership check

if(req.isAuthenticated()){

    if(artwork.owner_id !== req.user.id){

        return res.sendStatus(403);

    }

}else{

    if(artwork.guest_uuid !== req.query.guestUuid){

        return res.sendStatus(403);

    }

}

await deleteR2Object(
artwork.r2_key
);

await deleteArtwork(
artwork.id
);

res.json({

success:true

});

}

catch(err){

console.error(err);

res.status(500).json({

error:err.message

});

}

});

export default router;