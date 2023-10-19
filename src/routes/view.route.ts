import express from "express";
import { getMainPage } from "../controllers/view.controller";

const router = express.Router();

router.get("/", getMainPage);

export default router;
