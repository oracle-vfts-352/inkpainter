import express from "express";
import { Job } from "bullmq";
import { imageQueue } from "../queues/imageQueue.js";

const router = express.Router();

router.get("/:id", async (req, res) => {

  const job = await Job.fromId(
    imageQueue,
    req.params.id
  );

  if (!job) {

    return res.status(404).json({
      error: "Job not found"
    });

  }

  const state =
    await job.getState();

  res.json({

    state,

    result:
      job.returnvalue || null

  });

});

export default router;