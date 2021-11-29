import { updateUserBio } from '../../utils/dbUsers';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const content = JSON.parse(req.headers.content);
    const user = await updateUserBio(content.username, content.bio);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: 'Something went wrong' });
  }
};
