import express from "express";
import { createShortenedURL, redirectToOriginal } from "../controllers/url.controller";

const router = express.Router();

router.post("/", createShortenedURL);
router.get("/:code", redirectToOriginal);

export default router;
