import Layout from '../components/Layout';

import { Card, CardHeader, CardBody, Text } from 'grommet';

// SWIPE PAGE

const Home = () => {
  return (
    <Layout buttons={["filter", "chats", "profile"]}>
      <div className="container">
        <Card
          height='medium'
          width='large'
          background='light-1'
          style={{ alignItems: 'center' }}
        >
          <CardHeader
            pad='medium'
            width='100%'
            background='light-3'
            style={{ justifyContent: 'center' }}
          >
            <Text size='large'>Food Name</Text>
          </CardHeader>
          <CardBody pad='medium'>
            <Text size='medium'>Image, Description</Text>
          </CardBody>
        </Card>

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

export default Home;
