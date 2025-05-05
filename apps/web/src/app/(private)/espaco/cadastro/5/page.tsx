'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import { Button } from '@/components/ui/button';
import {
  CalendarClock,
  ClipboardList,
  DollarSign,
  HelpCircle,
  Home,
  Link,
  MapPin,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UltimosDetalhes() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
            <ClipboardList className="mr-2" /> Últimos Detalhes
          </h1>
        </div>

        {/* Campos principais */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 mt-4">
          <div className="flex flex-col flex-1 space-y-6">
            {/* Localização */}
            <div>
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800 '
                }`}
              >
                <MapPin className="w-5 h-5" /> Localização:
              </h2>
              <ul
                className={`pl-6 list-disc text-base font-medium mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-800'
                }`}
              >
                <li>João Pessoa - PB</li>
                <li>Rua Maria Caetana de Oliveira, 215</li>
                <li>Bairro Tambauzinho</li>
              </ul>
            </div>

            {/* Horário de Funcionamento */}
            <div className="w-full">
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                <CalendarClock className="w-5 h-5" /> Horário de Funcionamento:
              </h2>
              <p
                className={`text-base font-semibold mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-black'
                }`}
              >
                Segunda & Sexta
              </p>

              <div className="relative mt-4">
                {/* Horários principais */}
                <div
                  className={`flex justify-between text-sm font-semibold ${
                    isDarkMode ? 'dark:text-white' : 'text-blue-700'
                  }`}
                >
                  <span>07:00</span>
                  <span>19:00</span>
                </div>

                {/* Linha principal com marcadores */}
                <div
                  className={`relative mt-2 h-2  rounded-full ${
                    isDarkMode ? 'dark:bg-zinc-600' : 'bg-blue-300'
                  }`}
                >
                  <div
                    className={`absolute left-[29.1%] right-[20.5%] top-0 h-2 rounded-full ${
                      isDarkMode ? 'dark:bg-black' : 'bg-blue-700'
                    }`}
                  />
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 left-[29.1%] w-3 h-3 border rounded-full ${
                      isDarkMode
                        ? 'bg-white border-black'
                        : 'bg-white border-black'
                    }`}
                  />
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 right-[20.5%] w-3 h-3  border rounded-full ${
                      isDarkMode
                        ? 'bg-white border-black'
                        : 'bg-white border-black'
                    }`}
                  />
                </div>

                {/* Horários extremos */}
                <div
                  className={`flex justify-between text-xs font-semibold mt-2 ${
                    isDarkMode ? 'dark:text-zinc-500' : 'text-black '
                  }`}
                >
                  <span>00:00</span>
                  <span>24:00</span>
                </div>
              </div>
            </div>

            {/* Pagamento */}
            <div>
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                <Wallet className="w-5 h-5" /> Valor e Preferência de Pagamento
              </h2>
              <p className="text-base font-medium flex items-center gap-2 mt-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                Valor desejado:{' '}
                <span
                  className={`font-bold ${
                    isDarkMode ? 'text-white' : 'text-black '
                  }`}
                >
                  1000 R$
                </span>
              </p>
              <h3
                className={`text-lg font-semibold mt-4 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                Métodos de Pagamento
              </h3>
              <Button
                variant="secondary"
                className={`mt-2 py-4 px-4 cursor-pointer ${
                  isDarkMode
                    ? 'dark:bg-zinc-800 dark:hover:bg-zinc-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Selecionar métodos
              </Button>
            </div>
          </div>

          {/* Coluna da direita */}
          <div className="flex flex-col w-full lg:w-1/3 space-y-6">
            <div>
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                <Home className="w-5 h-5" /> Título do Anúncio
              </h2>
              <p
                className={`text-lg font-light mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-black'
                }`}
              >
                Espaço Versátil para Eventos e Reuniões
              </p>
            </div>

            <div>
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                <ClipboardList className="w-5 h-5" /> Recursos Disponíveis:
              </h2>
              <ul
                className={`pl-6 list-disc text-base font-medium mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-black'
                }`}
              >
                <li>Ambiente climatizado</li>
                <li>Wi-Fi de alta velocidade</li>
                <li>Estacionamento gratuito</li>
                <li>Mobília completa</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Botão de Publicar */}
        <div className="flex justify-end">
          <Button
            className={`font-semibold px-22 py-6 text-lg cursor-pointer ${
              isDarkMode
                ? 'bg-green-800 hover:bg-green-900 text-white'
                : 'bg-green-700 hover:bg-green-800 text-white'
            }`}
          >
            Publicar Anúncio
          </Button>
        </div>
      </div>

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
            <HelpCircle size={18} />
          </Link>
        </Button>
        <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}
