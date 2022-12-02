import { Request, Response } from 'express';
import config from 'config';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt';

async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) return res.status(401).send('Invalid email or password');

  const session = await createSession(user._id, req.get('user-agent') || '');

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

  return res.send({ accessToken, refreshToken });
}

async function getUserSessionsHandler(_req: Request, res: Response) {
  const user = res.locals.user._id;

  const sessions = await findSessions({ user, valid: true });

  return res.send(sessions);
}

async function deleteSessionHandler(_req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  console.log(sessionId);

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
};
