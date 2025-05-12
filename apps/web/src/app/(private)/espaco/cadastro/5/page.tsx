'use client';

import ThemeToggleButton from '@/components/ThemeToggleButton';
import {Button} from '@/components/ui/button';
import {useEspacoCadastro} from '@/context/EspacoCadastroContext';
import api from '@/lib/axios';
import Cookies from 'js-cookie';
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  ClipboardList,
  DollarSign,
  Home,
  Images,
  Link,
  MapPin,
  Trash2,
  Wallet
} from 'lucide-react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

export default function UltimosDetalhes() {
  const {espaco, limparCampos} = useEspacoCadastro();
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fotos, setFotos] = useState<string[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const removerFoto = (index: number) => {
    const novasFotos = fotos.filter((_, i) => i !== index);
    setFotos(novasFotos);
    localStorage.setItem('fotos_imovel', JSON.stringify(novasFotos));
  };

  const avancarFoto = () => {
    setIndiceAtual((prev) => (prev + 1) % fotos.length);
  };

  const voltarFoto = () => {
    setIndiceAtual((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  const handleSubmit = async () => {
    try {
      const dadosDoEspaco = Cookies.get('espaco-cadastro');

      if (!dadosDoEspaco || !userId) {
        toast.error('Erro: dados incompletos para cadastro.');
        return;
      }

      const espaco = JSON.parse(dadosDoEspaco);

      const payload = {
        ...espaco,
        locatario_id: userId,
      };

      const response = await api.post('/espacos', payload);

      toast.success('Espaço cadastrado com sucesso!');
      console.log('✅ Espaço cadastrado:', response.data);
      limparCampos();
      router.push('/');
    } catch (error) {
      console.error('Erro ao salvar espaço:', error);
      toast.error('Erro ao salvar espaço. Tente novamente.');
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

  useEffect(() => {
    const storedFotos = localStorage.getItem('fotos_imovel');
    if (storedFotos) {
      const fotosArray = JSON.parse(storedFotos);
      setFotos(fotosArray);
    }
  }, []);

  useEffect(() => {
    const locatarioId = localStorage.getItem('locatario_id');
    const tipoUsuario = localStorage.getItem('tipo_usuario'); // certifique-se de que esse valor está sendo salvo no login

    if (locatarioId) {
      setUserId(locatarioId);
      console.log('🆔 ID do usuário encontrado:', locatarioId);
    }

    if (tipoUsuario) {
      setUserType(tipoUsuario);
      console.log('👤 Tipo do usuário encontrado:', tipoUsuario);
    }
  }, []);

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
            <ClipboardList className="mr-2"/> Últimos Detalhes
          </h1>
        </div>

        <div className="flex flex-col space-x-4 mb-6">
          <span className="text-sm mt-4 font-medium text-green-600">
            ID do usuário logado: {userId}
          </span>
          <span className="text-sm mt-4 font-medium text-orange-600">
            Tipo do usuário logado: {userType}
          </span>
        </div>

        {/* Campos principais */}
        <div className="flex flex-col lg:flex-row flex-1 gap-6 mt-4">
          <div className="flex flex-col flex-1 space-y-6">
            <div>
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800 '
                }`}
              >
                <MapPin className="w-5 h-5"/> Localização:
              </h2>
              <ul
                className={`pl-6 list-disc text-base font-medium mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-800'
                }`}
              >
                <li><strong>Cidade:</strong> {espaco.cidade}</li>
                <li><strong>Rua:</strong> {espaco.rua}</li>
                <li><strong>Bairro:</strong> {espaco.bairro}</li>
              </ul>
            </div>

            {/* Horário de Funcionamento */}
            <div className="w-full">
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                <CalendarClock className="w-5 h-5"/> Horário de Funcionamento:
              </h2>
              <div
                className={`text-base font-semibold mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-black'
                }`}
              >
                <p>
                  {espaco.todos_dias
                    ? 'Segunda à Domingo'
                    : espaco.dias_disponiveis?.join(', ') || 'Nenhum dia disponível'}
                </p>
              </div>

              <div className="relative mt-4">
                {/* Horários principais */}
                <div
                  className={`flex justify-between text-sm font-semibold ${
                    isDarkMode ? 'dark:text-white' : 'text-blue-700'
                  }`}
                >
                  <div className="w-full flex items-center justify-between gap-10">
                    {espaco.disponivel_24h ? (
                      <>
                        <span className="font-bold">Início: 00:00</span>
                        <span className="font-bold">Fim: 24:00</span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold">Início: {espaco.hora_inicio || '--:--'}</span>
                        <span className="font-bold">Fim: {espaco.hora_fim || '--:--'}</span>
                      </>
                    )}
                  </div>
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
                <Wallet className="w-5 h-5"/> Valor e Preferência de Pagamento
              </h2>
              <p className="text-base font-medium flex items-center gap-2 mt-2">
                <DollarSign className="w-4 h-4 text-green-600"/>
                Valor desejado:{' '}
                <span
                  className={`font-bold ${
                    isDarkMode ? 'text-white' : 'text-black '
                  }`}
                >
                  {espaco.valor_imovel} R$
                </span>
              </p>
              <h3
                className={`text-lg font-semibold mt-4 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                Métodos de Pagamento
              </h3>
              <ul
                className={`pl-6 list-disc text-base font-medium mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-black'
                }`}
              >
                {espaco.metodos_pagamento && espaco.metodos_pagamento.length > 0 ? (
                  espaco.metodos_pagamento.map((metodo, index) => (
                    <li className='uppercase' key={index}>{metodo}</li>
                  ))
                ) : (
                  <li>Não foi selecionado nenhum método de pagamento.</li>
                )}
              </ul>
            </div>
          </div>

          <div
            id="lado_direito"
            className="flex flex-col w-full lg:w-1/3 space-y-6"
          >
            <div id="titulo_anuncio">
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                <Home className="w-5 h-5"/> Título do Anúncio
              </h2>
              <p
                className={`text-lg font-light mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-black'
                }`}
              >
                {espaco.titulo}
              </p>
            </div>

            <div id="recursos_disponiveis">
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                }`}
              >
                <ClipboardList className="w-5 h-5"/> Recursos Disponíveis:
              </h2>
              <ul
                className={`pl-6 list-disc text-base font-medium mt-2 ${
                  isDarkMode ? 'text-zinc-500' : 'text-black'
                }`}
              >
                {espaco.recursos_imovel && espaco.recursos_imovel.length > 0 ? (
                  espaco.recursos_imovel.map((metodo, index) => (
                    <li className='capitalize' key={index}>{metodo}</li>
                  ))
                ) : (
                  <li>Não foi selecionado nenhum equipamentos para o imovel.</li>
                )}
              </ul>
            </div>

            <div id="preview_fotos" className="w-full">
              <div className="flex flex-col w-full lg:w-1/3 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-blue-800 dark:text-white">
                  <Images className="w-5 h-5"/> Galeria de Fotos
                </h2>
                {/* Galeria de Imagens */}
                <div
                  className="relative w-full aspect-video border rounded-lg overflow-hidden flex items-center justify-center"
                >
                  {fotos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                      <div className="relative w-full aspect-square border rounded-lg overflow-hidden">
                        <Image
                          src={fotos[indiceAtual]}
                          alt={`Preview ${indiceAtual}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Botões para navegação */}
                <div className="flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={voltarFoto}
                    disabled={fotos.length <= 1}
                  >
                    <ArrowLeft className="w-4 h-4"/>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={avancarFoto}
                    disabled={fotos.length <= 1}
                  >
                    <ArrowRight className="w-4 h-4"/>
                  </Button>
                </div>

                {/* Remover foto */}
                <div className="flex justify-center items-center gap-4">
                  <Button
                    variant="destructive"
                    onClick={() => removerFoto(indiceAtual)}
                    disabled={fotos.length === 0}
                  >
                    <Trash2 className="w-4 h-4"/>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Publicar */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
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
          <Link href="../../../ajuda" className="flex items-center gap-1">
            {/*<HelpCircle size={18}/>*/}
          </Link>
        </Button>
        <ThemeToggleButton
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      </div>
    </div>
  );
}
