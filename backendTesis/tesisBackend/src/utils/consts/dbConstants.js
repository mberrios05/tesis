import dotenv from "dotenv";
dotenv.config();

export const MONGO_CONFIG = {
  URI: process.env.MONGO_URI,
  DB_NAME: process.env.MONGO_NAME,
};

export const CONNECTION_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const MONGO_MODELS = {
  ADMIN: "Admin",
  USER: "User",
};

export const MODEL_REF = {
  ADMIN: "Admin",
};
