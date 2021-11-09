import Head from 'next/head';

import { Heading, Header, Grommet } from 'grommet';

const Layout = (props) => {
  const theme = {
    global: {
      font: {
        family: 'Calibri',
        size: '14px',
        height: '20px',
      },
      colors: {
        // Overriding existing grommet colors
        brand: "#FF5050",

        // Setting new colors
        blue: "#00C8FF",

        // you can also point to existing grommet colors
        brightGreen: "accent-1",
      }
    },
  };

  return (
    <Grommet theme={theme}>
      <Head>
        <title>Binge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header background="brand" pad="medium" height="xsmall">
        <Heading color="white" margin="auto">Binge</Heading>
      </Header>

      {props.children}
  </Grommet>);
}

export default Layout;