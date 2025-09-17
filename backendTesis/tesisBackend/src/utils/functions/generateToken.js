import jwt from "jsonwebtoken";

const secretKey = process.env.ENCRYPTION_KEY;
export const generateToken = (payload) => {
  try {
    const expireIn = "12h";
    const token = jwt.sign(payload, secretKey, { expiresIn: expireIn });

    return token;
  } catch (error) {
    console.log("Error al generar Token: ", error);
    
  }
};
