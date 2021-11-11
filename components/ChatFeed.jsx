import Layout from './Layout';

import {
  Box,
  Text
} from 'grommet';

const ChatFeed = () => {
  return (
    <Layout buttons={["home"]}>
    <Box
      direction="row"
      border={{ color: 'brand', size: 'xsmall' }}
      height="100vh"
    >
      <Box background="dark-4" width="25vw">
        <Text margin="medium" color="white">Food Item A</Text>
        <Text margin="medium" color="white">Food Item B</Text>
        <Text margin="medium" color="white">Food Item C</Text>
      </Box>
      <Box background="light-2" width="75vw" />
    </Box>
  </Layout>
  );
};

export default ChatFeed;