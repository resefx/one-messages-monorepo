'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { authClient } from '@/components/utils/auth';

export default function LoginPage() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const [registerName, setRegisterName] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [registerError, setRegisterError] = useState('');
	const [registerLoading, setRegisterLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const session = await authClient.signIn.email({ email, password });
			if (session) router.push('/');
		} catch (err: any) {
			setError(err.message || 'Erro ao fazer login');
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setRegisterLoading(true);
		setRegisterError('');

		try {
			await authClient.signUp.email({
				email: registerEmail,
				password: registerPassword,
				name: registerName, // ← Aqui está o campo de nome enviado
			});
			alert('Conta criada com sucesso!');
			router.push('/');
		} catch (err: any) {
			setRegisterError(err.message || 'Erro ao cadastrar');
		} finally {
			setRegisterLoading(false);
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#e6f1f9] to-[#fbe5ec] px-4">
			<Tabs defaultValue="login" className="w-full max-w-md">
				<TabsList className="grid w-full grid-cols-2 mb-4">
					<TabsTrigger value="login">Entrar</TabsTrigger>
					<TabsTrigger value="register">Cadastrar</TabsTrigger>
				</TabsList>

				<TabsContent value="login">
					<Card className="shadow-xl bg-white/80 backdrop-blur-md border border-white/20">
						<CardContent className="p-6 space-y-4">
							<h2 className="text-2xl font-bold text-center text-pink-800">
								Bem-vindo de volta!
							</h2>
							<form onSubmit={handleLogin} className="space-y-4">
								<Input
									type="email"
									placeholder="Seu e-mail"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<Input
									type="password"
									placeholder="Sua senha"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<Button type="submit" disabled={loading} className="w-full">
									{loading ? 'Entrando...' : 'Entrar'}
								</Button>
								{error && (
									<p className="text-sm text-red-600 text-center">{error}</p>
								)}
							</form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="register">
					<Card className="shadow-xl bg-white/80 backdrop-blur-md border border-white/20">
						<CardContent className="p-6 space-y-4">
							<h2 className="text-2xl font-bold text-center text-pink-800">
								Criar Conta
							</h2>
							<form onSubmit={handleRegister} className="space-y-4">
								<Input
									type="text"
									placeholder="Seu nome"
									value={registerName}
									onChange={(e) => setRegisterName(e.target.value)}
									required
								/>
								<Input
									type="email"
									placeholder="Seu e-mail"
									value={registerEmail}
									onChange={(e) => setRegisterEmail(e.target.value)}
									required
								/>
								<Input
									type="password"
									placeholder="Sua senha"
									value={registerPassword}
									onChange={(e) => setRegisterPassword(e.target.value)}
									required
								/>
								<Button
									type="submit"
									disabled={registerLoading}
									className="w-full"
								>
									{registerLoading ? 'Cadastrando...' : 'Cadastrar'}
								</Button>
								{registerError && (
									<p className="text-sm text-red-600 text-center">
										{registerError}
									</p>
								)}
							</form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
