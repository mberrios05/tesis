import express from "express";
import guardianController from "../controllers/guardian.controller.js";

const router = express.Router();

const PATH_GUARDIAN = "/guardian"

router.post(PATH_GUARDIAN, guardianController.createGuardianController);

router.get(PATH_GUARDIAN, guardianController.getAllGuardiansController);

router.get(`${PATH_GUARDIAN}/:id`, guardianController.getGuardianByIdController);

router.put(`${PATH_GUARDIAN}/:id`, guardianController.updateGuardianController);

router.delete(`${PATH_GUARDIAN}/:id`, guardianController.deleteGuardianController); 

export default router;