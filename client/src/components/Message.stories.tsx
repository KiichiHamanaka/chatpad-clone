import React from "react";
import Message from "./Message";

export default {
  title: "Message",
};

export const showMessageMe = () => <Message callBy="ME" body={"hi"} />;
export const showMessageSystem = () => <Message callBy="SYSTEM" body={"hi"} />;
export const showMessageEnemy = () => <Message callBy="ENEMY" body={"hi"} />;
export const showMessageError = () => <Message body="hi" callBy={"ERROR"} />;
