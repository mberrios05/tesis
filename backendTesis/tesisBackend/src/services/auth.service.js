/**
 * @file auth.service.js
 * @description Servicios relacionados con la autenticación y gestión de administradores. Incluye funciones para buscar administradores por email, username, rol y para crear nuevos administradores.
 */

import StudentModel from "../models/student.model.js";

export const findAdminByEmail = async ({ email }) => {
  try {
    const adminFound = await StudentModel.findOne({ email });
    return adminFound ? adminFound : null;
  } catch (error) {
    console.log("Error al buscar al admin o Owner por email: ", error);
    throw error;
  }
};

export const findAdminByUsername = async ({ username }) => {
  try {
    const adminFound = await StudentModel.findOne({ username });
    return adminFound ? adminFound : null;
  } catch (error) {
    console.log("Error al buscar al admin o Owner por username: ", error);
    throw error;
  }
};

export const findOwner = async ({ username, role }) => {
/**
 * Busca un administrador (Owner) en la base de datos por username y role.
 * @param {object} params - Parámetros de búsqueda.
 * @param {string} params.username - Username del administrador.
 * @param {string} params.role - Rol del administrador.
 * @returns {Promise<object | null>} - El objeto del administrador encontrado o null si no existe.
 */
  try {
    const adminFound = await StudentModel.findOne({ username, role });
    return adminFound ? adminFound : null;
  } catch (error) {
    console.log("Error al buscar owner en Mongo: ", error);
    throw error;
  }
};

export const createAdmin = async ({ username, password, email, role }) => {
  try {
    const newAdmin = new StudentModel({
      username: username,
      password: password,
      email: email,
      role: role,
    });

    // Guardar el administrador en la base de datos
    await newAdmin.save();
    return;
  } catch (error) {
    console.log("Error al crear admin: ", error);
    throw error;
  }
};
