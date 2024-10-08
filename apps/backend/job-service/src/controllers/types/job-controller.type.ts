// ========================
// Job Interface

import { EmploymentSchedule, EmploymentType, WorkMode } from "@/src/database/models/job.model";

// ========================
export interface JobParams {
  companyId?: string;
  title?: string;
  position?: string[];
  workMode?: WorkMode[];
  location?: string;
  requirement?: string;
  description?: string;
  address?: string;
  min_salary?: number;
  max_salary?: number;
  job_opening?: number;
  type?: EmploymentType[];
  schedule?: EmploymentSchedule[];
  required_experience?: string[];
  benefit?: string[];
  deadline?: Date;
}

export interface JobsFilterParams {
  min_salary?: number;
  max_salary?: number;
  type?: string[];
  location?: string;
  schedule?: string[];
  required_experience?: string[];
}

export interface JobSortParams {
  title?: "asc" | "desc";
  createdAt?: "asc" | "desc";
}

export interface JobGetAllControllerParams {
  page?: number;
  limit?: number;
  filter?: string;
  sort?: string;
  search?: string;
}

export interface JobGetAllRepoParams {
  page?: number;
  limit?: number;
  filter?: JobsFilterParams;
  sort?: JobSortParams;
  search?: string;
}
