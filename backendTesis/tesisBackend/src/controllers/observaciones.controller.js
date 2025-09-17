import {
  createObservacionService,
  getAllObservacionesService,
  getObservacionesByProfesorService,
  getObservacionesByStudentService,
  markAsViewedByFatherService,
  updateObservacionService,
  deleteObservacionService,
} from "../services/observaciones.service.js";

const createObservacion = async (req, res) => {
  try {
    const data = req.body;
    const newObservacion = await createObservacionService(data);
    res.status(201).json(newObservacion);
  } catch (error) {
    console.error("Error al crear observación:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getAllObservaciones = async (req, res) => {
  try {
    const allObservaciones = await getAllObservacionesService();
    res.status(200).json(allObservaciones);
  } catch (error) {
    console.error("Error al obtener todas las observaciones:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getObservacionesByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const findObservaciones = await getObservacionesByStudentService(studentId);
    res.status(200).json(findObservaciones);
  } catch (error) {
    console.error("Error al obtener observaciones:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getObservacionesByProfesor = async (req, res) => {
  try {
    const profesorId = req.params.id;
    const findObservaciones = await getObservacionesByProfesorService(
      profesorId
    );
    res.status(200).json(findObservaciones);
  } catch (error) {
    console.error(
      "Error al obtener observaciones por profesor:",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
};

const updateObservacion = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedObservacion = await updateObservacionService(id, data);
    res.status(200).json(updatedObservacion);
  } catch (error) {
    console.error("Error al actualizar observación:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const markAsViewedByFather = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedObservacion = await markAsViewedByFatherService(id);
    res.status(200).json(updatedObservacion);
  } catch (error) {
    console.error(
      "Error al marcar observación como vista por el padre:",
      error.message
    );
    res.status(500).json({ error: error.message });
  }
};

const deleteObservacion = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedObservacion = await deleteObservacionService(id);
    res.status(200).json(deletedObservacion);
  } catch (error) {
    console.error("Error al eliminar observación:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default {
  createObservacion,
  getAllObservaciones,
  getObservacionesByStudent,
  getObservacionesByProfesor,
  updateObservacion,
  markAsViewedByFather,
  deleteObservacion,
};
