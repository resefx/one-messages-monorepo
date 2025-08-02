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
    User: {
        name: string;
    };
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
}

export interface IPosts {
    id: string;
    text: string;
}