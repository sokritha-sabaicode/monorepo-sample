import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

type Config = {
  port: number;
  mongodbUrl: string;
  apiGatewayHeader: string;
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Determine the environment and set the appropriate .env file
  const env = process.env.NODE_ENV || 'development';
  const envPath = path.resolve(__dirname, `../configs/.env.${env}`);
  dotenv.config({ path: envPath });

  // Define a schema for the environment variables
  const envVarsSchema = Joi.object({
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
    API_GATEWAY_HEADER: Joi.string().required()
  }).unknown().required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
    apiGatewayHeader: envVars.API_GATEWAY_HEADER
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;