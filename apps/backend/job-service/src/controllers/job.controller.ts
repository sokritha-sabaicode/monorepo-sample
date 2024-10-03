import { JobGetAllControllerParams, JobParams } from "@/src/controllers/types/job-controller.type";
import { IJob } from "@/src/database/models/job.model";
import jobService from "@/src/services/job.service";
import sendResponse from "@/src/utils/send-response";
import { APIResponse, PaginationResponse, prettyObject } from "@sokritha-sabaicode/ms-libs";
import {
  Controller,
  Route,
  Post,
  Tags,
  Path,
  Get,
  Body,
  Put,
  Delete,
  Queries,
  SuccessResponse,
} from "tsoa";

@Route("/api/v1/jobs")
@Tags("Job")
export class JobController extends Controller {
  @SuccessResponse("201", "Created")
  @Post("/")
  public async createJob(
    @Body() req: JobParams
  ): Promise<APIResponse<IJob>> {
    try {
      const jobs = await jobService.createNewJob(req);
      this.setStatus(201); // set return status 201
      return sendResponse<IJob>({ message: "success", data: jobs });
    } catch (error) {
      throw error;
    }
  }

  @Get("")
  public async getAllJobs(
    @Queries() queries: JobGetAllControllerParams
  ): Promise<PaginationResponse<IJob>> {
    try {
      const response = await jobService.getAllJobs(queries);

      return sendResponse<PaginationResponse<IJob>>({ message: "success", data: response });
    } catch (error) {
      throw error;
    }
  }

  @Get("{jobId}")
  public async getJobById(@Path() jobId: string) {
    try {
      const getJob = await jobService.getJobById(jobId);

      return sendResponse<IJob>({ message: "success", data: getJob });
    } catch (error) {
      throw error;
    }
  }

  @Put("{jobId}")
  public async updateJobById(
    @Path() jobId: string,
    @Body() updateDatJob: JobParams
  ) {
    try {
      const updateJob = await jobService.updateJobById(jobId, updateDatJob);
      return sendResponse<IJob>({ message: "success", data: updateJob });
    } catch (error) {
      console.error(
        `jobController updateJobById() method error: `,
        prettyObject(error as {})
      );
    }
  }

  @Delete("{jobId}")
  public async deleteJobById(
    @Path() jobId: string
  ): Promise<{ message: string }> {
    try {
      await jobService.deleteJobById(jobId);
      return { message: "Job was deleted successfully" };
    } catch (error) {
      console.error(
        `CompanyController deleteJobById() method error: `,
        prettyObject(error as {})
      );
      throw error;
    }
  }
}

export default new JobController();
