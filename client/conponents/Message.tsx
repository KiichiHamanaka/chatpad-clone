import React from 'react';
import {MessageType} from "types";

const Message = (props:MessageType) => {
    return(
        <div>
            {props.body}
        </div>
    )
}

export default Message

