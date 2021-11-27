import jwt from 'jsonwebtoken';
import jwt_key from './jwtKey';

/**
 * Retrieves username from context
 */
export const getUsername = (context) => {
  const { req } = context;
  const { cookies } = req;
  const token = cookies.jwt;
  const decoded = jwt.verify(token, jwt_key);
  return decoded.user;
};
