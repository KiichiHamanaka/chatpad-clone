import React from 'react';
import {MessageType} from "types";

const LeftMessage = (props:MessageType) => {
    return(
        <div>
            {props.body}
        </div>
    )
}

export default LeftMessage
