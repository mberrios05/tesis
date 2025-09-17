/**
 * @file verifyOwner.js
 * @description Verifica si existe un usuario con el rol "owner" en la base de datos. Si no existe, crea uno utilizando las credenciales definidas en las variables de entorno.
 */

import { createAdmin, findOwner } from "../../services/auth.service.js";
import hashPassword from "../functions/hashPassword.js";

// Variables de entorno para las credenciales del usuario "owner"
const ownerUsername = process.env.OWNER_USERNAME;
const ownerPassword = process.env.OWNER_PASSWORD;
const ownerEmail = process.env.OWNER_EMAIL;

/**
 * Verifica si ya existe un "owner" en la base de datos.
 * - Si existe, no realiza ninguna acción.
 * - Si no existe, crea un nuevo "owner" con las credenciales proporcionadas.
 * 
 * @async
 * @function verifyOwner
 * @returns {Promise<void>} - Devuelve `null` si ya existe un owner, o crea uno nuevo.
 */
export const verifyOwner = async () => {
  try {
    // Busca un usuario con rol "owner" en la base de datos
    const ownerExists = await findOwner({ username: ownerUsername, role: "owner" });

    if (ownerExists) {
      console.log("Ya existe un owner en la base de datos MongoDB.");
      return null; // Si ya existe, no realiza ninguna acción
    } else {
      // Si no existe, crea un nuevo owner
      const hashedPassword = await hashPassword.createHashPassword(ownerPassword);
      const owner = await createAdmin({
        username: ownerUsername,
        password: hashedPassword,
        email: ownerEmail,
        role: "owner",
      });

      console.log(
        `Owner creado => username: ${ownerUsername}, email: ${ownerEmail}, password: ${ownerPassword}`
      );
    }
  } catch (error) {
    console.log(`Error en verifyOwner: ${error}`);
  }
};
