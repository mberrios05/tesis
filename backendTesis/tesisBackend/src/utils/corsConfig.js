/**
 * @file corsConfig.js
 * @description Configuración de CORS para la aplicación. Define los orígenes permitidos, métodos y encabezados para manejar solicitudes de diferentes dominios.
 */

import corsOptions from "./corsOptions.js";

/**
 * Configuración de CORS.
 * - Permite solicitudes desde los orígenes definidos en `allowedOrigins`.
 * - Configura métodos, headers permitidos y manejo de cookies.
 */
const corsConfig = {
  /**
   * Configuración de orígenes permitidos.
   * @param {string} origin - El origen de la solicitud.
   * @param {function} callback - Callback para manejar el resultado de la validación del origen.
   */
  origin: corsOptions,

  credentials: true, // Permitir cookies y headers de autorización
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos HTTP permitidos
  allowedHeaders: [
    "Authorization",
    "Content-Type",
    "X-API-Key",
  ], // Headers permitidos en las solicitudes
};

export default corsConfig;
