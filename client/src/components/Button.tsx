import React from "react";
import styled from "styled-components";

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  body: string;
  state: "JOIN" | "TALK";
};

const JoinButton = styled.button`
  width: 156px;
  border-radius: 5px;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid lightgray;
  background-color: silver;
`;

const TalkButton = styled.button`
  width: 156px;
  border-radius: 5px;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid lightgray;
  background-color: lightcoral;
`;

const Button = (props: ButtonProps) => {
  if (props.state === "JOIN") {
    return <JoinButton onClick={props.onClick}>{props.body}</JoinButton>;
  } else {
    return <TalkButton onClick={props.onClick}>{props.body}</TalkButton>;
  }
};

export default Button;
