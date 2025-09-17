import bcrypt from "bcrypt";

const createHashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = bcrypt.hash(password, salt);
    return passwordHash;
  } catch (error) {
    console.log("Error en createHash: ", error);
  }
};

const compareHashPassword = async (password, hash) => {
  try {
    const comparePassword = bcrypt.compare(password, hash);
    return comparePassword;
  } catch (error) {
    console.log("Error en compareHash: ", error);
  }
};

const hashPassword = {
  createHashPassword,
  compareHashPassword,
};

export default hashPassword;
