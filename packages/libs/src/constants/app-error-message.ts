// messages.js

export const AUTH_MESSAGES = {
  // 1. General Authentication Messages
  GENERAL: {
    LOGIN_SUCCESS: "Welcome back, {firstName}!",
    LOGOUT: "You have been logged out. See you next time!",
    WELCOME_BACK: "Great to see you again!",
    GOOGLE_LOGIN_SUCCESS: "Welcome back! You've successfully signed in with Google.",
  },

  // 2. Email/Phone Number + Password Authentication
  AUTHENTICATION: {
    INVALID_EMAIL: "Hmm, we can't find an account with that email address.",
    INVALID_PHONE: "The phone number you entered isn't associated with an account.",
    INVALID_PASSWORD: "Oops! That password doesn't match our records.",
    EMAIL_NOT_VERIFIED: "Please verify your email address to continue.",
    PHONE_NOT_VERIFIED: "Your phone number isn't verified yet. Check your messages for a verification code.",
    ACCOUNT_LOCKED: "Your account has been locked due to multiple failed login attempts.",
    PASSWORD_RESET_REQUEST: "Password reset link sent! Please check your email.",
    PASSWORD_RESET_CODE_SENT: "We've sent a code to your phone to reset your password.",
    PASSWORD_RESET_INVALID_TOKEN: "This password reset link has expired.",
    PASSWORD_RESET_INVALID_CODE: "Invalid reset code. Please request a new one.",
    PASSWORD_RESET_SUCCESS: "Your password has been successfully reset. You can now log in.",
    ACCOUNT_NOT_FOUND: "We couldn't find an account with that information.",
    EMAIL_ALREADY_IN_USE: "An account with this email already exists.",
    PHONE_ALREADY_IN_USE: "This phone number is already associated with an account.",
    ACCOUNT_ALREADY_EXISTS: "Looks like you've already signed up. Try logging in instead.",
    WEAK_PASSWORD: "Your password should be at least 8 characters long and include a mix of letters and numbers.",
  },

  // 3. Google Login Authentication
  GOOGLE_AUTH: {
    ACCOUNT_NOT_LINKED: "It seems like you haven't linked your Google account yet.",
    AUTH_FAILED: "Google login failed. Please try again.",
    CONSENT_NOT_GIVEN: "To continue, please grant permission to access your Google account.",
    AUTH_CANCELED: "Google sign-in canceled. Please try again and allow access.",
    ACCOUNT_SUSPENDED: "Your Google account appears to be suspended.",
    ACCOUNT_INACTIVE: "We can't log you in because your Google account is inactive.",
    ACCOUNT_ISSUE: "Google account issue detected. Please check your Google account status.",
    ACCOUNT_LINK_SUCCESS: "Your Google account has been successfully linked!",
  },

  // 4. Authorization Errors
  AUTHORIZATION: {
    ACCESS_DENIED: "You don't have permission to access this resource.",
    NOT_AUTHORIZED: "Oops! You're not authorized to view this page.",
    ACCESS_RESTRICTED: "Access denied. Please contact support if you believe this is a mistake.",
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    SESSION_TIMEOUT: "Session timeout. Please log back in to continue.",
    INSUFFICIENT_PERMISSIONS: "This action requires additional permissions.",
    ADMIN_RIGHTS_REQUIRED: "You need admin rights to access this section.",
    PERMISSION_REQUIRED: "Permission required. Please contact an administrator.",
    ACCOUNT_SUSPENDED: "Your account has been suspended. Please contact support for assistance.",
    ACCOUNT_DISABLED: "Your account has been temporarily disabled.",
    POLICY_VIOLATION: "Account suspended due to policy violations. Reach out to support for more info.",
  },

  // 5. Multi-Factor Authentication (If Applicable)
  MFA: {
    VERIFICATION_CODE_SENT_EMAIL: "We've sent a verification code to your email.",
    VERIFICATION_CODE_SENT_PHONE: "A code has been sent to your phone. Please enter it to continue.",
    VERIFICATION_PROMPT: "Check your device for a verification prompt.",
    INVALID_VERIFICATION_CODE: "That code doesn't seem right. Please try again.",
    VERIFICATION_FAILED: "Verification failed. Please enter the correct code.",
    VERIFICATION_SUCCESS: "You're verified! Redirecting you now.",
  },

  // 6. Account Registration
  REGISTRATION: {
    SUCCESS: "Welcome aboard, {firstName}! Your account has been created.",
    ACCOUNT_CREATED: "Account successfully created. Let's get started!",
    ALL_SET: "You're all set! Thanks for joining us.",
    REGISTRATION_ERROR: "Something went wrong during sign-up. Please try again.",
    REGISTRATION_FAILED: "We couldn't create your account at this time. Please contact support.",
    SIGNUP_SNAFU: "Oops! We hit a snag. Please refresh and try again.",
  },

  // 7. General Error Messages
  ERRORS: {
    TECHNICAL_ISSUE: "We're experiencing technical difficulties. Please try again later.",
    SOMETHING_WENT_WRONG: "Something went wrong on our end. We're working to fix it.",
    UNEXPECTED_ERROR: "Oops! An unexpected error occurred. Please refresh the page.",
    INVALID_INPUT: "Some of the information entered isn't valid. Please check and try again.",
    INVALID_FIELDS: "Invalid input detected. Please correct the highlighted fields.",
    REQUIRED_FIELDS: "Please fill out all required fields.",
  },

  // 8. Helpful Tips and Guidance
  TIPS: {
    PASSWORD_REQUIREMENTS: "Your password should be at least 8 characters long and include a mix of letters and numbers.",
    STRONG_PASSWORD_SUGGESTION: "For better security, include uppercase letters, numbers, and symbols in your password.",
    AVOID_WEAK_PASSWORDS: "Avoid using easily guessable passwords like '123456' or 'password'.",
    EMAIL_FORMAT: "Please enter a valid email address (e.g., name@example.com).",
    EMAIL_FORMAT_TIP: "Make sure your email address includes an '@' symbol and domain name.",
    PHONE_FORMAT: "Please enter a valid phone number, including the country code.",
    PHONE_FORMAT_TIP: "Phone numbers should contain only digits. Please remove any spaces or dashes.",
  },

  // 9. Security and Privacy Messages
  SECURITY: {
    PRIVACY_ASSURANCE: "We respect your privacy and will never share your information without your consent.",
    PRIVACY_POLICY: "Your data is secure with us. Learn more about our privacy policy.",
    SECURITY_NOTIFICATION: "For your security, we recommend changing your password regularly.",
    LOGOUT_REMINDER: "Remember to log out from shared devices to keep your account safe.",
  },

  // 10. Encouraging User Actions
  CTA: {
    SIGN_UP_PROMPT: "Don't have an account yet? Join us today!",
    SIGN_UP_INVITE: "Create an account to get started.",
    ENJOY_FEATURES: "Sign up now to enjoy personalized features.",
    PASSWORD_RESET_PROMPT: "Forgot your password? Click here to reset it.",
    NEED_PASSWORD_HELP: "Need help accessing your account? Reset your password.",
    TROUBLE_LOGGING_IN: "Trouble logging in? Let's get you a new password.",
  },
};
