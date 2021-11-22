import { Box, Button, CheckBox, Select, Text, TextInput } from 'grommet';

import React, { useState } from 'react';

const mealTypes = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack',
  'Teatime'
];
const cuisineTypes = [
 'American',
  'Asian',
  'British',
  'Caribbean',
  'Central Europe',
  'Chinese',
  'Eastern Europe',
  'French',
  'Indian',
  'Italian',
  'Japanese',
  'Kosher',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'South American',
  'South East Asian',
]
const dishTypes = [
  'Alcohol-cocktail',
  'Biscuits and cookies',
  'Bread',
  'Cereals',
  'Condiments and sauces',
  'Drinks',
  'Desserts',
  'Egg',
  'Main course',
  'Omelet',
  'Pancake',
  'Preps',
  'Preserve',
  'Salad',
  'Sandwiches',
  'Soup',
  'Starter',
]

const Option = React.memo(({ value, selected }) => (
  <Box direction="row" gap="small" align="center" pad="xsmall">
    <CheckBox tabIndex="-1" checked={selected} onChange={() => {}} />
    {value}
  </Box>
));

const Filters = ({onSubmit, ...props}) => {
  const [queryString, setQueryString] = useState(props.user.getFilter().getQuery());
  const [mealType, setMealType] = useState(props.user.getFilter().getMealType());
  const [cuisineType, setCuisineType] = useState(props.user.getFilter().getCuisineType());
  const [dishType, setDishType] = useState(props.user.getFilter().getDishType());

  return (
    <Box width="small" gap="xsmall" pad="medium">
      <Text size="small">
        Keywords (optional)
      </Text>
      <TextInput
        placeholder="Type here"
        value={queryString}
        onChange={event => setQueryString(event.target.value)}
      />
      <Text size="small">
        Meal Type
      </Text>
      <Select
        multiple
        closeOnChange={false}
        placeholder="All"
        value={mealType}
        options={mealTypes}
        onChange={({ option }) => {
          const i = mealType.indexOf(option);
          if (i === -1) {
            setMealType([...mealType, option]);
          } else {
            setMealType(mealType.filter((v, index) => index !== i));
          }
        }}
      >
        {(option, index) => (
          <Option value={option} selected={mealType.indexOf(option) !== -1} />
        )}
      </Select>
      <Text size="small">
        Cuisine Type
      </Text>
      <Select
        multiple
        closeOnChange={false}
        dropHeight="medium"
        placeholder="All"
        value={cuisineType}
        options={cuisineTypes}
        onChange={({ option }) => {
          const i = cuisineType.indexOf(option);
          if (i === -1) {
            setCuisineType([...cuisineType, option]);
          } else {
            setCuisineType(cuisineType.filter((v, index) => index !== i));
          }
        }}
      >
        {(option, index) => (
          <Option value={option} selected={cuisineType.indexOf(option) !== -1} />
        )}
      </Select>
      <Text size="small">
        Dish Type
      </Text>
      <Select
        multiple
        closeOnChange={false}
        dropHeight="medium"
        placeholder="All"
        value={dishType}
        options={dishTypes}
        onChange={({ option }) => {
          const i = dishType.indexOf(option);
          if (i === -1) {
            setDishType([...dishType, option]);
          } else {
            setDishType(dishType.filter((v, index) => index !== i));
          }
        }}
      >
        {(option, index) => (
          <Option value={option} selected={dishType.indexOf(option) !== -1} />
        )}
      </Select>
      <Button
        primary
        label="Update"
        onClick={() => {
          onSubmit(queryString, mealType, cuisineType, dishType);
        }}
      />
    </Box>
  );
};

export default Filters;
