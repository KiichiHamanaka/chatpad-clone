import React, {useState, useContext, useEffect} from 'react';
import {SocketContext} from 'context/socket';
import {userInfoContext} from 'context/userInfo';

const StartMatchButton = () => {
    const socket = useContext(SocketContext);
    const userInfo = useContext(userInfoContext)
    const [isJoin,setIsJoin] = useState(false)

    useEffect(() => {
        console.log(`${isJoin}`)
        if(isJoin){
            console.log(userInfo)
            socket.emit("JOIN_REQUEST");
        }else{
            socket.emit("LEAVE_REQUEST");
        }
    }, [isJoin]);

    return(
        <button onClick={()=>setIsJoin(!isJoin)}>
            { isJoin ? 'チャット終了' : '新規チャット' }
        </button>
    )
}

export default StartMatchButton
