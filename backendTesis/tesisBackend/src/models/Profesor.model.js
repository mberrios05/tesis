import mongoose from "mongoose";
import bcrypt from "bcrypt";

const profesorSchema = new mongoose.Schema({
  profesorfullName: { type: String },
  profesoremail: { type: String, unique: true },
  profesorphone: { type: String },
  profesorwhatsappPhone: { type: String },
  profesormateria: { type: String },
  profesorgenero: { type: String },
  password: { type: String, required: true }, // 👈 Nuevo campo
});

// 🔒 Encriptar la contraseña antes de guardar
profesorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

profesorSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const ProfesorModel = mongoose.model("Profesor", profesorSchema);
export default ProfesorModel;
