import express from "express";

import {

    getUserSettings,
    updateWatermark

} from "../services/settingsService.js";

const router = express.Router();

router.get("/", async(req,res)=>{

    if(!req.isAuthenticated()){

        return res.sendStatus(401);

    }

    const settings = await getUserSettings(

        req.user.id

    );

    res.json(settings);

});

router.patch("/watermark", async(req,res)=>{

    if(!req.isAuthenticated()){

        return res.sendStatus(401);

    }

    const settings = await updateWatermark(

        req.user.id,

        req.body.watermark

    );

    res.json(settings);

});

export default router;