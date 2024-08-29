import Joi from 'joi';

const userJoiSchema = Joi.object({
  sub: Joi.string(),
  googleSub: Joi.string(),
  facebookSub: Joi.string(),
  username: Joi.string().required(), // Username is a required string
  email: Joi.string().email().required(), // Email is a required string and must be a valid email
});

export default userJoiSchema;
