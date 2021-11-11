import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import Router from 'next/router';
import Layout from '../components/Layout';
import { PATH_AUTHENTICATE, PATH_LOGIN } from '../paths';

const Register = () => {
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
              // TODO: Check existing users
              // Create user token
              Router.push({
                pathname: PATH_AUTHENTICATE,
                query: { username: username },
              });
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
            <Box>
              <Text size='small'>
                Already have an account? Log in <a href={PATH_LOGIN}>here</a>.
              </Text>
              <Box pad='small'>
                <Button type='submit' primary label='register' />
              </Box>
            </Box>
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
