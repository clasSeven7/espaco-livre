'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { List, Megaphone, UploadCloud, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function InformacoesIniciais() {
  const [messagemTitulo, setMessagemTitulo] = useState('');
  const [messagemDescricao, setMessagemDescricao] = useState('');

  const maxMessagemTitulo = 100;
  const maxMessagemDescricao = 500;

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxMessagemTitulo) {
      setMessagemTitulo(value);
    }
  };

  const handleDescricaoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxMessagemDescricao) {
      setMessagemDescricao(value);
    }
  };

  return (
    <div className="flex bg-[#F3FBF9] text-black relative overflow-hidden min-h-screen">
      <div className="flex-1 flex flex-col p-4 lg:p-6 justify-between overflow-y-auto">
        <div className="flex items-center space-x-4 mb-6">
          <h1 className="text-2xl font-bold bg-[#6ea7ca] px-8 py-4">
            Informações Iniciais
          </h1>
        </div>

        {/* Form & Upload */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 mt-4">
          {/* Form */}
          <div className="flex flex-col flex-1 space-y-4">
            <div className="relative">
              <label htmlFor="titulo" className="sr-only">
                Título do Espaço
              </label>
              <div className="relative">
                <Megaphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80" />
                <Input
                  id="titulo"
                  placeholder="Digite o título do Espaço"
                  className="bg-[#1178B9] text-white placeholder:text-white/50 pl-10 py-8 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                  value={messagemTitulo}
                  onChange={handleTituloChange}
                />
              </div>
              <div className="text-sm text-[#2176AE] mt-1 text-right">
                {messagemTitulo.length}/{maxMessagemTitulo}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="descricao" className="sr-only">
                Descrição do Espaço
              </label>
              <div className="relative">
                <List className="absolute left-3 top-6 text-white/80" />
                <Textarea
                  id="descricao"
                  placeholder="Escreva uma breve descrição do Espaço"
                  value={messagemDescricao}
                  onChange={handleDescricaoChange}
                  className="bg-[#127BBF] text-white placeholder:text-white/80 pl-10 px-10 py-6 h-96 rounded-lg border-none resize-none overflow-y-auto break-all"
                />
              </div>
              <div className="text-sm text-[#2176AE] mt-1 text-right">
                {messagemDescricao.length}/{maxMessagemDescricao}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="equipamentos" className="sr-only">
                Equipamentos
              </label>
              <div className="relative">
                <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80" />
                <Input
                  id="equipamentos"
                  placeholder="Informe os equipamentos disponíveis"
                  className="bg-[#1178B9] text-white placeholder:text-white/50 pl-10 py-8 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col w-full lg:w-1/3 space-y-4">
            <div className="w-full h-96 bg-[#2176AE] flex flex-col justify-center items-center rounded-md text-white text-center px-4 py-6">
              <UploadCloud size={32} />
              <span className="mt-2 font-medium">Adicione Fotos do local</span>
            </div>

            <div className="flex flex-col gap-4">
              <Button className="bg-red-500 hover:bg-red-600 w-full">
                Remover Fotos
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 w-full">
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <Button className="bg-[#127BBF] hover:bg-[#0f65a0] text-white text-lg font-bold px-22 py-6 rounded-md cursor-pointer">
            <Link href="/espaco/cadastro/2">Avançar</Link>
          </Button>
        </div>
      </div>

      {/* Header Right Options */}
      <div className="absolute top-6 right-4 lg:right-8 flex space-x-8 text-lg font-bold underline">
        <span className="cursor-pointer">Ajuda</span>
      </div>
    </div>
  );
}
