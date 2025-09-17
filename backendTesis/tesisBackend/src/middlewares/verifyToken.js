import jwt from "jsonwebtoken";
import {
  HTTPS_MESSAGE_TOKEN,
  HTTPS_STATUS,
} from "../utils/consts/httpConstants.js";

const secretKey = process.env.ENCRYPTION_KEY;
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.authToken; //Extrae el tken de las cookies

    // console.log("Token de las cookies: ", token)
    if (!token) {
      console.log("verifytoken:", token)
      return res.status(HTTPS_STATUS.UNAUTHORIZED).json({
        message: HTTPS_MESSAGE_TOKEN.TOKEN_NOT_FOUND,
      });
    }

    const decoded = jwt.verify(token, secretKey); // decodifica el token

    // Adjuntar datos del token al objeto `req.user`
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };

    next(); // Continuar al siguiente middleware o controlador
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res
      .status(HTTPS_STATUS.UNAUTHORIZED)
      .json({ message: HTTPS_MESSAGE_TOKEN.TOKEN_INVALID, error: error });
  }
};