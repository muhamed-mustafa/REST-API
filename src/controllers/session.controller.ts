import { Request, Response } from 'express';
import config from 'config';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { validatePassword } from '../service/user.service';
import log from '../utils/logger';
import { handleCookieSession } from '../utils/cookie-session';
import { UserDocument } from '../models/user.model';
import { SessionDocument } from '../models/session.model';

async function createUserSessionHandler(req: Request, res: Response) {
  const user = (await validatePassword(req.body)) as UserDocument;

  if (!user) return res.status(401).send('Invalid email or password');

  const session = (await createSession(
    user._id,
    req.get('user-agent') || ''
  )) as SessionDocument;

  const { accessToken, refreshToken } = handleCookieSession({
    res,
    user,
    session,
  });

  return res.send({ accessToken, refreshToken });
}

async function getUserSessionsHandler(_req: Request, res: Response) {
  const user = res.locals.user._id;

  const sessions = await findSessions({ user, valid: true });

  return res.send(sessions);
}

async function deleteSessionHandler(_req: Request, res: Response) {
  const sessionId = res.locals.user.session;

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
