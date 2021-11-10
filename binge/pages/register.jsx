import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import Layout from '../components/Layout';

const Register = () => {
  return (
    <Layout>
      <div className='container'>
        <Text size='large'>Register</Text>
        <Form onSubmit={({ value }) => {}}>
          <FormField name='username' label='username'>
            <TextInput name='username' placeholder='username' />
          </FormField>
          <FormField name='password' label='password'>
            <TextInput name='password' placeholder='password' type='password' />
          </FormField>
          <Text size='small'>
            Already have an account? Log in <a href='/login'>here</a>.
          </Text>
          <Box>
            <Button type='submit' primary label='register' />
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
    </Layout>
  );
};

export default Register;
