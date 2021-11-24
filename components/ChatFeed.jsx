import Layout from './Layout';
import chatMessages from './chatMessages';

import {
  Box,
  Button,
  Grid,
  Text,
  TextInput
} from 'grommet';
import { Send } from 'grommet-icons';

import { useRef, useEffect, useState } from 'react';
import useKeypress from 'react-use-keypress';

const ChatFeed = () => {
  // scroll to bottom of overflow
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const messagesEndRef = useRef(null);
  const [currentChat, setCurrentChat] = useState(0);
  const [chatMessage, setChatMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat]);
  
  const onSubmit = () => {
    // TODO: post message to database
    console.log(chatMessage);
    setChatMessage("");
  };

  useKeypress(['Enter'], () => {
    onSubmit();
    scrollToBottom();
  });

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
          height="88vh"
      >
      <Box 
        background="dark-4" 
        gridArea="sidebar" 
        border={true}
      >
        {
          chatMessages.map((food,index) => 
          <Box 
            key={food.foodId} 
            border={"bottom"} 
            background={currentChat == index ? "light-4" : ""}
            onClick={() => setCurrentChat(index)}
            focusIndicator={false}
          >
            <Text 
              margin="medium" 
              color={currentChat == index ? "black" : "white"}
            >
              {food.foodName}
            </Text>
          </Box> )
        }            
      </Box>
      <Box 
        background="light-2" 
        gridArea="messages" 
        overflow="auto" 
        border={true}
      >
        {
          chatMessages.map((chat,index) => 
            index == currentChat ? 
              chat.messages.map(msg => 
                <div 
                  key={msg.id}
                  style={{
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
        {/* dummy div to pin bottom of messages */}
        <div ref={messagesEndRef}></div>
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
          <TextInput
            plain={true}
            focusIndicator={false}
            value={chatMessage}
            placeholder={"send your message here..."}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          </Box>
          <Box gridArea="send" align="center" justify="center">
            <Button 
              icon={<Send color='black' />}
              onClick={() => onSubmit()}
              hoverIndicator
              tip={{
                content: "press enter/click here to send"
              }}
            />
          </Box>
        </Grid>
      </Box>
    </Grid>
  </Layout>
  );
};

export default ChatFeed;