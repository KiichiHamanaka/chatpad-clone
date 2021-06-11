import React, {useContext, useEffect, useState} from 'react';
import {MessageType} from "types";
import {SocketContext} from "../context/socket";
import Message from "./Message";

const MessageField = () => {
    const socket = useContext(SocketContext);
    const [messages,setMessages] = useState<Array<MessageType>>([])
    useEffect(() => {
        console.log(messages)
    },[messages]);

    socket.on('MESSAGE',(data)=>{
        console.log(`get a message.`)
        console.log(data)
        setMessages([...messages,data])
    })

    if(messages.length === 0){
        return <div>
                    <Message author={"message.author"} body={"message.body"}/>
                </div>
    }else{
        return(
            <div>
                <Message author={"message.author"} body={"messa"}/>
            </div>
        )
    }

}

export default MessageField
