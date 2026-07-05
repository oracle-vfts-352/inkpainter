import express from "express";

import passport from "../config/passport.js";

import {
    migrateGuestGallery
}
from "../services/migrationService.js";

const router = express.Router();

//Google

router.get(
    "/google",
    passport.authenticate("google",{
        scope:["profile","email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google",{
        failureRedirect:"http://localhost/settings"
    }),
    (req,res)=>{

        res.redirect("http://localhost/settings");

    }
);

//Github

router.get(

"/github",

passport.authenticate(

"github",

{

scope:["user:email"]

}

)

);

router.get(

"/github/callback",

passport.authenticate(

"github",

{

failureRedirect:

"http://localhost/settings"

}

),

(req,res)=>{

res.redirect(

"http://localhost/settings"

);

}

);
/*
router.get("/me",(req,res)=>{

    if(req.isAuthenticated()){

        return res.json({

            loggedIn:true,

            user:req.user

        });

    }

    res.json({

        loggedIn:false

    });

});
*/
router.get("/me", (req, res) => {

    console.log("Authenticated:", req.isAuthenticated());
    console.log("Session:", req.session);
    console.log("User:", req.user);

    if (req.isAuthenticated()) {
        return res.json({
            loggedIn: true,
            user: req.user
        });
    }

    res.json({
        loggedIn: false
    });

});

router.get("/logout",(req,res)=>{

    req.logout(()=>{

        req.session.destroy(()=>{

            res.json({

                success:true

            });

        });

    });

});

router.post(
"/migrate",

async(req,res)=>{

    try{

        if(!req.isAuthenticated()){

            return res.sendStatus(401);

        }

        await migrateGuestGallery(

            req.body.guestUuid,

            req.user.id

        );

        res.json({

            success:true

        });

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            error:err.message

        });

    }

});

export default router;