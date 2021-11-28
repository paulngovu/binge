import Layout from '../components/Layout';

import {
  Box,
  Button,
  Grid,
  Text
} from 'grommet';
import { Send } from 'grommet-icons';

import { useRef, useEffect, useState } from 'react';

import { PrismaClient, Message, Prisma } from '@prisma/client';
// import { useState } from 'react';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  let messages = await prisma.message.findMany({
    where: {
      username: {
        equals: "user"
      }
    }
  });
  messages = messages.map(mes => {
    mes.timeSent = JSON.parse(JSON.stringify(mes.timeSent));
    return mes;
  })

  let groupedMessages = messages.reduce((r, a) => {
    r[a.foodname] = r[a.foodname] || [];
    r[a.foodname].push(a)
    return r;
  }, Object.create(null));

  const likes = await prisma.like.findMany({
    where: {
      username: {
        equals: "user"
      }
    }
  })
  let likedFoods = likes.map(like => like.foodname)

  return {
    props: {
      allMessages: groupedMessages,
      foodChats: likedFoods
    }
  };
}

async function saveMessage(message, foodname, sentByUser) {
  var isoDate = new Date().toISOString();
  const messageInstance = {
    sentByUser: sentByUser,
    username: "user",
    foodname: foodname,
    message: message,
    timeSent: isoDate
  };


  const response = await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(messageInstance)
  })
}

export default function Chats({ allMessages, foodChats }) {
  // scroll to bottom of overflow
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const messagesEndRef = useRef(null);
  const [currentChat, setCurrentChat] = useState(foodChats[0]);
  const [activeOption, setActiveOption] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState(allMessages);

  const chatMessages = [
    'Hello!', 
    'What are your ingredients?',
    'What is the recipe?',
    'What is your cuisine type?',
    'Any allergies or cautions?'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChat]);

  const onSubmit = async () => {
    // post message to database and clear input line
    try {
      await saveMessage(chatMessage, currentChat, true);
      console.log(chatMessage);
      setChatMessage("");
      setActiveOption(null);

      // include following line if sending a message doesn't scroll chat to bottom
      // scrollToBottom();
    } catch (err) {
      console.log(err);
    }
  };

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
          // messages is a map of foodid => array of all message objects
          // between current user and food of foodid
          foodChats.map(foodName => (
          <Box 
            key={foodName}
            border={"bottom"} 
            background={currentChat == foodName ? "light-4" : ""}
            onClick={() => setCurrentChat(foodName)}
            focusIndicator={false}
          >
            <Text 
              margin="medium" 
              color={currentChat == foodName ? "black" : "white"}
            >
              {foodName}
            </Text>
          </Box> )
          )
        }
      </Box>
      <Box 
        background="light-2" 
        gridArea="messages" 
        overflow="auto" 
        border={true}
      >
        {
          Object.keys(messages).map((key) =>
            key == currentChat ?
              messages[key].map(msg => 
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
          <Box
            gridArea="message"
            overflow="auto" 
          >
            <div css="display: flex;">
              <Button 
                label={chatMessages[0]} 
                margin="xsmall" 
                active={activeOption == 0} 
                onClick={() => {setActiveOption(0); setChatMessage(chatMessages[0]);}}
              />
              <Button 
                label={chatMessages[1]}
                margin="xsmall" 
                active={activeOption == 1}
                onClick={() => {setActiveOption(1); setChatMessage(chatMessages[1]);}}
              />
              <Button 
                label={chatMessages[2]}
                margin="xsmall" 
                active={activeOption == 2}
                onClick={() => {setActiveOption(2); setChatMessage(chatMessages[2]);}}
              />
              <Button 
                label={chatMessages[3]}
                margin="xsmall" 
                active={activeOption == 3}
                onClick={() => {setActiveOption(3); setChatMessage(chatMessages[3]);}}
              />
              <Button 
                label={chatMessages[4]}
                margin="xsmall" 
                active={activeOption == 4}
                onClick={() => {setActiveOption(4); setChatMessage(chatMessages[4]);}}
              />
            </div>
          </Box>
          <Box gridArea="send" align="center" justify="center">
            <Button 
              icon={<Send color='black' />}
              onClick={() => onSubmit()}
              hoverIndicator
              tip={{
                content: "send"
              }}
            />
          </Box>
        </Grid>
      </Box>
    </Grid>
  </Layout>
  );
};


