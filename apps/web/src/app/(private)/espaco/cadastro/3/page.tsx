'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useState } from 'react';

export default function HorarioFuncionamento() {
  const [disponivel24h, setDisponivel24h] = useState(false);
  const [horarioFixo, setHorarioFixo] = useState(true);
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

  return (
    <div className="flex bg-[#F3FBF9] text-black relative overflow-hidden min-h-screen">
      <div className="flex-1 flex flex-col p-4 lg:p-6 justify-between overflow-y-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Horário de Funcionamento</h1>
        </div>

        <div className="flex flex-1 gap-8">
          {/* Coluna Esquerda */}
          <div className="flex-1">
            <h2 className="font-bold text-[#0061A3] text-lg mb-2">
              Horário Disponível
            </h2>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Switch
                  checked={disponivel24h}
                  onCheckedChange={() => {
                    setDisponivel24h(true);
                    setHorarioFixo(false);
                  }}
                  className="mr-2"
                />
                <span
                  className={cn('font-medium', disponivel24h && 'font-bold')}
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
                  className="mr-2"
                />
                <span className={cn('font-medium', horarioFixo && 'font-bold')}>
                  Horário fixo
                </span>
              </div>
            </div>

            {horarioFixo && (
              <div className="flex flex-col gap-4">
                {/* Campo de Abertura */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1 text-[#1681B0]">
                    Abertura
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1681B0] w-5 h-5" />
                    <Input
                      type="time"
                      className="pl-10 bg-white text-black border border-[#1681B0] focus-visible:ring-[#1681B0]"
                    />
                  </div>
                </div>

                {/* Campo de Encerramento */}
                <div className="flex flex-col">
                  <label className="text-sm font-semibold mb-1 text-[#1681B0]">
                    Encerramento
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1681B0] w-5 h-5" />
                    <Input
                      type="time"
                      className="pl-10 bg-white text-black border border-[#1681B0] focus-visible:ring-[#1681B0]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita */}
          <div className="flex-1">
            <h2 className="font-bold text-[#0061A3] text-lg mb-2">
              Dias Disponíveis
            </h2>
            <div className="mb-4">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={!usarDiasEspecificos}
                  onChange={() => setUsarDiasEspecificos(false)}
                  className="mr-2"
                />
                Todos os Dias
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={usarDiasEspecificos}
                  onChange={() => setUsarDiasEspecificos(true)}
                  className="mr-2"
                />
                Específico
              </label>
            </div>

            {usarDiasEspecificos && (
              <div className="grid grid-cols-2 gap-2 bg-[#1681B0] p-4 rounded-md">
                {diasDaSemana.map((day) => (
                  <label key={day} className="flex items-center text-white">
                    <input
                      type="checkbox"
                      checked={diasSelecionados.includes(day)}
                      onChange={() => alternarDia(day)}
                      className="mr-2"
                    />
                    {day}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button className="bg-[#1681B0] text-white w-48 rounded-md text-base font-semibold">
            Avançar
          </Button>
        </div>
      </div>
      <div className="absolute top-6 right-4 lg:right-8 flex space-x-8 text-lg font-bold underline">
        <span className="cursor-pointer">Ajuda</span>
      </div>
    </div>
  );
}
