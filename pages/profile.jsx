import { Box, Button } from 'grommet';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { PATH_LOGOUT } from '../paths';

const Profile = () => {
  // TODO: hard coded default values
  const [name, setName] = useState('Joe Bruin');
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
          <h1>{name}</h1>
          {showModal ? (
            <Box margin='medium'>
              <label htmlFor='name'>New name (15 characters max):</label>
              <input
                type='text'
                id='name'
                name='name'
                maxLength='15'
                data-testid='input-name'
                onChange={(e) => setName(e.target.value)}
              ></input>
              <button onClick={onSubmit}>Submit</button>
            </Box>
          ) : null}
          <Button secondary label='Edit' onClick={openModal}></Button>
          <Box pad='small'>
            <Button
              secondary
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
