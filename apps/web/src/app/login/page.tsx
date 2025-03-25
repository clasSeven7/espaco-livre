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
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen relative bg-[#DDF0EF]">
        <Image
          src="/background.png"
          alt="Fundo"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 z-0 opacity-10"
        />

        <div className="flex items-center justify-center gap-4 mb-10">
          <Image
            src="/icon-logo.png"
            width={103.8}
            height={98.49}
            alt="Icon"
            className="z-10 text-zinc-950"
          />
          <span className="text-8xl font-bold mb-6 z-10 text-zinc-950">
            Login
          </span>
        </div>
        <form onSubmit={handleLogin} className="w-[30%] z-10">
          <div className="mb-8 relative">
            <User
              width={25}
              height={25}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
            />
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
            <Lock
              width={25}
              height={25}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
            />
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
            className="w-full py-5 cursor-pointer text-[18px] font-bold"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-9 mb-6 z-10 flex items-center">
          <div className="flex items-center cursor-pointer gap-96">
            <span className="mr-2 font-bold">Salvar senha</span>
            <div className="relative">
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
                onClick={() => setIsSaved(!isSaved)}
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

        <div className="z-10 w-[500px] flex flex-col justify-center items-center mt-4 gap-10 border-t-[1.5px] border-zinc-950 py-4">
          <span className="mt-4 font-bold">Não tem conta? Crie agora!</span>
          <AlertDialog>
            <AlertDialogTrigger className="w-72 z-10 text-zinc-950 text-base py-2 cursor-pointer font-bold bg-transparent border-2 border-zinc-950 transition-colors duration-300 hover:text-zinc-50 hover:bg-zinc-950 rounded-md">
              Criar Agora
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Escolha o tipo de cadastro</AlertDialogTitle>
                <AlertDialogDescription>
                  Selecione o tipo de conta que você deseja criar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col gap-2">
                <AlertDialogCancel className="cursor-pointer">
                  Cancelar
                </AlertDialogCancel>
                <Link href="/cadastro/alocador" className="w-full">
                  <AlertDialogAction className="w-full cursor-pointer">
                    Alocador
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
