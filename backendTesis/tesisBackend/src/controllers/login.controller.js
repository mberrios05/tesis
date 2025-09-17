import { loginService } from "../services/login.service.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña requeridos" });
  }


  try {
    const result = await loginService(email, password);
    

    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    return res.status(200).json({
      message: "Login exitoso",
      user: result, 
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};
