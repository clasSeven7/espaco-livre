'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = () => {
    setIsSaved(!isSaved);
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
        <div className="w-[30%] z-10">
          <div className="mb-8 relative">
            <User
              width={25}
              height={25}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
            />
            <Input
              placeholder="Digite aqui seu login!"
              className="bg-[#1178B9] text-zinc-50 py-6 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
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
              placeholder="Digite aqui a sua senha!"
              className="bg-[#1178B9] text-zinc-50 py-6 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
            />
          </div>
        </div>
        <Button className="w-72 z-10 py-5 cursor-pointer text-[18px] font-bold">
          Entrar
        </Button>
        <div className="mt-9 mb-6 z-10 flex items-center">
          <div className="flex items-center cursor-pointer gap-96">
            <span className="mr-2 font-bold">Salvar senha</span>
            <div className="relative">
              <input
                type="checkbox"
                className="hidden"
                checked={isSaved}
                onChange={handleToggle}
              />
              <div
                className={`w-12 h-6 pl-1 py-1 rounded-full transition-colors duration-300 ${
                  isSaved ? 'bg-zinc-950' : 'bg-zinc-300'
                }`}
                onClick={handleToggle}
              >
                <div
                  className={`w-4 h-4 bg-zinc-50 rounded-full shadow-md transform transition-transform duration-300 ${
                    isSaved ? 'translate-x-6' : 'translate-x-0'
                  }`}
                  onClick={handleToggle}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="z-10 w-[500px] flex flex-col justify-center items-center mt-4 gap-10 border-t-[1.5px] border-zinc-950 py-4">
          <span className="mt-4 font-bold">Não tem conta?</span>
          <Link href="/cadastrar" className="flex items-center space-x-">
            <Button className="w-72 z-10 text-zinc-950 text-base py-5 cursor-pointer font-bold bg-transparent border-2 border-zinc-950 hover:text-zinc-50">
              Crie agora
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
