import express from "express";
import { createAdminController } from "../controllers/admin.controller.js";

const router = express.Router();

const PATH_ADMIN = "/admin";

router.post(PATH_ADMIN, createAdminController);

export default router;
