import React from "react";
import ProfileArea from "./ProfileArea";
import MessageField from "./MessageField";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const ChatField = () => {
  return (
    <Container>
      <ProfileArea />
      <MessageField />
      <ProfileArea />
    </Container>
  );
};

export default ChatField;
