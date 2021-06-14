import socketio from "socket.io-client";
import React from "react";

const ENDPOINT = "http://127.0.0.1:3001";

export const socket = socketio(ENDPOINT);
export const SocketContext = React.createContext(null);
