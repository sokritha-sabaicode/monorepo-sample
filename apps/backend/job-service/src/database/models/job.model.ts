import mongoose, { model, Schema } from "mongoose";

export interface IJob {
  _id?: string;
  companyId?: string;
  title?: string;
  position?: string;
  category?: string;
  location?: string;
  requirement?: string;
  address?: string;
  description?: string;
  min_salary?: number;
  max_salary?: number;
  deadline?: Date;
  job_opening?: number;
  type?: string[];
  schedule?: string[];
  required_experience?: string[];
  benefit?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema: Schema = new Schema(
  {
    companyId: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'Company'},
    title: {type: String, required: true},
    position: { type: String, required: true},
    category:{type: String, required: true},
    requirement: {type: String, required: true},
    location: {type: String, required: true},
    job_opening: {type: Number, required: true},
    max_salary: { type: Number, required: true},
    min_salary: { type: Number, required: true},
    description: {type: String, required: true},
    address: {type: String, required: true},
    type: {type: [String], required: true},
    schedule: {type: [String], required: true},
    required_experience: {type: [String], required: true},
    benefit: {type: [String], required: true},
    deadline: {type: Date, required: true},
  },
  {
    timestamps: true,
    toObject: {
      transform: function (_doc, ret) {
        delete ret.__v;
        ret._id = ret._id.toString();
      },
    },
  }
)

export const JobModel = model<IJob>("Job", JobSchema);