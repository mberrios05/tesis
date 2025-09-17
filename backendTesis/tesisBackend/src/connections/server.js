/**
 * @file serverUp.js
 * @description Módulo para inicializar el servidor y conectar a MongoDB.
 * Este módulo maneja la configuración del servidor, incluyendo la conexión a la base de datos y el inicio del servidor en el puerto especificado.
 */

import ConnectMongoDB from "./mongoose.js";
import { MESSAGE_CORRECT_CONECTION, MESSAGE_ERROR_CONECTION } from '../utils/consts/conections';

/**
 * Inicializa el servidor y establece la conexión con MongoDB.
 * En caso de éxito, el servidor comienza a escuchar en el puerto especificado.
 * En caso de error, registra un mensaje de error.
 *
 * @async
 * @function ServerUp
 * @param {object} app - Instancia de la aplicación (por ejemplo, Express.js).
 * @param {number} port - Puerto en el que se inicia el servidor.
 * @returns {Promise<void>} No devuelve ningún valor, solo inicializa el servidor y la conexión a MongoDB.
 * @throws {Error} Lanza un error si falla la conexión a MongoDB o el inicio del servidor.
 * @see {@link https://expressjs.com/} Documentación oficial de Express.
 */
const ServerUp = async (app, port) => {
  try {
    // Conexión a MongoDB
    await ConnectMongoDB(); // Conecta a MongoDB
    // Inicio del servidor
    app.listen(port, () => console.log(`${MESSAGE_CORRECT_CONECTION.SERVER} ${port}...`)); // Mensaje de servidor activo
  } catch (error) {
    // Manejo de errores
    console.error(`${MESSAGE_ERROR_CONECTION.SERVER} ${error}`); // Mensaje de error personalizado
  }
};

export default ServerUp;