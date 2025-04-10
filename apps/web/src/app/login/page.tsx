'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Lock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface FormData {
  nome_usuario: string;
  senha: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nome_usuario: '',
    senha: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', formData);

      // Salva o token e os dados do usuário nos cookies
      Cookies.set('token', response.data.token);
      Cookies.set('user', JSON.stringify(response.data.usuario));

      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.error || 'Erro ao fazer login');
      } else {
        toast.error('Erro ao fazer login');
      }
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen relative bg-[#DDF0EF] px-4">
        <Image
          src="/background.png"
          alt="Fundo"
          fill
          className="absolute top-0 left-0 z-0 opacity-10 object-cover"
        />

        {/* Logo + Título */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 max-w-full">
          <div className="relative w-16 sm:w-20 md:w-24 lg:w-28 aspect-[103.8/98.49] z-10">
            <Image
              src="/icon-logo.png"
              alt="Icon"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold z-10 text-zinc-950 text-center sm:text-left break-words">
            Login
          </span>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="w-full max-w-[600px] z-10 px-4">
          <div className="mb-8 relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50" />
            <Input
              name="nome_usuario"
              value={formData.nome_usuario}
              onChange={handleInputChange}
              placeholder="Digite aqui seu login!"
              className="bg-[#1178B9] text-zinc-50 py-6 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              required
            />
          </div>
          <div className="mb-8 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50" />
            <Input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              placeholder="Digite aqui a sua senha!"
              className="bg-[#1178B9] text-zinc-50 py-6 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full py-5 cursor-pointer text-lg font-bold text-white hover:bg-zinc-800 bg-black !opacity-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3-3-3h4z"
                  ></path>
                </svg>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        {/* Salvar senha */}
        <div className="mt-14 mb-6 z-10 w-full max-w-[600px] px-4">
          <div className="flex justify-between items-center">
            <span className="font-bold">Salvar senha</span>
            <div
              className="relative cursor-pointer"
              onClick={() => setIsSaved(!isSaved)}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={isSaved}
                onChange={() => setIsSaved(!isSaved)}
              />
              <div
                className={`w-12 h-6 pl-1 py-1 rounded-full transition-colors duration-300 ${
                  isSaved ? 'bg-zinc-950' : 'bg-zinc-300'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-zinc-50 rounded-full shadow-md transform transition-transform duration-300 ${
                    isSaved ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com alerta */}
        <div className="z-10 w-full max-w-md px-4 mt-4 border-t-[1.5px] border-zinc-950 py-6 flex flex-col justify-center items-center gap-6">
          <span className="font-bold text-center">
            Não tem conta? Crie agora!
          </span>
          <AlertDialog>
            <AlertDialogTrigger className="w-full max-w-[300px] z-10 text-zinc-950 text-base py-2 cursor-pointer font-bold bg-transparent border-2 border-zinc-950 transition-colors duration-300 hover:text-zinc-50 hover:bg-zinc-950 rounded-md">
              Criar Agora
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Escolha o tipo de cadastro</AlertDialogTitle>
                <AlertDialogDescription>
                  Selecione o tipo de conta que você deseja criar.
                </AlertDialogDescription>
                <AlertDialogCancel className="absolute right-4 top-4 rounded-sm cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </AlertDialogCancel>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col gap-2">
                <Link href="/cadastro/locatario" className="w-full">
                  <AlertDialogAction className="w-full cursor-pointer">
                    Locatário
                  </AlertDialogAction>
                </Link>
                <Link href="/cadastro/cliente" className="w-full">
                  <AlertDialogAction className="w-full cursor-pointer">
                    Cliente
                  </AlertDialogAction>
                </Link>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
