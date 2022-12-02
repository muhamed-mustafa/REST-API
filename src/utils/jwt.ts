import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';
import log from './logger';

export function signJwt(
  object: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: jwt.SignOptions | undefined
) {
  return jwt.sign(object, signingKey(keyName), {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  try {
    const decoded = jwt.verify(token, signingKey(keyName));
    return getDecoded(decoded, true, false);
  } catch (e: any) {
    log.error(`${e.message}`);
    return getDecoded(null, false, 'jwt expired');
  }
}

const getDecoded = (
  decoded: string | JwtPayload | null,
  valid: boolean,
  expired: boolean | string
) => {
  return {
    decoded,
    valid,
    expired,
  };
};

const signingKey = (keyName: string) => {
  return Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');
};
