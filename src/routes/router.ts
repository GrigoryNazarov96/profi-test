import express from "express";
import { createShortenedURL, redirectToOriginal } from "../controllers/url.controller";
import { getMainPage } from "../controllers/view.controller";

const router = express.Router();

router.post("/", createShortenedURL);
router.get("/", getMainPage);
router.get("/:code", redirectToOriginal);

export default router;
