import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "src/context/socket";
import Button from "src/components/Button";
import styled from "styled-components";
import { userInfoContext } from "../context/userInfo";

const Container = styled.div`
  display: flex;
`;

const TextBox = styled.textarea`
  width: 500px;
  height: 30px;
  border-radius: 5px;
  margin: 0 5px;
  padding: 8px 16px;
  font-size: 16px;
  resize: none;
  border: 1px solid lightgray;

  &:focus {
    outline: none;
    border: 1px solid lightgreen;
  }
`;

const InputArea = () => {
  const socket = useContext(SocketContext);
  const userInfo = useContext(userInfoContext);
  const [isJoin, setIsJoin] = useState(true);

  useEffect(() => {
    if (isJoin) {
      socket.emit("JOIN_REQUEST", userInfo);
    } else {
      socket.emit("LEAVE_REQUEST");
    }
  }, [isJoin]);

  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    if (text != null) socket.emit("Entering now"); //ユーザIDも送る？
  };

  const sendMessage = () => {
    if (text != "") socket.emit("MESSAGE", { author: socket.id, body: text });
    setText("");
  };

  return (
    <Container>
      <Button
        onClick={() => setIsJoin(!isJoin)}
        body={isJoin ? "チャット終了" : "新規チャット"}
        state={"JOIN"}
      />
      <TextBox value={text} onChange={handleChange} />
      <Button onClick={sendMessage} body={"発言"} state={"TALK"} />
    </Container>
  );
};

export default InputArea;
