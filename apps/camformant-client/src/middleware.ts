import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { NextRequest, NextResponse } from "next/server";

interface CookieOptions {
  domain?: string;
  expires?: Date;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}

interface ParsedCookie {
  name: string;
  value: string;
  options: CookieOptions;
}

// Protected routes
const protectedRoutes = ['/profile', '/resume', '/applied'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // Get cookies from the request
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const username = request.cookies.get('username')?.value;

  if (isProtectedRoute && !accessToken) {
    if (refreshToken && username) {
      try {
        // Attempt to refresh the access token
        const response = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.REFRESH}`,
          { refreshToken, username },
          {
            headers: {
              Cookie: `refresh_token=${refreshToken}; username=${username}`,
            },
            withCredentials: true,
          }
        );

        // Extract 'Set-Cookie' headers from the response
        const setCookieHeaders = response.headers['set-cookie'];

        if (setCookieHeaders) {
          // Parse and set cookies in the response
          const responseNext = NextResponse.next();

          setCookieHeaders.forEach((cookieString) => {
            const cookie = parseCookieString(cookieString);
            responseNext.cookies.set(cookie.name, cookie.value, cookie.options);
          });

          return responseNext;
        } else {
          console.error('No Set-Cookie headers found in the response');
          return NextResponse.redirect(new URL('/login', request.url));
        }
      } catch (error) {
        console.error('Token refresh failed', error);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } else {
      // If no access token and no refresh token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/resume', '/applied', '/profile'],
};

// Helper function to parse a cookie string
function parseCookieString(cookieString: string): ParsedCookie {
  const [nameValue, ...attributes] = cookieString
    .split('; ')
    .map((attr: string) => attr.trim());
  const [name, value] = nameValue.split('=');

  const options: CookieOptions = {};
  attributes.forEach((attr: string) => {
    const [attrName, attrValue] = attr.split('=');
    switch (attrName.toLowerCase()) {
      case 'path':
        options.path = attrValue;
        break;
      case 'expires':
        options.expires = new Date(attrValue);
        break;
      case 'max-age':
        options.maxAge = Number(attrValue);
        break;
      case 'domain':
        options.domain = attrValue;
        break;
      case 'secure':
        options.secure = true;
        break;
      case 'httponly':
        options.httpOnly = true;
        break;
      case 'samesite':
        options.sameSite = attrValue.toLowerCase() as 'strict' | 'lax' | 'none';
        break;
      default:
        break;
    }
  });

  return { name, value, options };
}

