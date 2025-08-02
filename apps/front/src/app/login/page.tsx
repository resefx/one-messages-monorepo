'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/components/utils/auth';

export default function LoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const session = await authClient.signIn.email({ email, password });

			// Redireciona após login bem-sucedido
			if (session) {
				router.push('/'); // Altere o caminho se necessário
			}
		} catch (err: any) {
			setError(err.message || 'Erro ao fazer login');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-50">
			<form
				onSubmit={handleLogin}
				className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
			>
				<h1 className="text-2xl font-semibold text-center">Login</h1>

				<input
					type="email"
					placeholder="Seu email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					required
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>

				<input
					type="password"
					placeholder="Sua senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					required
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>

				<button
					type="submit"
					disabled={loading}
					className={`w-full py-2 text-white rounded-md transition-colors ${
						loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
					}`}
				>
					{loading ? 'Entrando...' : 'Entrar'}
				</button>

				{error && (
					<p className="text-sm text-red-600 text-center mt-2">{error}</p>
				)}
			</form>
		</main>
	);
}
