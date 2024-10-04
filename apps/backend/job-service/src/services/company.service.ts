import { CompanyParams } from "@/src/controllers/types/company-controller.type";
import { ICompany } from "@/src/database/models/company.model";
import companyRepository from "@/src/database/repositories/company.repository";
import { deleteFile, uploadFile } from "@/src/utils/s3";
import { NotFoundError } from "@sokritha-sabaicode/ms-libs";

class CompanyService {
  public async createCompany(
    data: CompanyParams,
    profile: Express.Multer.File
  ): Promise<ICompany> {
    try {
      const imageUrl = await uploadFile(profile, 'company-profile');
      const newCompany = await companyRepository.createCompany({
        ...data,
        profile: imageUrl,
      });

      if (!newCompany) {
        throw new NotFoundError();
      }

      return newCompany;
    } catch (error) {
      console.error(
        `CompanyService createNewCompany() method error:`, error
      );
      throw error;
    }
  }

  public async getAllCompany(): Promise<ICompany[]> {
    try {
      const result = await companyRepository.getAllCompany();
      if (!result) {
        throw new NotFoundError();
      }
      return result;
    } catch (error) {
      console.error(
        `CompanyService getAllCompany() method error:`, error
      );
      throw error;
    }
  }

  public async findCompanyById(companyId: string): Promise<ICompany> {
    try {
      const result = await companyRepository.findCompanyById(companyId);

      if (!result) {
        throw new NotFoundError();
      }
      return result;
    } catch (error) {
      console.error(
        `CompanyService findCompanyById() method error:`, error
      );
      throw error;
    }
  }

  public async updateCompanyById(
    updateInfo: ICompany,
    profile: Express.Multer.File
  ): Promise<ICompany> {
    try {
      // Get existing company data to check for the old profile URL
      const existingCompany = await companyRepository.findCompanyById(
        updateInfo._id as string
      );

      if (!existingCompany) {
        throw new NotFoundError("Company not found");
      }

      // If the company has an existing profile image, delete it from S3
      if (existingCompany.profile) {
        await deleteFile(existingCompany.profile);
      }

      // Upload the new profile image
      const updateImageUrl = await uploadFile(profile);

      // Update the company with the new data and profile image URL
      const result = await companyRepository.updateCompanyById({
        ...updateInfo,
        profile: updateImageUrl,
      });

      return result;
    } catch (error) {
      console.error(
        `CompanyService updateCompanyById() method error:`, error
      );
      throw error;
    }
  }

  public async deleteCompanyById(companyId: string) {
    try {
      // Retrieve the company to get the profile image URL
      const company = await companyRepository.findCompanyById(companyId);

      if (!company) {
        throw new NotFoundError("Company not found");
      }

      // If the company has a profile image, delete it from S3
      if (company.profile) {
        await deleteFile(company.profile);
      }
      // Delete the company from the database
      await companyRepository.deleteCompanyById(companyId);
    } catch (error) {
      console.error(
        `CompanyService deleteCompanyById() method error:`, error
      );
      throw error;
    }
  }
}

export default new CompanyService();
