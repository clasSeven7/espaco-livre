import { Button } from '@/components/ui/button';
import { Contact, LogOut, User, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ThemeToggleButton from './ThemeToggleButton';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  token: string | null;
  handleLogout: () => void;
}

const Header: FC<HeaderProps> = ({
  isDarkMode,
  toggleTheme,
  token,
  handleLogout,
}) => {
  return (
    <>
      <header
        className={`flex items-center justify-between px-6 py-4 shadow-sm transition-colors duration-300 ${
          isDarkMode ? 'bg-[#212a30]' : 'bg-[#f2f7f6]'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src={isDarkMode ? '/icone_branco.png' : '/icone_preto.png'}
              alt="Logo"
              width={50}
              height={50}
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            {!token && (
              <Link
                href="/login"
                className="flex items-center bg-[#2E7AB8] text-white font-semibold px-[10px] py-2 rounded-md hover:bg-blue-600"
              >
                <UsersRound size={20} />
              </Link>
            )}
            {token && (
              <Button
                onClick={handleLogout}
                className="text-white font-semibold bg-red-800 cursor-pointer px-[10px] py-2 hover:text-white hover:bg-red-900"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            )}
            <ThemeToggleButton
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
            />
          </div>
        </div>
      </header>
      <nav
        className={`flex justify-center items-center  py-1 shadow-sm ${
          isDarkMode ? 'bg-[#161c20]' : 'bg-[#DDF0EF]'
        }`}
      >
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/sobre"
              className={`text-lg font-semibold flex justify-center items-center gap-1 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              <User className="w-5 h-5" />
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href="/contato"
              className={`text-lg font-semibold flex justify-center items-center gap-1 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              <Contact className="w-5 h-5" />
              Contato
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
