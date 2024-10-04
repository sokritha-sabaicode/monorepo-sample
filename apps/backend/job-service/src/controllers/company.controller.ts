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
  SuccessResponse,
  Tags,
  UploadedFile,
  Response,
  Example,
} from "tsoa";

@Route("/v1/companies")
@Tags("Company")
export class CompanyController extends Controller {

  /**
  * Creates a new company with the provided details and profile image.
  * 
  * @param profile The profile image file for the company.
  * @param name The name of the company.
  * @param location The location of the company.
  * @param bio A short biography of the company.
  * @param email The contact email of the company.
  * @param phone_number The contact phone number of the company.
  * @param job_openings The number of job openings.
  * @param job_closings The number of job closings.
  *    
   * 
   * @response 201 {
   *  "message": "Company was created successfully!",
   *  "data": {
   *    "_id": "64a7f1e2d6f4c12a3456abcd",
   *    "name": "Tech Innovators Inc.",
   *    "location": "San Francisco, CA",
   *    "bio": "A leading company in tech innovations.",
   *    "profile": "https://your-bucket-name.s3.amazonaws.com/profiles/unique-id.jpg",
   *    "email": "contact@techinnovators.com",
   *    "phone_number": "+1-555-1234",
   *    "job_openings": 10,
   *    "job_closings": 2,
   *    "createdAt": "2023-10-03T12:34:56.789Z",
   *    "updatedAt": "2023-10-03T12:34:56.789Z"
   *  }
   * }
   * 
   * @response 400 {
   *  "message": "Validation Failed",
   *  "errors": [...]
   * }
   * 
   * @response 500 {
   *  "message": "Internal Server Error",
   *  "error": "Error message"
   * }
  */
  @Example({
    message: "Company was created successfully!",
    data: {
      _id: "64a7f1e2d6f4c12a3456abcd",
      name: "Tech Innovators Inc.",
      location: "San Francisco, CA",
      bio: "A leading company in tech innovations.",
      profile: "https://your-bucket-name.s3.amazonaws.com/profiles/unique-id.jpg",
      email: "contact@techinnovators.com",
      phone_number: "+1-555-1234",
      job_openings: 10,
      job_closings: 2,
      createdAt: "2023-10-03T12:34:56.789Z",
      updatedAt: "2023-10-03T12:34:56.789Z"
    }
  })
  @Post("/")
  @SuccessResponse(201, "Created")
  @Response<{ message: string, error?: {} }>(409, "Resource Conflict Error", {
    message: 'This resource is already exists!'
  })
  @Response<{ message: string }>("500", "Internal Server Error", {
    message: 'Something went wrong!'
  })
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
