import express from "express";
import vinculacionGuardianController from "../controllers/vinculacionGuardian.controller.js";

const router = express.Router();

const PATH_VINCULACION_GUARDIAN = "/vinculacion-guardian";

router.post(
  PATH_VINCULACION_GUARDIAN,
  vinculacionGuardianController.createVinculacionGuardianController
);

router.get(
  PATH_VINCULACION_GUARDIAN,
  vinculacionGuardianController.getAllVinculacionGuardianPendingController
);

router.get(
  `${PATH_VINCULACION_GUARDIAN}/aproved/:id`,
  vinculacionGuardianController.setApprovalVinculacionGuardianController
);

router.get(
  `${PATH_VINCULACION_GUARDIAN}/reject/:id`,
  vinculacionGuardianController.setRejectVinculacionGuardianController
);

export default router;
