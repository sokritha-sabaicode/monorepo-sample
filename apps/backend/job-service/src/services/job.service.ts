import { JobGetAllControllerParams, JobParams } from "@/src/controllers/types/job-controller.type";
import { IJob } from "@/src/database/models/job.model";
import jobRepository from "@/src/database/repositiries/job.repository";
import { prettyObject } from "@sokritha-sabaicode/ms-libs";


class JobService {
  public async createNewJob(newInfo: JobParams): Promise<IJob> {
    try {
      const jobs = await jobRepository.createNewJob(newInfo);
      return jobs;
    } catch (error) {
      console.error(
        `JobService createNewJob() method error: `,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async getAllJobs(queries: JobGetAllControllerParams) {
    try {
      const { page, limit, filter, sort, search, category } = queries;

      const newQueries = {
        page,
        limit,
        filter: filter && JSON.parse(filter),
        sort: sort && JSON.parse(sort),
        search,
        category
      };
      const result = await jobRepository.getAllJobs(newQueries);

      return result;
    } catch (error) {
      console.error(
        `JobService getAllJobs() method error: `,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async getJobById(jobId: string): Promise<IJob> {
    try {
      const result = await jobRepository.findJobById(jobId);

      return result;
    } catch (error) {
      console.error(
        `jobService - getJobById() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async updateJobById(
    jobId: string,
    updateJob: JobParams
  ): Promise<IJob> {
    try {
      const newJob = await jobRepository.updateJobById({
        _id: jobId,
        ...updateJob,
      });

      return newJob;
    } catch (error) {
      console.error(
        `jobService - updateJobById() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async deleteJobById(jobId: string) {
    try {
      await jobRepository.deleteJobById(jobId);
    } catch (error) {
      console.error(
        `JobService - deleteJobById() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }
}

export default new JobService();
