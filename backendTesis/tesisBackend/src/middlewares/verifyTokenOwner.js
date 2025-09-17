import {
  HTTPS_MESSAGE_TOKEN,
  HTTPS_STATUS,
} from "../utils/consts/httpConstants.js";

export const verifyTokenOwner = (req, res, next) => {
  try {
    // Verifica si el admin está autenticado
    if (!req.user) {
      return res
        .status(HTTPS_STATUS.UNAUTHORIZED)
        .json({ message: HTTPS_MESSAGE_TOKEN.TOKEN_NOT_FOUND });
    }

    // Verifica si el rol del admin es "owner"
    if (req.user.role !== "owner") {
      return res.status(HTTPS_STATUS.FORBIDDEN).json({
        message: HTTPS_MESSAGE_TOKEN.ACCESS_DENIED,
      });
    }

    // Continua al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error("Error en verifyOwner:", error);
    res
      .status(HTTPS_STATUS.INTERNAL_SERVER_ERROR)
      .json({
        message: HTTPS_MESSAGE_TOKEN.INTERNAL_SERVER_ERROR,
        error: error,
      });
  }
};