import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

interface HeaderPerfilProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const HeaderPerfil: FC<HeaderPerfilProps> = ({
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <>
      <header
        className={`relative overflow-hidden px-6 shadow-sm transition-colors duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-tl from-[#212a30] to-[#161c20]'
            : 'bg-gradient-to-tl from-[#1178B9] to-[#0d4f7d]'
        }`}
      >
        <div
          className={`absolute inset-0 z-0 bg-center opacity-10 pointer-events-none ${
            isDarkMode
              ? 'bg-[url("/textura_parede_escuro.png")]'
              : 'bg-[url("/textura_parede_claro.png")]'
          }`}
        />
        <div className="container mx-auto px-4 py-3 flex justify-between items-center z-10">
          <div></div>
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 z-10 cursor-pointer"
            >
              <Image
                src={isDarkMode ? '/icone_branco.png' : '/icone_branco.png'}
                alt="Logo"
                width={50}
                height={50}
                priority
              />
              {/* <span
                className={`text-5xl font-bold  ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-white to-gray-100  bg-clip-text text-transparent'
                }`}
              >
                Espaço Livre
              </span> */}
            </Link>
          </div>

          <div className="flex items-center gap-4 z-10">
            <ThemeToggleButton
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          </div>
        </div>
      </header>
    </>
  );
};
