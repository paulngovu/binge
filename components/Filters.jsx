import { Box, Button, Select, Text } from 'grommet';

import { useState } from 'react';

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

const Filters = ({onSubmit, ...props}) => {
  const [mealType, setMealType] = useState(null);
  const [cuisineType, setCuisineType] = useState(null);

  return (
    <Box width="small" gap="xsmall" pad="medium">
      <Text size="small">
        Meal Type
      </Text>
      <Select
        placeholder="All"
        clear
        value={mealType}
        options={mealTypes}
        onChange={({ option }) => { setMealType(option); }}
      />
      <Text size="small">
        Cuisine Type
      </Text>
      <Select
        placeholder="All"
        clear
        value={cuisineType}
        options={cuisineTypes}
        onChange={({ option }) => { setCuisineType(option); }}
      />
      <Button
        primary
        label="Update"
        onClick={onSubmit}
      />
    </Box>
  );
};

export default Filters;
