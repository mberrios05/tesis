import AsesorModel from "../models/Asesor.model.js";
import StudentModel from "../models/Student.model.js";

export const createAsesorService = async (asesorData) => {
  try {
    const newAsesor = new AsesorModel(asesorData);
    await newAsesor.save();
    return {
      success: true,
      message: "Asesor creado correctamente.",
      data: newAsesor,
    };
  } catch (error) {
    console.error("Error al crear asesor:", error.message);
    return { success: false, message: "Error al crear asesor", error };
  }
};

export const getAllAsesoresService = async () => {
  try {
    const asesores = await AsesorModel.find();
    return {
      success: true,
      data: asesores,
    };
  } catch (error) {
    console.error("Error al obtener asesores:", error.message);
    return { success: false, message: "Error al obtener asesores", error };
  }
};

export const getAsesorByIdService = async (id) => {
  try {
    const asesor = await AsesorModel.findById(id);
    if (!asesor) {
      return { success: false, message: "Asesor no encontrado" };
    }
    return {
      success: true,
      data: asesor,
    };
  } catch (error) {
    console.error("Error al buscar asesor por ID:", error.message);
    return { success: false, message: "Error al buscar asesor", error };
  }
};

export const updateAsesorService = async (id, updates) => {
  try {
    const updatedAsesor = await AsesorModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return {
      success: true,
      message: "Asesor actualizado correctamente.",
      data: updatedAsesor,
    };
  } catch (error) {
    console.error("Error al actualizar asesor:", error.message);
    return { success: false, message: "Error al actualizar asesor", error };
  }
};

export const deleteAsesorService = async (id) => {
  try {
    const deletedAsesor = await AsesorModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Asesor eliminado correctamente.",
      data: deletedAsesor,
    };
  } catch (error) {
    console.error("Error al eliminar asesor:", error.message);
    return { success: false, message: "Error al eliminar asesor", error };
  }
};

export const getStudentsMatchSeccionClassService = async (
  classEnrolled,
  sectionAssigned
) => {
  try {
    const students = await StudentModel.find({
      classEnrolled: classEnrolled,
      sectionAssigned: sectionAssigned,
    });
    return {
      success: true,
      data: students,
    };
  } catch (error) {
    console.error("Error al obtener estudiantes:", error.message);
    return { success: false, message: "Error al obtener estudiantes", error };
  }
};
