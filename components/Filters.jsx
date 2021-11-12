import { Box, Menu } from 'grommet';

const Filters = () => {
  return (
  <Box width="small" border={{ color: 'brand', size: 'medium' }}>
    <Menu
      label="Meal Type"
      items={[
        { label: 'Breakfast', onClick: () => {} },
        { label: 'Lunch', onClick: () => {} },
        { label: 'Dinner', onClick: () => {} },
      ]}
    />
    <Menu
      label="Cuisine Type"
      items={[
        { label: 'American', onClick: () => {} },
        { label: 'Korean', onClick: () => {} },
        { label: 'Mediterranean', onClick: () => {} },
        { label: 'Chinese', onClick: () => {} },
      ]}
    />
  </Box>
)};

export default Filters;
