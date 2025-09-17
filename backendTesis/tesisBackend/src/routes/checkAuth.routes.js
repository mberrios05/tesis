import express from "express";
import { checkAuth } from "../controllers/checkAuth.controller.js";

const router = express.Router();

const PATH_CHECK_AUTH = "/check-auth"

router.get(PATH_CHECK_AUTH, checkAuth);

export default router;