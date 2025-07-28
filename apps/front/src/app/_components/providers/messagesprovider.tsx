'use client';

import { redirect } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { authClient } from '@/components/utils/auth';
import { MessagesContext } from '../contexts/messagescontext';
import { IMessage } from '../interfaces/messages.interface';

export default function MessagesProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [selectedChat, setSelectedChat] = useState<string>('friend-1');
	const [message, setMessage] = useState('');
	const [showScrollToBottom, setShowScrollToBottom] = useState(false);
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [userId, setUserId] = useState<string>('');

	useEffect(() => {
		async function isLogged() {
			const session = await authClient.getSession();
			if (!session.data || session.error) redirect('/login');
			setUserId(session.data.user.id);
		}

		isLogged();
	}, []);

	if (!userId)
		return (
			<main className="min-h-screen w-full bg-[#020617] relative">
				{/* Dark Radial Glow Background */}
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: `radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)`,
					}}
				/>
				<div className="w-screen h-screen overflow-hidden flex justify-center items-center">
					<h1 className="text-white font-bold text-3xl">Carregando usuario</h1>
				</div>
			</main>
		);

	return (
		<MessagesContext.Provider
			value={{
				selectedChat,
				setSelectedChat,
				message,
				setMessage,
				showScrollToBottom,
				setShowScrollToBottom,
				messages,
				setMessages,
			}}
		>
			{children}
		</MessagesContext.Provider>
	);
}
