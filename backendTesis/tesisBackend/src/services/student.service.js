import * as XLSX from "xlsx";
import StudentModel from "../models/student.model.js";

export const createStudent = async (data) => {
  try {
    const student = new StudentModel(data);
    return await student.save();
  } catch (error) {
    throw new Error("Error al crear estudiante: " + error.message);
  }
};

export const getAllStudents = async () => {
  try {
    return await StudentModel.find();
  } catch (error) {
    throw new Error("Error al obtener estudiantes: " + error.message);
  }
};

export const getStudentById = async (id) => {
  try {
    return await StudentModel.findById(id).populate("faltasId").exec();
  } catch (error) {
    throw new Error("Error al buscar estudiante por ID: " + error.message);
  }
};

export const updateStudent = async (id, updates) => {
  try {
    return await StudentModel.findByIdAndUpdate(id, updates, { new: true });
  } catch (error) {
    throw new Error("Error al actualizar estudiante: " + error.message);
  }
};

export const deleteStudent = async (id) => {
  try {
    return await StudentModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error al eliminar estudiante: " + error.message);
  }
};

export const importarEstudiantesDesdeExcel = async (bufferExcel) => {
  const workbook = XLSX.read(bufferExcel, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  const estudiantes = rows.map((row) => ({
    studentFirstName: row["Nombre"],
    studentMiddleLastName: row["Apellido"],
    studentDateOfBirth: new Date(row["Nacimiento"]),
    studentSex: row["Sexo"],
    studentEmail: row["Email"],
    fatherFullName: row["Padre"],
    motherFullName: row["Madre"],
    addressStreet: row["Calle"],
    addressCity: row["Ciudad"],
    addressState: row["Departamento"],
    dateOfAdmission: new Date(row["Ingreso"]),
    classEnrolled: row["Curso"],
    sectionAssigned: row["Paralelo"],
    guardianFullName: row["Tutor"],
    guardianEmail: row["Email Tutor"],
    guardianPhone: row["Teléfono Tutor"],
    guardianWhatsApp: row["WhatsApp Tutor"],
    previousSchoolName: row["Escuela Anterior"],
    previousSchoolAddress: row["Dirección Escuela"],
  }));

  const resultado = await StudentModel.insertMany(estudiantes);
  return resultado;
};
