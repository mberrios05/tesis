export const HTTPS_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const HTTPS_MESSAGE_ADMIN = {
  ADMIN_EXISTS: "El administrador con este correo ya existe.",
  ADMIN_CREATED: "Administrador creado exitosamente.",
  ADMIN_CREATE_ERROR: "Error al crear el administrador.",
  ADMIN_NOT_FOUND: "Administrador no encontrado.",
  ADMIN_UPDATED: "Administrador actualizado exitosamente.",
  ADMIN_UPDATE_ERROR: "Error al actualizar el administrador.",
  ADMIN_DELETED: "Administrador eliminado exitosamente.",
  ADMIN_DELETE_ERROR: "Error al eliminar el administrador.",
  BOT_INIT_SUCCESS: "Inicializando el bot, escanee el QR.",
  BOT_INIT_ERROR: "Error al inicializar el bot.",
  MESSAGE_ERROR: "Ocurrió un error en el servidor.",
  MESSAGE_CORRECT_INIT_BOT_ROUTES: "Escanee el QR, ",
};


export const HTTPS_MESSAGE_TOKEN = {
  TOKEN_NOT_FOUND: "Acceso no autorizado, no se encontró token.",
  TOKEN_INVALID: "Token inválido o ha expirado.",
  ACCESS_DENIED: "Acceso denegado: no tienes permisos suficientes.",
  INTERNAL_SERVER_ERROR: "Error interno del servidor.",
  TOKEN_VALID: "Autenticación exitosa"
};

export const HTTPS_MESSAGE_SIGNIN = {
  INVALID_CREDENTIALS_EMAIL:
    "Credenciales inválidas, no se encontró un usuario registrado.",
  INVALID_CREDENTIALS_PASSWORD:
    "Credenciales inválidas, contraseña incorrecta.",
  LOGIN_SUCCESS: "Inicio de sesión exitoso.",
  INTERNAL_SERVER_ERROR: "Error interno del servidor.",
};

export const HTTPS_MESSAGE_LOGOUT = {
  LOGOUT_SUCCESS: "Sesión cerrada correctamente.",
  INTERNAL_SERVER_ERROR: "Error interno del servidor.",
}

export const HTTPS_MESSAGES_USER = {
  VALIDATION_ERROR: "Error de validación en el usuario.",
  CREATED_SUCCESS: "Usuario creado exitosamente.",
  NOT_FOUND: "Usuario no encontrado.",
  MESSAGE_ERROR: "Error interno del servidor.",
};

export const HTTPS_MESSAGES_STUDENT = {
  VALIDATION_ERROR: "Error de validación de estudiante.",
  CREATED_SUCCESS: "Estudiante creado con éxito.",
  UPDATED_SUCCESS: "Estudiante actualizado correctamente.",
  DELETED_SUCCESS: "Estudiante eliminado correctamente.",
  NOT_FOUND: "Estudiante no encontrado.",
  MESSAGE_ERROR: "Error interno del servidor.",
};

export const HTTPS_MESSAGES_AGENT = {
  RESPONSE_SUCCESSFULLY: "Respuesta generada exitosamente",
  NOT_FOUND: "Respuesta no generada por el agente.",
  MESSAGE_ERROR: "Error interno del servidor.",
}
