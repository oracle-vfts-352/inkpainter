import express from "express";
import cors from "cors";

import uploadRoute from "./routes/upload.js";
import galleryRoute from "./routes/gallery.js";
import jobsRoute from "./routes/jobs.js";
import authRoute from "./routes/auth.js";
import settingsRoutes from "./routes/settings.js";

import sessionMiddleware from "./config/session.js";
import passport from "./config/passport.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost",
    credentials: true,
  })
);

app.use(express.json());

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/jobs", jobsRoute);
app.use("/upload", uploadRoute);
app.use("/gallery", galleryRoute);
app.use("/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.json({
    status: "InkPainter backend running",
  });
});

export default app;