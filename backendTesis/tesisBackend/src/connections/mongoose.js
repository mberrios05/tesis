/**
 * @file connectMongoDB.js
 * @description Módulo para la conexión a MongoDB utilizando Mongoose.
 * Maneja la configuración y errores relacionados con la conexión a la base de datos.
 */

import mongoose from "mongoose";
import { MESSAGE_CORRECT_CONECTION, MESSAGE_ERROR_CONECTION } from '../utils/consts/conections.js';

/**
 * Conecta la aplicación a MongoDB utilizando Mongoose.
 * Utiliza las variables de entorno para configurar la conexión.
 * En caso de éxito, registra un mensaje de confirmación. En caso de error, registra el mensaje de error correspondiente.
 *
 * @async
 * @function ConnectMongoDB
 * @returns {Promise<void>} No devuelve ningún valor, solo establece la conexión a la base de datos.
 * @throws {Error} Lanza un error si la conexión falla.
 * @see {@link https://mongoosejs.com/docs/connections.html} Documentación oficial de Mongoose.
 */
const ConnectMongoDB = async () => {
  try {
    // Intento de conexión a MongoDB
    await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_NAME });
    console.log(MESSAGE_CORRECT_CONECTION.MONGO); // Mensaje de éxito en la conexión
  } catch (error) {
    // Manejo de errores en la conexión
    console.error(`${MESSAGE_ERROR_CTION.MONGO} : ${error}`); // Mensaje de error personalizado
  }
};

export default ConnectMongoDB;
