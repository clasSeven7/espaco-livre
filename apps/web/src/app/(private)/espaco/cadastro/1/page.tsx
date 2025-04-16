'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Book,
  HelpCircle,
  List,
  Megaphone,
  UploadCloud,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function InformacoesIniciais() {
  const [messagemTitulo, setMessagemTitulo] = useState('');
  const [messagemDescricao, setMessagemDescricao] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div
      className={`flex relative overflow-hidden min-h-screen ${
        isDarkMode ? 'bg-zinc-900 text-white' : 'bg-[#DDF0EF] text-black'
      }`}
    >
      <div className="flex-1 flex flex-col p-4 lg:p-6 justify-between overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center space-x-4 mb-6">
          <h1
            className={`flex items-center text-2xl font-bold px-8 py-4 rounded-xl shadow ${
              isDarkMode ? 'bg-zinc-800' : 'bg-[#6ea7ca]'
            }`}
          >
            <Book className="mr-2" />
            Informações Iniciais
          </h1>
        </div>

        {/* Campos principais */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 mt-4">
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
                  className={`pl-10 py-8 rounded-lg border-0  ${
                    isDarkMode
                      ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50'
                      : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50'
                  }`}
                  value={messagemTitulo}
                  onChange={handleTituloChange}
                />
              </div>
              <div
                className={`text-sm text-[#2176AE] mt-1 text-right ${
                  isDarkMode ? 'dark:text-white' : ''
                }`}
              >
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
                  className={`pl-10 px-10 py-6 h-96 rounded-lg border-none resize-none overflow-y-auto break-all ${
                    isDarkMode
                      ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50'
                      : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50'
                  }`}
                />
              </div>
              <div
                className={`text-sm text-[#2176AE] mt-1 text-right ${
                  isDarkMode ? 'dark:text-white' : ''
                }`}
              >
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
                  className={`pl-10 py-8 rounded-lg border-0  ${
                    isDarkMode
                      ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50'
                      : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col w-full lg:w-1/3 space-y-4">
            <button
              className={`w-full h-96 flex flex-col justify-center items-center rounded-md text-center px-4 py-6 cursor-pointer ${
                isDarkMode
                  ? 'dark:bg-zinc-800 text-white'
                  : 'bg-[#2176AE] text-white'
              }`}
            >
              <UploadCloud size={32} />
              <span className="mt-2 font-medium">Adicione Fotos do local</span>
            </button>

            <div className="flex flex-col gap-4">
              <Button
                className={` w-full cursor-pointer ${
                  isDarkMode
                    ? 'text-white bg-red-900 hover:bg-red-950'
                    : 'text-white bg-red-500 hover:bg-red-600'
                }`}
              >
                Remover Fotos
              </Button>
              <Button
                className={` w-full cursor-pointer ${
                  isDarkMode
                    ? 'text-white bg-green-900 hover:bg-green-950'
                    : 'text-white bg-green-500 hover:bg-green-600'
                }`}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>

        {/* Botão de avançar */}
        <div className="flex justify-end mt-4">
          <Button
            className={`text-lg font-bold px-22 py-6 rounded-md cursor-pointer ${
              isDarkMode
                ? 'bg-[#ffffff] hover:bg-[#d4d3d3] text-black'
                : 'bg-[#11395e] hover:bg-[#1a222b] text-white '
            }`}
          >
            <Link href="/espaco/cadastro/2">Avançar</Link>
          </Button>
        </div>
      </div>

      <div className="absolute top-6 right-4 lg:right-8 flex space-x-4 text-lg font-bold underline">
        <Button
          size="icon"
          className={`px-[10px] py-2 ${
            isDarkMode
              ? 'bg-[#d3d61f] text-white hover:bg-[#bdc070] hover:text-black cursor-pointer'
              : 'bg-[#d3d61f] text-white hover:bg-[#bdc070] hover:text-white cursor-pointer'
          }`}
        >
          <Link href="/ajuda" className="flex items-center gap-1">
            <HelpCircle size={18} />
          </Link>
        </Button>
        <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}
