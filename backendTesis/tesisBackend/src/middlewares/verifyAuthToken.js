import { HTTPS_MESSAGE_TOKEN, HTTPS_STATUS } from "../utils/consts/httpConstants.js";

// Middleware para verificar el token desde la cookie
export const verifyAuthToken = (req, res, next) => {
  const token = req.cookies.authToken; // Obtén la cookie HttpOnly

  if (!token) {
    return res
      .status(HTTPS_STATUS.UNAUTHORIZED)
      .json({ message: HTTPS_MESSAGE_TOKEN.ACCESS_DENIED });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = decoded; // Guarda los datos del usuario en la solicitud
    next(); // Pasa al siguiente middleware o controlador
  } catch (error) {
    console.error(HTTPS_MESSAGE_TOKEN.TOKEN_INVALID, error);
    return res.status(403).json({ message: HTTPS_MESSAGE_TOKEN.TOKEN_INVALID });
  }
};
