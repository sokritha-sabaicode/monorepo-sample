import config from "@/src/config";
import { AuthorizationError } from "@sokritha-sabaicode/ms-libs";
import { Request, Response, NextFunction } from "express";

const blockAccess = (req: Request, _res: Response, next: NextFunction) => {
  const gatewayHeader = req.headers['x-api-gateway'];

  if (!gatewayHeader || gatewayHeader !== config.apiGatewayHeader) {
    return next(new AuthorizationError());
  }

  next();
};

export {
  blockAccess
}