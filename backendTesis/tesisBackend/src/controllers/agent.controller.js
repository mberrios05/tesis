import { runAgent } from "../services/agent.service.js";
import { runAsesorAgent } from "../services/agentAsesor.service.js";

export const generarRespuestaIaGuardianId = async (req, res) => {
  const { message, guardianId } = req.body;

  if (!message || !guardianId) {
    return res.status(400).json({ message: "Faltan datos requeridos." });
  }

  try {
    const respuesta = await runAgent(message, { guardianId });
    return res
      .status(200)
      .json({ message: "Respuesta generada", data: respuesta });
  } catch (error) {
    console.error("Error generando respuesta del agente:", error);
    return res
      .status(500)
      .json({ message: "Error del agente", error: error.message });
  }
};

export const generarRespuestaAsesorId = async (req, res) => {
  const { message, asesorId } = req.body;

  if (!message || !asesorId) {
    return res.status(400).json({ message: "Faltan datos requeridos." });
  }

  try {
    const respuesta = await runAsesorAgent(message, { asesorId });
    return res
      .status(200)
      .json({ message: "Respuesta generada", data: respuesta });
  } catch (error) {
    console.error("Error generando respuesta del agente:", error);
    return res
      .status(500)
      .json({ message: "Error del agente", error: error.message });
  }
};

//
// Este agente virtual está diseñado bajo un enfoque *reactivo* y *basado en metas*, respondiendo de manera adaptativa a las necesidades del tutor.
//
// ✅ Enfoque reactivo:
// - El agente no responde automáticamente ni con mensajes predeterminados.
// - Su comportamiento varía en función del mensaje recibido (lenguaje natural), interpretando la intención del tutor:
//   - Si el tutor pregunta “¿todo bien?”, responde con un resumen emocional y tranquilo.
//   - Si el tutor pide “detalles”, el agente desglosa observaciones completas por materia y docente.
// - Esto le permite generar respuestas sintéticas o detalladas según el caso, sin necesidad de configurar flujos condicionales manualmente.
//
// 🎯 Enfoque basado en metas:
// - Su meta principal es informar sobre el estado académico de los estudiantes vinculados al tutor (hijos, hijas o estudiantes asignados).
// - Todas las respuestas están orientadas a lograr *claridad, tranquilidad o acción útil*:
//   - Mostrar si hay observaciones relevantes.
//   - Ofrecer contacto de profesores o enlaces de reunión si están disponibles.
//   - Sugerir secciones de la plataforma según corresponda.
//
// 🫶 Además:
// - Utiliza un tono cálido, conversacional y profesional.
// - Interpreta bien si el tutor desea un *resumen*, una *confirmación emocional* o un *detalle completo*.
// - Nunca responde fuera de contexto: si el mensaje no es relevante académicamente, redirige con respeto.
// - La combinación de estos comportamientos lo convierte en un agente útil, confiable y centrado en el acompañamiento escolar personalizado.
