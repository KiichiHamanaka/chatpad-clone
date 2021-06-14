import { MessageType, RoomType, UserType } from "../types";

export const createUser = (id: string): UserType => {
  return {
    id: id,
    name: null,
    icon: null,
    profile: null,
    url: null,
    isJoin: false,
    isEnter: false,
  };
};

export const createRoom = (
  id: string,
  userA: UserType,
  userB: UserType
): RoomType => {
  return { id: id, userA: userA, userB: userB, messages: [] };
};

export const createMessage = (
  id: string,
  body: string,
  author: string
): MessageType => {
  return { roomID: id, author: author, body: body };
};
