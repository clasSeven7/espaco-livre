'use client';

import {ArrowLeft} from 'lucide-react';
import {usePathname, useRouter} from 'next/navigation';
import React from "react";
import {EspacoCadastroProvider} from "@/context/EspacoCadastroContext";

export default function CadastroLayout({children}: {
  children: React.ReactNode;
}) {
  const etapas = [
    '/espaco/cadastro/1',
    '/espaco/cadastro/2',
    '/espaco/cadastro/3',
    '/espaco/cadastro/4',
    '/espaco/cadastro/5',
  ];
  const pathname = usePathname();
  const router = useRouter();
  const etapaAtual = etapas.indexOf(pathname);
  const etapaAnterior = etapaAtual > 0 ? etapas[etapaAtual - 1] : null;
  const progressPercentage = ((etapaAtual + 1) / etapas.length) * 100;

  const handleVoltar = () => {
    if (etapaAnterior) {
      router.push(etapaAnterior);
    } else {
      router.push('/');
    }
  };

  return (
    <EspacoCadastroProvider>
      <div
        className={`flex bg-white dark:bg-zinc-900 relative overflow-hidden min-h-screen transition-colors`}
      >
        <div className="w-[80px] flex flex-col items-center py-4 shrink-0">
          <button
            onClick={handleVoltar}
            className={`mt-5 p-2 rounded-full border border-[#2C7DA0] dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400 dark:hover:text-black text-[#2C7DA0]  hover:bg-[#2C7DA0] hover:text-white transition-colors duration-200 cursor-pointer`}
            aria-label="Voltar"
          >
            <ArrowLeft size={20}/>
          </button>

          {/* Barra de progresso */}
          <div className="flex-1 flex flex-col justify-center mt-4">
            <div className="w-2 h-3/4 bg-gray-200 dark:bg-gray-400 shadow-2xl relative overflow-hidden rounded-full">
              <div
                className="absolute top-0 left-0 w-full bg-[#2C7DA0] dark:bg-zinc-800 transition-all duration-300"
                style={{height: `${progressPercentage}%`}}
              />
            </div>
          </div>
        </div>

        {/* Conteúdo das etapas */}
        <div className="flex-1">{children}</div>
      </div>
    </EspacoCadastroProvider>
  );
}
