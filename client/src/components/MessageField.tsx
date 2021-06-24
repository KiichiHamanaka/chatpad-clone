import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket";
import Message from "./Message";
import styled from "styled-components";
import { MessageTypes, UserType } from "types";
import { SystemMessages } from "SystemMessages";

const MessageBox = styled.div`
  overflow: scroll;
  padding: 8px 16px;
  margin: 0 5px;
  width: 500px;
  height: 400px;
  border: 0.5px solid lightgray;
  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border: 1px solid lightgray;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border-left: solid 1px #ececec;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    box-shadow: inset 0 0 0 2px #fff;
  }
`;

const MessageField = () => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<Array<MessageTypes>>([
    {
      callBy: "SYSTEM",
      body: SystemMessages.Connect,
    },
  ]);
  const [enemy, setEnemy] = useState<UserType>();
  useEffect(() => {}, [messages]);

  socket.on("MESSAGE", (data) => {
    setMessages([...messages, data]);
  });
  socket.on("MATCH_START", (data) => {
    const message: MessageTypes = {
      callBy: "SYSTEM",
      body: SystemMessages.StartMatch,
    };
    setMessages([...messages, message]);
    setEnemy(data);
  });
  if (messages.length === 0) {
    return <div />;
  } else {
    return (
      <MessageBox>
        {messages.map((message, index) => (
          <Message
            key={index}
            author={message.author}
            callBy={message.callBy}
            body={message.body}
          />
        ))}
      </MessageBox>
    );
  }
};

export default MessageField;
