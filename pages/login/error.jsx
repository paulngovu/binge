import { Box, Button, Image, Text } from 'grommet';
import Layout from '../../components/Layout';
import { PATH_LOGIN } from '../../paths';
import { TESTID_LOGIN_ERROR_BUTTON } from '../../testIds';

const LoginError = () => (
  <Layout>
    <Box pad='large'>
      <div className='container'>
        <Box height='xsmall'>
          <Image
            src='https://media.istockphoto.com/vectors/cartoon-cute-burger-icon-isolated-on-white-background-vector-id1142855781?k=20&m=1142855781&s=170667a&w=0&h=rBuRzFRXoS9jcc1FRL-rSexSP97wNsxhzJ-feGTeuJ4='
            fit="contain"
          />
        </Box> 
        <Text size='large'>You must log in.</Text>
        <Box pad='small'>
          <Button
            primary
            label='Log In'
            href={PATH_LOGIN}
            data-testid={TESTID_LOGIN_ERROR_BUTTON}
          />
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

export default LoginError;
