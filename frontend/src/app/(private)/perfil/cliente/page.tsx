'use client';

import { HeaderPerfil } from '@/components/HeaderPerfil';
import InfoItemPerfil from '@/components/InfoItemPerfil';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  History,
  Home,
  Landmark,
  List,
  Lock,
  MapPin,
  Phone,
  Timer,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PerfilCliente() {
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
    <>
      <HeaderPerfil isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div
        className={`min-h-screen p-6 flex flex-col ${
          isDarkMode ? 'bg-zinc-900' : 'bg-zinc-100'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Perfil
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Lado esquerdo */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full md:w-1/3 shadow">
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-300 mb-4">
                {/* Foto do usuário */}
                <Image
                  src="/bg.png"
                  alt="User Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                User Name
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                hello@relume.io
              </p>

              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Ocupação */}
              <div className="w-full text-center mb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Ocupação
                </p>
                <p className="text-sm text-gray-800 dark:text-white">Gerente</p>
              </div>

              {/* Frequência de Uso */}
              <div className="w-full text-center mb-6">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Frequência de Uso
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" className="rounded-full text-xs">
                    Diário
                  </Button>
                  <Button variant="outline" className="rounded-full text-xs">
                    Semanal
                  </Button>
                </div>
              </div>

              <Button className="w-full mt-4">Editar Perfil</Button>
            </div>
          </div>

          {/* Lado direito */}
          <div className="flex flex-col gap-6 w-full md:w-2/3">
            {/* Informações pessoais */}
            <Card>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                <InfoItemPerfil
                  icon={<Calendar className="w-5 h-5" />}
                  label="Idade"
                  value="10/07/1998"
                />
                <InfoItemPerfil
                  icon={<Phone className="w-5 h-5" />}
                  label="Telefone"
                  value="(83) 99999-9999"
                />
                <InfoItemPerfil
                  icon={<Lock className="w-5 h-5" />}
                  label="Senha"
                  value="********"
                />
                <InfoItemPerfil
                  icon={<Home className="w-5 h-5" />}
                  label="Endereço"
                  value="Rua Walir Zottis"
                />
                <InfoItemPerfil
                  icon={<MapPin className="w-5 h-5" />}
                  label="Bairro"
                  value="Jardim Itu Sabará"
                />
                <InfoItemPerfil
                  icon={<Landmark className="w-5 h-5" />}
                  label="Cidade"
                  value="Porto Alegre"
                />
              </CardContent>
            </Card>

            {/* Informações de uso */}
            <Card>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                <InfoItemPerfil
                  icon={<History className="w-5 h-5" />}
                  label="Última locação"
                  value="10/04/2025"
                />
                <InfoItemPerfil
                  icon={<Timer className="w-5 h-5" />}
                  label="Usado em média"
                  value="Semanal"
                />
                <InfoItemPerfil
                  icon={<List className="w-5 h-5" />}
                  label="Intensidade de uso"
                  value="Moderado - 7h por semana"
                />
                <InfoItemPerfil
                  icon={<Home className="w-5 h-5" />}
                  label="Tipo de Espaço"
                  value="Auditório"
                />
                <InfoItemPerfil
                  icon={<Timer className="w-5 h-5" />}
                  label="Tempo médio por sessão"
                  value="3h 30min"
                />
              </CardContent>
            </Card>

            <Button variant="destructive" className="self-start">
              Voltar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
