export type MessageTypes = {
  callback?: Function;
  author: string;
  body: string;
};

export type UserType = {
  id: string;
  name: string | null;
  icon: string | null;
  profile: string | null;
  url: string | null;
  isJoin: boolean;
  isEnter: boolean;
};

export type RoomType = {
  id: string;
  userA: UserType;
  userB: UserType;
  messages: MessageTypes[];
};
