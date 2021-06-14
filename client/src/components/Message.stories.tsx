import React from "react";
import Message from "./Message";

export default {
  title: "Message",
};

export const showMessageBy = () => <Message author={"me"} body={"Hi!"} />;
export const showMessageBySystem = () => (
  <Message author={"SYSTEM"} body={"Hi!"} />
);
export const showMessageByEnemy = () => (
  <Message author={"other"} body={"Hi!"} />
);
