'use client';

import { ChevronDown, MoreVertical, Send } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMessages } from './contexts/messagescontext';
import Emojis from './emojis.component';

export default function Chat() {
	const {
		setMessage,
		message,
		messages,
		showScrollToBottom,
		setShowScrollToBottom,
		userId,
		socket,
	} = useMessages();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const scrollAreaRef = useRef<HTMLDivElement>(null);
	const format = (d: string | number | Date) => {
		d = new Date(d);
		return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Scroll para o final apenas se a última mensagem foi enviada pelo usuário
		if (messages.length > 0 && messages[messages.length - 1].id === userId) {
			scrollToBottom();
		}
	}, [messages]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const scrollArea = scrollAreaRef.current;
		if (!scrollArea) return;

		const handleScroll = () => {
			const scrollElement = scrollArea.querySelector(
				'[data-radix-scroll-area-viewport]',
			);
			if (!scrollElement) return;

			const { scrollTop, scrollHeight, clientHeight } = scrollElement;
			const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

			// Mostra o botão se estiver mais de 200px do final
			setShowScrollToBottom(distanceFromBottom > 200);
		};

		const scrollElement = scrollArea.querySelector(
			'[data-radix-scroll-area-viewport]',
		);
		if (scrollElement) {
			scrollElement.addEventListener('scroll', handleScroll);
			return () => scrollElement.removeEventListener('scroll', handleScroll);
		}
	}, []);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
		setShowScrollToBottom(false);
	};

	const handleSendMessage = async () => {
		if (message.trim() && message.length <= 200) {
			socket.emit('message', message);
			setMessage('');
		}
	};

	return (
		<div className="overflow-hidden h-screen max-h-screen w-full flex flex-col relative">
			{/* Header do Chat */}
			<div className="p-6 backdrop-blur-sm select-none">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Avatar className="h-10 w-10">
							<AvatarImage src="/placeholder.svg?height=40&width=40" />
							<AvatarFallback className="bg-black text-white">
								CG
							</AvatarFallback>
						</Avatar>
						<div>
							<h2 className="font-semibold text-black">Chat Global</h2>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 text-black hover:text-white hover:bg-black"
						>
							<MoreVertical className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Botão para voltar ao final */}
			{showScrollToBottom && (
				<div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
					<Button
						onClick={scrollToBottom}
						className="bg-rose-900 hover:bg-rose-700 text-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-sm"
					>
						<ChevronDown className="h-4 w-4" />
						Voltar ao final
					</Button>
				</div>
			)}

			{/* Área de Mensagens */}
			<ScrollArea
				className="flex-1 overflow-auto px-6 py-4"
				ref={scrollAreaRef}
			>
				<div className="space-y-4">
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={`flex ${msg.userId === userId ? 'justify-end' : 'justify-start'}`}
						>
							<div
								className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
									msg.userId === userId
										? 'bg-rose-900 text-white rounded-br-md'
										: 'bg-black text-white rounded-bl-md'
								}`}
							>
								{msg.userId !== userId && (
									<p className="text-xs font-semibold text-rose-600 mb-1">
										{msg?.User?.name}
									</p>
								)}
								<div className="flex items-end gap-2">
									<p className="text-sm leading-relaxed">{msg.text}</p>
									<p
										className={`text-xs mt-2 select-none ${msg.userId === userId ? 'text-rose-100' : 'text-gray-500'}`}
									>
										{format(msg.createdAt)}
									</p>
								</div>
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			</ScrollArea>

			{/* Input de Mensagem */}
			<div className="p-6 rounded-3xl mb-2 backdrop-blur-sm">
				<div className="flex items-end gap-3">
					<div className="flex-1">
						<div className="flex items-center gap-3 mb-3">
							<Emojis />
							<span
								className={`text-xs ${message.length > 180 ? 'text-red-500' : 'text-gray-400'}`}
							>
								{message.length}/200
							</span>
						</div>
						<Input
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Digite sua mensagem..."
							maxLength={200}
							className="bg-gray-50 text-black border-0 focus-visible:ring-1 focus-visible:ring-rose-500 rounded-xl py-3"
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									handleSendMessage();
								}
							}}
						/>
					</div>
					<Button
						onClick={handleSendMessage}
						disabled={!message.trim() || message.length > 200}
						className="h-12 w-12 rounded-xl bg-rose-900 hover:bg-rose-700"
					>
						<Send className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
