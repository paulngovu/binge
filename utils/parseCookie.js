const jwt = require('jsonwebtoken');
const jwt_key = require('./jwtKey');

/**
 * Retrieves username from token
 */
const parseCookie = (token) => jwt.verify(token, jwt_key).user;

module.exports = parseCookie;
