import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  studentFirstName: {
    type: String,
    required: true,
  },
  studentMiddleLastName: {
    type: String,
    required: true,
  },
  studentDateOfBirth: {
    type: Date,
    required: true,
  },
  studentSex: {
    type: String,
    enum: ["Masculino", "Femenino", "Otro"],
    required: true,
  },
  studentEmail: {
    type: String,
  },

  fatherFullName: {
    type: String,
  },
  motherFullName: {
    type: String,
  },

  addressStreet: {
    type: String,
  },
  addressCity: {
    type: String,
  },
  addressState: {
    type: String,
  },

  dateOfAdmission: {
    type: Date,
  },
  classEnrolled: {
    type: String,
  },
  sectionAssigned: {
    type: String,
  },

  // ID de referencia al tutor (si usas una colección Guardian)
  guardianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guardian",
  },

  guardianFullName: {
    type: String,
  },

  guardianEmail: {
    type: String,
  },
  guardianPhone: {
    type: String,
  },
  guardianWhatsApp: {
    type: String,
  },

  previousSchoolName: {
    type: String,
  },
  previousSchoolAddress: {
    type: String,
  },

  observationsCount: {
    type: Number,
    default: 0,
  }, // solo contador, no los datos

  faltasId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Observaciones",
    default: [],
  },
});

const StudentModel =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default StudentModel;
