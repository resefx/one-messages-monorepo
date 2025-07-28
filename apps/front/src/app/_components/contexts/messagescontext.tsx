'use client';

import { createContext, useContext } from 'react';
import { IMessage } from '../interfaces/messages.interface';

interface IMessageContext {
    selectedChat: string;
    setSelectedChat: (value: string) => void;

    message: string;
    setMessage: (value: string) => void;

    showScrollToBottom: boolean;
    setShowScrollToBottom: (value: boolean) => void;

    messages: IMessage[];
    setMessages: (value: IMessage[]) => void;
}

export const MessagesContext = createContext<IMessageContext | undefined>(undefined);

export function useMessages(): IMessageContext {
    const context = useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
}
