export const API_ENDPOINTS = {
  // AUTH SERVICE
  SIGN_UP: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signup`,
  VERIFY: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/verify`,
  SIGN_IN: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/login`,
  SIGN_OUT: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signout`,
  REFRESH: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/refresh-token`,
  SIGN_IN_WITH_GOOGLE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/google`,
  // USER SERVICE
  USER_PROFILE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me`,
  USER_PROFILE_UPDATE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/photo`,
  // PUSH NOTIFICATION SERVICE
  SUBSCRIBE: `${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_ENDPOINT}/subscribe`,

  // JOB SERVICE
  JOBS: `${process.env.NEXT_PUBLIC_JOB_ENDPOINT}`,
}

export const API_ENDPOINTS_SERVER = {
  // USER SERVICE
  USER_PROFILE: `/${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me`,
}