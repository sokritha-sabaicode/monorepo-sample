import configs from "@/src/config";
import { CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand, InitiateAuthCommandInput, SignUpCommand, SignUpCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import { GoogleCallbackRequest, LoginRequest, SignupRequest, VerifyUserRequest } from "@/src/controllers/types/auth-request.type";
import crypto from 'crypto';
import { InvalidInputError, ResourceConflictError } from "ms-libs/utils/errors";
import { APP_ERROR_MESSAGE } from "ms-libs/constants/app-error-message";
import axios from "axios";

const client = new CognitoIdentityProviderClient({ region: configs.awsCognitoRegion })

class AuthService {
  // Generate the SECRET_HASH
  private generateSecretHash(username: string): string {
    const secret = configs.awsCognitoClientSecret;
    return crypto.createHmac('SHA256', secret)
      .update(username + configs.awsCognitoClientId)
      .digest('base64');
  }

  async signup(body: SignupRequest): Promise<string> {
    const allowedAttributes = ['email', 'phone_number', 'name'];

    const attributes = Object.keys(body)
      .filter(key => allowedAttributes.includes(key))
      .map(key => ({
        Name: key,
        Value: body[key as keyof SignupRequest]
      }));

    const username = (body.email || body.phone_number) as string;

    const params: SignUpCommandInput = {
      ClientId: configs.awsCognitoClientId,
      Username: username,
      Password: body.password,
      SecretHash: this.generateSecretHash(username),
      UserAttributes: attributes
    };

    try {
      const command = new SignUpCommand(params);
      const result = await client.send(command);

      return `User created successfully. Please check your ${result.CodeDeliveryDetails?.DeliveryMedium?.toLowerCase()} for a verification code.`
    } catch (error) {
      console.error(`AuthService signup() method error: `, error);

      // Duplicate Account
      if (typeof error === 'object' && error !== null && 'name' in error) {
        if ((error as { name: string }).name === 'UsernameExistsException') {
          throw new ResourceConflictError(APP_ERROR_MESSAGE.existedAccount);
        }
      }

      throw new Error(`Error signing up user: ${error}`)
    }
  }

  async verifyUser(body: VerifyUserRequest) {
    const username = (body.email || body.phone_number) as string;

    const params = {
      ClientId: configs.awsCognitoClientId,
      Username: username,
      ConfirmationCode: body.code,
      SecretHash: this.generateSecretHash(username),
    };

    try {
      const command = new ConfirmSignUpCommand(params);
      const result = await client.send(command);
      console.log("User verified successfully:", result);
    } catch (error) {
      console.error("AuthService verifyUser() method error:", error);

      // Mismatch Code
      if (typeof error === 'object' && error !== null && 'name' in error) {
        if ((error as { name: string }).name === 'CodeMismatchException') {
          throw new InvalidInputError({ message: APP_ERROR_MESSAGE.verifyFail });
        }
      }

      throw new Error(`Error verifying user: ${error}`);
    }
  }

  async login(body: LoginRequest) {
    const username = (body.email || body.phone_number) as string;

    const params: InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: configs.awsCognitoClientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: body.password!,
        SECRET_HASH: this.generateSecretHash(username),
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const result = await client.send(command);

      return {
        accessToken: result.AuthenticationResult?.AccessToken,
        idToken: result.AuthenticationResult?.IdToken,
        refreshToken: result.AuthenticationResult?.RefreshToken
      };
    } catch (error) {
      console.error("AuthService verifyUser() method error:", error);
      throw new Error(`Error verifying user: ${error}`);
    }
  }

  loginWithGoogle(): string {
    const state = crypto.randomBytes(16).toString('hex')

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: configs.awsCognitoClientId,
      redirect_uri: configs.awsRedirectUri,
      identity_provider: 'Google',
      scope: 'profile email openid',
      state: state,
      prompt: 'select_account'
    })
    const cognitoOAuthURL = `${configs.awsCognitoDomain}/oauth2/authorize?${params.toString()}`

    return cognitoOAuthURL;
  }

  async getOAuthToken(query: GoogleCallbackRequest) {
    try {
      const { code, error } = query;


      if (error || !code) {
        throw new InvalidInputError({ message: error });
      }

      const authorizationHeader = `Basic ${Buffer.from(`${configs.awsCognitoClientId}:${configs.awsCognitoClientSecret}`).toString('base64')}`

      const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: configs.awsCognitoClientId,
        redirect_uri: configs.awsRedirectUri
      })

      const res = await axios.post(`${configs.awsCognitoDomain}/oauth2/token`,
        params,
        {
          headers:
          {
            Authorization: authorizationHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

      return {
        accessToken: res.data.access_token,
        idToken: res.data.id_token,
        refreshToken: res.data.refresh_token
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();