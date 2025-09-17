import express from "express";
import profesorController from "../controllers/profesor.controller.js";

const router = express.Router();
const PATH_PROFESOR = "/profesor";

router.post(PATH_PROFESOR, profesorController.createProfesorController);

router.get(PATH_PROFESOR, profesorController.getAllProfesoresController);

router.get(`${PATH_PROFESOR}/:id`, profesorController.getProfesorByIdController);

router.put(`${PATH_PROFESOR}/:id`, profesorController.updateProfesorController);

router.delete(`${PATH_PROFESOR}/:id`, profesorController.deleteProfesorController);

export default router;
