import React from 'react';
import {MessageType} from "types";
import {socket} from "../context/socket";
import styled from "styled-components";

const MessageBox = styled.div`
  padding: 8px 16px;
  margin: 5px 5px;
  background-color: #ffe2c6;
  border: 0.5px solid white;
  border-radius: 5px;
`
const Me = styled.div`
  width: fit-content;
  margin: 5px 0 5px auto;
  padding: 8px 16px;
  background-color: lightgreen;
  border: 0.5px solid white;
  border-radius: 5px;
`
const Enemy = styled.div`
  width: fit-content;
  margin: 5px auto 5px 0;
  text-align: left;
  padding: 8px 16px;
  border: 0.5px solid white;
  border-radius: 5px;
  background-color: lightgrey;
`

const Message = (props:MessageType) => {
    if(props.author === 'SYSTEM'){
        return(
            <MessageBox>
                {props.body}
            </MessageBox>
        )
    }else if(props.author === socket.id){ //CSSで右に表示
        return(
            <Me>
                {props.body}
            </Me>
        )
    }else{ //CSSで左に表示
        return(
            <Enemy>
                {props.body}
            </Enemy>
        )
    }

}

export default Message

