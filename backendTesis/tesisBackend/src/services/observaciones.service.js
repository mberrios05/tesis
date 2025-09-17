import ObservacionesModel from "../models/Observaciones.model.js";
import StudentModel from "../models/Student.model.js";

export const createObservacionService = async (data) => {
  try { 
    const newObservacion = await ObservacionesModel.create(data);
    console.log (newObservacion)
    await StudentModel.findByIdAndUpdate(
      data.studentId,
      {
        $push: { faltasId: newObservacion._id },
        $inc: { observationsCount: 1 },
      },
      { new: true }
    );

    return newObservacion;
  } catch (error) {
    console.error("Error al crear observación:", error.message);
    throw error;
  }
};

export const getAllObservacionesService = async () => {
  try {
    const allObservaciones = await ObservacionesModel.find();
    return allObservaciones;
  } catch (error) {
    console.error("Error al obtener todas las observaciones:", error.message);
    throw error;
  }
};

export const getObservacionesByStudentService = async (studentId) => {
  try {
    const findObservaciones = await ObservacionesModel.find({
      studentId: studentId,
    });
    return findObservaciones;
  } catch (error) {
    console.error("Error al obtener observaciones:", error.message);
    throw error;
  }
};

export const getObservacionesByProfesorService = async (profesorId) => {
  try {
    const findObservaciones = await ObservacionesModel.find({
      studentProfessorId: profesorId,
    }).populate({
      path: "studentId",
      select:
        "studentFirstName studentMiddleLastName classEnrolled sectionAssigned",
    });

    return findObservaciones;
  } catch (error) {
    console.error(
      "Error al obtener observaciones por profesor:",
      error.message
    );
    throw error;
  }
};

export const updateObservacionService = async (id, data) => {
  try {
    if (data.studentProfessorId) {
      throw new Error("No se permite modificar studentProfessorId");
    }

    const updated = await ObservacionesModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) throw new Error("Observación no encontrada");

    return updated;
  } catch (error) {
    console.error("Error al actualizar observación:", error.message);
    throw error;
  }
};

export const markAsViewedByFatherService = async (id) => {
  try {
    const updated = await ObservacionesModel.findByIdAndUpdate(
      id,
      { isViewedForFather: true },
      { new: true }
    );

    if (!updated) throw new Error("Observación no encontrada");

    return updated;
  } catch (error) {
    console.error("Error al marcar observación como vista:", error.message);
    throw error;
  }
};

export const deleteObservacionService = async (observacionId) => {
  try {
    // 1. Buscar la observación para obtener el ID del estudiante
    const observacion = await ObservacionesModel.findById(observacionId);
    if (!observacion) throw new Error("Observación no encontrada");

    const studentId = observacion.studentId;

    // 2. Eliminar la observación
    await ObservacionesModel.findByIdAndDelete(observacionId);

    // 3. Actualizar al estudiante: eliminar ID del array y restar el contador
    await StudentModel.findByIdAndUpdate(
      studentId,
      {
        $pull: { faltasId: observacionId },
        $inc: { observationsCount: -1 },
      },
      { new: true }
    );

    return { message: "Observación eliminada correctamente" };
  } catch (error) {
    console.error("Error al eliminar observación:", error.message);
    throw error;
  }
};