const express = require('express');
const next = require('next');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    // Sign jwt
    server.all('/jwt', (req, res) => {
      const username = req.query.username;
      if (username === undefined) {
        res.redirect('/login');
      }

      const jwt_key = 'C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';
      // Expiration date: 2 hours from now
      const expiration = Math.floor(Date.now() / 1000) + 7200;
      const token = jwt.sign({ exp: expiration, user: username }, jwt_key, {
        header: { alg: 'HS256', typ: 'JWT' },
      });
      res.cookie('jwt', token);
      res.redirect('/');
    });

    server.get('*', (req, res) => {
      // TODO: Check valid token
      return handle(req, res);
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
