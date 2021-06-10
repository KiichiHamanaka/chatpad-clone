import React from 'react';
import ProfileArea from "./ProfileArea";
import MessageField from "./MessageField";

const ChatField = () => {
    return(
        <div>
            <ProfileArea/>
            <MessageField/>
            <ProfileArea/>
        </div>
    )
}

export default ChatField
