'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
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
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {api} from '@/lib/axios';
import {AxiosError} from 'axios';
import Cookies from 'js-cookie';
import {Eye, EyeOff, Lock, User} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';

interface FormData {
  nome_usuario: string;
  senha: string;
}

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nome_usuario: '',
    senha: '',
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDarkMode(true);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', formData);
      const {usuario, token} = response.data.data;

      console.log(usuario)
      console.log(token)
      
      if (!usuario || !token) {
        throw new Error('Dados de login incompletos.');
      }

      // Salva nos cookies
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(usuario));

      // Salva no localStorage (somente se estiver no browser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('locatario_id', String(usuario.id));
        localStorage.setItem('tipo_usuario', usuario.tipo);
      }

      toast.success('Login realizado com sucesso!');
      router.replace('/');
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
    <div className="flex h-screen">
      <div className="hidden lg:flex w-1/2 relative opacity-90">
        <Image
          src="/bg_login.png"
          alt="Imagem da sala"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div
        className={`relative flex flex-col w-full lg:w-1/2 justify-center items-center px-8 ${
          isDarkMode
            ? 'bg-gradient-to-tl from-[#212a30] to-[#161c20]'
            : 'bg-gradient-to-tl from-[#1178B9] to-[#0d4f7d]'
        }`}
      >
        <div
          className={`absolute inset-0 z-0 opacity-5 bg-no-repeat bg-cover bg-center ${
            isDarkMode
              ? 'bg-[url("/bg_textura_login_escuro.png")]'
              : 'bg-[url("/bg_textura_login_claro.png")]'
          }`}
        />

        <div className="absolute top-4 right-4">
          <ThemeToggleButton
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>

        <div className="flex items-center gap-4 mb-16 z-10">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src={isDarkMode ? '/icone_branco.png' : '/icone_branco.png'}
              alt="Logo"
              width={100}
              height={100}
              priority
              className="lg:w-24 lg:h-24 md:w-20 md:h-20 sm:w-16 sm:h-16 w-16 h-16"
            />
            <span className="lg:text-8xl md:text-6xl sm:text-4xl text-4xl font-bold text-white">
              Login
            </span>
          </Link>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="w-full max-w-[700px] space-y-6">
          <div className="relative w-full">
            <User className="absolute w-7 h-7 left-3 top-1/2 transform -translate-y-1/2 text-white"/>
            <Input
              name="nome_usuario"
              value={formData.nome_usuario}
              onChange={handleInputChange}
              placeholder="Digite aqui seu login!"
              className="pl-11 py-7 lg:text-base lg:placeholder-white/70 md:lg:placeholder-white/70 sm:lg:placeholder-white/70 text-white md:placeholder-white/70 placeholder-white/70 rounded-lg bg-transparent border border-white lg:focus:border-white lg:focus:ring-0 md:focus:border-white md:focus:ring-0 sm:focus:border-white sm:focus:ring-0 focus:ring-0 focus:border-white"
              required
            />
          </div>

          <div className="relative w-full">
            <Lock className="absolute w-7 h-7 left-3 top-1/2 transform -translate-y-1/2 text-white"/>
            <Input
              name="senha"
              type={showPassword ? 'text' : 'password'}
              value={formData.senha}
              onChange={handleInputChange}
              placeholder="Digite aqui sua senha!"
              className="pl-11 py-7 lg:text-base lg:placeholder-white/70 md:lg:placeholder-white/70 sm:lg:placeholder-white/70 text-white md:placeholder-white/70 placeholder-white/70 rounded-lg bg-transparent border border-white lg:focus:border-white lg:focus:ring-0 md:focus:border-white md:focus:ring-0 sm:focus:border-white sm:focus:ring-0 focus:ring-0 focus:border-white"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
            >
              {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
            </button>
          </div>

          <div className="relative w-full flex justify-center items-center mt-14">
            <Button
              type="submit"
              className="lg:w-96 md:w-80 sm:w-72 w-64 lg:py-7 lg:text-xl md:py-6 md:text-base sm:py-5 sm:text-sm font-bold bg-white text-black hover:bg-zinc-100 cursor-pointer disabled:opacity-100 disabled:bg-white disabled:text-black"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3-3-3h4z"
                    />
                  </svg>
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </div>
        </form>

        {/* Salvar senha toggle */}
        <div className="flex justify-between items-center w-full max-w-[700px] mt-14">
          <span
            className={`font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}
          >
            Salvar senha
          </span>
          <div
            className="relative cursor-pointer"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Input
              type="checkbox"
              checked={isSaved}
              onChange={() => setIsSaved(!isSaved)}
              className="hidden"
            />
            <div
              className={`w-12 h-6 flex items-center rounded-full p-1 ${
                isSaved ? 'bg-[#0d4f7d]' : 'bg-white'
              }`}
            >
              <div
                className={`bg-[#0d4f7d] w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                  isSaved ? 'translate-x-6 bg-white' : ''
                }`}
              />
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="flex flex-col items-center gap-4 w-full max-w-[600px] mt-10 border-t pt-6 z-10">
          <span
            className={`font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}
          >
            Não tem conta? Crie agora!
          </span>
          <AlertDialog>
            <AlertDialogTrigger
              className={`border-2 px-20 py-3 rounded-md font-bold cursor-pointer ${
                isDarkMode
                  ? 'text-white hover:bg-[#161c20] hover:border-transparent'
                  : 'text-white hover:bg-[#0d4f7d] hover:border-transparent'
              }`}
            >
              Criar Agora
            </AlertDialogTrigger>
            <AlertDialogContent
              className={` ${
                isDarkMode
                  ? 'bg-[#161c20] border-[#161c20] text-white'
                  : 'bg-white border-[#0d4f7d] text-black'
              }`}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Escolha o tipo de cadastro</AlertDialogTitle>
                <AlertDialogDescription>
                  Selecione o tipo de conta que você deseja criar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex flex-col gap-2">
                <Link href="/cadastro/locatario" className="w-full">
                  <AlertDialogAction
                    className={`w-full cursor-pointer ${
                      isDarkMode
                        ? 'text-black bg-white hover:bg-gray-50'
                        : 'text-white bg-black'
                    }`}
                  >
                    Locatário
                  </AlertDialogAction>
                </Link>
                <Link href="/cadastro/cliente" className="w-full">
                  <AlertDialogAction
                    className={`w-full cursor-pointer ${
                      isDarkMode
                        ? 'text-black bg-white hover:bg-gray-50'
                        : 'text-white bg-black'
                    }`}
                  >
                    Cliente
                  </AlertDialogAction>
                </Link>
              </AlertDialogFooter>
              <AlertDialogCancel
                className={`absolute top-4 right-4 cursor-pointer ${
                  isDarkMode ? 'text-white bg-[#161c20]' : 'text-black bg-white'
                }`}
              >
                X
              </AlertDialogCancel>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
