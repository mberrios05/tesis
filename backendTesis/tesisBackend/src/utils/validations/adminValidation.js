import { z } from "zod";

// Esquema para validar el cuerpo de la solicitud (body)
const adminBodySchema = z.object({
  username: z
    .string()
    .min(1, { message: "El nombre de usuario es obligatorio." })
    .optional(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
    .optional(),
  email: z
    .string()
    .email({ message: "El correo electrónico debe tener un formato válido." })
    .optional(),
  role: z
    .string()
    .default("admin")
    .refine((value) => ["admin", "owner"].includes(value), {
      message: "El rol debe ser 'admin' o 'owner'.",
    })
    .optional(),
});

// Esquema para validar los parámetros de la solicitud (params)
const adminParamsSchema = z.object({
  id: z
    .string()
    .min(24, { message: "El ID debe ser un string válido de 24 caracteres." })
    .refine((value) => /^[a-f\d]{24}$/i.test(value), {
      message: "ID no válido.",
    }),
});

// Esquema para validar las consultas (query)
const adminQuerySchema = z.object({
  username: z
    .string()
    .min(1, {
      message:
        "El nombre de usuario, si se proporciona, debe ser un string no vacío.",
    })
    .optional(),
  role: z
    .string()
    .optional()
    .refine((value) => ["admin", "owner"].includes(value), {
      message: "El rol debe ser 'admin' o 'owner'.",
    }),
});

// Función para validar el cuerpo (body) de la solicitud
export const validateAdminBody = (data, isUpdate = false) => {
  if (!isUpdate) {
    const creationSchema = adminBodySchema.refine(
      (data) => data.username && data.password && data.email,
      {
        message:
          "El nombre de usuario, contraseña y correo electrónico son obligatorios.",
      }
    );
    return creationSchema.safeParse(data);
  }
  return adminBodySchema.safeParse(data);
};

// Función para validar los parámetros (params)
export const validateAdminParams = (params) => {
  const result = adminParamsSchema.safeParse(params);
  return result;
};

// Función para validar las consultas (query)
export const validateAdminQuery = (query) => {
  const result = adminQuerySchema.safeParse(query);
  return result;
};
