import GuardianModel from "../models/Guardian.model.js";

export const createGuardianService = async (guardianData) => {
  try {
    const newGuardian = new GuardianModel(guardianData);
    await newGuardian.save();
    return {
      success: true,
      message: "Tutor creado correctamente.",
      data: newGuardian,
    };
  } catch (error) {
    console.error("Error al crear tutor:", error.message);
    return { success: false, message: "Error al crear tutor", error };
  }
};

export const getAllGuardiansService = async () => {
  try {
    const guardians = await GuardianModel.find();
    return {
      success: true,
      data: guardians,
    };
  } catch (error) {
    console.error("Error al obtener tutores:", error.message);
    return { success: false, message: "Error al obtener tutores", error };
  }
};

export const getGuardianByIdService = async (id) => {
  try {
    const guardian = await GuardianModel.findById(id).populate("childrens");

    if (!guardian) {
      return { success: false, message: "Tutor no encontrado" };
    }

    return {
      success: true,
      data: guardian,
    };
  } catch (error) {
    console.error("Error al buscar tutor por ID:", error.message);
    return { success: false, message: "Error al buscar tutor", error };
  }
};

export const updateGuardianService = async (id, updates) => {
  try {
    const tutor = await GuardianModel.findById(id);
    if (!tutor) {
      return {
        success: false,
        message: "Tutor no encontrado.",
      };
    }

    // Si viene una nueva contraseña, asignarla explícitamente
    if (updates.guardianPassword) {
      tutor.guardianPassword = updates.guardianPassword;
    }

    // Asignar el resto de los campos actualizables
    Object.assign(tutor, updates);

    // Guardar el documento (esto dispara los middlewares de mongoose)
    await tutor.save();

    return {
      success: true,
      message: "Tutor actualizado correctamente.",
      data: tutor,
    };
  } catch (error) {
    console.error("Error al actualizar tutor:", error.message);
    return { success: false, message: "Error al actualizar tutor", error };
  }
};

export const deleteGuardianService = async (id) => {
  try {
    const deletedGuardian = await GuardianModel.findByIdAndDelete(id);
    return {
      success: true,
      message: "Tutor eliminado correctamente.",
      data: deletedGuardian,
    };
  } catch (error) {
    console.error("Error al eliminar tutor:", error.message);
    return { success: false, message: "Error al eliminar tutor", error };
  }
};
