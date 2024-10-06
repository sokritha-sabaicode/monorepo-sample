import { CookieOptions, Response } from "express";


// httpOnly: true -> prevent the cookie from being accessed by the client
// secure: true -> only send the cookie over HTTPS
// sameSite: 'strict' -> not allows the cookie to be sent on a cross-site request or iframe
// sameSite: 'lax' -> allows GET only
// sameSite: 'none' -> The cookie is sent with all requests, including cross-site, but you must also set Secure: true
// maxAge: 3600000 -> 1 hour expiration
// domain: 'localhost' -> only send the cookie over HTTPS

function setCookie(response: Response, name: string, value: string, options: CookieOptions = {}) {
  const defaultOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure in production only
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 3600 * 1000,  // 1 hour expiration
    ...options,       // Override defaults with provided options
  };
  response.cookie(name, value, defaultOptions);
}

export default setCookie;