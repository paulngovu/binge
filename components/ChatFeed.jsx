import Layout from './Layout';
import chatMessages from './chatMessages';

import {
  Box,
  Button,
  Grid,
  Paragraph,
  Text
} from 'grommet';
import { Send } from 'grommet-icons';
import { useState } from 'react';

const ChatFeed = () => {
  const [currentChat, setCurrentChat] = useState(0);

  return (
    <Layout buttons={["home"]}>
      <Grid
          rows={['auto', 'xsmall']}
          columns={['small', 'auto']}
          areas={[
            { name: 'sidebar', start: [0, 0], end: [0, 1] },
            { name: 'messages', start: [1, 0], end: [1, 0] },
            { name: 'input', start: [1,1], end: [1,1] },
          ]}
          height="85vh"
      >
      <Box background="dark-4" gridArea="sidebar" border={"right"}>
        {
          chatMessages.map((food,index) => 
          <Box key={food.foodId} 
               border={"bottom"} 
               background={currentChat == index ? "light-4" : ""}
               onClick={() => setCurrentChat(index)}>
            <Text margin="medium" 
                  color={currentChat == index ? "black" : "white"}>
                {food.foodName}
            </Text>
          </Box> )
        }            
      </Box>
      <Box background="light-2" gridArea="messages" overflow="auto" border={true}>
      {
          chatMessages.map((chat,index) => 
            index == currentChat ? 
              chat.messages.map(msg => 
                <div style={{
                  border: "1px solid black",
                  borderRadius: "2vw",
                  margin: msg.sentByUser? "0vh 1vw 2vh 5vw" : 
                                          "0vh 5vw 2vh 1vw",
                  background: msg.sentByUser ? "#3471eb" : "light-4",
                  padding: "1vw"
                }}
                >
                  <Text color={msg.sentByUser ? "white" : "black"}>
                    {msg.timeSent}
                  </Text>
                  <br />
                  <Text color={msg.sentByUser ? "white" : "black"}>
                    {msg.message}
                  </Text>
                </div>
              )
            : null)
      }    
      </Box>
      <Box gridArea="input" border={true}>
        <Grid
          rows={['auto']}
          columns={['auto', 'xxsmall']}
          areas={[
            { name: 'message', start: [0, 0], end: [0,0] },
            { name: 'send', start: [1, 0], end: [1, 0] }
          ]}
          height="100%"
        >
          <Box gridArea="message">
          <textarea
            style={{resize: "none", height: "100%", width: "100%"}}
          />
          </Box>
          <Box gridArea="send" align="center" justify="center">
            <Button 
              icon={<Send color='black' />}
            />
          </Box>
        </Grid>
      </Box>
    </Grid>
  </Layout>
  );
};

export default ChatFeed;