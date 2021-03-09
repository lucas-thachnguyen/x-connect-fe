/** Authentication base url */
export const AUTH_BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

/** Authentication cookie name */
export const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'user';

/** Authentication cookie name */
export const AUTH_TOKEN_NAME = process.env.AUTH_TOKEN_NAME || 'token';

/** Config route for Authenticate module */
export const ROUTES = {
  API_SIGN_UP_PATH: '/auth/sign-up',
  API_SIGN_IN_PATH: '/auth/sign-in',
  API_SIGN_OUT_PATH: '/auth/sign-out',
};

