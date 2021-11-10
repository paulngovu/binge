import Layout from '../components/Layout';
import {
  Box,
  Button
} from 'grommet';
import { useState } from 'react';

const Profile = () => {
  // TODO: hard coded default values
  const [name, setName] = useState("Joe Bruin");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const onSubmit = () => {
    closeModal();
  }

  return (
    <Layout buttons={["home"]}>
      <div className='container'>
        <img className="profile-img" src="/joe-bruin.jpg"/>
        <h1>{name}</h1>
        {showModal ? 
          <Box margin="medium">
            <label for="name">New name (15 characters max):</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              maxlength="15"
              onChange={(e) => setName(e.target.value)}></input>
            <button onClick={onSubmit}>Submit</button>
          </Box>
        : null}
        {/* <button onClick={openModal}>Edit</button> */}
        <Button secondary label='Edit' onClick={openModal}></Button>
        <style jsx>{`
          .container {
            min-height: 50vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .profile-img{
            border: 1px solid #FF5050;
            border-radius: 50%;
            width: 20%;
            height: 20%;
          }
        `}</style>

        <Button secondary label='Log Out' href="./login"></Button>
      </div>
    </Layout>
  )
}

export default Profile;
