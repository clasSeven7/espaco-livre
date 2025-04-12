'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Info, Landmark, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function InformacoesGerais() {
  const [observacao, setObservacao] = useState('');

  const maxMessagemObservacao = 500;
  return (
    <div className="flex bg-[#F3FBF9] text-black relative overflow-hidden min-h-screen">
      <div className="flex-1 flex flex-col p-4 lg:p-6 justify-between overflow-y-auto">
        <div className="flex items-center space-x-4 mb-6">
          <h1 className="text-2xl font-bold bg-[#6ea7ca] px-8 py-4">
            Informações Gerais
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row mt-6 gap-6 flex-1">
          <div className="flex flex-col gap-10 w-full lg:w-1/2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <Input
                placeholder="Cidade"
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 py-8 rounded-lg border-none"
              />
            </div>

            <div className="relative">
              <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <Input
                placeholder="Rua"
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 py-8 rounded-lg border-none"
              />
            </div>

            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
              <Input
                placeholder="Bairro"
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 py-8 rounded-lg border-none"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div className="relative h-full">
              <Info className="absolute left-3 top-6 text-white" />
              <Textarea
                placeholder="Descreva alguma observação sobre o espaço"
                value={observacao}
                onChange={(e) => {
                  if (e.target.value.length <= 300) {
                    setObservacao(e.target.value);
                  }
                }}
                className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 px-10 py-6 h-96 rounded-lg border-none resize-none overflow-y-auto break-all"
                maxLength={maxMessagemObservacao}
              />
              <div className="text-sm text-blue-800 mt-1 text-right">
                {observacao.length}/{maxMessagemObservacao}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <Button className="bg-red-800 hover:bg-red-900 text-white text-lg font-bold px-10 py-6 rounded-md cursor-pointer">
            <Link href="/espaco/cadastro/1">Voltar</Link>
          </Button>
          <Button className="bg-[#127BBF] hover:bg-[#0f65a0] text-white text-lg font-bold px-22 py-6 rounded-md cursor-pointer">
            <Link href="/espaco/cadastro/3">Avançar</Link>
          </Button>
        </div>
      </div>
      <div className="absolute top-6 right-4 lg:right-8 flex space-x-8 text-lg font-bold underline">
        <span className="cursor-pointer">Ajuda</span>
      </div>
    </div>
  );
}
