import Layout from '../components/Layout';
import Filter from '../edamamAPI/Filter';
import User from '../classes/User';
import RecipeStack from '../classes/RecipeStack';

import { FormNext, FormPrevious } from 'grommet-icons';

import { useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  Grid,
  Image,
  Text
} from 'grommet';

// SWIPE PAGE

// Dummy user for now
const user = new User("Gordon", new Filter("", "", "", ""), []);
const recipeStack = new RecipeStack(user);

const Home = () => {
  const [currentFoodItem, setCurrentFoodItem] = useState(null);
  
  const setNewCurrentFoodItem = async () => {
    if (recipeStack.stackEmpty()) {
      await recipeStack.refreshStack();
    }
    setCurrentFoodItem(recipeStack.getTopRecipe());
  }

  useEffect(async () => {
    setNewCurrentFoodItem();
  }, []);

  const like = () => {
    recipeStack.rejectTopRecipe();
    setNewCurrentFoodItem();
  }

  const reject = () => {
    recipeStack.acceptTopRecipe();
    setNewCurrentFoodItem();
  }

  useKeypress(['ArrowLeft', 'ArrowRight'], (event) => {
    if (event.key === 'ArrowLeft') {
      like();
    } else {
      reject();
    }
  });

  return (
    <Layout
      buttons={["filter", "chats", "profile"]}
      user={user}
      onUpdateFilters={async () => {
        await recipeStack.refreshStack();
        setCurrentFoodItem(recipeStack.getTopRecipe());
      }}
    >
      <div className="container">
        <Grid
          rows={['auto']}
          columns={['xsmall', 'auto', 'xsmall']}
          gap="small"
          areas={[
            { name: 'left', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [1, 0], end: [1, 0] },
            { name: 'right', start: [2, 0], end: [2, 0] },
          ]}
          margin="large"
        >
          <Box gridArea="left">
            <Button
              id="left-arrow"
              data-testid="left-arrow"
              icon={
                <FormPrevious
                  color='dark-1'
                  size='large'
                />
              }
              hoverIndicator
              style={{ paddingTop: 250, paddingBottom: 250 }}
              onClick={reject}
              tip={{
                content: "Click to pass on this recipe."
              }}
            />
          </Box>
          <Box gridArea="main">
            <Card
              data-testid="food-item-card"
              fill="vertical"
              width="large"
              background="light-1"
              style={{ alignItems: "center" }}
            >
              <CardHeader
                pad="medium"
                width="100%"
                background="light-3"
                style={{ justifyContent: "center" }}
              >
                <Text size="large">
                  {currentFoodItem?.name}
                </Text>
              </CardHeader>
              <CardBody pad="medium">
                <Image data-testid="food-item-img" src={currentFoodItem?.image} fit="contain" />
                <Text size="medium" margin="small">
                  Calories: {Math.floor(currentFoodItem?.calories)}<br />
                  Cautions: {
                    currentFoodItem?.cautions?.length ? 
                      currentFoodItem?.cautions.map(
                        (caution, i) => i == 0 ? `${caution}` : `, ${caution}`
                      ) : "None"
                  }
                </Text>
              </CardBody>
            </Card>
          </Box>
          <Box gridArea="right">
            <Button
              data-testid="right-arrow"
              icon={
                <FormNext
                  color='dark-1'
                  size='large'
                />
              }
              hoverIndicator
              style={{ paddingTop: 250, paddingBottom: 250 }}
              onClick={like}
              tip={{
                content: "Click to like this recipe!"
              }}
            />
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
  )
}

export default Home;