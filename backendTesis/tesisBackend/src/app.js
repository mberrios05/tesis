/**
 * @file server.js
 * @description Configuración principal del servidor Express. Incluye middleware, conexión a MongoDB, configuración de rutas y funciones auxiliares.
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { API_PATH } from "./utils/consts/router.js";
import ConnectMongoDB from "./connections/mongoose.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import corsConfig from "./utils/corsConfig.js";
import checkAuth from "./routes/checkAuth.routes.js";
import studentRoutes from "./routes/student.routes.js";
import agentRoutes from "./routes/agent.routes.js";
import guardianRoutes from "./routes/guardian.route.js";
import asesorRoutes from "./routes/asesor.routes.js";
import profesorRoutes from "./routes/profesor.routes.js";
import vinculacionGuardianRoutes from "./routes/vinculacionGuardian.routes.js";
import observacionesRoutes from "./routes/observaciones.routes.js";
import loginRoutes from "./routes/login.routes.js";
import adminRoutes from "./routes/admin.route.js";
// Cargar configuración del archivo .env
dotenv.config();

// Conectar a la base de datos MongoDB
await ConnectMongoDB();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware para configurar CORS
app.use(cors(corsConfig));

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, X-API-Key"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.status(204).send();
});

// Middleware para parsear JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use(API_PATH, authRoutes);
app.use(API_PATH, checkAuth);
app.use(API_PATH, studentRoutes);
app.use(API_PATH, agentRoutes);
app.use(API_PATH, guardianRoutes);
app.use(API_PATH, asesorRoutes);
app.use(API_PATH, profesorRoutes);
app.use(API_PATH, vinculacionGuardianRoutes);
app.use(API_PATH, observacionesRoutes);
app.use(API_PATH, loginRoutes);
app.use(API_PATH, adminRoutes);

// Middleware para log de peticiones
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} desde ${req.headers.origin}`);
  next();
});

// Ruta principal para verificar si el servidor está funcionando
/**
 * @route GET /
 * @description Responde con un mensaje indicando que el servidor está en funcionamiento.
 * @access Público
 */
app.get("/", (req, res) => {
  res.send("Servidor en funcionamiento");
});

// Función para listar todas las rutas configuradas en el servidor
/**
 * @function listRoutes
 * @description Lista todas las rutas configuradas en el servidor Express.
 * @param {object} app - Instancia de la aplicación Express.
 */

const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Servidor de Express funcionando en http://localhost:${PORT}`);
});
