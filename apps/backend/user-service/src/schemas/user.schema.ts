import Joi from 'joi';

const userJoiSchema = Joi.object({
  username: Joi.string().required(), // Username is a required string
  email: Joi.string().email().required(), // Email is a required string and must be a valid email
  gender: Joi.string().required(), // Gender is a required string
  age: Joi.number().min(0).required()
});

export default userJoiSchema;
