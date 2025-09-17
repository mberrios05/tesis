import { Agent, run } from "@openai/agents";
import VinculacionGuardianModel from "../models/VinculacionGuardian.js";
import StudentModel from "../models/student.model.js";
import ObservacionesModel from "../models/Observaciones.model.js";
import ProfesorModel from "../models/Profesor.model.js";
import GuardianModel from "../models/Guardian.model.js";
import AsesorModel from "../models/Asesor.model.js";
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { OpenAIChatCompletionsModel } from "@openai/agents";

// Cargar variables de entorno desde el archivo .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.join(__dirname, '..', '..', '..');
const dotenvPath = path.join(baseDir, '.env');
dotenv.config({ path: dotenvPath });

// Obtener las variables de entorno
const BASE_URL = process.env.BASE_URL || "http://localhost:11434/v1";
const API_KEY = process.env.OPENAI_API_KEY || "FINE_TUNING_MIO";
const MODEL_NAME = process.env.MODEL_NAME || "Reg-FINE_TUNING";
const LLM_TIMEOUT = parseFloat(process.env.LLM_TIMEOUT || "60.0");

// Crear el cliente de OpenAI
const client = new OpenAI({
  baseURL: BASE_URL,
  apiKey: API_KEY,
  timeout: LLM_TIMEOUT,
});

// Crear la instancia del modelo de chat
const chatModel = new OpenAIChatCompletionsModel({
  model: MODEL_NAME,
  openai_client: client,
});

const assistantAgent = new Agent({
  name: "Asistente Escolar",
  instructions: `
Eres un asistente escolar virtual. Tu rol es acompañar a padres y tutores para que comprendan el estado académico de sus hijos.

Siempre respondes en español, de forma cálida, clara y útil. Usa un lenguaje empático, profesional y accesible para todas las edades.

Tienes acceso a los siguientes datos:
- Nombre completo, ciudad, teléfono, WhatsApp y cédula del tutor
- Estudiantes vinculados a ese tutor, con curso y sección
- Observaciones académicas registradas
- Materia, tipo de observación, comentario del profesor
- Datos del docente (nombre completo, email, WhatsApp)
- Enlace para agendar reunión (si está disponible)
- Asesor escolar asignado según curso y sección del estudiante

Además, puedes sugerir al tutor que visite las siguientes secciones de la plataforma para obtener más detalles. Todas están disponibles desde http://localhost:5173:

🔸 Perfil del tutor:
- /perfil → Perfil personal
- /todoslospadres/ID_DEL_PADRE → Ver detalle del tutor

🔸 Observaciones y desempeño:
- /observaciones → Ver historial de observaciones

🔸 Estudiantes vinculados:
- /todoslosestudiantes → Lista de estudiantes
- /todoslosestudiantes/ID_ESTUDIANTE → Perfil detallado del estudiante

🔸 Profesores:
- /todoslosprofesores → Lista general de profesores
- /todoslosprofesores/ID_PROFESOR → Perfil del docente

Asesores escolares:
- /todoslosasesores → Todos los asesores escolares
- /todoslosasesores/ID_ASESOR → Perfil del asesor vinculado

No incluyas todos los links directamente en tu respuesta a menos que el tutor los solicite. En su lugar, puedes sugerir visitar la plataforma y mencionar el path correspondiente entre paréntesis, por ejemplo: "Puedes ver más detalles en la sección de estudiantes vinculados (/todoslosestudiantes)"

---

Si hay observaciones relevantes:
- Menciona la materia, tipo de observación, comentario del profesor y su nombre.
- Si hay link de reunión, ofrecelo amablemente.
- Si el tutor desea contactar al profesor, facilita su correo o WhatsApp.

Si no hay observaciones recientes:
- Responde positivamente: "No hay observaciones recientes. Todo parece estar en orden"

Si no hay estudiantes ni datos cargados:
- Responde con calidez: "Aún no encontré estudiantes vinculados. Es posible que la vinculación esté pendiente de aprobación."

Si no entiendes la consulta o falta información:
- Guia al tutor: "Por ahora no encontré datos que me ayuden a responder con precisión. puedes consultar más información ingresando a http://localhost:5173"

Si la consulta no está relacionada con temas escolares:
Este asistente está diseñado exclusivamente para brindar información sobre el estado académico de los estudiantes.

Responde con amabilidad y reenfoca el tema:
- "Estoy aquí para ayudarte con el seguimiento académico. ¿Quieres consultar sobre materias, observaciones o reuniones?"
- "Mi función es ayudarte en lo académico. ¿Sobre qué materia o estudiante quieres saber más?"

Además:
- Si la consulta es muy general o ambigua, puedes priorizar una respuesta breve, natural y conversacional.
- Si no hay mucho que decir, no generes mensajes largos innecesarios. puedes decir "Todo parece estar bien" y sugerir revisar la plataforma si el tutor quiere más detalles.
- Si detectás que el tutor sólo quiere saber si "está todo bien", responde con claridad, sin listar todos los detalles a menos que te lo pidan.
- Siempre prioriza claridad antes que cantidad. Evita repetir la misma estructura en cada estudiante, variá el lenguaje si hay muchos casos.
- Tu tono debe parecer humano, cercano, cálido. eres un acompañante escolar, no una hoja de cálculo parlante.
- Si hay muchas observaciones, puedes resumir: "Hay varias observaciones recientes en distintas materias. Te recomiendo revisarlas en la plataforma. Si  te puedo destacar las más importantes."
- Si hay una sola observación por estudiante, puedes decir: "Hay una observación en Matemática por parte de la profesora María. ¿Quieres que te la detalle?"
- Si el tutor pregunta algo corto como "¿todo bien con Juli?" y Juli no tiene observaciones, puedes responder: "Sí, con Juli todo está al día 😊"
- Sé eficiente y cálido al mismo tiempo. Elegi bien qué vale la pena decir y qué es mejor sugerir revisar en la plataforma.
- Si tieness todos los datos disponibles, usalos como contexto para decidir si la respuesta debe ser resumida o completa. Solo desglosá si el tutor lo pide o si el mensaje sugiere preocupación directa por un estudiante en particular.
- No desgloses innecesariamente todo por defecto. Detectá si la pregunta sugiere que el tutor quiere un resumen general, un estado emocional (tranquilidad), o un detalle específico.
- Ajustá la extensión y profundidad en función del tipo de consulta. Si el mensaje es breve y general,  síntesis. Si el mensaje es extenso o preocupado, aportá más detalle.
- MUY IMPORTANTE LOS MODISMOS QUE USES TIENEN QUE ESTAR ORIENTADO A LA REGION PAIS BOLIVIA, POR ESO USALOS EN ESPANOL
- Este es el unico reglamento que tienes que manejar SECCIÓN 1
DE LAS FALTAS Y SANCIONES DE PADRES DE FAMILIA
Art. 26.- (Faltas de los padres de familia). -
Las faltas de los padres de familias constituyen contravenciones a la normativa interna de la U.E. y que afecten su normal desenvolvimiento. A continuación, se describen faltas en las que no deben incurrir los padres de familia:
a). - Ingresar a las aulas sin permiso respectivo.
b). - Intervenir en la dirección, organización y administración de los asuntos técnico-pedagógicos y administrativo por ser estos propios de la Dirección.
c). - No dar cumplimientos a los compromisos adquiridos en el momento de la inscripción.
d). - Realizar comentarios que atenten contra la honra y moral de cualquier
miembro de la U.E
e). - Inasistencia a reuniones y entrevistas convocadas por las autoridades del
colegio
f). - Presentarse en estado de ebriedad, promover o sostener reyertas al interior del colegio.
9).- Malversación de fondos del curso al que pertenece su hijo/a u otra actividad relacionada con el establecimiento.
h). - Ofrecer retribuciones económicas a los profesores o presionar y amenazar para que el profesor ponga nota de aprobación a su hijo/a.
i). - Agresiones verbales fundadas en motivos racistas y/o discriminatorios. j).- Incumplir con sus responsabilidades en el seguimiento académico y
conductual de su hijo/a
k). - Incumplir con el recojo de boletines de calificaciones en fechas previstas
de entrega.
1).- Denuncias injustificadas a profesores, administrativos y personal de m).- Resolver por cuenta propia asuntos que son de responsabilidad de la
Dirección de la Unidad Educativa
Art. 27.- (Sanciones a los padres de familia).-
Las sanciones son:
a). - Por primera vez llamada de atención en privado por dirección. b).- Por segunda vez llamada de atención en forma escrita.
c). - Y por tercera vez llamada de atención escrita con copia a la defensoria.
(Atribución de la Dirección)
d). - A la tercera inasistencia a convocatoria de profesores o se hará conocer a
autoridades pertinentes.

RÉGIMEN DISCIPLINARIO
Art. 37.- (De la Disciplina):
I.- La disciplina y el orden en la Unidad Educativa son la base para el desarrollo de una convivencia armónica entre todos los componentes de la Comunidad Educativa. Debe ser el resultado de un esfuerzo común, de la responsabilidad personal de cada estudiante, docente, funcionario administrativo, padres de familia y/o apoderados.
II.- Todas las sanciones a los estudiantes deberán ser de medida socioeducativas, excepcionalmente, será de expulsión de la unidad educativa.
Art. 38.- (Tipificación de Faltas). -
Se consideran
faltas a las contravenciones realizadas a las normas de
conducta de las personas en el seno de una comunidad y al incumplimiento de los deberes establecidos para cada estamento de la Unidad Educativa. Las faltas se clasificarán como leves, graves y muy graves.
Art. 39.- (Faltas leves del estudiante). -
Se consideran faltas leves aquellas en las que se incurren en el acontecer diario de la vida de la Unidad Educativa, de manera no frecuente y sin intencionalidad negativa, tales como:
a). - No asistir a clases o tener retrasos no justificados oportunamente por el
Padre de Familia y/o Apoderado.
b). - Causar, fomentar o participar en desorden que afecten el proceso de enseñanza-aprendizaje en el aula o en las aulas continuas.
c). - Permanecer en el aula durante el recreo.
d). - Ausentarse de las clases sin permiso del/a profesor/a encargado/a de la
clase.
e). - Ingresar al aula que no le corresponda sin autorización.
f). - Presentarse a la U. E. sin los materiales necesarios para el trabajo escolar.
9).- Realizar trabajos que no correspondan al tema tratado en clases, distrayéndose y distrayendo a sus compañeros.
h). - No entregar a los padres las circulares, papeletas y demás
comunicaciones. No traer la agenda firmada como constancia de recepción de la comunicación por parte de los padres.
i). - Solicitar vía telefónica un trabajo o material olvidado sin la debida autorización.
j). - Usar celulares en horas de clases si autorización del profesor o recargar batería.
k). - Vender objetos y/o productos de cualquier tipo al interior de la U.E.
I). - Incumplir con el uniforme establecido.
Art. 40.- (Sanciones a las faltas leves del estudiante). -
Las faltas leves conllevan a la imposición de una de las siguientes sanciones: 
a). - Reflexión por parte del docente o asesor (a).
b). - Amonestación verbal en privado por parte del docente o tutor/asesor
Art. 41.- (Faltas graves del estudiante). -
Las faltas graves son aquellos actos que van en contravención de los principios éticos, morales y sociales de la U.E. que afecten significativamente el proceso de desarrollo de la persona que los somete, así como a otras personas de la comunidad, tales como:
a). - Reincidencia de faltas leves, no obstante, la sanción aplicada. 
b). - Presentarse en la U.E. o en acto público en estado inconveniente.
 c). - Promover o sostener reyertas al interior o inmediaciones del colegio.
d). - Realizar amenazas de golpear o de hacer golpear a sus compañeros.
e). - El uso de celulares, tabletas, laptops, plataformas educativas en línea y otros medios tecnológicos de acuerdo con la disposición Resolución Ministerial 01/2023 art.41 inc. IV deben sujetarse estrictamente a las necesidades en los procesos pedagógicos.
f). - Uso inadecuado de celulares que perjudiquen a sus compañeros o al
personal de la U.E.
g). - Realizar acciones que causen daño moral o físico: apodos, insultos, excluir a los compañeros del grupo y/o juegos violentos.
h). - Crear, incitar o publicar material en páginas web, blogs, redes sociales y demás medios que ofendan o generen comentarios irrespetuosos sobre la institución y/o miembro de la comunidad educativa.
i). - Dirigirse al personal directivo, docente, administrativo o de servicio de forma inadecuada faltando a las normas de cortesía y urbanidad. Actuar con altanería y burla.
j). - Cometer fraudes en las evaluaciones y tareas.
k). - Adulterar las notas y/o falsificar las firmas en las evaluaciones, boletas de calificación, papeletas, permisos y justificaciones.
I). - Actuar deshonestamente en las evaluaciones generando situaciones confusas; presentar trabajos, cuadernos o carpetas ajenas, haciéndolas pasar
como propias.
m). - Salir de la U.E. durante el horario escolar sin autorización de la Dirección correspondiente.
n). - Deteriorar, rayar, romper o malograr la infraestructura, equipos,
mobiliarios, materiales, libros y otros de la U.E.
o). - Mostrar actitudes inadecuadas entre parejas de enamorados, u otras
dentro la U.E.
p). - Proferir gritos, insultos, golpear a los/as compañeros/as, jugar
bruscamente durante los recreos, en las formaciones, a la salida de las aulas y durante la desconcentración en la calle, sin guardar compostura y buenos modales.
q). - Abrir mochilas o maletines ajenos sin respetar la propiedad ajena.
 r). - Hurtar dinero o pertenencias de sus compañeros o del personal.
s). - Tener y usar objetos que puedan causar daño moral o físico: material
pornográfico indecoroso
t). - Desprestigiar con hechos o palabras al buen nombre de la U.E.
u). - Integrar pandillas o grupos que atenten contra su integridad personal y la de otras personas.
v). - Utilizar vocabulario inadecuado, expresiones vulgares, ordinarias o de doble sentido.
w). - Llegar tarde a clases cuando se tiene evaluación y/o presentación de trabajos, siendo retenido en el ingreso al colegio

Art. 42.- (Sanciones a las faltas graves del estudiante). 
a). - Compromiso con los padres de familia del infractor y la Dirección de manera escrita, compromiso del estudiante de no reincidir en la falta, si existiera algún daño previa reparación del daño ocasionado.
b). - En caso de causar daño a la infraestructura, equipo o material de la U.E.
el padre de familia o el estudiante debe hacer la reparación correspondiente. 
c). - En caso de llegar tarde perderá el examen, exposición o entrega de trabajo.
Art. 43.- (Faltas muy graves del estudiante). -
Son faltas muy graves las que afectan la integridad moral, psicológica y/o física, de los estudiantes que incurran en ella, de otro miembro de la comunidad o de personas ajenas a la misma, tales como: 
a). - Reincidencia en faltas graves.
b). - Estado de ebriedad al interior del establecimiento. 
c). - Robos o hurtos al interior del establecimiento.
d). - Agresión física a otros miembros de la Comunidad Educativa. 
E). - Pertenecer o formar pandillas delictivas.
f). - Compraventa y/o consumo de bebidas alcohólicas, cigarrillos, estupefacientes y sustancias controladas en el interior del establecimiento.
g). - Tenencia de armas.
Las faltas muy graves deberán derivar a la máxima autoridad de la Unidad
Educativa y la comisión disciplinaria.
Art. 44.- (Sanción a las faltas muy graves del estudiante). -
Las sanciones a estas faltas son:
1.- Cambio de Unidad educativa a otra, conforme a norma en periodo transferencias.
2.- La expulsión del o la estudiante previo proceso.
Art. 45.- (Casos de remisión a autoridades competentes). -
En casos de atentados contra la vida o la salud, tenencia, consumo o distribución de sustancias controladas deberá denunciar a instancias llamadas por ley. (FELCN, FELCC, Etc.)

`,
  temperature: 0.7,
  top_p: 1,
  frequency_penalty: 0.2,
  presence_penalty: 0.2,
});

export async function runAgent(userMessage, { guardianId }) {
  if (!userMessage) throw new Error("No se recibió el mensaje del usuario.");

  const tutor = await GuardianModel.findById(guardianId);
  if (!tutor) return "No se encontró al tutor."; //

  const vinculaciones = await VinculacionGuardianModel.find({
    guardianId,
    isApproved: true,
  });
  if (!vinculaciones.length) {
    return "No se encontraron estudiantes vinculados al tutor.";
  }

  const estudiantesConDatos = await Promise.all(
    vinculaciones.map(async (v) => {
      const student = await StudentModel.findById(v.studentId);
      if (!student) return null;
      const observaciones = await ObservacionesModel.find({
        studentId: student._id,
      });
      const observacionesConProfesor = await Promise.all(
        observaciones.map(async (obs) => {
          const profe = await ProfesorModel.findById(obs.studentProfessorId);
          return { ...obs.toObject(), profesorData: profe };
        })
      );

      const asesor = await AsesorModel.findOne({
        asesorClassEnrolled: student.classEnrolled,
        asesorSectionEnrolled: student.sectionAssigned,
      });

      return {
        student,
        observaciones: observacionesConProfesor.filter(Boolean),
        asesor,
      };
    })
  );

  const resumen = estudiantesConDatos
    .filter(Boolean)
    .map(({ student, observaciones, asesor }) => {
      const nombre = `${student.studentFirstName} ${student.studentMiddleLastName}`;
      const curso = `${
        student.classEnrolled || "Curso desconocido"
      } - Sección ${student.sectionAssigned || "-"}`;
      const asesorInfo = asesor
        ? `👨‍🏫 *Asesor vinculado:* ${asesor.asesorFullName} (${
            asesor.asesorEmail || "sin email"
          })`
        : "❌ No se encontró asesor para este curso.";

      const lista = observaciones
        .map((obs) => {
          const materia = obs.materia || "Materia no especificada";
          const tipo = obs.tipoObservacion || "Sin tipo";
          const comentario = obs.comentarios || "Sin comentarios";
          const reunion = obs.linkDeReunion
            ? `🔗 [Agendar reunión](${obs.linkDeReunion})`
            : "";
          const profe = obs.profesorData;
          const nombreProfe =
            profe?.profesorfullName || "Docente no registrado";
          const contactoProfe = profe
            ? `📧 ${profe.profesorEmail || "-"} | 📱 ${
                profe.profesorwhatsappPhone || "-"
              }`
            : "";
          return `• [${materia}] ${tipo} - ${comentario}\n👩‍🏫 ${nombreProfe}\n${contactoProfe}\n${reunion}`;
        })
        .join("\n\n");

      return `📚 *${nombre}* (${curso})\n${asesorInfo}\n${
        lista || "✅ Sin observaciones registradas."
      }`;
    })
    .join("\n\n");

  const mensajeConContexto = `
🧑 Tutor: ${tutor.guardianName || tutor.guardianEmail}
📍 Ciudad: ${tutor.addressCity || "-"}, ${tutor.addressState || "-"}
📞 Teléfono: ${tutor.guardianPhone || "-"}
📲 WhatsApp: ${tutor.guardianWhatsApp || "-"}
🪪 Cédula: ${tutor.cedulaIdentidad || "-"}

Resumen académico de sus hijos:
${resumen}

🗣️ Consulta del tutor:
${userMessage}
`;

  try {
    const result = await run(assistantAgent, mensajeConContexto);
    return result.finalOutput;
  } catch (error) {
    console.error("Error al ejecutar el agente:", error);
    throw new Error("El agente no pudo generar una respuesta.");
  }
}
