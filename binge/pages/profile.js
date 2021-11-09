import Layout from '../components/Layout';

const Profile = () => {
  return (
    <Layout>
      <div className="container">
        

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
  )
}

export default Profile;