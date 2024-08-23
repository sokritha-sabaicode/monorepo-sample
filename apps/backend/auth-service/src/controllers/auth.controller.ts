import configs from "@/src/config";
import { GoogleCallbackRequest, LoginRequest, SignupRequest, VerifyUserRequest } from "@/src/controllers/types/auth-request.type";
import AuthService from "@/src/services/auth.service";
import setCookie from "@/src/utils/cookie";
import sendResponse from "@/src/utils/send-response";
import { Response, Request as ExpressRequest } from "express";
import { Body, Controller, Get, Post, Queries, Request, Route, SuccessResponse } from "tsoa";

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
      setCookie(response, 'refresh_token', result.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });

      return sendResponse({ message: 'Login successfully' })
    } catch (error) {
      throw error;
    }
  }

  @Get("/google")
  @SuccessResponse(302, "Redirect")
  public loginWithGoogle(@Request() request: Express.Request) {
    const response = (request as any).res as Response;
    const cognitoOAuthURL = AuthService.loginWithGoogle();

    response.redirect(cognitoOAuthURL);
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

      response.cookie('id_token', tokens.idToken);
      response.cookie('access_token', tokens.accessToken);
      response.cookie('refresh_token', tokens.refreshToken)

      response.redirect(configs.clientUrl)
    } catch (error) {
      throw error
    }
  }

  @Post("/refresh-token")
  public async refreshToken(@Request() request: ExpressRequest) {
    try {
      const response = (request as any).res as Response;

      const refreshToken = request.cookies['refresh_token'];
      const idToken = request.cookies['id_token'];

      const result = await AuthService.refreshToken({ refreshToken, idToken });

      setCookie(response, 'id_token', result.idToken);
      setCookie(response, 'access_token', result.accessToken);

      return sendResponse({ message: 'Token refreshed successfully' })
    } catch (error) {
      throw error
    }
  }
}
