import { PATH_PROFILE } from '../../paths';
import { updateUserBio } from '../../utils/dbUsers';

export default async (req, res) => {
  const username = req.query.username;
  const bio = req.query.bio;
  if (username === undefined || bio === undefined) {
    return res.status(400).json({ error: 'Invalid parameters.' });
  }

  try {
    await updateUserBio(username, bio);
    res.redirect(PATH_PROFILE);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
