'use client';

import axios from 'axios';
import { Pin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IPosts } from './interfaces/messages.interface';

export default function Posts() {
	const [posts, setPosts] = useState<IPosts[]>([]);

	useEffect(() => {
		async function getPosts() {
			const resp = await axios.get('http://localhost:3003/posts');
			setPosts(resp.data);
		}

		getPosts();
	}, []);

	return (
		<div className="w-96  flex flex-col overflow-auto">
			<div className="p-6 select-none">
				<div className="flex items-center gap-3 mb-6">
					<div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
						<Pin className="h-4 w-4 text-white" />
					</div>
					<h1 className="text-xl font-semibold text-black">Posts Fixos</h1>
				</div>
			</div>

			<ScrollArea className="flex-1">
				<div className="px-6 space-y-4">
					{posts.map((fixedMsg) => (
						<div
							key={fixedMsg.id}
							className="p-4 bg-gray-700 text-white rounded-xl text-sm transition-colors cursor-pointer select-none"
						>
							<p className="leading-relaxed mb-2">{fixedMsg.text}</p>
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
