import { Box, Button, Grid, Text, TextArea } from 'grommet';
import { Checkmark } from 'grommet-icons';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { PATH_API_BIO, PATH_LOGOUT } from '../paths';
import {
  TESTID_PROFILE_BIO_BUTTON,
  TESTID_PROFILE_BIO_FIELD,
} from '../testIds';
import { getUser } from '../utils/dbUsers';
import { getUsernameFromCookie } from '../utils/getUsernameFromCookie';

const Profile = ({ user }) => {
  const name = user.username;
  const [bio, setBio] = useState(user.bio);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = () => {
    closeModal();
    Router.push({
      pathname: PATH_API_BIO,
      query: { username: name, bio: bio.trim() },
    });
  };

  return (
    <Layout buttons={['home']}>
      <Box pad='large'>
        <div className='container'>
          <img className='profile-img' src='/joe-bruin.jpg' />
          <Box pad='medium' align='center'>
            <Text weight='bold' size='large'>
              {name}
            </Text>
            <Text size='medium'>{bio}</Text>
          </Box>
          {showModal ? (
            <Box margin={{ top: 'xsmall', bottom: 'medium' }}>
              <label htmlFor='name'>New bio (200 characters max):</label>
              <Grid
                rows={['auto']}
                columns={['auto', 'xxsmall']}
                areas={[
                  { name: 'input', start: [0, 0], end: [0, 0] },
                  { name: 'submit', start: [1, 0], end: [1, 0] },
                ]}
              >
                <TextArea
                  gridArea='input'
                  type='text'
                  id='bio'
                  name='bio'
                  size='xsmall'
                  maxLength='200'
                  data-testid={TESTID_PROFILE_BIO_FIELD}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <Button
                  data-testid={TESTID_PROFILE_BIO_BUTTON}
                  a11yTitle='submit-bio'
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

export const getServerSideProps = async (context) => {
  const username = getUsernameFromCookie(context);
  const user = await getUser(username);
  return {
    props: { user: user },
  };
};
