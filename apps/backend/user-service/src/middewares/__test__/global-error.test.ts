import { globalErrorHandler } from "@/src/middewares/global-error";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODE } from "ms-libs/constants/status-code";
import { InvalidInputError, NotFoundError } from "ms-libs/utils/errors";


describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("handles not found error correctly", () => {
    const mockError = new NotFoundError();

    globalErrorHandler(mockError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODE.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message, error: mockError.errors });
  });

  it("handles invalid input error correctly", () => {
    const mockError = new InvalidInputError({ errors: ["username is required"] });

    globalErrorHandler(mockError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODE.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message, error: mockError.errors });
  });

  it("handles unexpected error correctly", () => {
    const mockError = new Error("Something went wrong, try again later");

    globalErrorHandler(mockError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS_CODE.SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
  });

});