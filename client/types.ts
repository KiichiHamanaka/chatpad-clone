export type MessageType = {
    roomID:string
    author:string
    body:string
}

export type UserType = {
    id: string
    name: string | null
    icon: string | null
    isJoin: boolean
    isEnter: boolean
}

export type RoomType = {
    id: string
    userA: UserType
    userB: UserType
    messages: MessageType[]
}
