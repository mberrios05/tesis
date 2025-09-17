import {
  createProfesorService,
  getAllProfesoresService,
  getProfesorByIdService,
  updateProfesorService,
  deleteProfesorService,
} from "../services/profesor.service.js";

const profesorController = {
  createProfesorController: async (req, res) => {
    const data = await createProfesorService(req.body);
    res.status(data.success ? 201 : 400).json(data);
  },

  getAllProfesoresController: async (req, res) => {
    const data = await getAllProfesoresService();
    res.status(data.success ? 200 : 400).json(data);
  },

  getProfesorByIdController: async (req, res) => {
    const data = await getProfesorByIdService(req.params.id);
    res.status(data.success ? 200 : 404).json(data);
  },

  updateProfesorController: async (req, res) => {
    const data = await updateProfesorService(req.params.id, req.body);
    res.status(data.success ? 200 : 400).json(data);
  },

  deleteProfesorController: async (req, res) => {
    const data = await deleteProfesorService(req.params.id);
    res.status(data.success ? 200 : 400).json(data);
  },
};

export default profesorController;
