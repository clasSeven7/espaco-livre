'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info, Landmark, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function InformacoesGerais() {
  const [observacao, setObservacao] = useState('');

  return (
    <div className="flex bg-[#F3FBF9] text-black relative overflow-hidden min-h-screen">
      <div className="flex-1 flex flex-col p-4 lg:p-6 justify-between overflow-y-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Informações Gerais</h1>
        </div>

        {/* Formulário */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6 flex-1">
          {/* Inputs lado esquerdo */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <Input
                placeholder="Cidade"
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 py-6 rounded-lg border-none"
              />
            </div>

            <div className="relative">
              <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <Input
                placeholder="Rua"
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 py-6 rounded-lg border-none"
              />
            </div>

            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <Input
                placeholder="Bairro"
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 py-6 rounded-lg border-none"
              />
            </div>
          </div>

          {/* Observação lado direito */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div className="relative h-full">
              <Info className="absolute left-3 top-4 text-white" />
              <Textarea
                placeholder="Descreva alguma observação sobre o espaço"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 pt-10 pb-4 h-full rounded-lg border-none resize-none"
                maxLength={120}
              />
              <div className="text-sm text-blue-800 mt-1 text-right">
                {observacao.length}/120
              </div>
            </div>
          </div>
        </div>

        {/* Botão de avançar */}
        <div className="flex justify-end mt-6">
          <Link href="/espaco/cadastro/1">
            <Button className="bg-red-800 hover:bg-[#0f65a0] text-white text-lg px-10 py-2 rounded-md">
              Voltar
            </Button>
          </Link>
          <Link href="/espaco/cadastro/3">
            <Button className="bg-[#127BBF] hover:bg-[#0f65a0] text-white text-lg px-10 py-2 rounded-md">
              Avançar
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute top-6 right-4 lg:right-8 flex space-x-8 text-lg font-bold underline">
        <span className="cursor-pointer">Ajuda</span>
      </div>
    </div>
  );
}
