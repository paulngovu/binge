// TODO: Remove dummy data
const user = 'user';
const pass = 'pass';

/**
 * Validates credentials provided by user.
 */
export const isValidCredentials = (username, password) => {
  return username === user && password === pass;
};
