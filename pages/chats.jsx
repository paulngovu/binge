import ChatFeed from '../components/ChatFeed';

import { PrismaClient, Message, Prisma } from '@prisma/client';
import { useState } from 'react';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const messages = await prisma.message.findMany({
    where: {
      username: {
        equals: "user"
      }
    }
  });

  return {
    props: {
      allMessages: messages
    }
  };
}

async function saveMessage(message) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify(message)
  })
}

export default function Chats({ allMessages }) {
  const [messages, setMessages] = useState(allMessages);
  return <ChatFeed existingMessages={ messages }/>
}


