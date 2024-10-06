import axiosInstance from "@/utils/axios";
import { API_ENDPOINTS } from "@/utils/const/api-endpoints";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


// 1. Speciify protected and public routes
const protectedRoutes = ['/profile', '/resume', '/applied'];

export async function middleware(request: NextRequest) {
  console.log('middleware...')
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  // Get the access token and refresh token from cookies
  const accessToken = cookies().get('access_token')?.value;
  const refreshToken = cookies().get('refresh_token')?.value;
  const username = cookies().get('username')?.value;

  if (isProtectedRoute && !accessToken) {
    if (refreshToken && username) {
      try {
        // Attempt to refresh the access token
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.REFRESH}`, {
          refreshToken,
          username
        });

        // Set the new access token in the cookies
        const cookieResponse = NextResponse.next();
        // @ts-ignore
        cookieResponse.headers.set('Set-Cookie', response.headers['set-cookie']);

        return cookieResponse;
      } catch (error) {
        console.log('Token refresh failed', error);
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
  matcher: ['/resume', '/applied']
}