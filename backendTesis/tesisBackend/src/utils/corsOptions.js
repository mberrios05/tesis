// const ngrokRegex = /^https?:\/\/[a-z0-9\-]+\.ngrok-free\.app$/;
const ngrokRegex = /^https?:\/\/[a-zA-Z0-9-]+.ngrok(-free)?.app$/;

// Lista blanca de orígenes permitidos
const allowedOrigins = [
  "http://localhost:3000", // Frontend en desarrollo  
  "http://localhost:5173", // Frontend en desarrollo  
  

];

/**
 * Función para configurar los orígenes permitidos dinámicamente
 * @param {string} origin - El origen de la solicitud.
 * @param {Function} callback - La función callback de CORS.
 */
const corsOptions = (origin, callback) => {
  // Permitir solicitudes sin origen (Postman, cURL, etc.)
  if (!origin) {
    return callback(null, true);
  }

  // Validar si el origen está en la lista blanca o coincide con el patrón de ngrok
  if (allowedOrigins.includes(origin) || ngrokRegex.test(origin)) {
    return callback(null, true);
  }

  // Bloquear el origen si no está permitido
  return callback(new Error("Origen no permitido por CORS"));
};

export default corsOptions;
