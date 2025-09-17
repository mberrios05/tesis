import express from "express";
import observacionesController from "../controllers/observaciones.controller.js";

const router = express.Router();

const PATH_OBSERVACION = "/observaciones";

router.post(PATH_OBSERVACION, observacionesController.createObservacion);

router.get(PATH_OBSERVACION, observacionesController.getAllObservaciones);
router.get(
  `${PATH_OBSERVACION}/student/:id`,
  observacionesController.getObservacionesByStudent
);
router.get(
  `${PATH_OBSERVACION}/profesor/:id`,
  observacionesController.getObservacionesByProfesor
);
router.put(
  `${PATH_OBSERVACION}/:id`,
  observacionesController.updateObservacion
);
router.put(
  `${PATH_OBSERVACION}/viewed/:id`,
  observacionesController.markAsViewedByFather
);
router.delete(
  `${PATH_OBSERVACION}/:id`,
  observacionesController.deleteObservacion
);

export default router;
