import { NextFunction, Response,Request } from "express";

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();

  // Operation: Logger
  console.log(`${time} ${method} request to ${url}`);

  next();
}

export default loggerMiddleware;