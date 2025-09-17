import StudentModel from "../models/Student.model.js";
import PDFDocument from "pdfkit";

import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  importarEstudiantesDesdeExcel,
} from "../services/student.service.js";

import {
  HTTPS_MESSAGES_STUDENT,
  HTTPS_STATUS,
} from "../utils/consts/httpConstants.js";

const createStudentController = async (req, res) => {
  try {
    const data = req.body;

    const newStudent = await createStudent(data);
    return res.status(HTTPS_STATUS.CREATED).json({
      message: HTTPS_MESSAGES_STUDENT.CREATED_SUCCESS,
      data: newStudent,
    });
  } catch (error) {
    console.error("Error en createStudentController:", error.message);
    return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTPS_MESSAGES_STUDENT.MESSAGE_ERROR,
      error: error.message,
    });
  }
};

const getAllStudentsController = async (_, res) => {
  try {
    const students = await getAllStudents();
    return res.status(HTTPS_STATUS.OK).json(students);
  } catch (error) {
    console.error("Error en getAllStudentsController:", error.message);
    return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTPS_MESSAGES_STUDENT.MESSAGE_ERROR,
      error: error.message,
    });
  }
};

const getStudentByIdController = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) {
      return res.status(HTTPS_STATUS.NOT_FOUND).json({
        message: HTTPS_MESSAGES_STUDENT.NOT_FOUND,
      });
    }

    return res.status(HTTPS_STATUS.OK).json(student);
  } catch (error) {
    console.error("Error en getStudentByIdController:", error.message);
    return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTPS_MESSAGES_STUDENT.MESSAGE_ERROR,
      error: error.message,
    });
  }
};

const importarEstudiantesController = async (req, res) => {
  try {
    const resultado = await importarEstudiantesDesdeExcel(req.file.buffer);
    res.status(200).json({
      message: "Estudiantes importados correctamente.",
      cantidad: resultado.length,
    });
  } catch (error) {
    console.error("Error al importar:", error);
    res.status(500).json({
      message: "Error al importar estudiantes",
      error: error.message,
    });
  }
};

const updateStudentController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updated = await updateStudent(id, data);
    return res.status(HTTPS_STATUS.OK).json({
      message: HTTPS_MESSAGES_STUDENT.UPDATED_SUCCESS,
      data: updated,
    });
  } catch (error) {
    console.error("Error en updateStudentController:", error.message);
    return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTPS_MESSAGES_STUDENT.MESSAGE_ERROR,
      error: error.message,
    });
  }
};

const deleteStudentController = async (req, res) => {
  try {
    const id = req.params.id;

    await deleteStudent(id);
    return res.status(HTTPS_STATUS.OK).json({
      message: HTTPS_MESSAGES_STUDENT.DELETED_SUCCESS,
    });
  } catch (error) {
    console.error("Error en deleteStudentController:", error.message);
    return res.status(HTTPS_STATUS.INTERNAL_SERVER_ERROR).json({
      message: HTTPS_MESSAGES_STUDENT.MESSAGE_ERROR,
      error: error.message,
    });
  }
};

export const generarResumenEstudiante = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await StudentModel.findById(studentId).populate("faltasId");

    if (!student) {
      return res.status(404).json({ message: "Estudiante no encontrado" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader(
      "Content-disposition",
      `attachment; filename=resumen_estudiante_${student.studentFirstName.toLowerCase()}.pdf`
    );
    res.setHeader("Content-type", "application/pdf");

    doc.pipe(res);

    // Título general
    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .fillColor("black")
      .text("Resumen del Estudiante", { align: "center", underline: true })
      .moveDown(1.5);

    // Información General
    doc
      .fontSize(14)
      .fillColor("#1D4ED8")
      .text("Información General")
      .moveDown(0.5);
    doc.fontSize(11).fillColor("#333");
    doc.font("Helvetica-Bold").text("Nombre completo: ", { continued: true });
    doc
      .font("Helvetica")
      .text(`${student.studentFirstName} ${student.studentMiddleLastName}`);
    doc.font("Helvetica-Bold").text("Genero: ", { continued: true });
    doc.font("Helvetica").text(student.studentSex);
    doc
      .font("Helvetica-Bold")
      .text("Fecha de nacimiento: ", { continued: true });
    doc
      .font("Helvetica")
      .text(new Date(student.studentDateOfBirth).toLocaleDateString());
    doc.font("Helvetica-Bold").text("Clase: ", { continued: true });
    doc.font("Helvetica").text(student.classEnrolled);
    doc.font("Helvetica-Bold").text("Sección: ", { continued: true });
    doc.font("Helvetica").text(student.sectionAssigned);
    doc.font("Helvetica-Bold").text("Email: ", { continued: true });
    doc.font("Helvetica").text(student.studentEmail || "No disponible");
    doc.font("Helvetica-Bold").text("Fecha de admisión: ", { continued: true });
    doc
      .font("Helvetica")
      .text(new Date(student.dateOfAdmission).toLocaleDateString());
    doc.moveDown(1.5);

    // Dirección
    doc
      .fontSize(14)
      .fillColor("#1D4ED8")
      .text("Dirección del Estudiante")
      .moveDown(0.5);
    doc.fontSize(11).fillColor("#333");
    doc.font("Helvetica-Bold").text("Calle: ", { continued: true });
    doc.font("Helvetica").text(student.addressStreet || "-");
    doc.font("Helvetica-Bold").text("Ciudad: ", { continued: true });
    doc.font("Helvetica").text(student.addressCity || "-");
    doc.font("Helvetica-Bold").text("Departamento: ", { continued: true });
    doc.font("Helvetica").text(student.addressState || "-");
    doc.moveDown(1.5);

    // Familia
    doc
      .fontSize(14)
      .fillColor("#1D4ED8")
      .text("Información Familiar")
      .moveDown(0.5);
    doc.fontSize(11).fillColor("#333");
    doc.font("Helvetica-Bold").text("Nombre del padre: ", { continued: true });
    doc.font("Helvetica").text(student.fatherFullName || "-");
    doc
      .font("Helvetica-Bold")
      .text("Nombre de la madre: ", { continued: true });
    doc.font("Helvetica").text(student.motherFullName || "-");
    doc.font("Helvetica-Bold").text("Tutor legal: ", { continued: true });
    doc.font("Helvetica").text(student.guardianFullName || "-");
    doc.font("Helvetica-Bold").text("Email del tutor: ", { continued: true });
    doc.font("Helvetica").text(student.guardianEmail || "-");
    doc
      .font("Helvetica-Bold")
      .text("WhatsApp del tutor: ", { continued: true });
    doc.font("Helvetica").text(student.guardianWhatsApp || "-");
    doc.moveDown(1.5);

    // Escuela Anterior
    doc
      .fontSize(14)
      .fillColor("#1D4ED8")
      .text("Información de Escuela Anterior")
      .moveDown(0.5);
    doc.fontSize(11).fillColor("#333");
    doc
      .font("Helvetica-Bold")
      .text("Nombre de la escuela: ", { continued: true });
    doc.font("Helvetica").text(student.previousSchoolName || "-");
    doc
      .font("Helvetica-Bold")
      .text("Dirección de la escuela: ", { continued: true });
    doc.font("Helvetica").text(student.previousSchoolAddress || "-");
    doc.moveDown(1.5);

    // FALTAS
    const faltasVistas = student.faltasId.filter(
      (f) => f.isViewedForFather === true
    );
    const faltasNoVistas = student.faltasId.filter(
      (f) => f.isViewedForFather === false
    );

    // Faltas No Vistas
    doc
      .fontSize(14)
      .fillColor("#DC2626")
      .text("Faltas NO vistas por el tutor")
      .moveDown(0.5);
    doc.fontSize(11).fillColor("#333");

    if (faltasNoVistas.length === 0) {
      doc.font("Helvetica").text("✔️ No hay faltas pendientes de revisión.");
    } else {
      doc.font("Helvetica-Bold").text("Cantidad: ", { continued: true });
      doc
        .font("Helvetica")
        .text(faltasNoVistas.length.toString())
        .moveDown(0.5);

      faltasNoVistas.forEach((falta, i) => {
        doc
          .font("Helvetica-Bold")
          .text(`Falta ${i + 1}:`)
          .font("Helvetica")
          .text(`  Materia: ${falta.materia || "-"}`)
          .text(`  Motivo: ${falta.tipoObservacion || "-"}`)
          .text(`  Comentarios: ${falta.comentarios || "Sin comentarios"}`)
          .moveDown(0.5);
      });
    }

    doc.moveDown(1.5);

    // Faltas Vistas
    doc
      .fontSize(14)
      .fillColor("#16A34A")
      .text("Faltas ya vistas por el tutor")
      .moveDown(0.5);
    doc.fontSize(11).fillColor("#333");

    if (faltasVistas.length === 0) {
      doc.font("Helvetica").text("📭 No se han marcado faltas como vistas.");
    } else {
      doc.font("Helvetica-Bold").text("Cantidad: ", { continued: true });
      doc.font("Helvetica").text(faltasVistas.length.toString()).moveDown(0.5);

      faltasVistas.forEach((falta, i) => {
        doc
          .font("Helvetica-Bold")
          .text(`Falta ${i + 1}:`)
          .font("Helvetica")
          .text(`  Materia: ${falta.materia || "-"}`)
          .text(`  Motivo: ${falta.tipoObservacion || "-"}`)
          .text(`  Comentarios: ${falta.comentarios || "Sin comentarios"}`)
          .moveDown(0.5);
      });
    }

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: "Error generando PDF",
      error: error.message,
    });
  }
};

export default {
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
  generarResumenEstudiante,
  importarEstudiantesController,
};
