'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#DDF0EF]">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Espaço Livre</h1>
      <p className="text-xl text-center mb-8">
        Você está logado e pode acessar todas as funcionalidades do sistema.
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
      >
        Sair
      </button>
    </div>
  );
}
