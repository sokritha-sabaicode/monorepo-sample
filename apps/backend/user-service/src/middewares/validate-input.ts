import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { InvalidInputError } from 'ms-libs/utils/errors';

/**
 * Middleware to validate request body against a given Joi schema.
 * @param schema The Joi schema to validate against.
 * @returns Middleware function for Express.
 */
const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,  // Collect all errors, not just the first one
      allowUnknown: false // Disallow properties not specified in the schema
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      throw new InvalidInputError({ errors });
    }

    next();
  };
};

export default validateRequest;
