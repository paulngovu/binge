import { Box, Button, Grid, Text, TextArea } from 'grommet';
import { Checkmark } from 'grommet-icons';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { PATH_API_BIO, PATH_LOGIN_ERROR, PATH_LOGOUT } from '../paths';
import {
  TESTID_PROFILE_BIO_BUTTON,
  TESTID_PROFILE_BIO_FIELD,
} from '../testIds';
import { getUser } from '../utils/dbUsers';
import { getUsernameFromCookie } from '../utils/getUsernameFromCookie';

const saveBio = async (username, bio) => {
  const content = { username: username, bio: bio };
  const response = await fetch(PATH_API_BIO, {
    method: 'GET',
    headers: {
      content: JSON.stringify(content),
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

const Profile = ({ user }) => {
  const [bio, setBio] = useState(user.bio);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      Router.push(PATH_LOGIN_ERROR);
    }
  })

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = async () => {
    closeModal();

    try {
      await saveBio(user.username, bio.trim());
    } catch (err) {
      console.log(err);
    } finally {
      Router.reload();
    }
  };

  return (
    <Layout buttons={['home']}>
      <Box pad='large'>
        <div className='container'>
          <img className='profile-img' src='/joe-bruin.jpg' />
          <Box pad='medium' align='center'>
            <Text weight='bold' size='large'>
              {user.username}
            </Text>
          </Box>
          {showModal ? null : (
            <div className='bio-container'>
              <Text size='medium' wordBreak='break-all'>
                {bio}
              </Text>
            </div>
          )}
          {showModal ? (
            <Box margin={{ top: 'xsmall', bottom: 'medium' }}>
              <label htmlFor='name'>New bio (200 characters max):</label>
              <Grid
                rows={['small', 'xxsmall']}
                columns={['medium']}
                gap='xsmall'
                areas={[
                  { name: 'input', start: [0, 0], end: [0, 0] },
                  { name: 'submit', start: [0, 1], end: [0, 1] },
                ]}
              >
                <TextArea
                  gridArea='input'
                  type='text'
                  id='bio'
                  name='bio'
                  size='small'
                  maxLength='200'
                  resize={false}
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
                  label='Submit'
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
            .bio-container {
              border: 1px dotted #ff5050;
              border-radius: 5px;
              width: 30vw;
              height: 30vh;
              padding: 1vw;
              margin-bottom: 2vh;
              white-space: pre-line;
              overflow: auto;
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
