import Joi from 'joi';

const userJoiSchema = Joi.object({
  sub: Joi.string(),
  googleSub: Joi.string(),
  facebookSub: Joi.string(),
  username: Joi.string().required(), // Username is a required string
  email: Joi.string().email(), // Email must be a valid email if provided
  profile: Joi.string(),
  phone_number: Joi.string(),
}).xor('email', 'phone_number'); // Either email or phone_number must be present

export default userJoiSchema;
