import mongoose, { model, Schema } from "mongoose";

export enum EmploymentType {
  CONTRACT = "Contract",
  INTERNSHIP = "Internship"
}

export enum EmploymentSchedule {
  FULL_TIME = "Full-Time",
  PART_TIME = "Part-Time",
  FLEXIBLE_HOURS = "Flexible-Hours",
  PROJECT_BASED = "Project-Based"
}

export enum WorkMode {
  REMOTE = "Remote",
  ON_SITE = "On-Site",
  HYBRID = "Hybrid",
}

export interface IJob {
  _id?: string;
  companyId?: string;
  title?: string; // name of the job that company looking for. Example: Java Developer
  position?: string[]; // tags that belong to the tile: Backend Development, Programming, etc.
  workMode?: WorkMode[]; 
  location?: string; // location could be phnom penh, kompong-cham, etc.
  requirement?: string;
  address?: string; // address could be the link address of the company (google link)
  description?: string;
  min_salary?: number;
  max_salary?: number;
  deadline?: Date;
  job_opening?: number;
  type?: EmploymentType[];
  schedule?: EmploymentSchedule[];
  required_experience?: string[];
  benefit?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const JobSchema: Schema = new Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company' },
    title: { type: String, required: true },
    position: { type: [String], required: true },
    workMode: { type: [String], required: true, enum: Object.values(WorkMode) },
    requirement: { type: String, required: true },
    location: { type: String, required: true },
    job_opening: { type: Number, required: true },
    max_salary: {
      type: Number,
      required: true,
      min: [0, "Max salary must be a positive number."],
    },
    min_salary: {
      type: Number,
      required: true,
      min: [0, "Min salary must be a positive number."],
      validate: {
        validator: function (this: IJob, value: number) {
          return value <= this.max_salary!;
        },
        message: "Min salary must be less than or equal to max salary.",
      },
    },
    description: { type: String, required: true },
    address: { type: String, required: true },
    type: {
      type: [String],
      enum: Object.values(EmploymentType),
      required: true,
    },
    schedule: { type: [String], required: true, enum: Object.values(EmploymentSchedule) },
    required_experience: { type: [String], required: true },
    benefit: { type: [String], required: true },
    deadline: { type: Date, required: true },
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