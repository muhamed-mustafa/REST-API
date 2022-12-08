import config from 'config';
import { Response } from 'express';
import { signJwt } from './jwt';
import { UserDocument } from '../models/user.model';
import { SessionDocument } from '../models/session.model';
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from '../types/cookie';

export const handleCookieSession = ({
  res,
  user,
  session,
}: {
  res: Response;
  user: UserDocument;
  session: SessionDocument;
}) => {
  const accessToken = signJwt(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTtl') }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    'refreshTokenPrivateKey',
    { expiresIn: config.get('refreshTokenTtl') }
  );

  res.cookie('accessToken', accessToken, accessTokenCookieOptions);

  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

  return {
    accessToken,
    refreshToken,
  };
};
