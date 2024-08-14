import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

type Config = {
  port: number;
  clientUrl: string;
  authServiceUrl: string;
  userServiceUrl: string;
  productServiceUrl: string;
  awsCloudwatchLogsRegion: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsCloudwatchLogsGroupName: string;
  awsCognitoUserPoolId: string;
  awsCognitoClientId: string;
  apiGatewayHeader: string;
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Determine the environment and set the appropriate .env file
  const env = process.env.NODE_ENV || 'development';
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
  dotenv.config({ path: envPath });

  // Define a schema for the environment variables
  const envVarsSchema = Joi.object({
    PORT: Joi.number().default(3000),
    CLIENT_URL: Joi.string().required(),
    AUTH_SERVICE_URL: Joi.string().required(),
    USER_SERVICE_URL: Joi.string().required(),
    PRODUCT_SERVICE_URL: Joi.string().required(),
    AWS_CLOUDWATCH_LOGS_REGION: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_CLOUDWATCH_LOGS_GROUP_NAME: Joi.string().required(),
    AWS_COGNITO_USER_POOL_ID: Joi.string().required(),
    AWS_COGNITO_CLIENT_ID: Joi.string().required(),
    API_GATEWAY_HEADER: Joi.string().required()
  }).unknown().required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    port: envVars.PORT,
    clientUrl: envVars.CLIENT_URL,
    authServiceUrl: envVars.AUTH_SERVICE_URL,
    userServiceUrl: envVars.USER_SERVICE_URL,
    productServiceUrl: envVars.PRODUCT_SERVICE_URL,
    awsCloudwatchLogsRegion: envVars.AWS_CLOUDWATCH_LOGS_REGION,
    awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    awsCloudwatchLogsGroupName: envVars.AWS_CLOUDWATCH_LOGS_GROUP_NAME,
    awsCognitoUserPoolId: envVars.AWS_COGNITO_USER_POOL_ID,
    awsCognitoClientId: envVars.AWS_COGNITO_CLIENT_ID,
    apiGatewayHeader: envVars.API_GATEWAY_HEADER
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;