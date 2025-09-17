import {
  HTTPS_MESSAGE_TOKEN,
  HTTPS_STATUS,
} from "../utils/consts/httpConstants.js";
import jwt from "jsonwebtoken"
export const checkAuth = async (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res
      .status(HTTPS_STATUS.UNAUTHORIZED)
      .json({ message: HTTPS_MESSAGE_TOKEN.TOKEN_NOT_FOUND });
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.ENCRYPTION_KEY);
    return res
      .status(HTTPS_STATUS.OK)
      .json({ message: HTTPS_MESSAGE_TOKEN.TOKEN_VALID, user: decoded });
  } catch (error) {
    console.error(HTTPS_MESSAGE_TOKEN.TOKEN_INVALID, error);
    return res
      .status(HTTPS_STATUS.FORBIDDEN)
      .json({ message: HTTPS_MESSAGE_TOKEN.TOKEN_NOT_FOUND });
  }
};
