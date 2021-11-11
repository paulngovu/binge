const express = require('express');
const next = require('next');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { PATH_AUTHENTICATE, PATH_LOGOUT } = require('./paths');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Probably not the best place to put this
const jwt_key = 'C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    // Sign jwt
    server.get(PATH_AUTHENTICATE, (req, res) => {
      const username = req.query.username;
      if (username === undefined) {
        res.redirect('/login');
      }

      // Expiration date: 2 hours from now
      const expiration = Math.floor(Date.now() / 1000) + 7200;
      const token = jwt.sign({ exp: expiration, user: username }, jwt_key, {
        header: { alg: 'HS256', typ: 'JWT' },
      });
      res.cookie('jwt', token);
      res.redirect('/');
    });

    // TODO: Logout
    server.get(PATH_LOGOUT, (req, res) => {
      res.clearCookie('jwt');
      res.sendStatus(200);
    });

    // If login, bypass token check
    server.get('/login', (req, res) => handle(req, res));

    // If register, bypass token check
    server.get('/register', (req, res) => handle(req, res));

    // Display login error message
    server.get('/login/error', (req, res) => handle(req, res));

    // Next files just bypass
    server.all('/_next*', (req, res) => handle(req, res));

    server.get('*', (req, res) => {
      // Check for token
      const token = req.cookies.jwt;
      if (token === undefined) {
        res.redirect('/login/error');
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