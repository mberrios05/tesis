/**
 * @file auth.controller.js
 * @description Controladores de autenticación que manejan las operaciones de inicio y cierre de sesión.
 * Incluye la lógica para validar credenciales, generar tokens JWT, establecer cookies y limpiar sesiones.
 */
import {
  findAdminByEmail
} from "../services/auth.service.js";
import {
  HTTPS_MESSAGE_LOGOUT,
  HTTPS_MESSAGE_SIGNIN,
  HTTPS_STATUS,
} from "../utils/consts/httpConstants.js";
import {
  generateToken
} from "../utils/functions/generateToken.js";
import hashPassword from "../utils/functions/hashPassword.js";

const signIn = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    // Buscar administrador por email
    const adminFound = await findAdminByEmail({
      email: email
    });

    if (!adminFound) {
      console.log("Admin no encontrado");
      return res.status(HTTPS_STATUS.UNAUTHORIZED).json({
        message: HTTPS_MESSAGE_SIGNIN.INVALID_CREDENTIALS_EMAIL,
      });
    }

    // Comparar contraseña proporcionada con la almacenada
    const isPasswordMatch = await hashPassword.compareHashPassword(
      password,
      adminFound.password
    );

    if (!isPasswordMatch) {
      return res.status(HTTPS_STATUS.UNAUTHORIZED).json({
        message: HTTPS_MESSAGE_SIGNIN.INVALID_CREDENTIALS_PASSWORD,
      });
    }

    // Generar token JWT
    const token = generateToken({
      id: adminFound._id,
      role: adminFound.role,
    });
    console.log("Token generado:", token);

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("authToken", token, {
      httpOnly: true,          // La cookie no es accesible desde JavaScript
      secure: true,    // Solo se habilita en producción (requiere HTTPS)
      sameSite: "None", // "None" para producción, "Lax" para desarrollo
      maxAge: 60 * 60 * 12 * 1000, // Duración: 1 día
    });

    res.status(HTTPS_STATUS.OK).json({
      message: HTTPS_MESSAGE_SIGNIN.LOGIN_SUCCESS,
    });
  } catch (error) {
    console.log("Error al iniciar sesión:", error);
    return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTPS_MESSAGE_SIGNIN.INTERNAL_SERVER_ERROR,
      error: error,
    });
  }
};

const signOut = async (req, res) => {
  try {
    // Limpiar cookie de autenticación
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true, // Cambiar a true en producción
    });

    return res.status(HTTPS_STATUS.OK).json({
      message: HTTPS_MESSAGE_LOGOUT.LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log("Error al cerrar sesión:", error);
    return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTPS_MESSAGE_LOGOUT.INTERNAL_SERVER_ERROR,
      error: error,
    });
  }
};

export default {
  signIn,
  signOut,
};