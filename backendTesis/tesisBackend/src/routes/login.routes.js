import express from "express";
import { loginController } from "../controllers/login.controller.js";

const router = express.Router();

const PATH_LOGIN = "/login";

router.post(PATH_LOGIN, loginController);

export default router;
