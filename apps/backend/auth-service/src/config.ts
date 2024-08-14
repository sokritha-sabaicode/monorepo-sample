import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

type Config = {
  port: number;
  awsCognitoRegion: string;
  awsCognitoUserPoolId: string;
  awsCognitoClientId: string;
  awsCognitoClientSecret: string;
  awsCognitoIdentityPoolId: string;
  awsCognitoDomain: string;
  awsRedirectUri: string;
  clientUrl: string;
  apiGatewayHeader: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
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
    AWS_COGNITO_REGION: Joi.string().required(),
    AWS_COGNITO_USER_POOL_ID: Joi.string().required(),
    AWS_COGNITO_CLIENT_ID: Joi.string().required(),
    AWS_COGNITO_CLIENT_SECRET: Joi.string().required(),
    AWS_COGNITO_IDENTITY_POOL_ID: Joi.string().required(),
    AWS_COGNITO_DOMAIN: Joi.string().required(),
    AWS_REDIRECT_URI: Joi.string().required(),
    CLIENT_URL: Joi.string().required(),
    API_GATEWAY_HEADER: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required()
  }).unknown().required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    port: envVars.PORT,
    awsCognitoRegion: envVars.AWS_COGNITO_REGION,
    awsCognitoUserPoolId: envVars.AWS_COGNITO_USER_POOL_ID,
    awsCognitoClientId: envVars.AWS_COGNITO_CLIENT_ID,
    awsCognitoClientSecret: envVars.AWS_COGNITO_CLIENT_SECRET,
    awsCognitoIdentityPoolId: envVars.AWS_COGNITO_IDENTITY_POOL_ID,
    awsCognitoDomain: envVars.AWS_COGNITO_DOMAIN,
    awsRedirectUri: envVars.AWS_REDIRECT_URI,
    clientUrl: envVars.CLIENT_URL,
    apiGatewayHeader: envVars.API_GATEWAY_HEADER,
    awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;