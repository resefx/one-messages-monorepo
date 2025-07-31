import Chat from './_components/chat.component';
import Posts from './_components/posts.component';
import MessagesProvider from './_components/providers/messagesprovider';

export default function ChatApp() {
	return (
		<MessagesProvider>
			<div className="min-h-screen w-full relative bg-black">
				<div
					className="absolute inset-0 z-0"
					style={{
						background: '#000000',
						backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
						backgroundSize: '40px 40px',
					}}
				/>

				{/* Your Content/Components */}
				<div className="relative z-10 flex h-screen">
					{/* Área Central - Chat */}
					<Chat />

					{/* Sidebar Direita - Posts Fixos */}
					<Posts />
				</div>
			</div>
		</MessagesProvider>
	);
}
