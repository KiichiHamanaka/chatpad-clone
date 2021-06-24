import { Server, Socket } from "socket.io";
import { UserType, MessageTypes } from "types";
import { SystemMessages } from "../SystemMessages";

class eventHandle {
  io: Server;
  socket: Socket;
  roomsCount: number;
  roomSockets?: any[];
  me?: UserType;
  enemy?: UserType;
  // roomNoで管理するのを辞めたい

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.socket = socket;
    this.roomsCount = 0;
  }

  async joinRequest() {
    this.roomSockets = await this.io
      .in(`room ${this.roomsCount}`)
      .fetchSockets();
    if (this.roomSockets.length < 2) {
      this.socket.join(`room ${this.roomsCount}`);
      this.io.in(`room ${this.roomsCount}`).emit("MESSAGE", {
        body: SystemMessages.Matching,
        callBy: "SYSTEM",
      });
      this.roomSockets = await this.io
        .in(`room ${this.roomsCount}`)
        .fetchSockets();
      if (this.roomSockets.length === 2) {
        this.io.in(`room ${this.roomsCount}`).emit(
          "MATCH_START",
          this.roomSockets.map((data: any) => data.id)
        );
        return;
      }
      return;
    } else {
      this.roomsCount++;
      this.roomSockets = await this.io
        .in(`room ${this.roomsCount}`)
        .fetchSockets();
    }
  }
  leaveRequest() {
    this.io.in(`room ${this.roomsCount}`).emit("MESSAGE", {
      body: SystemMessages.LeaveMatch,
      state: "SYSTEM",
      callBy: "SYSTEM",
    });
    this.socket.leave(`room ${this.roomsCount}`);
    this.roomsCount = 0;
  }
  sendMessage(data: MessageTypes) {
    this.io.in(`room ${this.roomsCount}`).emit("MESSAGE", {
      body: data.body,
      author: this.socket.id,
    });
  }
  updateUserInfo(userInfo: UserType) {
    this.me = userInfo;
  }
  updateEnemyInfo(userInfo: UserType) {
    this.me = userInfo;
  }
  disconnect() {
    this.io.in(`room ${this.roomsCount}`).emit("MESSAGE", {
      body: SystemMessages.Disconnect,
      state: "SYSTEM",
      callBy: "SYSTEM",
    });
    this.socket.leave(`room ${this.roomsCount}`);
    this.roomsCount = 0;
  }
}

export default eventHandle;
