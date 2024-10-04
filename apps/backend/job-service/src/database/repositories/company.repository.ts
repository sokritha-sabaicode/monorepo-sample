
import { CompanyParams } from "@/src/controllers/types/company-controller.type";
import { CompanyModel, ICompany } from "@/src/database/models/company.model";
import { NotFoundError, prettyObject, ResourceConflictError, InvalidInputError } from "@sokritha-sabaicode/ms-libs";
import mongoose from "mongoose";

interface MongoError extends Error {
  code?: number;
  keyPattern?: { [key: string]: number };
}

class CompanyRepository {
  public async createCompany(data: CompanyParams): Promise<CompanyParams> {
    try {
      const newCompany = await CompanyModel.create(data);
      if (!newCompany) {
        throw new NotFoundError("Company not found!");
      }
      return newCompany;
    } catch (error) {
      console.error(
        `CompanyRepository createNewCompany() method error:`,
        prettyObject(error as {})
      );

      // Duplicate Email
      if ((error as MongoError).code === 11000) {
        throw new ResourceConflictError();
      }

      // Validation Error
      if (error instanceof mongoose.Error.ValidationError) {
        const validationErrors: { [key: string]: string } = {};

        // Iterate over the errors object and collect messages
        for (const key in error.errors) {
          // Here, error.errors[key] can give you each specific validation error
          validationErrors[key] = error.errors[key].message;
        }

        throw new InvalidInputError({
          errors: validationErrors, // Now passing the structured errors
        });
      }

      throw error;
    }
  }

  public async getAllCompany(): Promise<ICompany[]> {
    try {
      const result = await CompanyModel.find();
      if (!result) {
        throw new NotFoundError("Company not found!");
      }
      return result;
    } catch (error) {
      console.error(
        `CompanyRepository getAllCompany() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async findCompanyById(companyId: string): Promise<ICompany> {
    try {
      const result = await CompanyModel.findById(companyId);
      if (!result) {
        throw new NotFoundError();
      }

      return result;
    } catch (error) {
      console.error(
        `CompanyRepository getCompanyById() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async updateCompanyById(
    updateInfo: ICompany
  ): Promise<ICompany> {
    try {
      const { _id, ...newUpdateInfo } = updateInfo;
      const result = await CompanyModel.findByIdAndUpdate(_id, newUpdateInfo, {
        new: true,
      });

      if (!result) {
        throw new NotFoundError();
      }

      return result;
    } catch (error) {
      console.error(
        `CompanyRepository UpdateCompanyById() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }

  public async deleteCompanyById(companyId: string) {
    try {
      const result = await CompanyModel.findByIdAndDelete(companyId);

      if (!result) {
        throw new NotFoundError();
      }
    } catch (error) {
      console.error(
        `CompanyRepository deleteCompanyById() method error:`,
        prettyObject(error as {})
      );
      throw error;
    }
  }
}

export default new CompanyRepository();
