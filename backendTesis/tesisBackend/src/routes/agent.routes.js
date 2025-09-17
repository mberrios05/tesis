import express from "express";
import { generarRespuestaAsesorId, generarRespuestaIaGuardianId } from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/agenteforguardian", generarRespuestaIaGuardianId);
router.post("/agenteforasesor", generarRespuestaAsesorId);

export default router;
