import configs from "@/src/config";
import { AdminAddUserToGroupCommand, AdminGetUserCommand, AdminLinkProviderForUserCommand, AuthFlowType, CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand, InitiateAuthCommandInput, ListUsersCommand, SignUpCommand, SignUpCommandInput, UserType } from "@aws-sdk/client-cognito-identity-provider";
import { GoogleCallbackRequest, LoginRequest, SignupRequest, VerifyUserRequest } from "@/src/controllers/types/auth-request.type";
import crypto from 'crypto';
import axios from "axios";
import { APP_ERROR_MESSAGE, InvalidInputError, ResourceConflictError } from "@sokritha-sabaicode/ms-libs";
import { jwtDecode } from "jwt-decode";
import { CognitoToken } from "@/src/services/types/auth-service.type";

const client = new CognitoIdentityProviderClient({
  region: configs.awsCognitoRegion, credentials: {
    accessKeyId: configs.awsAccessKeyId,
    secretAccessKey: configs.awsSecretAccessKey
  }
})

class AuthService {
  // Generate the SECRET_HASH
  private generateSecretHash(username: string): string {
    const secret = configs.awsCognitoClientSecret;
    return crypto.createHmac('SHA256', secret)
      .update(username + configs.awsCognitoClientId)
      .digest('base64');
  }

  async signup(body: SignupRequest): Promise<string> {
    const inputBody = {
      name: `${body.sur_name} ${body.last_name}`,
      ...Object.keys(body).filter(key => key !== 'sur_name' && key !== 'last_name').reduce<Record<string, any>>((obj, key) => {
        obj[key] = body[key as keyof SignupRequest];
        return obj;
      }, {})
    }

    const allowedAttributes = ['email', 'phone_number', 'name', 'custom:role'];

    const attributes = Object.keys(inputBody)
      .filter(key => allowedAttributes.includes(key) || key === 'role')
      .map(key => ({
        Name: key === 'role' ? 'custom:role' : key,
        Value: inputBody[key as keyof typeof inputBody]
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

  async verifyUser(body: VerifyUserRequest): Promise<void> {
    const username = (body.email || body.phone_number) as string;

    const params = {
      ClientId: configs.awsCognitoClientId,
      Username: username,
      ConfirmationCode: body.code,
      SecretHash: this.generateSecretHash(username),
    };

    try {
      const command = new ConfirmSignUpCommand(params);
      await client.send(command);
      console.log("AuthService verifyUser() method: User verified successfully");

      // Retrieve the user to get the `role` attribute
      const userInfo = await this.getUserByUsername(username);
      console.log('UserInfo: ', userInfo);
      const role = userInfo.UserAttributes?.find(attr => attr.Name === 'custom:role')?.Value || 'user';

      // Add the user to the group based on the `role` attribute
      await this.addToGroup(username, role);
      console.log(`AuthService verifyUser() method: User added to ${role} group`);
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

  async login(body: LoginRequest): Promise<CognitoToken> {
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
        accessToken: result.AuthenticationResult?.AccessToken!,
        idToken: result.AuthenticationResult?.IdToken!,
        refreshToken: result.AuthenticationResult?.RefreshToken!
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

  loginWithFacebook(): string {
    const state = crypto.randomBytes(16).toString('hex')

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: configs.awsCognitoClientId,
      redirect_uri: configs.awsRedirectUri,
      identity_provider: 'Facebook',
      scope: 'profile email openid',
      state: state,
      prompt: 'select_account'
    })
    const cognitoOAuthURL = `${configs.awsCognitoDomain}/oauth2/authorize?${params.toString()}`

    return cognitoOAuthURL;
  }

  async getOAuthToken(query: GoogleCallbackRequest): Promise<CognitoToken> {
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

      const token = {
        accessToken: res.data.access_token,
        idToken: res.data.id_token,
        refreshToken: res.data.refresh_token
      }

      return {
        accessToken: token.accessToken,
        idToken: token.idToken,
        refreshToken: token.refreshToken
      };
    } catch (error) {
      throw error;
    }
  }

  getUserInfoFromToken(token: string) {
    const decodedToken = jwtDecode(token);
    console.log('decodedToken: ', decodedToken);
    return decodedToken;
  }

  async addToGroup(username: string, groupName: string) {
    const params = {
      GroupName: groupName,
      Username: username,
      UserPoolId: configs.awsCognitoUserPoolId
    }

    try {
      const command = new AdminAddUserToGroupCommand(params);
      await client.send(command);
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username: string) {
    const params = {
      Username: username,
      UserPoolId: configs.awsCognitoUserPoolId
    }

    try {
      const command = new AdminGetUserCommand(params);
      const userInfo = await client.send(command);
      return userInfo;
    } catch (error) {
      console.error("AuthService getUserByUsername() method error:", error);
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UserType | undefined> {
    const params = {
      Filter: `email = "${email}"`,
      UserPoolId: configs.awsCognitoUserPoolId,
      Limit: 1
    }

    try {
      const listUsersCommand = new ListUsersCommand(params);
      const response = await client.send(listUsersCommand);
      return response.Users && response.Users[0];
    } catch (error) {
      console.error("AuthService getUserByEmail() method error:", error);
      throw error;
    }
  }

  async linkAccount({ sourceUserId, providerName, destinationUserId }: { sourceUserId: string, providerName: string, destinationUserId: string }): Promise<void> {
    const params = {
      // DestinationUser is the existing cognito user that you want to assign to the external Idp user account (COULD BE a cognito user or a federated user)
      DestinationUser: {
        ProviderName: "Cognito",
        ProviderAttributeValue: destinationUserId,
      },
      // SourceUser is the user who is linking to the destination user (MUST BE a federated user like Google or Facebook, etc.)
      SourceUser: {
        ProviderName: providerName, // Google, Facebook, etc.
        ProviderAttributeName: "Cognito_Subject",
        ProviderAttributeValue: sourceUserId
      },
      UserPoolId: configs.awsCognitoUserPoolId
    }

    try {
      const command = new AdminLinkProviderForUserCommand(params);
      await client.send(command);

    } catch (error) {
      console.error(`AuthService linkAccount() method error: `, error);
      throw error;
    }
  }

  async refreshToken({ refreshToken, idToken }: { refreshToken: string, idToken: string }) {
    const decodedToken = this.getUserInfoFromToken(idToken);

    const params = {
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: configs.awsCognitoClientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        // @ts-ignore
        SECRET_HASH: this.generateSecretHash(decodedToken["cognito:username"] as string)
      }
    }

    try {
      const command = new InitiateAuthCommand(params);
      const result = await client.send(command);

      return {
        accessToken: result.AuthenticationResult?.AccessToken!,
        idToken: result.AuthenticationResult?.IdToken!,
        refreshToken: result.AuthenticationResult?.RefreshToken || refreshToken, // Reuse the old refresh token if a new one isn't provided
      };
    } catch (error) {
      console.error("AuthService refreshToken() method error:", error);
      throw new Error(`Error refreshing token: ${error}`);
    }
  }
}

export default new AuthService();