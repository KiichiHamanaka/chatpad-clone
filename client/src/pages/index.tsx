import React from "react";
import InputArea from "src/components/InputArea";
import ChatField from "../components/ChatField";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const Home = () => {
  return (
    <Container>
      <ChatField />
      <InputArea />
    </Container>
  );
};

export default Home;
