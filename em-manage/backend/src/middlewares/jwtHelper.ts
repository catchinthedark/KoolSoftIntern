import crypto from 'crypto';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { UnauthorizedError } from '../common/error';
import { AuthRequest, Credentials } from "../common/request";
import { getAccessToken, getRefreshToken } from '../controllers/auth';
import { asyncHandler } from './errorHandling';

export const signCredentials = (args: {
  type?: "accessToken" | "refreshToken",
  credentials: Credentials
}) => {
  const { credentials, type = 'accessToken' } = args;
  const secret = type === 'accessToken' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
  const expiresIn = type === 'accessToken' ? 600 : 60 * 60 * 24 * 7;
  const nonce = crypto.randomBytes(6).toString('hex');
  return jwt.sign({ nonce, ...credentials }, secret!, { expiresIn });
}

export const verifyCredentials = (args: {
  type?: 'accessToken' | 'refreshToken';
  token: string
}) => {
  try {
    const { token, type = 'accessToken' } = args;
    const secret = type === 'accessToken' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    const credentials = jwt.verify(token, secret!) as Credentials;
    return credentials;
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      if (e instanceof TokenExpiredError) {
        throw new UnauthorizedError({ message: 'Token Expired', data: -1 });
      }
      throw new UnauthorizedError();
    }
    throw e;
  }
}

export const verifyTokenMiddleware = asyncHandler(async (req: AuthRequest, res, next) => {
  const authHeader = req.headers.authorization;
  let token: string;
  if (authHeader) {
    const [tokenType, _token] = authHeader.split(' ');
    if (tokenType.toLocaleLowerCase() !== 'bearer' || !_token) throw new UnauthorizedError({ message: 'Invalid Token' });
    token = _token;
  } else {
    const _token = req.cookies['x-access-token'];
    if (!_token) throw new UnauthorizedError({ message: 'Invalid Token' });
    token = _token;
  }

  const credentials = verifyCredentials({ token, type: 'accessToken' });
  if (!credentials) throw new UnauthorizedError({ message: 'Invalid Token' });
  const savedToken = await getAccessToken({ accountID: credentials.accountID });
  if (!savedToken || savedToken !== token) throw new UnauthorizedError({ message: 'Invalid Token' });
  req.credentials = credentials;
  return next!();
});

export const verifyRefreshTokenMiddleware = asyncHandler(async (req: AuthRequest, res, next) => {
  let token = req.body.refresh_token;
  if (!token) {
    const _token = req.cookies['x-refresh-token'];
    if (!_token) throw new UnauthorizedError({ message: 'Invalid Token' });
    token = _token;
  }

  const credentials = verifyCredentials({ token, type: 'refreshToken' });
  if (!credentials) throw new UnauthorizedError({ message: 'Invalid Token' });

  const savedToken = await getRefreshToken({ accountID: credentials.accountID });
  if (!savedToken || savedToken !== token) throw new UnauthorizedError({ message: 'Invalid Token' });
  req.credentials = credentials;
  return next!();
});