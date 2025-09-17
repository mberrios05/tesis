import mongoose from "mongoose";

const ObservacionesSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    studentProfessorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profesor",
      required: true,
    },
    tipoObservacion: {
      type: String,
    },
    materia: {
      type: String,
    },
    comentarios: {
      type: String,
    },
    isViewedForFather: {
      type: Boolean,
      default: false,
    },
    linkDeReunion: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ObservacionesModel = mongoose.model("Observaciones", ObservacionesSchema);
export default ObservacionesModel;
