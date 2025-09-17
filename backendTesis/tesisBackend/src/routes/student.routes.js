import express from "express";
import studentController from "../controllers/student.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const PATH_STUDENT = "/student";

router.post(PATH_STUDENT, studentController.createStudentController);
router.post(
  `${PATH_STUDENT}/importar-estudiantes`,
  upload.single("archivo"),
  studentController.importarEstudiantesController
);

router.get(PATH_STUDENT, studentController.getAllStudentsController);

router.get(
  `${PATH_STUDENT}/generar-resumen-pdf/:studentId`,
  studentController.generarResumenEstudiante
);

router.get(`${PATH_STUDENT}/:id`, studentController.getStudentByIdController);

router.put(`${PATH_STUDENT}/:id`, studentController.updateStudentController);

router.delete(`${PATH_STUDENT}/:id`, studentController.deleteStudentController);

export default router;
