'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useEspacoCadastro} from '@/context/EspacoCadastroContext';
import {HelpCircle, Info, Landmark, Map, MapPin, Navigation,} from 'lucide-react';
import Link from 'next/link';
import {useEffect, useState} from 'react';

export default function InformacoesGerais() {
  const {espaco, atualizarCampo} = useEspacoCadastro();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const maxMensagemObservacao = 500;

  const [cidade, setCidade] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cidade');
      return saved ?? '';
    }
    return '';
  });

  const [rua, setRua] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rua');
      return saved ?? '';
    }
    return '';
  });

  const [bairro, setBairro] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bairro');
      return saved ?? '';
    }
    return '';
  });

  const [observacoes, setObservacoes] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('observacoes');
      return saved ?? '';
    }
    return '';
  });
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
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
    atualizarCampo({cidade: cidade})
    localStorage.setItem('cidade', cidade)
  }, [cidade]);

  useEffect(() => {
    atualizarCampo({rua: rua})
    localStorage.setItem('rua', rua)
  }, [rua]);

  useEffect(() => {
    atualizarCampo({bairro: bairro})
    localStorage.setItem('bairro', bairro)
  }, [bairro]);

  useEffect(() => {
    atualizarCampo({observacoes: observacoes})
    localStorage.setItem('observacoes', observacoes)
  }, [observacoes]);

  return (
    <div
      className={`flex relative overflow-hidden min-h-screen ${
        isDarkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'
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
            <Map className="mr-2"/>
            Informações Gerais
          </h1>
        </div>

        {/* Campos principais */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6 flex-1">
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            {/* Cidade */}
            <div className="relative">
              <label htmlFor="cidade" className="sr-only">
                Cidade
              </label>
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"/>
              <Input
                id="cidade"
                value={espaco.cidade || ''}
                onChange={(e) => setCidade(e.target.value)}
                placeholder="Digite sua Cidade"
                className={`pl-10 py-8 rounded-lg border-none focus-visible:ring-2 transition ${
                  isDarkMode
                    ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50 focus-visible:ring-white/70'
                    : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50 focus-visible:ring-[#6ea7ca]/70'
                }`}
              />
            </div>
            {/* Rua */}
            <div className="relative">
              <label htmlFor="rua" className="sr-only">
                Rua
              </label>
              <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"/>
              <Input
                id="rua"
                value={espaco.rua || ''}
                onChange={(e) => setRua(e.target.value)}
                placeholder="Digite sua Rua"
                className={`pl-10 py-8 rounded-lg border-none focus-visible:ring-2 transition ${
                  isDarkMode
                    ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50 focus-visible:ring-white/70'
                    : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50 focus-visible:ring-[#6ea7ca]/70'
                }`}
              />
            </div>
            {/* Bairro */}
            <div className="relative">
              <label htmlFor="bairro" className="sr-only">
                Bairro
              </label>
              <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"/>
              <Input
                id="bairro"
                value={espaco.bairro || ''}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Digite seu Bairro"
                className={`pl-10 py-8 rounded-lg border-none focus-visible:ring-2 transition ${
                  isDarkMode
                    ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50 focus-visible:ring-white/70'
                    : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50 focus-visible:ring-[#6ea7ca]/70'
                }`}
              />
            </div>
          </div>

          {/* Coluna Direita - Observação */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between break-all whitespace-pre-wrap">
            <div className="relative h-full">
              <label htmlFor="observacao" className="sr-only">
                Observação
              </label>
              <Info className="absolute left-3 top-6 text-white"/>
              <Textarea
                id="observacao"
                value={espaco.observacoes || ''}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Descreva alguma observação sobre o espaço"
                // value={observacao}
                // onChange={(e) => {
                //   const texto = e.target.value;
                //   if (texto.length <= maxMensagemObservacao) {
                //     setObservacao(texto);
                //   }
                // }}
                className={`bg-[#127BBF] text-white placeholder:text-white/80 pl-10 pr-4 py-6 h-96 rounded-lg  border-none resize-none overflow-y-auto break-words focus-visible:ring-2 focus-visible:ring-white/70 transition ${
                  isDarkMode
                    ? 'dark:bg-zinc-800 text-white focus:ring-2 focus:ring-gray-500 placeholder:text-white/50 focus-visible:ring-white/70'
                    : 'bg-[#1178B9] text-white focus:ring-2 focus:ring-blue-500 placeholder:text-white/50 focus-visible:ring-[#6ea7ca]70'
                }`}
                maxLength={maxMensagemObservacao}
              />
              <div
                className={`text-sm  mt-1 text-right ${
                  isDarkMode ? 'dark:text-white' : 'text-blue-800'
                }`}
              >
                <span
                  className={`${
                    espaco.observacoes?.length === maxMensagemObservacao
                      ? 'text-red-500'
                      : ''
                  }`}
                >
                  {/*{espaco.observacoes?.length || 0} / {maxMensagemObservacao}*/}
                </span>
              </div>
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
            <Link href="/espaco/cadastro/3">Avançar</Link>
          </Button>
        </div>
      </div>

      <div className="absolute top-6 right-4 lg:right-8 flex space-x-4 text-lg font-bold underline">
        {/* Link de ajuda */}
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
        <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
      </div>
    </div>
  );
}
