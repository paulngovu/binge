import { PATH_AUTHENTICATE, PATH_LOGIN } from '../../paths';
import { createUser } from '../../utils/dbUsers';

export default (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  if (username === undefined || password === undefined) {
    res.redirect(PATH_LOGIN);
  } else {
    try {
      createUser(username, password);
      res.redirect(
        `${PATH_AUTHENTICATE}?username=${username}&password=${password}`
      );
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Something went wrong' });
    }
  }
};
