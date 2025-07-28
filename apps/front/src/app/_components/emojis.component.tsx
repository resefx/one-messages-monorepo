import { Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useMessages } from './contexts/messagescontext';

const emojis = [
	'😀',
	'😂',
	'😍',
	'🥰',
	'😎',
	'🤔',
	'👍',
	'👎',
	'❤️',
	'🔥',
	'💯',
	'🎉',
	'😢',
	'😡',
	'🙄',
	'😴',
];

export default function Emojis() {
	const { message, setMessage } = useMessages();

	const handleEmojiSelect = (emoji: string) => {
		if (message.length + emoji.length <= 200) {
			setMessage(message + emoji);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200"
				>
					<Smile className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-4 bg-white">
				<div className="grid grid-cols-8 gap-2">
					{emojis.map((emoji, index) => (
						<Button
							key={emoji}
							variant="ghost"
							size="sm"
							className="h-8 w-8 p-0 hover:bg-gray-100"
							onClick={() => handleEmojiSelect(emoji)}
						>
							{emoji}
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
