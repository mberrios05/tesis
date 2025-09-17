import GuardianModel from "../models/Guardian.model.js";
import ProfesorModel from "../models/Profesor.model.js";
import AsesorModel from "../models/Asesor.model.js";
import AdminModel from "../models/Admin.model.js";

export const loginService = async (email, password) => {
  const roles = [
    { model: GuardianModel, role: "padre", emailField: "guardianEmail" },
    { model: ProfesorModel, role: "profesor", emailField: "profesoremail" },
    { model: AsesorModel, role: "asesor", emailField: "asesorEmail" },
    { model: AdminModel, role: "admin", emailField: "adminEmail" },
  ];

  for (const { model, role, emailField } of roles) {
    const user = await model.findOne({ [emailField]: email });

    console.log(user);
    if (user && (await user.comparePassword(password))) {
      return {
        success: true,
        user: {
          _id: user._id,
          rol: role,
          ...user.toObject(),
        },
      };
    }
  }

  return {
    success: false,
    message: "Email o contraseña incorrectos",
  };
};
