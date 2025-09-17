import ProfesorModel from "../models/Profesor.model.js";

export const createProfesorService = async (profesorData) => {
  try {
    const newProfesor = new ProfesorModel(profesorData);
    await newProfesor.save();
    return {
      success: true,
      message: "Profesor creado correctamente.",
      data: newProfesor,
    };
  } catch (error) {
    console.error("Error al crear profesor:", error.message);
    return { success: false, message: "Error al crear profesor", error };
  }
};

export const getAllProfesoresService = async () => {
  try {
    const profesores = await ProfesorModel.find();
    return {
      success: true,
      data: profesores,
    };
  } catch (error) {
    console.error("Error al obtener profesores:", error.message);
    return { success: false, message: "Error al obtener profesores", error };
  }
};

export const getProfesorByIdService = async (id) => {
  try {
    const profesor = await ProfesorModel.findById(id);
    if (!profesor) {
      return { success: false, message: "Profesor no encontrado" };
    }
    return {
      success: true,
      data: profesor,
    };
  } catch (error) {
    console.error("Error al buscar profesor por ID:", error.message);
    return { success: false, message: "Error al buscar profesor", error };
  }
};

export const updateProfesorService = async (id, updates) => {
  try {
    const updatedProfesor = await ProfesorModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return {
      success: true,
      message: "Profesor actualizado correctamente.",
      data: updatedProfesor,
    };
  } catch (error) {
    console.error("Error al actualizar profesor:", error.message);
    return { success: false, message: "Error al actualizar profesor", error };
  }
};

export const deleteProfesorService = async (id) => {
  try {
    const deletedProfesor = await ProfesorModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Profesor eliminado correctamente.",
      data: deletedProfesor,
    };
  } catch (error) {
    console.error("Error al eliminar profesor:", error.message);
    return { success: false, message: "Error al eliminar profesor", error };
  }
};
