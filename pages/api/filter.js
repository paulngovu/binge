import { updateUserFilter } from '../../utils/dbUsers';

export default async (req, res) => {
  const username = req.query.username;
  const filterQuery = req.query.filterQuery;
  const mealType = req.query.mealType;
  const cuisineType = req.query.cuisineType;
  const dishType = req.query.dishType;
  if (username === undefined) {
    return res.status(400).json({ error: 'Invalid parameters.' });
  }

  try {
    await updateUserFilter(username, filterQuery, mealType, cuisineType, dishType);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
