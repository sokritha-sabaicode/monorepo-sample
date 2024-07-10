import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS_CODE } from "ms-libs/constants/status-code";
import { ApplicationError } from "ms-libs/utils/errors";
import { APP_ERROR_MESSAGE } from 'ms-libs/constants/app-error-message';
import { prettyObject } from 'ms-libs/utils/logger';


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