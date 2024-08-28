import { APP_ERROR_MESSAGE, ApplicationError, HTTP_STATUS_CODE, prettyObject } from "@sokritha-sabaicode/ms-libs";
import { NextFunction, Request, Response } from "express";

export function globalErrorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Handle Error
  if (error instanceof ApplicationError) {
    const status = error.status;
    const message = error.message;
    const errors = error.errors;

    console.error(`$UserService - globalErrorHandler() method error: `, prettyObject(error))
    return res.status(status).json({ message, error: errors })
  }

  // Unhandle Error
  console.error(`$UserService - globalErrorHandler() method unexpected error: `, prettyObject(error as {}))
  res.status(HTTP_STATUS_CODE.SERVER_ERROR).json({ message: APP_ERROR_MESSAGE.serverError })
}