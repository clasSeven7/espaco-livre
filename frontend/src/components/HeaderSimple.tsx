import { HeaderSimpleProps } from '@/types/index';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

export const HeaderSimple: FC<HeaderSimpleProps> = ({
  isDarkMode,
  toggleTheme,
}) => {
  return (
    <>
      <header
        className={`flex items-center justify-between px-3 shadow-2xl transition-colors duration-300 ${
          isDarkMode ? 'bg-[#212a30]' : 'bg-[#f2f7f6]'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div></div>
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={isDarkMode ? '/icone_branco.png' : '/icone_preto_azul.png'}
                alt="Logo"
                width={50}
                height={50}
                priority
              />
              <span
                className={`text-5xl font-bold  ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-white to-[#1178B9] bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-[#1178B9] to-[#0F2027] bg-clip-text text-transparent'
                }`}
              >
                Cadastro
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
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
