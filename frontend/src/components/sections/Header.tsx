import { HeaderProps } from '@/types';
import { KeyRound, LogOut, Moon, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

export const Header: FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  token,
  handleLogout,
}) => {
  const [isUserMenuOpenEnter, setIsUserMenuOpenEnter] = useState(false);
  const [isUserMenuOpenLogout, setIsUserMenuOpenLogout] = useState(false);

  return (
    <>
      <header
        className={`relative overflow-visible px-6 shadow-sm transition-colors duration-300 ${
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
          <div className="mx-auto px-32 py-1 flex xl:justify-between lg:justify-between md:justify-between sm:justify-between justify-between items-center">
            <div className="ml-20 md:flex justify-center space-x-5"></div>
            <nav
              className={`flex justify-center items-center py-2.5 ${
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
                    href="#"
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
                    href="#"
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
                    href="/faq"
                    className={`text-base font-medium flex justify-center items-center gap-1 duration-300 hover:border-b-2 hover:py-1.5 hover:font-normal ${
                      isDarkMode
                        ? 'text-white hover:border-white'
                        : 'text-white hover:border-white'
                    }`}
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="relative flex items-center gap-4">
              <button className="cursor-pointer">
                <Image
                  src="/svg/notification.svg"
                  width={20}
                  height={20}
                  alt="Notification"
                  className="rounded-full cursor-pointer"
                />
              </button>

              {!token && (
                <>
                  <button
                    onClick={toggleTheme}
                    className="cursor-pointer hover:scale-120 duration-900 hover:rotate-360 hover:shadow-2xl"
                  >
                    <Image
                      src="/svg/moon_white.svg"
                      width={20}
                      height={20}
                      alt="Icone de uma lua branca"
                    />
                  </button>

                  <Link
                    href="/login"
                    className="bg-[#0f4c72] px-9 py-1.5 text-white shadow-sm flex items-center text-sm font-bold
                    rounded-md hover:bg-[#082a3f] duration-300 hover:shadow-lg"
                  >
                    Login
                  </Link>

                  {isUserMenuOpenLogout && (
                    <div
                      role="menu"
                      aria-label="Menu do usuário"
                      className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-[9999] py-2"
                    >
                      <Link
                        href="/login"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <UserCircle className="w-4 h-4 mr-2" />
                        Login
                      </Link>

                      <button
                        onClick={toggleTheme}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        Modo Escuro
                      </button>
                    </div>
                  )}
                </>
              )}

              {token && (
                <>
                  <button
                    onClick={() => {
                      setIsUserMenuOpenEnter(!isUserMenuOpenEnter);
                      setIsUserMenuOpenLogout(false);
                    }}
                  >
                    <Image
                      src="/svg/user.svg"
                      width={35}
                      height={35}
                      alt="User"
                      className="rounded-full border-1 border-green-400 p-[2px] cursor-pointer"
                    />
                  </button>

                  {isUserMenuOpenEnter && (
                    <div
                      role="menu"
                      aria-label="Menu logado"
                      className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-[9999] py-2"
                    >
                      <Link
                        href="/perfil/cliente"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
                      >
                        <UserCircle className="w-4 h-4 mr-2" />
                        Meu Perfil
                      </Link>
                      <Link
                        href="/recuperar_senha/cliente"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
                      >
                        <KeyRound className="w-4 h-4 mr-2" />
                        Alterar senha
                      </Link>
                      <button
                        onClick={toggleTheme}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <Moon className="w-4 h-4 mr-2" />
                        Modo Escuro
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
