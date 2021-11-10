import Layout from '../components/Layout';

// TODO: hard coded values
const name = 'Joe Bruin';

const Profile = () => (
  <Layout>
    <div className='container'>
      <h1>picture here</h1>
      <h1>{name}</h1>

      <button>Edit</button>

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

      <button>Logout</button>
    </div>
  </Layout>
);

export default Profile;
