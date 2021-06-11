import React, {useState, useContext, useEffect} from 'react';
import {SocketContext} from 'context/socket';
import StartMatchButton from "conponents/StartMatchButton"
import {MessageType} from "../types";

const InputArea = () => {
    const socket = useContext(SocketContext);
    const [text,setText] = useState('')

    const handleChange = (event) => {
        setText(event.target.value)
        if(text!=null)socket.emit('Entering now') //ユーザIDも送る？

    };

    const sendText = () => {
        if(text!='')socket.emit('MESSAGE', {author: socket.id, body: text})
        setText('')
    }

    return(
        <div>
            <StartMatchButton/>
            <textarea value={text} onChange={handleChange}/>
            <button onClick={sendText}>発言</button>
        </div>
    )
}

export default InputArea
