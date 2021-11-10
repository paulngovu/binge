import Layout from '../components/Layout';
import Filter from '../edamamAPI/Filter';
import Recipe from '../edamamAPI/Recipe';

import { FormNext, FormPrevious } from 'grommet-icons';

import { useEffect, useState } from 'react';
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

const Home = () => {
  const [foodIndex, setFoodIndex] = useState(0);
  const [foodResponse, setFoodResponse] = useState([null]);

  const incrementIndex = () => {
    setFoodIndex(foodIndex == 19 ? 0 : foodIndex + 1);
  }

  useEffect(async () => {
    const filter = new Filter("", "", "", "");

    const foodJson = await filter.queryAPI();
    setFoodResponse(Recipe.parseJson(foodJson));
  }, []);

  return (
    <Layout buttons={["filter", "chats", "profile"]}>
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
          margin="medium"
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
              onClick={incrementIndex}
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
                  {foodResponse[foodIndex]?.name}
                </Text>
              </CardHeader>
              <CardBody pad="medium">
                <Image data-testid="food-item-img" src={foodResponse[foodIndex]?.image} fit="contain" />
                <Text size="medium" margin="small">
                  Calories: {Math.floor(foodResponse[foodIndex]?.calories)}<br />
                  Cautions: {
                    foodResponse[foodIndex]?.cautions.length ? 
                      foodResponse[foodIndex]?.cautions.map(
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
              onClick={incrementIndex}
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