export interface IContact {
    id: string;
    name: string;
    avatar: string;
    status?: 'online' | 'offline';
    lastMessage: string;
    lastMessageTime: number;
    type: 'friend' | 'group';
    memberCount?: number;
}

export interface IMessage {
    // id: string;
    // sender: string;
    // content: string;
    // timestamp: string;
    // isOwn: boolean;

    id: string;
    text: string;
    userId: string;
    createdAt: Date;
}

export interface IFixedMessage {
    // id: string;
    // content: string;
    // timestamp: string;

    id: string;
    text: string;
    messages: IMessage;
}