import VinculacionGuardianModel from "../models/VinculacionGuardian.js";
import GuardianModel from "../models/Guardian.model.js";
export const createVinculacionGuardianService = async (vinculacionGuardian) => {
  try {
    const vinculacionGuardianCreated = await VinculacionGuardianModel.create(
      vinculacionGuardian
    );
    return vinculacionGuardianCreated;
  } catch (error) {
    console.error("Error al crear vinculacionGuardian:", error.message);
    throw error;
  }
};

export const getAllVinculacionGuardianServicePending = async () => {
  try {
    const vinculacionGuardian = await VinculacionGuardianModel.find({
      isPending: true,
    })
      .populate("studentId", "studentFirstName studentMiddleLastName") // campos del estudiante
      .populate("guardianId", "guardianName"); // campos del tutor;

    return vinculacionGuardian;
  } catch (error) {
    console.error("Error al obtener vinculacionGuardian:", error.message);
    throw error;
  }
};

export const setApprovalVinculacionGuardianService = async (id) => {
  try {
    const vinculacionGuardian =
      await VinculacionGuardianModel.findByIdAndUpdate(
        id,
        { isPending: false, isApproved: true },
        { new: true }
      );

    if (!vinculacionGuardian) {
      throw new Error("Vinculación no encontrada");
    }

    const { guardianId, studentId } = vinculacionGuardian;

    await GuardianModel.findByIdAndUpdate(
      guardianId,
      { $addToSet: { childrens: studentId } },
      { new: true }
    );

    return vinculacionGuardian;
  } catch (error) {
    console.error("Error al actualizar vinculacionGuardian:", error.message);
    throw error;
  }
};

export const setRejectVinculacionGuardianService = async (id) => {
  try {
    const vinculacionGuardian =
      await VinculacionGuardianModel.findByIdAndUpdate(
        id,
        { isPending: false, isRejected: true },
        { new: true }
      );
    return vinculacionGuardian;
  } catch (error) {
    console.error("Error al actualizar vinculacionGuardian:", error.message);
    throw error;
  }
};
