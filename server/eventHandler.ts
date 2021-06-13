import {Server, Socket} from "socket.io";
import {MessageType, UserType} from "./types";

class eventHandle  {
    io: Server
    socket: Socket
    roomsCount: number
    roomSockets?: any[]
    me?:UserType
    enemy?:UserType
    // roomNoで管理するのを辞めたい

    constructor(io: Server, socket: Socket) {
        this.io = io
        this.socket = socket
        this.roomsCount = 0
    }

    async joinRequest(){
        this.roomSockets = await this.io.in(`room ${this.roomsCount}`).fetchSockets();
        console.log(this.roomSockets)
        console.log(`${this.roomSockets.length} peoples in room ${this.roomsCount}`)
        while(true){
            if(this.roomSockets.length < 2){
                this.socket.join(`room ${this.roomsCount}`)
                this.io.in(`room ${this.roomsCount}`).emit("MESSAGE",
                    {
                        body:'ChatPadシステムです (・Д・)\nチャット相手を探してるのでしばらく待ってね！',
                        userid:'SYSTEM'
                    })
                this.roomSockets = await this.io.in(`room ${this.roomsCount}`)
                    .fetchSockets();
                console.log(`${this.socket.id} join to room ${this.roomsCount}`)
                if(this.roomSockets.length === 2){
                    console.log(`room ${this.roomsCount} is match!`)
                    this.io.in(`room ${this.roomsCount}`)
                        .emit("MATCH_START", this.roomSockets.map((data:any)=>data.id))
                    return
                }
                return
            }else{
                this.roomsCount++
                this.roomSockets = await this.io.in(`room ${this.roomsCount}`).fetchSockets();
                console.log(`${this.roomSockets.length} peoples in room ${this.roomsCount}`)
            }
        }
    }
    leaveRequest(){
        console.log(`${this.socket.id} leave room ${this.roomsCount}`)
        this.io.in(`room ${this.roomsCount}`).emit("MESSAGE",
            {
                body:'お疲れ～っす。ChatPadシステムです (・Д・)\nチャットを終了したよ！\n新しい相手とチャットするには\n新規チャットボタンをポチッとな～♪　 (・Д・)b\n',
                userid:this.socket.id
            })
        this.socket.leave(`room ${this.roomsCount}`)
        this.roomsCount = 0
    }
    sendMessage(data:MessageType){
        console.log(data)
        this.io.in(`room ${this.roomsCount}`).emit("MESSAGE",
            {
                body:data.body,
                userid:this.socket.id
            })
        console.log('Send Message!')
    }
    updateUserInfo(userInfo:UserType){
        this.me = userInfo
    }
    updateEnemyInfo(userInfo:UserType){
        this.me = userInfo
    }
    disconnect(){
        // isJoinを戻すようにemitする
        this.io.in(`room ${this.roomsCount}`).emit("MESSAGE",
            {
                body:'どもー。ChatPadシステムです (・Д・;)チャット相手がチャットを終了したよ！\n新しい相手とチャットするには\n新規チャットボタンをクリック、クリック～♪　 (・Д・)b',
                userid:this.socket.id
            })
        this.socket.leave(`room ${this.roomsCount}`)
        this.roomsCount = 0
    }
}

export default eventHandle

// const eventHandler = async (io:Server, socket:Socket, event:string, data?:any) => {
//     let roomsCount = 0
//     let roomSockets = await io.in(`room ${roomsCount}`).fetchSockets();
//
//     switch (event) {
//         case "JOIN_REQUEST":
//             console.log(roomSockets) //配列じゃないとおかしい
//             console.log(`${roomSockets.length} peoples in room ${roomsCount}`)
//             while(true){
//                 if(roomSockets.length < 2){
//                     socket.join(`room ${roomsCount}`)
//                     io.in(`room ${roomsCount}`).emit("MESSAGE",
//                         {
//                             body:'ChatPadシステムです (・Д・)\nチャット相手を探してるのでしばらく待ってね！',
//                             userid:'SYSTEM'
//                         })
//                     roomSockets = await io.in(`room ${roomsCount}`)
//                         .fetchSockets();
//                     console.log(`${socket.id} join to room ${roomsCount}`)
//                     if(roomSockets.length === 2){
//                         console.log(`room ${roomsCount} is match!`)
//                         io.in(`room ${roomsCount}`)
//                             .emit("MATCH_START", roomSockets.map((data)=>data.id))
//                         return
//                     }
//                     return
//                 }else{
//                     roomsCount++
//                     roomSockets = await io.in(`room ${roomsCount}`).fetchSockets();
//                     console.log(`${roomSockets.length} peoples in room ${roomsCount}`)
//                 }
//             }
//         case "LEAVE_REQUEST":
//             console.log(`${socket.id} leave room ${roomsCount}`)
//             roomsCount = 0
//             break;
//         case "MESSAGE":
//             console.log(data)
//             io.in(`room ${roomsCount}`).emit("MESSAGE",
//                 {
//                     body:data.body,
//                     userid:socket.id
//                 })
//             console.log('Send Message!')
//             break;
//         case "ENTERING":
//             io.in(`room ${roomsCount}`).emit("MESSAGE",
//                 {
//                     userid:socket.id
//                 })
//             break;
//         case "ENTERING_CANCEL":
//             io.in(`room ${roomsCount}`).emit("MESSAGE",
//                 {
//                     userid:socket.id
//                 })
//             break;
//         case "UPDATE_USERINFO":
//             io.in(`room ${roomsCount}`).emit("MESSAGE",
//                 {
//                     userid:socket.id
//                 })
//             break;
//         case "disconnect":
//             io.in(`room ${roomsCount}`).emit("MESSAGE",
//                 {
//                     body:'どもー。ChatPadシステムです (・Д・;)チャット相手がチャットを終了したよ！\nもしチャットした相手が不快な人だったらここを押して教えてね。\n新しい相手とチャットするには\n新規チャットボタンをクリック、クリック～♪　 (・Д・)b',
//                     userid:socket.id
//                 })
//             break;
//         default:
//             console.log("not exist request");
//     }
// }
//
