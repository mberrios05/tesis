import { z } from "zod";

// Esquema para validar el cuerpo (body) de la solicitud
const userBodySchema = z.object({
  whatsappNumber: z
    .string()
    .min(10, { message: "El número de WhatsApp debe tener al menos 10 caracteres." })
    .max(15, { message: "El número de WhatsApp no puede tener más de 15 caracteres." })
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "El número de WhatsApp no es válido." }),
  contactAdd: z
    .date()
    .optional(), // No siempre será obligatorio, ya que tiene un valor por defecto
  preferences: z
    .object({})
    .optional(), // Un objeto vacío o configuraciones personalizadas
  lastContact: z
    .date()
    .optional(), // Fecha opcional
  messageReceive: z
    .boolean()
    .optional(), // Solo booleano
  termsAndConditions: z.object({
    status: z
      .boolean({ message: "El estado de aceptación de términos debe ser booleano." })
      .default(false),
    version: z
      .string()
      .min(1, { message: "La versión de los términos es obligatoria." }),
    device: z
      .string()
      .optional(), // Contexto del dispositivo (opcional)
  }),
});

// Esquema para validar los parámetros de la solicitud (e.g., ID)
const userParamsSchema = z.object({
  id: z
    .string()
    .min(24, { message: "El ID debe ser un string válido de 24 caracteres." })
    .refine((value) => /^[a-f\d]{24}$/i.test(value), {
      message: "ID no válido.",
    }),
});

// Esquema para validar las queries
const userQuerySchema = z.object({
  whatsappNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "El número de WhatsApp no es válido." })
    .optional(),
  termsAccepted: z
    .boolean()
    .optional(), // Filtrar usuarios por aceptación de términos
});

// Validación del body (creación o actualización)
export const validateUserBody = (data, isUpdate = false) => {
  if (!isUpdate) {
    const creationSchema = userBodySchema.refine(
      (data) => data.whatsappNumber && data.termsAndConditions.status,
      { message: "El número de WhatsApp y la aceptación de términos son obligatorios." }
    );
    return creationSchema.safeParse(data);
  }
  return userBodySchema.safeParse(data);
};

// Validación de parámetros (ID)
export const validateUserParams = (params) => {
  const result = userParamsSchema.safeParse(params);
  return result;
};

// Validación de queries
export const validateUserQuery = (query) => {
  const result = userQuerySchema.safeParse(query);
  return result;
};