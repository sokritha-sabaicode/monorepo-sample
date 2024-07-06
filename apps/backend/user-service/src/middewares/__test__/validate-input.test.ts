import validateRequest from '@/src/middewares/validate-input';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { InvalidInputError } from 'ms-libs/utils/errors';

describe('validateRequest Middleware', () => {
  let nextFunction: NextFunction;

  beforeEach(() => {
    nextFunction = jest.fn();
  });

  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(0).required(),
  });

  it('should call next if validation passes', () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'testuser@example.com',
        age: 25
      }
    } as Request;

    const res = {} as Response;

    validateRequest(schema)(req, res, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('should throw InvalidInputError if validation fails', () => {
    const req = {
      body: {
        email: 'notanemail',
        age: -5
      }
    } as Request;

    const res = {} as Response;

    validateRequest(schema)(req, res, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(InvalidInputError));
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('should throw InvalidInputError if unknown properties are present', () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'testuser@example.com',
        age: 25,
        unknownProp: 'should not be here'
      }
    } as Request;

    const res = {} as Response;

    validateRequest(schema)(req, res, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(expect.any(InvalidInputError));
    expect(nextFunction).toHaveBeenCalledTimes(1);
  });
});
