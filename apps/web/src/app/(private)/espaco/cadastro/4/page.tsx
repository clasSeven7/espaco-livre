'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useEspacoCadastro} from '@/context/EspacoCadastroContext';
import {CircleDollarSign, CreditCard, DollarSign, HelpCircle, Percent, Plus, ShowerHead, Wallet} from 'lucide-react';
import Link from 'next/link';
import {useEffect, useState} from 'react';

const metodos = [
  {id: 'dinheiro', label: 'Dinheiro', icon: <DollarSign className="w-6 h-6"/>},
  {id: 'credito', label: 'Cartão de Crédito', icon: <CreditCard className="w-6 h-6"/>},
  {id: 'debito', label: 'Cartão de Débito', icon: <Wallet className="w-6 h-6"/>},
  {id: 'pix', label: 'Pix', icon: <CircleDollarSign className="w-6 h-6"/>},
  {id: 'vale', label: 'Vale Crédito', icon: <Percent className="w-6 h-6"/>},
  {id: 'outro', label: 'Outro', icon: <Plus className="w-6 h-6"/>},
];

export default function PrecoCondicoes() {
  const {espaco, atualizarCampo} = useEspacoCadastro();

  const [metodoSelecionado, setMetodoSelecionado] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [valorImovel, setValorImovel] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('valor_imovel');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [taxaLimpeza, setTaxaLimpeza] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('taxa_limpeza');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const handleMetodoSelection = (metodoId: string) => {
    setMetodoSelecionado((prev) => {
      let updated;
      if (prev.includes(metodoId)) {
        updated = prev.filter((id) => id !== metodoId);
      } else {
        updated = [...prev, metodoId];
      }

      localStorage.setItem('metodos_pagamento', JSON.stringify(updated));
      atualizarCampo({metodos_pagamento: updated});

      return updated;
    });
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
    const savedMethods = JSON.parse(localStorage.getItem('metodos_pagamento') || '[]');
    setMetodoSelecionado(savedMethods);
  }, []);

  useEffect(() => {
    atualizarCampo({valor_imovel: valorImovel})
    localStorage.setItem('valor_imovel', valorImovel.toString())
  }, [valorImovel]);

  useEffect(() => {
    atualizarCampo({taxa_limpeza: taxaLimpeza})
    localStorage.setItem('taxa_limpeza', taxaLimpeza.toString())
  }, [taxaLimpeza]);

  useEffect(() => {
    if (metodoSelecionado.length > 0) {
      atualizarCampo({metodos_pagamento: metodoSelecionado});
    }
  }, [metodoSelecionado]);

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
            <DollarSign className="mr-2"/>
            Preço e Condições
          </h1>
        </div>

        {/* Formulário */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 mt-4">
          <div className="flex flex-col flex-1 space-y-4">
            <div className="relative">
              <label htmlFor="valor_desejado" className="sr-only">Valor Desejado:</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"/>
                <Input
                  id="valor_desejado"
                  type="number"
                  value={espaco.valor_imovel || ''}
                  onChange={(e) => setValorImovel(Number(e.target.value))}
                  placeholder="Digite o valor desejado"
                  className={`pl-10 py-8 rounded-lg border-0 focus:ring-2 ${
                    isDarkMode
                      ? 'bg-zinc-800 text-white placeholder:text-white/50 focus:ring-gray-700'
                      : 'bg-[#1178B9] text-white placeholder:text-white/50 focus:ring-blue-500'
                  }`}
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="taxa_limpeza" className="sr-only">Taxa de Limpeza:</label>
              <div className="relative">
                <ShowerHead className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"/>
                <Input
                  id="taxa_limpeza"
                  type="number"
                  value={espaco.taxa_limpeza || ''}
                  onChange={(e) => setTaxaLimpeza(Number(e.target.value))}
                  placeholder="Digite a taxa de limpeza"
                  className={`pl-10 py-8 rounded-lg border-0 focus:ring-2 ${
                    isDarkMode
                      ? 'bg-zinc-800 text-white placeholder:text-white/50 focus:ring-gray-700'
                      : 'bg-[#1178B9] text-white placeholder:text-white/50 focus:ring-blue-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Campo de Descrição */}
          <div className="flex flex-col flex-1 space-y-4">
            <h3
              className={`text-lg font-bold mb-4 flex items-center gap-2 ${
                isDarkMode ? 'dark:text-white' : 'text-[#0061A3]'
              }`}
            >
              <Wallet size={20}/> Métodos de Pagamento
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {metodos.map((metodo) => (
                <Card
                  key={metodo.id}
                  onClick={() => handleMetodoSelection(metodo.id)}
                  className={`cursor-pointer text-center border-2 transition-colors duration-200 ${
                    metodoSelecionado.includes(metodo.id)
                      ? 'border-[#0061A3]'
                      : 'border-transparent'
                  } ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}
                >
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <div
                      className={`rounded p-2 ${
                        isDarkMode ? 'border-transparent' : 'bg-transparent '
                      }`}
                    >
                      {metodo.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? 'dark:text-white' : 'text-[#0061A3]'
                      }`}
                    >
                      {metodo.label}
                    </span>
                    <input
                      name="metodo_pagamento"
                      type="checkbox"
                      value={metodo.id}
                      onChange={() => {
                      }}
                      className="mt-2"
                      checked={metodoSelecionado.includes(metodo.id)}
                      readOnly
                    />
                  </CardContent>
                </Card>
              ))}
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
            <Link href="/espaco/cadastro/5">Avançar</Link>
          </Button>
        </div>
      </div>
      <div className="absolute top-6 right-4 lg:right-8 flex space-x-4 text-lg font-bold underline">
        <Button
          size="icon"
          className={`px-[10px] py-2 ${
            isDarkMode ? 'bg-white text-black cursor-pointer' : 'bg-black text-white cursor-pointer'
          }`}
        >
          <Link href="../../../ajuda" className="flex items-center gap-1">
            <HelpCircle size={18}/>
          </Link>
        </Button>
        <ThemeToggleButton isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
      </div>
    </div>
  );
}