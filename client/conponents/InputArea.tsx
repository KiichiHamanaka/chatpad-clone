import React, {useState, useContext, useEffect} from 'react';
import {SocketContext} from 'context/socket';
import StartMatchButton from "conponents/StartMatchButton"
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`

const Button = styled.button`
  width: 150px;
  border-radius: 5px;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  margin: 0 5px;
  border: 1px solid lightgray;
  background-color: lightcoral;
`

const TextBox = styled.textarea`
  width: 500px;
  height: 30px;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 16px;
  resize: none;
  border: 1px solid lightgray;

  &:focus {
    outline: none;
    border: 1px solid lightgreen;
  }
`

const InputArea = () => {
    const socket = useContext(SocketContext);
    const [text,setText] = useState('')

    const handleChange = (event) => {
        setText(event.target.value)
        if(text!=null)socket.emit('Entering now') //ユーザIDも送る？

    };

    const sendText = () => {
        if(text!='')socket.emit('MESSAGE', {author: socket.id, body: text}) //userのisJoinがtrueも条件に加える
        setText('')
    }

    return(
        <Container>
            <StartMatchButton/>
            <TextBox value={text} onChange={handleChange}/>
            <Button onClick={sendText}>発言</Button>
        </Container>
    )
}

export default InputArea
