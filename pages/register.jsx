import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { PATH_API_REGISTER, PATH_LOGIN } from '../paths';
import { getAllUsers } from '../utils/dbUsers';

const Register = ({ users }) => {
  const [error, setError] = useState('');

  const usernameAlreadyExists = (username) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        return true;
      }
    }
    return false;
  };

  return (
    <Layout>
      <Box pad='large'>
        <div className='container'>
          <Text size='large'>Register</Text>
          <Form
            onSubmit={({ value }) => {
              // guaranteed non empty
              const username = value.username;
              const password = value.password;

              if (usernameAlreadyExists(username)) {
                setError('Username is already taken.');
              } else {
                setError('Creating user and logging in...');

                // Create user token
                Router.push({
                  pathname: PATH_API_REGISTER,
                  query: {
                    username: username,
                    password: password,
                  },
                });
              }
            }}
          >
            <FormField name='username' label='username'>
              <TextInput name='username' placeholder='username' />
            </FormField>
            <FormField name='password' label='password'>
              <TextInput
                name='password'
                placeholder='password'
                type='password'
              />
            </FormField>
            <Text size='small'>
              Already have an account? Log in <a href={PATH_LOGIN}>here</a>.
            </Text>
            <Box pad='small'>
              <Button type='submit' primary label='register' />
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

export default Register;

export const getServerSideProps = async () => {
  const users = await getAllUsers();
  return { props: { users: users } };
};
