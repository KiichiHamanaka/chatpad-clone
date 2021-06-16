import React, { useContext, useEffect, useState } from "react";
import { MessageTypes, UserType } from "types";
import { SocketContext } from "../context/socket";
import Message from "./Message";
import styled from "styled-components";

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
      author: "SYSTEM",
      body: "どもー。ChatPadシステムです(・Д・)ノチャットが始まる前に少しだけ利用規約のお話をさせてね！\n・楽しいチャットにするために相手を不快にする発言はしないでね\n・恋人探しや、会うことだけを目的にした利用はしないようにね\n個人情報は自分で守ってね\nチャット本文やスクリーンショットを第三者に公開しないでね\n違法行為や犯罪行為、営利行為につながる発言は禁止だよ\n\nみんなが楽しく使えるチャットサービスにするためにChatPadとの約束だよ！ (・Д・)b",
    },
  ]);
  const [enemy, setEnemy] = useState<UserType>();
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  socket.on("MESSAGE", (data) => {
    console.log(`get a message.`);
    console.log(data);
    setMessages([...messages, data]);
  });
  socket.on("MATCH_START", (data) => {
    const message: MessageTypes = {
      author: "SYSTEM",
      body: "ChatPadシステムです (・Д・)\nチャット相手が見つかったので\nチャットを始めるよー！\n",
    };
    console.log(`match!`);
    console.log(data);
    setMessages([...messages, message]);
    setEnemy(data);
  });
  if (messages.length === 0) {
    return <div />;
  } else {
    return (
      <MessageBox>
        {messages.map((message, index) => (
          <Message key={index} author={message.author} body={message.body} />
        ))}
      </MessageBox>
    );
  }
};

export default MessageField;
