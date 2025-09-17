import express from "express";
import asesorController from "../controllers/asesor.controller.js";

const router = express.Router();
const PATH_ASESOR = "/asesor";

router.post(PATH_ASESOR, asesorController.createAsesorController);

router.get(PATH_ASESOR, asesorController.getAllAsesoresController);

router.post(
  `${PATH_ASESOR}/estudiantes-coincidentes`,
  asesorController.getStudentsBySectionAndClass
);

router.get(`${PATH_ASESOR}/:id`, asesorController.getAsesorByIdController);

router.put(`${PATH_ASESOR}/:id`, asesorController.updateAsesorController);

router.delete(`${PATH_ASESOR}/:id`, asesorController.deleteAsesorController);

export default router;
