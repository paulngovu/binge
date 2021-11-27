import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { PATH_AUTHENTICATE, PATH_REGISTER } from '../../paths';
import {
  TESTID_LOGIN_BUTTON,
  TESTID_LOGIN_ERROR_MSG,
  TESTID_LOGIN_PASSWORD,
  TESTID_LOGIN_TITLE,
  TESTID_LOGIN_USERNAME,
} from '../../testIds';
import { getAllUsers } from '../../utils/dbUsers';

const Login = ({ users }) => {
  const [error, setError] = useState('');

  const isValidCredentials = (username, password) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        return true;
      }
    }
    return false;
  };

  return (
    <Layout>
      <Box pad='large'>
        <div className='container'>
          <Text size='large' data-testid={TESTID_LOGIN_TITLE}>
            Login
          </Text>
          <Form
            onSubmit={({ value }) => {
              // guaranteed non empty
              const username = value.username;
              const password = value.password;
              if (!isValidCredentials(username, password)) {
                setError('Invalid credentials.');
              } else {
                setError('Logging in...');
                // Create user token
                Router.push({
                  pathname: PATH_AUTHENTICATE,
                  query: {
                    username: username,
                    password: password,
                  },
                });
              }
            }}
          >
            <FormField
              name='username'
              label='username'
              required
              data-testid={TESTID_LOGIN_USERNAME}
            >
              <TextInput name='username' placeholder='username' />
            </FormField>
            <FormField
              name='password'
              label='password'
              required
              data-testid={TESTID_LOGIN_PASSWORD}
            >
              <TextInput
                name='password'
                placeholder='password'
                type='password'
              />
            </FormField>
            <Text size='small'>
              Don't have an account? Sign up <a href={PATH_REGISTER}>here</a>.
            </Text>
            <Box pad='small'>
              <Button
                type='submit'
                primary
                label='Log In'
                data-testid={TESTID_LOGIN_BUTTON}
              />
            </Box>
            <Text
              size='small'
              color='status-critical'
              data-testid={TESTID_LOGIN_ERROR_MSG}
            >
              {error}
            </Text>
          </Form>

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
};

export default Login;

export const getServerSideProps = async () => {
  const users = await getAllUsers();
  return { props: { users: users } };
};
