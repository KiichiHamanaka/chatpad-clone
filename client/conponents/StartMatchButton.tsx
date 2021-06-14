import React, {useState, useContext, useEffect} from 'react';
import {SocketContext} from 'context/socket';
import {userInfoContext} from 'context/userInfo'
import styled from 'styled-components'

const Button = styled.button`
  width: 150px;
  border-radius: 5px;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid lightgray;
  background-color: silver;
`

const StartMatchButton = () => {
    const socket = useContext(SocketContext);
    const userInfo = useContext(userInfoContext)
    const [isJoin,setIsJoin] = useState(true)

    useEffect(() => {
        console.log(`${isJoin}`)
        if(isJoin){
            console.log(userInfo)
            socket.emit("JOIN_REQUEST",userInfo);
        }else{
            socket.emit("LEAVE_REQUEST");
        }
    }, [isJoin]);

    return(
        <Button onClick={()=>setIsJoin(!isJoin)}>
            { isJoin ? 'チャット終了' : '新規チャット' }
        </Button>
    )
}

export default StartMatchButton
