import {
  createVinculacionGuardianService,
  getAllVinculacionGuardianServicePending,
  setApprovalVinculacionGuardianService,
  setRejectVinculacionGuardianService,
} from "../services/vinculacionGuardian.service.js";

const createVinculacionGuardianController = async (req, res) => {
  try {
    const vinculacionGuardian = await createVinculacionGuardianService(
      req.body
    );
    res.status(201).json(vinculacionGuardian);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllVinculacionGuardianPendingController = async (req, res) => {
  try {
    const vinculacionGuardian = await getAllVinculacionGuardianServicePending();
    res.status(200).json(vinculacionGuardian);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const setApprovalVinculacionGuardianController = async (req, res) => {
  try {
    const vinculacionGuardian = await setApprovalVinculacionGuardianService(
      req.params.id
    );
    res.status(200).json(vinculacionGuardian);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const setRejectVinculacionGuardianController = async (req, res) => {
  try {
    const vinculacionGuardian = await setRejectVinculacionGuardianService(
      req.params.id
    );
    res.status(200).json(vinculacionGuardian);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createVinculacionGuardianController,
  getAllVinculacionGuardianPendingController,
  setApprovalVinculacionGuardianController,
  setRejectVinculacionGuardianController,
};
