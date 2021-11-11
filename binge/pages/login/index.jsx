import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { PATH_AUTHENTICATE, PATH_REGISTER } from '../../paths';
import { isValidCredentials } from '../../utils/isValidCredentials';

const Login = () => {
  const [error, setError] = useState('');

  return (
    <Layout>
      <Box pad='large'>
        <div className='container'>
          <Text size='large'>Login</Text>
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
                  query: { username: username },
                });
              }
            }}
          >
            <FormField name='username' label='username' required>
              <TextInput name='username' placeholder='username' />
            </FormField>
            <FormField name='password' label='password' required>
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
              <Button type='submit' primary label='Log In' />
            </Box>
            <Text size='small' color='status-critical'>
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
