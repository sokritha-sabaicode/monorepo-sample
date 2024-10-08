import configs from "@/src/config";
import { GoogleCallbackRequest, LoginRequest, SignupRequest, VerifyUserRequest } from "@/src/controllers/types/auth-request.type";
import AuthService from "@/src/services/auth.service";
import setCookie from "@/src/utils/cookie";
import sendResponse from "@/src/utils/send-response";
import { Response, Request as ExpressRequest } from "express";
import { Body, Controller, Get, Post, Queries, Query, Request, Route, SuccessResponse } from "tsoa";

@Route('v1/auth')
export class ProductController extends Controller {
  @Post("/signup")
  public async signup(@Body() body: SignupRequest): Promise<{ message: string }> {
    try {
      const result = await AuthService.signup(body)

      return sendResponse({ message: result })
    } catch (error) {
      throw error;
    }
  }

  @Post("/verify")
  public async verifyUser(@Body() body: VerifyUserRequest) {
    try {
      await AuthService.verifyUser(body);
      return sendResponse({ message: `You've verified successfully` })
    } catch (error) {
      throw error;
    }
  }

  @Post("/login")
  public async login(@Request() request: Express.Request, @Body() body: LoginRequest) {
    try {
      const response = (request as any).res as Response;
      const result = await AuthService.login(body);

      setCookie(response, 'id_token', result.idToken);
      setCookie(response, 'access_token', result.accessToken);
      setCookie(response, 'refresh_token', result.refreshToken, { maxAge: 30 * 24 * 3600 * 1000 });
      setCookie(response, 'username', result.username!, { maxAge: 30 * 24 * 3600 * 1000 });
      setCookie(response, 'user_id', result.userId!, { maxAge: 30 * 24 * 3600 * 1000 });

      return sendResponse({ message: 'Login successfully' })
    } catch (error) {
      throw error;
    }
  }

  @Get("/google")
  public loginWithGoogle(@Query() state: string) {
    const cognitoOAuthURL = AuthService.loginWithGoogle(state);

    return sendResponse({ message: 'Login with Google successfully', data: cognitoOAuthURL })
  }

  @Get("/facebook")
  @SuccessResponse(302, "Redirect")
  public loginWithFacebook(@Request() request: Express.Request) {
    const response = (request as any).res as Response;
    const cognitoOAuthURL = AuthService.loginWithFacebook();

    response.redirect(cognitoOAuthURL);
  }

  @Get("/oauth/callback")
  public async oauthCallback(@Request() request: Express.Request, @Queries() query: GoogleCallbackRequest) {
    try {
      const response = (request as any).res as Response;
      const tokens = await AuthService.getOAuthToken(query);

      setCookie(response, 'id_token', tokens.idToken);
      setCookie(response, 'access_token', tokens.accessToken);
      setCookie(response, 'refresh_token', tokens.refreshToken, { maxAge: 30 * 24 * 3600 * 1000 });
      setCookie(response, 'username', tokens.username!, { maxAge: 30 * 24 * 3600 * 1000 });
      setCookie(response, 'user_id', tokens.userId!, { maxAge: 30 * 24 * 3600 * 1000 });

      response.redirect(configs.clientUrl)
    } catch (error) {
      throw error
    }
  }

  @Post("/refresh-token")
  public async refreshToken(@Request() request: ExpressRequest, @Body() body: { refreshToken?: string, username?: string }) {
    try {
      const response = (request as any).res as Response;

      const refreshToken = request.cookies['refresh_token'];
      const username = request.cookies['username'];

      

      const result = await AuthService.refreshToken({ refreshToken: body.refreshToken || refreshToken, username: body.username || username });

      setCookie(response, 'id_token', result.idToken);
      setCookie(response, 'access_token', result.accessToken);

      return sendResponse({ message: 'Token refreshed successfully' })
    } catch (error) {
      throw error
    }
  }
}
