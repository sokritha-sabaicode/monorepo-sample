import { NextFunction, Request, Response } from "express";


export default function loggerRequest(req: Request, _res: Response, next: NextFunction) {
  console.log('IP Request: ', req.ip);
  next();
}