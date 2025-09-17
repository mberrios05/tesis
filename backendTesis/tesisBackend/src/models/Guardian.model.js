import mongoose from "mongoose";
import bcrypt from "bcrypt";

const GuardianSchema = new mongoose.Schema({
  guardianName: { type: String },
  guardianPhone: { type: String },
  guardianWhatsApp: { type: String },
  addressCity: { type: String },
  addressState: { type: String },
  guardianEmail: { type: String, unique: true }, // importante para login
  cedulaIdentidad: { type: String },
  childrens: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Student", default: [] },
  ],
  password: { type: String, required: true }, 
});

GuardianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Método para comparar contraseñas
GuardianSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const GuardianModel = mongoose.model("Guardian", GuardianSchema);
export default GuardianModel;
