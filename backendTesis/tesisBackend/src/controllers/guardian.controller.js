import {
  createGuardianService,
  getAllGuardiansService,
  getGuardianByIdService,
  updateGuardianService,
  deleteGuardianService,
} from "../services/guardian.service.js";

const guardianController = {
  createGuardianController: async (req, res) => {
    const data = await createGuardianService(req.body);
    res.status(201).json(data);
  },
  getAllGuardiansController: async (req, res) => {
    const data = await getAllGuardiansService();
    res.status(200).json(data);
  },
  getGuardianByIdController: async (req, res) => {
    const data = await getGuardianByIdService(req.params.id);
    res.status(200).json(data);
  },
  updateGuardianController: async (req, res) => {
    const data = await updateGuardianService(req.params.id, req.body);
    res.status(200).json(data);
  },
  deleteGuardianController: async (req, res) => {
    const data = await deleteGuardianService(req.params.id);
    res.status(200).json(data);
  },
};

export default guardianController;
