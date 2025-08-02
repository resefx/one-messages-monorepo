import Chat from './_components/chat.component';
import Posts from './_components/posts.component';
import MessagesProvider from './_components/providers/messagesprovider';

export default function ChatApp() {
	return (
		<MessagesProvider>
			<div className="min-h-screen w-full bg-[#fefcff] relative">
				<div
					className="absolute inset-0 z-0"
					style={{
						backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
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
