import mongoose from "mongoose";
import bcrypt from "bcrypt";

const asesorSchema = new mongoose.Schema({
  asesorFullName: { type: String },
  asesorCi: { type: String },
  asesorEmail: { type: String, unique: true },
  asesorPhone: { type: String },
  asesorWhatsapp: { type: String },
  asesorClassEnrolled: { type: String },
  asesorSectionEnrolled: { type: String },
  password: { type: String, required: true },
});

asesorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

asesorSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const AsesorModel = mongoose.model("Asesor", asesorSchema);
export default AsesorModel;
