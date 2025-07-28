'use client';

import { ChevronDown, MoreVertical, Send } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMessages } from './contexts/messagescontext';
import Emojis from './emojis.component';
import { IMessage } from './interfaces/messages.interface';

export default function Chat() {
	const {
		setMessage,
		message,
		messages,
		setMessages,
		showScrollToBottom,
		setShowScrollToBottom,
	} = useMessages();
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const scrollAreaRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Scroll para o final apenas se a última mensagem foi enviada pelo usuário
		if (messages.length > 0 && messages[messages.length - 1].isOwn) {
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

	const handleSendMessage = () => {
		if (message.trim() && message.length <= 200) {
			const newMessage: IMessage = {
				id: Date.now().toString(),
				sender: 'Você',
				content: message,
				timestamp: new Date().toLocaleTimeString('pt-BR', {
					hour: '2-digit',
					minute: '2-digit',
				}),
				isOwn: true,
			};
			setMessages([...messages, newMessage]);
			setMessage('');
		}
	};

	return (
		<div className="overflow-hidden h-screen max-h-screen w-full flex flex-col relative">
			{/* Header do Chat */}
			<div className="p-6 backdrop-blur-sm">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<Avatar className="h-10 w-10">
							<AvatarImage src="/placeholder.svg?height=40&width=40" />
							<AvatarFallback className="bg-gray-100 text-black">
								GC
							</AvatarFallback>
						</Avatar>
						<div>
							<h2 className="font-semibold text-white">Grupo Principal</h2>
							<p className="text-sm text-gray-500">8 membros online</p>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="icon"
							className="h-9 w-9 text-white hover:text-gray-700 hover:bg-gray-100"
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
							className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
						>
							<div
								className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
									msg.isOwn
										? 'bg-rose-900 text-white rounded-br-md'
										: 'bg-gray-100 text-gray-900 rounded-bl-md'
								}`}
							>
								{!msg.isOwn && (
									<p className="text-xs font-semibold text-rose-600 mb-1">
										{msg.sender}
									</p>
								)}
								<div className="flex items-end gap-2">
									<p className="text-sm leading-relaxed">{msg.content}</p>
									<p
										className={`text-xs mt-2 ${msg.isOwn ? 'text-rose-100' : 'text-gray-500'}`}
									>
										{msg.timestamp}
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
