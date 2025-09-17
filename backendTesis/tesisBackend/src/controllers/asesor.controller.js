import {
  createAsesorService,
  getAllAsesoresService,
  getAsesorByIdService,
  updateAsesorService,
  deleteAsesorService,
  getStudentsMatchSeccionClassService,
} from "../services/asesor.service.js";

const asesorController = {
  createAsesorController: async (req, res) => {
    const data = await createAsesorService(req.body);
    const status = data.success ? 201 : 400;
    res.status(status).json(data);
  },

  getAllAsesoresController: async (req, res) => {
    const data = await getAllAsesoresService();
    const status = data.success ? 200 : 500;
    res.status(status).json(data);
  },

  getAsesorByIdController: async (req, res) => {
    const data = await getAsesorByIdService(req.params.id);
    const status = data.success ? 200 : 404;
    res.status(status).json(data);
  },

  updateAsesorController: async (req, res) => {
    const data = await updateAsesorService(req.params.id, req.body);
    const status = data.success ? 200 : 400;
    res.status(status).json(data);
  },

  deleteAsesorController: async (req, res) => {
    const data = await deleteAsesorService(req.params.id);
    const status = data.success ? 200 : 500;
    res.status(status).json(data);
  },
  getStudentsBySectionAndClass: async (req, res) => {
    const { classEnrolled, sectionAssigned } = req.body;
    if (!classEnrolled || !sectionAssigned) {
      return res.status(400).json({
        success: false,
        message: "Los parámetros 'Paralelo' y 'clase' son obligatorios.",
      });
    }

    try {
      const result = await getStudentsMatchSeccionClassService(
        classEnrolled,
        sectionAssigned
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error interno al buscar estudiantes",
        error: error.message,
      });
    }
  },
};

export default asesorController;
