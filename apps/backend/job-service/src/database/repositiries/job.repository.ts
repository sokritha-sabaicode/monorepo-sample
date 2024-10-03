import {  JobGetAllRepoParams, JobParams, JobSortParams } from "@/src/controllers/types/job-controller.type";
import { CompanyModel } from "@/src/database/models/company.model";
import { IJob, JobModel } from "@/src/database/models/job.model";
import { NotFoundError, prettyObject } from "@sokritha-sabaicode/ms-libs";
import { SortOrder } from "mongoose";


class JobRepository {
  public async createNewJob(newInfo: JobParams): Promise<IJob> {
    try {
      const nweJob = await JobModel.create(newInfo);

      if (!nweJob) {
        throw new NotFoundError();
      }

      return nweJob;
    } catch (error) {
      console.error(
        `JobRepository createNewJob() method error: `,
        prettyObject(error as {})
      );

      throw error;
    }
  }

  public async getAllJobs(queries: JobGetAllRepoParams) {
    const {
      page = 1,
      limit = 10,
      filter = {},
      sort = { createdAt: "desc", title: "desc" },
      search = "",
      category = "",
    } = queries;

    // Define a list of properties that should always be treated as arrays
    const arrayProperties = [
      "type",
      "schedule",
      "required_experience",
      "location",
    ];

    // Convert sort from {'field': 'desc'} to {'field': -1}
    const sortFields = Object.keys(sort).reduce(
      (acc, key) => {
        const direction = sort[key as keyof JobSortParams];
        if (direction === "asc" || direction === "desc") {
          acc[key as keyof JobSortParams] = direction === "asc" ? 1 : -1;
        } else if (direction === 1 || direction === -1) {
          acc[key as keyof JobSortParams] = direction; // Directly use 1 or -1
        }
        return acc;
      },
      {} as Record<keyof JobSortParams, SortOrder>
    );

    // Build MongoDB filter object
    const buildFilter = (filter: Record<string, any>) => {
      const mongoFilter: Record<string, any> = {};
      for (const key in filter) {
        // Handle range filtering for salaries
        if (key === "salary" && typeof filter[key] === "object") {
          // Handle the salary filtering for min_salary and max_salary
          if (filter[key].min_salary !== undefined) {
            mongoFilter.min_salary = { $gte: filter[key].min_salary };
          }
          if (filter[key].max_salary !== undefined) {
            mongoFilter.max_salary = { $lte: filter[key].max_salary };
          }
        } else if (
          typeof filter[key] === "object" &&
          !Array.isArray(filter[key])
        ) {
          if (
            filter[key].hasOwnProperty("min") ||
            filter[key].hasOwnProperty("max")
          ) {
            mongoFilter[key] = {};
            if (filter[key].min !== undefined) {
              mongoFilter[key].$gte = filter[key].min;
            }
            if (filter[key].max !== undefined) {
              mongoFilter[key].$lte = filter[key].max;
            }
          } else {
            mongoFilter[key] = filter[key];
          }
        } else if (arrayProperties.includes(key)) {
          const trimmedArray = Array.isArray(filter[key])
            ? filter[key].map((val: string) => val.trim())
            : [filter[key].trim()];
          mongoFilter[key] = { $in: trimmedArray };
          // mongoFilter[key] = { $regex: `.*${filter[key]}.*`, $options: "i" };
        } else {
          mongoFilter[key] = filter[key];
        }
      }

      // Handle category filter using $in
      if (category) {
        const categoriesArray = category.split(",").map((cat) => cat.trim());
        mongoFilter.category = { $in: categoriesArray };
      }

      return mongoFilter;
    };

    // Adding search functionality
    const searchFilter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { position: { $regex: search, $options: "i" } },
            { "companyId.name": { $regex: search, $options: "i" } },
          ],
        }
      : {};

    try {
      const mongoFilter = {
        ...buildFilter(filter),
        ...searchFilter,
      };
      const operation = JobModel.find(mongoFilter)
        .sort(sortFields)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate({
          path: "companyId",
          model: CompanyModel,
          select:
            "name location bio profile email phone_number job_openings job_closings",
        });

      const result = await operation;
      const totalItems = await JobModel.countDocuments(mongoFilter);

      return {
        [JobModel.collection.collectionName]: result,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      };
    } catch (error) {
      console.error(
        `JobRepository - getAllJobs() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async findJobById(jobId: string) {
    try {
      const result = await JobModel.findById(jobId).populate({
        path: "companyId",
        model: CompanyModel,
        select:
          "name location bio profile email phone_number job_openings job_closings",
      });

      if (!result) {
        throw new NotFoundError("The requested job was not found.");
      }

      return result;
    } catch (error) {
      console.error(
        `JobRepository - findJobById() method error: `,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async updateJobById(updateJob: IJob): Promise<IJob> {
    try {
      const { _id, ...updateNewJob } = updateJob;
      const result = await JobModel.findByIdAndUpdate(_id, updateNewJob, {
        new: true,
      });
      if (!result) {
        throw new NotFoundError("The requested job was not found.");
      }

      return result;
    } catch (error) {
      console.error(
        `JobRepository - updateJobById() method error: `,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async deleteJobById(jobId: string) {
    try {
      const result = await JobModel.findByIdAndDelete(jobId);

      if (!result) {
        throw new NotFoundError("Job was not found!");
      }

      return !!result;
    } catch (error) {
      console.error(
        `JobRepository - deleteJobById() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }
}

export default new JobRepository();
