const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const jwt_key = require('./utils/jwtKey');
const {
  PATH_AUTHENTICATE,
  PATH_LOGOUT,
  PATH_LOGIN,
  PATH_HOME,
  PATH_LOGIN_ERROR,
  PATH_REGISTER,
  PATH_API_REGISTER,
} = require('./paths');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    // Sign jwt
    server.get(PATH_AUTHENTICATE, (req, res) => {
      const username = req.query.username;
      const password = req.query.password;
      if (username === undefined || password === undefined) {
        res.redirect(PATH_LOGIN);
      }

      // Expiration date: 2 hours from now
      const expiration = Math.floor(Date.now() / 1000) + 7200;
      const token = jwt.sign({ exp: expiration, user: username }, jwt_key, {
        header: { alg: 'HS256', typ: 'JWT' },
      });
      res.cookie('jwt', token);
      res.redirect(PATH_HOME);
    });

    server.get(PATH_LOGOUT, (req, res) => {
      res.clearCookie('jwt');
      res.sendStatus(200);
    });

    // If login, bypass token check
    server.get(PATH_LOGIN, (req, res) => handle(req, res));

    // If register, bypass token check
    server.get(PATH_REGISTER, (req, res) => handle(req, res));

    // Display login error message
    server.get(PATH_LOGIN_ERROR, (req, res) => handle(req, res));

    // Create user
    server.get(PATH_API_REGISTER, (req, res) => handle(req, res));

    // Next files just bypass
    server.all('/_next*', (req, res) => handle(req, res));

    server.get('*', (req, res) => {
      // Check for token
      const token = req.cookies.jwt;
      if (token === undefined) {
        res.redirect(PATH_LOGIN_ERROR);
      } else {
        return handle(req, res);
      }
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
