import { Box, Button, Text } from 'grommet';
import Layout from '../../components/Layout';
import { PATH_LOGIN } from '../../paths';

const Error = () => (
  <Layout>
    <Box pad='large'>
      <div className='container'>
        <Text size='large'>You must log in.</Text>
        <Box pad='small'>
          <Button primary label='Log In' href={PATH_LOGIN} />
        </Box>
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
    </Box>
  </Layout>
);

export default Error;
