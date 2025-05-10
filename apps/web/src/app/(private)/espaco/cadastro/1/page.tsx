'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useEspacoCadastro} from '@/context/EspacoCadastroContext';
import {
  Book,
  Camera,
  ChevronsUpDown,
  Hammer,
  HelpCircle,
  List,
  Megaphone,
  Save,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';

const itens = [
  'Ambiente Climatizado',
  'Estacionamento',
  'Wi-fi de alta velocidade',
  'Projetor e Tela Retrátil',
  'Controle de Acesso Digital',
  'Mobiliário Ergonômico',
  'Painéis de Iluminação Profissional',
  'Equipamentos de Áudio Profissional',
];

export default function InformacoesIniciais() {
  const {espaco, atualizarCampo} = useEspacoCadastro();
  const maxMessagemTitulo = 100;
  const maxMessagemDescricao = 500;

  const [messagemTitulo, setMessagemTitulo] = useState('');
  const [messagemDescricao, setMessagemDescricao] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [file, setFile] = useState<File[] | null>(null);
  const [recurso, setRecurso] = useState('');
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('equipamentosSelecionados');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [previews, setPreviews] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fotosEspaco');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

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

  const toggleItem = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const removeItem = (item: string) => {
    setSelected((prev) => prev.filter((i) => i !== item));
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    const readFiles = fileArray.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readFiles).then((base64List) => {
      setPreviews((prev) => [...prev, ...base64List]);
    });
  };

  const handleRemoveFotos = () => {
    setPreviews([]);
    localStorage.removeItem('fotosEspaco');
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

  useEffect(() => {
    localStorage.setItem('equipamentosSelecionados', JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem('fotosEspaco', JSON.stringify(previews));
  }, [previews]);

  return (
    <div
      className={`flex relative overflow-hidden min-h-screen ${
        isDarkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex flex-1 flex-col p-4 lg:p-6 overflow-y-auto">
        {/* Cabeçalho */}
        <div id="cabecalho" className="flex items-center space-x-4 mb-6">
          <h1
            className={`flex items-center text-2xl font-bold px-8 py-4 rounded-xl shadow ${
              isDarkMode ? 'bg-zinc-800' : 'bg-[#6ea7ca]'
            }`}
          >
            <Book className="mr-2"/>
            Informações Iniciais
          </h1>
        </div>

        {/* Conteúdo em duas colunas */}
        <form action="espaco-form" className="flex flex-col lg:flex-row gap-6">
          <div
            id="lado_esquerdo"
            className="w-full lg:w-2/3 flex flex-col gap-6"
          >
            <div id="titulo" className="relative">
              <label htmlFor="titulo" className="sr-only">
                Título do Espaço
              </label>
              <div className="relative">
                <Megaphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"/>
                <Input
                  id="titulo"
                  value={espaco.titulo || ''}
                  onChange={(e) => atualizarCampo({titulo: e.target.value})}
                  placeholder="Digite o título do Espaço"
                  className={`pl-10 py-8 rounded-lg border-0 ${
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
                {messagemTitulo.length}/{maxMessagemTitulo}
              </div>
            </div>

            <div id="descricao" className="relative">
              <label htmlFor="descricao" className="sr-only">
                Descrição do Espaço
              </label>
              <div className="relative">
                <List className="absolute left-3 top-6 text-white/80"/>
                <Textarea
                  id="descricao"
                  value={espaco.descricao || ''}
                  onChange={(e) =>
                    atualizarCampo({descricao: e.target.value})
                  }
                  placeholder="Escreva uma breve descrição do Espaço"
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

            <div id="equipamentos" className="relative">
              {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 bg-[#2176AE] dark:bg-zinc-800 text-white p-4 rounded-sm">
                  {selected.map((item) => (
                    <div
                      key={item}
                      className="flex items-center bg-yellow-400 text-black px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                      <button
                        onClick={() => removeItem(item)}
                        className="ml-1 cursor-pointer"
                      >
                        <X size={14}/>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4 items-end">
                <div className="w-full max-w-md">
                  <div className="relative w-full max-w-md">
                    <button
                      type="button"
                      value={espaco.recursos_imovel || ''}
                      onClick={() => setOpen((prev) => !prev)}
                      className="w-full h-full justify-between bg-[#2176AE] dark:bg-zinc-800 text-white text-sm cursor-pointer rounded-lg px-4 py-3 flex items-center"
                    >
                      <div className="flex items-center gap-2">
                        <Hammer className="ml-2 h-6 w-6"/>
                        Selecionar Equipamentos
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4"/>
                    </button>

                    {open && (
                      <div
                        className="absolute left-0 top-full mt-2 z-50 w-full bg-[#2176AE] dark:bg-zinc-800 text-white rounded-md shadow-lg overflow-hidden">
                        <ul className="max-h-auto overflow-y-auto w-full p-2">
                          {itens.map((option) => (
                            <li
                              key={option}
                              className="flex items-center gap-2 px-2 py-2 cursor-pointer rounded-md transition"
                              onClick={() => toggleItem(option)}
                            >
                              <label className="relative flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selected.includes(option)}
                                  onChange={() => toggleItem(option)}
                                  className="peer hidden"
                                />
                                <span
                                  className={`w-5 h-5 flex items-center justify-center rounded border-2 transition-colors ${
                                    selected.includes(option)
                                      ? 'bg-white border-transparent'
                                      : 'border-white bg-transparent'
                                  }`}
                                >
                                  {selected.includes(option) && (
                                    <svg
                                      className="w-5 h-5 text-[#2176AE]"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="3"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  )}
                                </span>
                              </label>
                              <span>{option}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 relative">
                  <Input
                    value={recurso}
                    onChange={(e) => setRecurso(e.target.value)}
                    placeholder="Algum recurso disponível específico?"
                    className={`py-6 pl-4 pr-10 rounded-lg border-none ${
                      isDarkMode
                        ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50'
                        : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (recurso && !selected.includes(recurso)) {
                        setSelected((prev) => [...prev, recurso]);
                        setRecurso('');
                      }
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursou-pointer"
                  >
                    <Image
                      src="/send.svg"
                      alt="Logo"
                      width={20}
                      height={20}
                      priority
                      className="text-white cursor-pointer"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="lado_direito"
            className="w-full lg:w-1/3 flex flex-col gap-6"
          >
            <div className="w-full flex flex-col gap-4">
              <div
                id="fotos"
                className="relative flex flex-col justify-center items-center rounded-md overflow-hidden"
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className={`w-full h-96 opacity-0 absolute z-10 cursor-pointer`}
                />

                <div
                  className={`w-full h-96 flex flex-col justify-center items-center rounded-md text-center px-4 py-6 pointer-events-none ${
                    isDarkMode ? 'bg-zinc-800' : 'bg-[#2176AE]'
                  }`}
                >
                  <UploadCloud size={50} className="text-white mb-2"/>
                  <span className="text-white font-medium">
                    Adicione Fotos do local
                  </span>
                </div>
              </div>

              {/* Preview das imagens */}
              {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {previews.map((src, idx) => (
                    <Image
                      key={idx}
                      src={src}
                      width={200}
                      height={200}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
              <div id="botoes_fotos" className="flex justify-between mx-6">
                <div
                  id="adicionar"
                  className="relative flex flex-col justify-center items-center cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="bg-yellow-500 text-yellow-500 flex flex-col justify-center items-center rounded-md text-center py-2 cursor-pointer w-30 h-13"
                  />
                  <Camera className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
                <div
                  id="remover"
                  onClick={handleRemoveFotos}
                  className="relative flex flex-col justify-center items-center cursor-pointer"
                >
                  <input
                    type="file"
                    className="bg-red-600 text-red-600 flex flex-col justify-center items-center rounded-md text-center py-2 cursor-pointer w-30 h-13"
                  />
                  <Trash2 className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
              </div>
            </div>

            <Button
              // onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full h-12 text-lg bg-green-800 hover:bg-green-800 text-white cursor-pointer`}
            >
              <Save className="w-6 h-6"/>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>

        {/* Botão de avançar */}
        <div className="flex justify-end mt-auto">
          <Button
            className={`text-lg font-bold px-22 py-6 rounded-md cursor-pointer ${
              isDarkMode
                ? 'bg-[#ffffff] hover:bg-[#d4d3d3] text-black'
                : 'bg-[#11395e] hover:bg-[#1a222b] text-white'
            }`}
          >
            <Link href="/espaco/cadastro/2">Avançar</Link>
          </Button>
        </div>

        {/* Botões superiores */}
        <div className="absolute top-6 right-4 lg:right-8 flex space-x-4 text-lg font-bold underline">
          <Button
            size="icon"
            className={`px-[10px] py-2 ${
              isDarkMode
                ? 'bg-white text-black cursor-pointer'
                : 'bg-black text-white cursor-pointer'
            }`}
          >
            <Link href="/ajuda" className="flex items-center gap-1">
              <HelpCircle size={18}/>
            </Link>
          </Button>
          <ThemeToggleButton
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>
      </div>
    </div>
  );
}
