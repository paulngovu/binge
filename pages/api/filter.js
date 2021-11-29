import { updateUserFilter } from '../../utils/dbUsers';

export default async (req, res) => {
  const content = JSON.parse(req.headers.content);
  const username = content.username;
  const filterQuery = content.filterQuery;
  const mealType = content.mealType;
  const cuisineType = content.cuisineType;
  const dishType = content.dishType;

  try {
    const user = await updateUserFilter(username, filterQuery, mealType, cuisineType, dishType);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
