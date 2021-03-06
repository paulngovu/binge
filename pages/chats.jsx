import Layout from '../components/Layout';
import { prisma } from '../utils/lib/db';
import { PATH_API_MESSAGES } from '../paths';

import { getUsernameFromCookie } from '../utils/getUsernameFromCookie';

import { Box, Button, Grid, Text } from 'grommet';
import { Send } from 'grommet-icons';

import { useRef, useEffect, useState } from 'react';

import { PrismaClient, Message, Prisma } from '@prisma/client';
import Recipe from '../edamamAPI/Recipe';
import Chatroom from '../classes/Chatroom';

export async function getServerSideProps(context) {
  const username = getUsernameFromCookie(context);

  let messages = await prisma.message.findMany({
    where: {
      username: {
        equals: username,
      },
    },
  });
  messages = messages.map((mes) => {
    mes.timeSent = JSON.parse(JSON.stringify(mes.timeSent));
    return mes;
  });

  let groupedMessages = messages.reduce((r, a) => {
    r[a.foodname] = r[a.foodname] || [];
    r[a.foodname].push(a);
    return r;
  }, Object.create(null));

  const likes = await prisma.like.findMany({
    where: {
      username: {
        equals: username,
      },
    },
  });
  let likedFoods = likes.map((like) => like.foodname);

  let allFoodData = [];
  for (var i = 0; i < likedFoods.length; i++) {
    let foodname = likedFoods[i];
    let foodData = await prisma.recipe.findFirst({
      where: {
        name: foodname,
      },
    });

    allFoodData.push(foodData);
  }

  return {
    props: {
      allMessages: groupedMessages,
      foodChats: likedFoods,
      foodData: allFoodData,
      username: username,
    },
  };
}

async function saveMessage(message, username, foodname, sentByUser) {
  var isoDate = new Date().toISOString();
  const messageInstance = {
    sentByUser: sentByUser,
    username: username,
    foodname: foodname,
    message: message,
    timeSent: isoDate,
  };

  const response = await fetch(PATH_API_MESSAGES, {
    method: 'GET',
    headers: {
      content: JSON.stringify(messageInstance),
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

let recipeObjects = [];
let chatroomObjects = new Map();

export default function Chats({ allMessages, foodChats, foodData, username }) {
  // scroll to bottom of overflow
  // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  const messagesEndRef = useRef(null);
  const [currentChat, setCurrentChat] = useState(foodChats[0]);
  const [activeOption, setActiveOption] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState(allMessages);

  const chatMessages = [
    'Hello!',
    'What is your recipe URL?',
    'What are your ingredients?',
    'How many calories do you contain?',
    'Are there any cautions I should be aware of?',
    'What is your meal type?',
    'What is your cuisine type?',
    'What is your dish type?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const createRecipes = () => {
    for (var i = 0; i < foodData.length; i++) {
      var f = foodData[i];

      var r = new Recipe(
        f.name,
        f.imageUrl,
        f.ingredients,
        f.cuisineType,
        f.mealType,
        f.dishType,
        '',
        f.calories,
        f.allergies,
        f.url
      );
      recipeObjects.push(r);
      chatroomObjects.set(f.name, new Chatroom(r));
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat, messages]);

  useEffect(() => {
    createRecipes();
  }, []);

  const formatTime = (time) => {
    const indexOfT = 10;
    const indexOfEnd = 19;
    let s =
      time.substring(0, indexOfT) +
      ' ' +
      time.substring(indexOfT + 1, indexOfEnd);
    return s;
  };

  const sendResponse = (savedMessage) => {
    return chatroomObjects
      .get(currentChat)
      .recipeResponse(savedMessage.message);
  };

  const onSubmit = async () => {
    // post message to database and clear input line
    try {
      // save user message
      const savedMessage = await saveMessage(
        chatMessage,
        username,
        currentChat,
        true
      );

      if (!messages.hasOwnProperty(currentChat)) {
        messages[currentChat] = [];
      }

      messages[currentChat].push(savedMessage);
      setMessages(messages);

      // generate & save food message
      const foodResponse = sendResponse(savedMessage);
      const savedFoodresponse = await saveMessage(
        foodResponse,
        username,
        currentChat,
        false
      );
      messages[currentChat].push(savedFoodresponse);
      setMessages(messages);

      // clean up
      setActiveOption(null);
      setChatMessage('');
      scrollToBottom();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout buttons={['username', 'home']} username={username}>
      <Grid
        rows={['auto', 'small']}
        columns={['small', 'auto']}
        areas={[
          { name: 'sidebar', start: [0, 0], end: [0, 1] },
          { name: 'messages', start: [1, 0], end: [1, 0] },
          { name: 'input', start: [1, 1], end: [1, 1] },
        ]}
        height='88vh'
      >
        <Box background='dark-4' overflow='auto' gridArea='sidebar' border={true}>
          {
            // messages is a map of foodid => array of all message objects
            // between current user and food of foodid
            foodChats.map((foodName) => (
              <div
                key={foodName}
                style={{
                  padding: "1vh",
                  backgroundColor: currentChat == foodName ? '#d3dfe3' : '',
                  borderBottom: '1px solid black',
                  cursor: "pointer"
                }}
                onClick={() => setCurrentChat(foodName)}
              >
                <Text
                  color={currentChat == foodName ? 'black' : 'white'}
                >
                  {foodName}
                </Text>
              </div>
            ))
          }
        </Box>
        <Box
          background='light-2'
          gridArea='messages'
          overflow='auto'
          border={true}
        >
          {Object.keys(messages).map((key) =>
            key == currentChat
              ? messages[key].map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      border: '1px solid black',
                      borderRadius: '2vw',
                      margin: msg.sentByUser
                        ? '0vh 1vw 2vh 5vw'
                        : '0vh 5vw 2vh 1vw',
                      background: msg.sentByUser ? '#FF5050' : 'light-4',
                      padding: '1vw',
                    }}
                  >
                    <Text color={msg.sentByUser ? 'white' : 'black'}>
                      {formatTime(msg.timeSent)}
                    </Text>
                    <br />
                    <Text color={msg.sentByUser ? 'white' : 'black'}>
                      {msg.message}
                    </Text>
                  </div>
                ))
              : null
          )}
          {/* dummy div to pin bottom of messages */}
          <div ref={messagesEndRef}></div>
        </Box>
        <Box gridArea='input' border={true}>
          {foodChats.length > 0 ? 
            <Grid
              rows={['auto']}
              columns={['auto', 'xxsmall']}
              areas={[
                { name: 'message', start: [0, 0], end: [0, 0] },
                { name: 'send', start: [1, 0], end: [1, 0] },
              ]}
              height='100%'
            >
              <Box gridArea='message' overflow='auto'>
                <div css='display: flex;'>
                  {chatMessages.map((msg, index) => (
                    <Button
                      key={msg}
                      label={msg}
                      margin='xsmall'
                      active={activeOption == index}
                      onClick={() => {
                        setActiveOption(index);
                        setChatMessage(msg);
                      }}
                    />
                  ))}
                </div>
              </Box>
              <Box gridArea='send' align='center' justify='center'>
                <Button
                  icon={<Send color='black' />}
                  onClick={() => onSubmit()}
                  hoverIndicator
                  tip={{
                    content: 'send',
                  }}
                />
              </Box>
            </Grid>
            : 
            <Text 
              margin="small"
              color="#646b6e"
              a11yTitle="default-text"
            >
              Chats will show up after you like a food item!
            </Text>
          }
        </Box>
      </Grid>
    </Layout>
  );
}
