import { Box, Button, Grid, Text, TextInput } from 'grommet';
import { Checkmark } from 'grommet-icons';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { PATH_LOGOUT } from '../paths';
import { getUsername } from '../utils/getUsername';

const Profile = ({ username }) => {
  const [name, setName] = useState(username);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    closeModal();
  };

  return (
    <Layout buttons={['home']}>
      <Box pad='large'>
        <div className='container'>
          <img className='profile-img' src='/joe-bruin.jpg' />
          <Text
            weight='bold'
            size='large'
            margin={{ top: '1vh', bottom: '2vh' }}
          >
            {name}
          </Text>
          {showModal ? (
            <Box margin={{ top: 'xsmall', bottom: 'medium' }}>
              <label htmlFor='name'>New name (20 characters max):</label>
              <Grid
                rows={['auto']}
                columns={['auto', 'xxsmall']}
                areas={[
                  { name: 'input', start: [0, 0], end: [0, 0] },
                  { name: 'submit', start: [1, 0], end: [1, 0] },
                ]}
              >
                <TextInput
                  gridArea='input'
                  type='text'
                  id='name'
                  name='name'
                  size='xsmall'
                  maxLength='20'
                  data-testid='input-name'
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  data-testid='submit-btn'
                  a11yTitle='submit-name'
                  gridArea='submit'
                  secondary
                  plain={false}
                  icon={<Checkmark size='small' />}
                  onClick={onSubmit}
                ></Button>
              </Grid>
            </Box>
          ) : null}
          <Button secondary label='Edit' onClick={openModal}></Button>
          <Box pad='small'>
            <Button
              primary
              label='Log Out'
              onClick={(event) => {
                event.preventDefault();
                fetch(PATH_LOGOUT, { credentials: 'same-origin' }).then(
                  (res) => {
                    if (res.ok) {
                      // Reloading page moves to login because of token check
                      Router.reload();
                    }
                  }
                );
              }}
            ></Button>
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
            .profile-img {
              border: 1px solid #ff5050;
              border-radius: 50%;
              width: 20%;
              height: 20%;
            }
          `}</style>
        </div>
      </Box>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = (context) => ({
  props: { username: getUsername(context) },
});
