/**
 * @file auth.routes.js
 * @description Rutas para la autenticación de usuarios en la aplicación. Incluye funcionalidades de inicio y cierre de sesión.
 */

import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { AUTH_PATH } from "../utils/consts/router.js";

const router = Router();

router.post(`${AUTH_PATH}/signin`, authController.signIn);

router.post(`${AUTH_PATH}/signout`, authController.signOut);

export default router;
