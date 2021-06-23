import socketio from "socket.io-client";
import React from "react";

const ENDPOINT = "https://lit-wildwood-00941.herokuapp.com/";

export const socket = socketio(ENDPOINT);
export const SocketContext = React.createContext(null);
