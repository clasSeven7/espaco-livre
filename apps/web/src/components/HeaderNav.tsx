import { Button } from '@/components/ui/button';
import { LogOut, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

interface HeaderNavProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  token: string | null;
  handleLogout: () => void;
}

const HeaderNav: FC<HeaderNavProps> = ({
  isDarkMode,
  toggleTheme,
  token,
  handleLogout,
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
          className={`absolute inset-0 z-0 bg-center opacity-10 ${
            isDarkMode
              ? 'bg-[url("/textura_parede_escuro.png")]'
              : 'bg-[url("/textura_parede_claro.png")]'
          }`}
        />
        <div className="relative z-10">
          <div className="mx-auto px-4 py-1 flex xl:justify-between lg:justify-between md:justify-between sm:justify-between justify-between items-center">
            <div className="md:flex justify-center space-x-5"></div>
            <nav
              className={`flex justify-center items-center py-[10px] ${
                isDarkMode ? '' : ''
              }`}
            >
              <ul className="flex items-center gap-12">
                <li>
                  <Link
                    href="/"
                    className={`text-base font-medium flex justify-center items-center gap-1 duration-300 hover:border-b-2 hover:py-1.5 hover:font-normal ${
                      isDarkMode
                        ? 'text-white hover:border-white'
                        : 'text-white hover:border-white'
                    }`}
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre"
                    className={`text-base font-medium flex justify-center items-center gap-1 duration-300 hover:border-b-2 hover:py-1.5 hover:font-normal ${
                      isDarkMode
                        ? 'text-white hover:border-white'
                        : 'text-white hover:border-white'
                    }`}
                  >
                    Menu
                  </Link>
                </li>
                <Link href="/">
                  <Image
                    src={isDarkMode ? '/icone_branco.png' : '/icone_branco.png'}
                    width={40}
                    height={40}
                    alt="Logo"
                  />
                </Link>
                <li>
                  <Link
                    href="/blog"
                    className={`text-base font-medium flex justify-center items-center gap-1 duration-300 hover:border-b-2 hover:py-1.5 hover:font-normal ${
                      isDarkMode
                        ? 'text-white hover:border-white'
                        : 'text-white hover:border-white'
                    }`}
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ranking"
                    className={`text-base font-medium flex justify-center items-center gap-1 duration-300 hover:border-b-2 hover:py-1.5 hover:font-normal ${
                      isDarkMode
                        ? 'text-white hover:border-white'
                        : 'text-white hover:border-white'
                    }`}
                  >
                    Ranking
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!token && (
                <Link
                  href="/login"
                  className="flex items-center text-white text-sm font-medium bg-[#173d5c] cursor-pointer px-2.5 py-2 rounded-md gap-1 hover:text-white hover:bg-blue-600"
                >
                  <UsersRound className="h-4 w-4" />
                  Login
                </Link>
              )}
              {token && (
                <Button
                  onClick={handleLogout}
                  className="flex items-center text-white text-sm font-medium bg-red-800 cursor-pointer px-2.5 py-2 rounded-md gap-1 hover:text-white hover:bg-red-900"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              )}
              <ThemeToggleButton
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderNav;
