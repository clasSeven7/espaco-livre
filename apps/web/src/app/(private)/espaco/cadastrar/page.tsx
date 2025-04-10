'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, List, Megaphone, UploadCloud, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function InformacoesIniciais() {
  const [progressPercentage, setProgressPercentage] = useState(5);
  const [messagemTitulo, setMessagemTitulo] = useState('');
  const [messagemDescricao, setMessagemDescricao] = useState('');

  const maxMessagemTitulo = 30;
  const maxMessagemDescricao = 300;

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

  const avancar = () => {
    setProgressPercentage((prev) => Math.min(prev + 20, 100));
  };

  return (
    <div className="flex bg-[#F3FBF9] text-black relative overflow-hidden min-h-screen">
      {/* Sidebar */}
      <div className="w-[80px] flex flex-col items-center py-4 shrink-0">
        <Link href="/">
          <Button
            variant="outline"
            size="icon"
            className="border-[#2C7DA0] bg-transparent cursor-pointer"
          >
            <ArrowLeft className="text-[#2C7DA0]" />
          </Button>
        </Link>
        <div className="flex-1 flex flex-col justify-center mt-4">
          <Progress
            value={progressPercentage}
            className="w-2 h-3/4 bg-white [&>div]:bg-[#2C7DA0] rotate-180"
            style={{ writingMode: 'vertical-rl' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 lg:p-6 justify-between overflow-y-auto">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-[#2C7DA0] rounded-full" />
          <h1 className="text-2xl font-bold">Informações Iniciais</h1>
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
                <List className="absolute left-3 top-8 text-white/80" />
                <Textarea
                  id="descricao"
                  placeholder="Escreva uma breve descrição do Espaço"
                  className="bg-[#1178B9] text-white placeholder:text-white/50 pl-10 py-8 h-96 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                  value={messagemDescricao}
                  onChange={handleDescricaoChange}
                  rows={8}
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
          <Button
            className="bg-[#2176AE] hover:bg-[#1b5d8e] px-8 text-white text-lg font-bold rounded-md cursor-pointer"
            onClick={avancar}
          >
            <Link href="#">Avançar</Link>
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
