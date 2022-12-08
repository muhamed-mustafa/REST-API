import { CookieOptions } from 'express';

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  sameSite: 'lax',
  secure: false,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10,
};

export { accessTokenCookieOptions, refreshTokenCookieOptions };
