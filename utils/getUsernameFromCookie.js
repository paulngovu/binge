import jwt from 'jsonwebtoken';
import jwt_key from './jwtKey';

/**
 * Retrieves username from context
 */
export const getUsernameFromCookie = (context) => {
  const { req } = context;
  const { cookies } = req;
  const token = cookies.jwt;
  try {
    const decoded = jwt.verify(token, jwt_key);
    return decoded.user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
