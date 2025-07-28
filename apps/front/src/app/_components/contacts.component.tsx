'use client';

import { Search, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMessages } from './contexts/messagescontext';
import { IContact } from './interfaces/messages.interface';

const contacts: IContact[] | any = [
	{
		id: 'friend-1',
		name: 'João Silva',
		avatar: '/placeholder.svg?height=40&width=40',
		status: 'online',
		lastMessage: 'Oi pessoal! Como vocês estão?',
		lastMessageTime: Date.now() - 1000 * 60 * 5, // 5 min ago
		type: 'friend',
	},
	{
		id: 'group-1',
		name: 'Equipe Desenvolvimento',
		avatar: '/placeholder.svg?height=40&width=40',
		lastMessage: 'Reunião cancelada',
		lastMessageTime: Date.now() - 1000 * 60 * 10, // 10 min ago
		type: 'group',
		memberCount: 8,
	},
	{
		id: 'friend-2',
		name: 'Maria Santos',
		avatar: '/placeholder.svg?height=40&width=40',
		status: 'online',
		lastMessage: 'Vamos nos encontrar hoje?',
		lastMessageTime: Date.now() - 1000 * 60 * 15, // 15 min ago
		type: 'friend',
	},
	{
		id: 'group-2',
		name: 'Projeto Alpha',
		avatar: '/placeholder.svg?height=40&width=40',
		lastMessage: 'Documentação atualizada',
		lastMessageTime: Date.now() - 1000 * 60 * 30, // 30 min ago
		type: 'group',
		memberCount: 5,
	},
	{
		id: 'friend-3',
		name: 'Pedro Costa',
		avatar: '/placeholder.svg?height=40&width=40',
		status: 'offline',
		lastMessage: 'Até amanhã!',
		lastMessageTime: Date.now() - 1000 * 60 * 60, // 1 hour ago
		type: 'friend',
	},
	{
		id: 'group-3',
		name: 'Amigos da Faculdade',
		avatar: '/placeholder.svg?height=40&width=40',
		lastMessage: 'Festa no sábado!',
		lastMessageTime: Date.now() - 1000 * 60 * 120, // 2 hours ago
		type: 'group',
		memberCount: 12,
	},
].sort((a, b) => b.lastMessageTime - a.lastMessageTime);

export default function Contacts() {
	const { setSelectedChat, selectedChat } = useMessages();

	return (
		<div className="w-80 flex flex-col">
			<div className="p-6">
				<div className="flex items-center gap-3 mb-6">
					<div className="w-8 h-8 bg-rose-900 rounded-lg flex items-center justify-center">
						<Users className="h-4 w-4 text-gray-300" />
					</div>
					<h1 className="text-xl font-semibold text-white">Chat</h1>
				</div>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
					<Input
						placeholder="Buscar conversas..."
						className="pl-10 bg-gray-50/55 text-black border-0 focus-visible:ring-1 focus-visible:ring-rose-500"
					/>
				</div>
			</div>

			<ScrollArea className="flex-1">
				<div className="px-6">
					{contacts.map((contact: IContact) => (
						<button
							key={contact.id}
							type="button"
							className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-gray-50/15 mb-2 transition-colors backdrop-blur-sm ${
								selectedChat === contact.id
									? 'bg-gray-500/30'
									: 'bg-gray-500/15'
							}`}
							onClick={() => setSelectedChat(contact.id)}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									setSelectedChat(contact.id);
								}
							}}
							tabIndex={0}
							aria-pressed={selectedChat === contact.id}
						>
							<div className="relative">
								<Avatar
									className={`h-10 w-10 ${contact.type === 'group' ? 'rounded-lg' : 'rounded-full'}`}
								>
									<AvatarImage src={contact.avatar || '/placeholder.svg'} />
									<AvatarFallback
										className={`bg-gray-500 text-black ${contact.type === 'group' ? 'rounded-lg' : 'rounded-full'}`}
									>
										{contact.name.charAt(0)}
									</AvatarFallback>
								</Avatar>
								{contact.type === 'friend' && contact.status && (
									<div
										className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${
											contact.status === 'online'
												? 'bg-green-500'
												: 'bg-gray-300'
										}`}
									/>
								)}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2">
									<p className="text-sm font-medium text-white truncate">
										{contact.name}
									</p>
									{contact.type === 'group' && contact.memberCount && (
										<Badge
											variant="secondary"
											className="text-xs bg-gray-500 text-black"
										>
											{contact.memberCount}
										</Badge>
									)}
								</div>
								<p className="text-xs text-gray-500 truncate">
									{contact.lastMessage}
								</p>
							</div>
						</button>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
