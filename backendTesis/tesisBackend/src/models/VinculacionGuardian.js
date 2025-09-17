import mongoose from "mongoose";

const vinculacionGuardianSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  guardianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guardian",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
  isPending: {
    type: Boolean,
    default: true,
  },
});

const VinculacionGuardianModel = mongoose.model(
  "VinculacionGuardian",
  vinculacionGuardianSchema
);
export default VinculacionGuardianModel;
