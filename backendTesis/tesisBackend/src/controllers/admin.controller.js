import createAdminService from "../services/admin.service.js";

export const createAdminController = async (req, res) => {
  try {
    const admin = req.body;
    const adminCreated = await createAdminService(admin);
    res.status(200).json(adminCreated);
  } catch (error) {
    console.error("Error al crear admin:", error.message);
    res.status(500).json({ error: error.message });
  }
};
