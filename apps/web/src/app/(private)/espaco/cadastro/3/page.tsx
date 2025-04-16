'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { CalendarClock, Clock, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HorarioFuncionamento() {
  const [disponivel24h, setDisponivel24h] = useState(false);
  const [horarioFixo, setHorarioFixo] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([
    'Segunda-Feira',
    'Sexta-Feira',
  ]);
  const [usarDiasEspecificos, setUsarDiasEspecificos] = useState(true);

  const diasDaSemana = [
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado',
    'Domingo',
  ];

  const alternarDia = (dia: string) => {
    setDiasSelecionados((anterior) =>
      anterior.includes(dia)
        ? anterior.filter((d) => d !== dia)
        : [...anterior, dia]
    );
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
            <CalendarClock className="mr-2" />
            Horário de Funcionamento
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 gap-6 mt-4">
          <div className="flex flex-col flex-1 space-y-4">
            <h2
              className={`font-bold text-lg mb-2 ${
                isDarkMode ? 'text-white' : 'text-[#0061A3]'
              }`}
            >
              Horário Disponível
            </h2>
            <div className="space-y-2">
              <div className="flex items-center">
                <Switch
                  checked={disponivel24h}
                  onCheckedChange={() => {
                    setDisponivel24h(true);
                    setHorarioFixo(false);
                  }}
                  className={`mr-2 cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#0061A3] data-[state=checked]:bg-white'
                      : 'bg-[#1681B0] data-[state=checked]:bg-[#0061A3]'
                  }`}
                />
                <span
                  className={cn('font-medium', {
                    'font-bold text-[#0061A3] dark:text-white': disponivel24h,
                  })}
                >
                  Disponível 24H
                </span>
              </div>

              <div className="flex items-center">
                <Switch
                  checked={horarioFixo}
                  onCheckedChange={() => {
                    setDisponivel24h(false);
                    setHorarioFixo(true);
                  }}
                  className={`mr-2 cursor-pointer ${
                    isDarkMode
                      ? 'bg-[#0061A3] data-[state=checked]:bg-white'
                      : 'bg-[#1681B0] data-[state=checked]:bg-[#0061A3]'
                  }`}
                />
                <span
                  className={cn('font-medium', {
                    'font-bold text-[#0061A3] dark:text-white': horarioFixo,
                  })}
                >
                  Horário fixo
                </span>
              </div>
            </div>

            {horarioFixo && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label
                    className={`text-sm font-semibold mb-1 ${
                      isDarkMode ? 'text-white' : 'text-[#1681B0]'
                    }`}
                  >
                    Abertura
                  </label>
                  <div className="relative">
                    <Clock
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-white' : 'text-white'
                      }`}
                    />
                    <Input
                      type="time"
                      className={`pl-10 border ${
                        isDarkMode
                          ? 'dark:bg-zinc-800 text-white focus:ring-2 placeholder:text-white/50 focus-visible:ring-white/70 border-white'
                          : 'bg-[#1178B9] text-white focus:ring-2 placeholder:text-white/50 border-[#0f4c72]'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    className={`text-sm font-semibold mb-1 ${
                      isDarkMode ? 'text-white' : 'text-[#1681B0]'
                    }`}
                  >
                    Encerramento
                  </label>
                  <div className="relative">
                    <Clock
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-white' : 'text-white'
                      }`}
                    />
                    <Input
                      type="time"
                      className={`pl-10 bg-white text-black border border-[#1681B0] focus-visible:ring-[#1681B0] ${
                        isDarkMode
                          ? 'dark:bg-zinc-800 text-white focus:ring-2 placeholder:text-white/50 focus-visible:ring-white/70 border-white'
                          : 'bg-[#1178B9] text-white focus:ring-2 placeholder:text-white/50 border-[#0f4c72]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coluna de dias */}
          <div className="flex-1">
            <h2
              className={`font-bold text-lg mb-2 ${
                isDarkMode ? 'text-white' : 'text-[#0061A3]'
              }`}
            >
              Dias Disponíveis
            </h2>
            <div className="mb-4 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={!usarDiasEspecificos}
                  onChange={() => setUsarDiasEspecificos(false)}
                  className={`mr-2 ${
                    isDarkMode
                      ? 'bg-black accent-black'
                      : 'bg-[#0061A3] accent-[#0061A3]'
                  }`}
                />
                Todos os Dias
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={usarDiasEspecificos}
                  onChange={() => setUsarDiasEspecificos(true)}
                  className={`mr-2 ${
                    isDarkMode
                      ? 'bg-black accent-black'
                      : 'bg-[#0061A3] accent-[#0061A3]'
                  }`}
                />
                Específico
              </label>
            </div>

            {usarDiasEspecificos && (
              <div
                className={`grid grid-cols-2 gap-2 p-4 rounded-md ${
                  isDarkMode ? 'bg-white' : 'bg-[#1178B9]'
                }`}
              >
                {diasDaSemana.map((day) => (
                  <label
                    key={day}
                    className={`flex items-center ${
                      isDarkMode ? 'text-black' : 'text-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={diasSelecionados.includes(day)}
                      onChange={() => alternarDia(day)}
                      className={`mr-2 ${
                        isDarkMode
                          ? 'bg-black accent-black'
                          : 'bg-white accent-white'
                      }`}
                    />
                    {day}
                  </label>
                ))}
              </div>
            )}
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
