import AdminModel from "../models/Admin.model.js";

const createAdminService = async (admin) => {
  try {
    const adminCreated = await AdminModel.create(admin);
    return adminCreated;
  } catch (error) {
    console.error("Error al crear admin:", error.message);
    throw error;
  }
};

export default createAdminService;
