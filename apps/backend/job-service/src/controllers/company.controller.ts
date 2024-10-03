import { ICompany } from "@/src/database/models/company.model";
import companyService from "@/src/services/company.service";
import sendResponse from "@/src/utils/send-response";
import { APIResponse } from "@sokritha-sabaicode/ms-libs";
import {
  Controller,
  Delete,
  FormField,
  Get,
  Path,
  Post, 
  Put,
  Route,
  Tags,
  UploadedFile,
} from "tsoa";

@Route("/api/v1/companies")
@Tags("Company")
export class CompanyController extends Controller {
  @Post("/")
  public async createCompany(
    @UploadedFile() profile: Express.Multer.File,
    @FormField() name: string,
    @FormField() location: string,
    @FormField() bio: string,
    @FormField() email: string,
    @FormField() phone_number: string,
    @FormField() job_openings: number,
    @FormField() job_closings: number
  ): Promise<APIResponse<ICompany>> {
    try {
      const newCompany = await companyService.createCompany(
        {
          name,
          location,
          bio, 
          email,
          phone_number,
          job_openings,
          job_closings,
        },
        profile
      );

      this.setStatus(201); // set return status 201
      return sendResponse<ICompany>({
        message: "Company was created successfully!",
        data: newCompany,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get("/")
  public async getAllCompany(): Promise<{
    message: string;
    data: ICompany[];
  }> {
    try {
      const result = await companyService.getAllCompany();
      return sendResponse<ICompany[]>({ message: "success", data: result });
    } catch (error) {
      throw error;
    }
  }

  @Get("{companyId}")
  public async findCompanyById(
    @Path() companyId: string
  ): Promise<APIResponse<ICompany>> {
    try {
      const result = await companyService.findCompanyById(companyId);

      return sendResponse<ICompany>({
        message: "find company by id successfully!",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Put("{companyId}")
  public async updateCompanyById(
    @Path() companyId: string,
    @UploadedFile() profile: Express.Multer.File,
    @FormField() name: string,
    @FormField() location: string,
    @FormField() bio: string,
    @FormField() email: string,
    @FormField() phone_number: string,
    @FormField() job_openings: number,
    @FormField() job_closings: number
  ): Promise<APIResponse<ICompany>> {
    try {
      const updateData: ICompany = {
        _id: companyId,
        name,
        location,
        bio,
        email,
        phone_number,
        job_openings,
        job_closings,
      };
      const result = await companyService.updateCompanyById(
        updateData,
        profile
      );
      return sendResponse<ICompany>({
        message: "Update successful",
        data: result,
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete("{companyId}")
  public async deleteCompanyById(
    @Path() companyId: string
  ): Promise<{ message: string }> {
    try {
      await companyService.deleteCompanyById(companyId);
      return { message: "Company was deleted!" };
    } catch (error) {
      throw error;
    }
  }
}
