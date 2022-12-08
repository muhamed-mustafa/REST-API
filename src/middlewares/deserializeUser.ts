import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';
import { reIssueAccessToken } from '../service/session.service';
import { accessTokenCookieOptions } from '../types/cookie';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.x-auth-token', '') as string;
  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken as string);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
      res.cookie('accessToken', newAccessToken, accessTokenCookieOptions);
    }

    const result = verifyJwt(newAccessToken as string, 'accessTokenPublicKey');

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};
