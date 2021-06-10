import {Server, Socket} from "socket.io";

const eventHandler = async (io:Server, socket:Socket, event:string) => {
    let roomsCount = 0
    let roomSockets = await io.in(`room ${roomsCount}`).fetchSockets();
    switch (event) {
        case "JOIN_REQUEST":
            console.log(`room ${roomsCount}は${roomSockets.length}人います`)
            while(true){
                if(roomSockets.length < 2){
                    socket.join(`room ${roomsCount}`)
                    roomSockets = await io.in(`room ${roomsCount}`)
                        .fetchSockets();
                    console.log(`${socket.id} join to room ${roomsCount}`)
                    socket.to(socket.id).emit('MESSAGE',`room ${roomsCount}`)
                    if(roomSockets.length === 2){
                        socket.to(`room ${roomsCount}`)
                            .emit("MATCH_START",
                                roomSockets.map((data)=>data.id))
                        return
                    }
                    return
                }else{
                    roomsCount++
                    roomSockets = await io.in(`room ${roomsCount}`).fetchSockets();
                    console.log(`${roomSockets.length} peoples in room ${roomsCount}`)
                }
            }
            break;
        case "LEAVE_REQUEST":
            console.log(`${socket.id} leave room ${roomsCount}`)
            roomsCount = 0
            break;
        case "MESSAGE":
            socket.to(`room ${roomsCount}`).emit("MESSAGE",
                {
                    body:'aaaa',
                    userid:socket.id
                })
            break;
        case "disconnect":
            socket.to(`room ${roomsCount}`).emit("MESSAGE",
                {
                    userid:socket.id
                })
            break;
        default:
            console.log("not exist request");
    }
}

export default eventHandler
