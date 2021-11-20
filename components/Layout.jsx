import { Button, Grommet, Header, Heading, Drop } from 'grommet';
import { Chat, Filter, Home, User } from 'grommet-icons';
import { useState, useRef } from 'react';
import Head from 'next/head';
import { PATH_CHATS, PATH_HOME, PATH_PROFILE } from '../paths';
import Filters from './Filters';

const Layout = ({ buttons = [], ...props }) => {
  const [showFiltersDrop, setShowFiltersDrop] = useState(false);

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

  const ref = useRef();

  const toggleFiltersDrop = () => {
    setShowFiltersDrop(!showFiltersDrop);
  }

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
            <>
              <Button
                ref={ref}
                icon={<Filter color='white' />}
                hoverIndicator
                onClick={toggleFiltersDrop}
              />
              {showFiltersDrop && ref && <Drop
                align={{ bottom: 'top', right: 'right' }}
                target={ref.current}
                responsive
                onClickOutside={() => {setShowFiltersDrop(false)}}
              >
                <Filters onSubmit={() => {
                  setShowFiltersDrop(false);
                }} />
              </Drop>}
            </>
          ) : null}
          {showChats ? (
            <Button
              icon={<Chat color='white' />}
              hoverIndicator
              href={PATH_CHATS}
              tip={{
                content: "Chats"
              }}
            />
          ) : null}
          {showProfile ? (
            <Button
              icon={<User color='white' />}
              hoverIndicator
              href={PATH_PROFILE}
              tip={{
                content: "Profile"
              }}
            />
          ) : null}
          {showHome ? (
            <Button
              icon={<Home color='white' />}
              hoverIndicator
              href={PATH_HOME}
              tip={{
                content: "Home  "
              }}
            />
          ) : null}
        </div>
      </Header>
      {props.children}
    </Grommet>
  );
};

export default Layout;
