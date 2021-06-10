import React, {useState, useContext, useEffect} from 'react';
import {SocketContext} from 'context/socket';
import StartMatchButton from "conponents/StartMatchButton"

const InputArea = () => {
    const socket = useContext(SocketContext);
    const [text,setText] = useState('')

    const handleChange = (event) => {
        setText(event.target.value)
    };

    useEffect(() => {

    }, []);

    const sendText = () => {
        socket.emit('MESSAGE',text)
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
