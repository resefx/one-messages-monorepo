'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { authClient } from '@/components/utils/auth';
import { MessagesContext } from '../contexts/messagescontext';
import { IMessage } from '../interfaces/messages.interface';

const socket = io('http://localhost:3003', {
	autoConnect: false,
	withCredentials: true,
});

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
	const router = useRouter();

	useEffect(() => {
		if (userId && socket.disconnected) {
			socket.connect();
			console.log('miasuu');
			socket.on('message', (event) => {
				setMessages((prev) => [...prev, event]);
			});
		}

		return () => {
			if (userId && socket.connected) socket.disconnect();
		};
	}, [userId]);

	useEffect(() => {
		if (userId) {
			axios.get('http://localhost:3003/messages').then((resp) => {
				console.log({
					msg: resp,
				});
				setMessages(resp.data);
			});
		}
	}, [userId]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const loginAndConnect = async () => {
			try {
				// Sessão
				const session = await authClient.getSession();
				if (!session.data || session.error) {
					console.error('Sessão inválida:', session.error);
					router.push('/login');
					return;
				}

				setUserId(session.data.user.id);
			} catch (err) {
				console.error('Erro geral:', err);
				router.push('/login');
			}
		};

		loginAndConnect();
	}, []);

	if (!userId)
		return (
			<main className="min-h-screen w-full bg-[#020617] relative">
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
				userId,
				setUserId,
				socket,
			}}
		>
			{children}
		</MessagesContext.Provider>
	);
}
