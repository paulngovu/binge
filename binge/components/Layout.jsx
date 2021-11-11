import { Button, Grommet, Header, Heading } from 'grommet';
import { Chat, Filter, Home, User } from 'grommet-icons';
import Head from 'next/head';
import { PATH_CHATS, PATH_HOME, PATH_PROFILE } from '../paths';

const Layout = ({ buttons = [], ...props }) => {
  const theme = {
    global: {
      font: {
        family: 'Calibri',
        size: '14px',
        height: '20px',
      },
      colors: {
        // Overriding existing grommet colors
        brand: '#FF5050',

        // Setting new colors
        blue: '#00C8FF',

        // you can also point to existing grommet colors
        brightGreen: 'accent-1',
      },
    },
  };

  const showFilter = buttons.indexOf('filter') > -1;
  const showChats = buttons.indexOf('chats') > -1;
  const showProfile = buttons.indexOf('profile') > -1;
  const showHome = buttons.indexOf('home') > -1;

  return (
    <Grommet theme={theme}>
      <Head>
        <title>Binge</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header display='flex' background='brand' pad='medium' height='xsmall'>
        <Heading color='white'>Binge</Heading>
        <div alignself='end'>
          {showFilter ? (
            <Button icon={<Filter color='white' />} hoverIndicator />
          ) : null}
          {showChats ? (
            <Button
              icon={<Chat color='white' />}
              hoverIndicator
              href={PATH_CHATS}
            />
          ) : null}
          {showProfile ? (
            <Button
              icon={<User color='white' />}
              hoverIndicator
              href={PATH_PROFILE}
            />
          ) : null}
          {showHome ? (
            <Button
              icon={<Home color='white' />}
              hoverIndicator
              href={PATH_HOME}
            />
          ) : null}
        </div>
      </Header>
      {props.children}
    </Grommet>
  );
};

export default Layout;
