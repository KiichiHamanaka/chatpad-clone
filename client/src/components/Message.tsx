import React from "react";
import styled from "styled-components";
import { MessageTypes } from "../../../types";
import { socket } from "../context/socket";

const System = styled.div`
  padding: 8px 16px;
  margin: 5px 5px;
  background-color: #ffe2c6;
  border: 0.5px solid white;
  border-radius: 5px;
`;
const Me = styled.div`
  width: fit-content;
  margin: 5px 0 5px auto;
  padding: 8px 16px;
  background-color: lightgreen;
  border: 0.5px solid white;
  border-radius: 5px;
`;
const Enemy = styled.div`
  width: fit-content;
  margin: 5px auto 5px 0;
  text-align: left;
  padding: 8px 16px;
  border: 0.5px solid white;
  border-radius: 5px;
  background-color: lightgrey;
`;

const Message = (props: MessageTypes) => {
  if (props.callBy === "SYSTEM") {
    return <System>{props.body}</System>;
  } else if (props.callBy === "ENEMY" || props.author !== socket.id) {
    return <Enemy>{props.body}</Enemy>;
  } else {
    return <Me>{props.body}</Me>;
  }
};

export default Message;
