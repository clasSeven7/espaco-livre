'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const etapas = [
    '/espaco/cadastro/1',
    '/espaco/cadastro/2',
    '/espaco/cadastro/3',
    '/espaco/cadastro/4',
    '/espaco/cadastro/5',
  ];
  const etapaAtual = etapas.indexOf(pathname);
  const progressPercentage = ((etapaAtual + 1) / etapas.length) * 100;

  return (
    <div className="flex bg-[#F3FBF9] text-black relative overflow-hidden min-h-screen">
      <div className="w-[80px] flex flex-col items-center py-4 shrink-0">
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="border-[#2C7DA0] bg-transparent cursor-pointer"
          >
            <Home className="text-[#2C7DA0]" />
          </Button>
        </Link>
        <span className="sr-only">Voltar</span>

        {/* Barra de progresso */}
        <div className="flex-1 flex flex-col justify-center mt-4">
          <div className="w-2 h-3/4 bg-gray-200 shadow-2xl relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 w-full bg-[#2C7DA0] transition-all duration-300"
              style={{ height: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo das etapas */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
