import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Image,
  Spinner,
  Text,
} from 'grommet';
import { Close, Favorite } from 'grommet-icons';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';
import RecipeStack from '../classes/RecipeStack';
import User from '../classes/User';
import Layout from '../components/Layout';
import Filter from '../edamamAPI/Filter';
import { PATH_API_FILTER, PATH_LOGIN_ERROR } from '../paths';
import { getUser } from '../utils/dbUsers';
import { getUsernameFromCookie } from '../utils/getUsernameFromCookie';

async function saveLike(username, foodname) {
  const likeInstance = {
    foodname: foodname,
    username: username,
  };

  const response = await fetch('/api/likes', {
    method: 'GET',
    headers: {
      content: JSON.stringify(likeInstance),
    },
  });
}

async function saveRecipe(
  name,
  url,
  ingredients,
  calories,
  allergies,
  imageUrl,
  cusineType,
  mealType,
  dishType
) {
  const recipeInstance = {
    name: name,
    url: url,
    ingredients: ingredients,
    calories: Math.floor(calories),
    allergies: allergies,
    imageUrl: imageUrl,
    cuisineType: cusineType,
    mealType: mealType,
    dishType: dishType,
  };

  const response = await fetch('/api/recipes', {
    method: 'GET',
    headers: {
      content: JSON.stringify(recipeInstance),
    },
  });
}

// SWIPE PAGE

let userObj;
let recipeStack = new RecipeStack(null);

const Home = ({ user }) => {
  const [currentFoodItem, setCurrentFoodItem] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const setNewCurrentFoodItem = async () => {
    if (recipeStack.stackEmpty()) {
      setLoading(true);
      await recipeStack.refreshStack();
      setLoading(false);
    }

    if (recipeStack.stackEmpty()) {
      setNoResults(true);
    }
    setCurrentFoodItem(recipeStack.getTopRecipe());
  };

  useEffect(async () => {
    if (!user) {
      return Router.push(PATH_LOGIN_ERROR);
    }
    userObj = new User(
      user.username,
      new Filter(
        user.filterQuery,
        user.mealType,
        user.cusineType,
        user.dishType
      ),
      []
    );
    recipeStack = new RecipeStack(userObj);

    setNewCurrentFoodItem();
  }, []);

  const like = () => {
    if (!noResults) {
      saveLike(user.username, currentFoodItem.name);
      saveRecipe(
        currentFoodItem.name,
        currentFoodItem.url,
        currentFoodItem.ingredients,
        currentFoodItem.calories,
        currentFoodItem.cautions,
        currentFoodItem.image,
        currentFoodItem.cuisineType,
        currentFoodItem.mealType,
        currentFoodItem.dishType
      );

      recipeStack.acceptTopRecipe();
      setNewCurrentFoodItem();
    }
  };

  const reject = () => {
    if (!noResults) {
      recipeStack.rejectTopRecipe();
      setNewCurrentFoodItem();
    }
  };

  useKeypress(['ArrowLeft', 'ArrowRight'], (event) => {
    if (event.key === 'ArrowLeft') {
      like();
    } else {
      reject();
    }
  });

  const onUpdateFilters = async () => {
    setLoading(true);
    const userFilter = userObj.getFilter();

    await fetch('/api/filter', {
      method: 'GET',
      headers: {
        username: userObj.getName(),
        filterQuery: userFilter.getQuery(),
        mealType: userFilter.getMealType(),
        cuisineType: userFilter.getCuisineType(),
        dishType: userFilter.getDishType(),
      },
    });

    await recipeStack.refreshStack();
    setLoading(false);
    if (recipeStack.stackEmpty()) {
      setNoResults(true);
    } else {
      setNoResults(false);
      setCurrentFoodItem(recipeStack.getTopRecipe());
    }
  };

  return (
    <Layout
      buttons={['filter', 'chats', 'profile']}
      user={userObj}
      onUpdateFilters={onUpdateFilters}
    >
      <div className='container'>
        <Grid
          rows={['auto', 'auto']}
          columns={['xsmall', 'auto', 'xsmall']}
          gap='small'
          areas={[
            { name: 'left', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
            { name: 'right', start: [2, 0], end: [2, 0] },
            { name: 'foot', start: [0, 1], end: [2, 1] },
          ]}
          margin='medium'
        >
          <Box gridArea='left'>
            <Button
              id='left-arrow'
              data-testid='left-arrow'
              icon={<Close color='dark-2' size='x-large' />}
              hoverIndicator
              style={{ paddingTop: 250, paddingBottom: 250 }}
              onClick={reject}
              tip={{
                content: 'Click to pass on this recipe.',
              }}
            />
          </Box>
          <Box gridArea='main'>
            {loading ? (
              <Spinner />
            ) : (
              <Card
                id='food-item-card'
                fill='vertical'
                width='large'
                background='light-1'
                style={{ alignItems: 'center' }}
              >
                <CardHeader
                  pad='medium'
                  width='100%'
                  background='light-3'
                  style={{ justifyContent: 'center' }}
                >
                  <Text size='large'>
                    {!noResults && currentFoodItem?.name}
                  </Text>
                </CardHeader>
                <CardBody pad='medium'>
                  {!noResults && (
                    <Image
                      data-testid='food-item-img'
                      src={currentFoodItem?.image}
                      fit='contain'
                    />
                  )}
                  {noResults ? (
                    <Text size='medium' margin='small'>
                      No Results! Try changing your filters.
                    </Text>
                  ) : (
                    <Text size='medium' margin='small'>
                      Calories: {Math.floor(currentFoodItem?.calories)}
                      <br />
                      Cautions:{' '}
                      {currentFoodItem?.cautions?.length
                        ? currentFoodItem?.cautions.map((caution, i) =>
                            i == 0 ? `${caution}` : `, ${caution}`
                          )
                        : 'None'}
                    </Text>
                  )}
                </CardBody>
              </Card>
            )}
          </Box>
          <Box gridArea='right'>
            <Button
              id='right-arrow'
              icon={<Favorite color='dark-2' size='x-large' />}
              hoverIndicator
              style={{ paddingTop: 250, paddingBottom: 250 }}
              onClick={like}
              tip={{
                content: 'Click to like this recipe!',
              }}
            />
          </Box>
          <Box gridArea='foot' align='center'>
            <Text size='small' margin='small' color='status-ok' weight='bold'>
              Note: You can also use the left and right arrow keys to "swipe"
              through items! (LEFT to REJECT, RIGHT to LIKE)
            </Text>
          </Box>
        </Grid>

        <style jsx>{`
          .container {
            min-height: 50vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const username = getUsernameFromCookie(context);
  
  const user = await getUser(username);
  return {
    props: { user },
  };
};
