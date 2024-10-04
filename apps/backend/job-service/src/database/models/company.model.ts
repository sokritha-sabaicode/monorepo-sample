import { model, Schema } from "mongoose";

export interface ICompany {
  _id?: string;
  name?: string;
  location?: string;
  bio?: string;
  profile?: string;
  email?: string;
  phone_number?: string;
  job_openings?: number;
  job_closings?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    profile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    job_openings: { type: Number, required: true },
    job_closings: { type: Number, required: true },
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

export const CompanyModel = model<ICompany>("Company", CompanySchema);