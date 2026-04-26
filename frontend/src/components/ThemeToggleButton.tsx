'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { FC } from 'react';

interface ThemeToggleButtonProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggleButton: FC<ThemeToggleButtonProps> = ({
  isDarkMode,
  toggleTheme,
}: ThemeToggleButtonProps) => {
  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className={`px-[10px] py-2 
        ${
          isDarkMode
            ? 'bg-[#e0e6eb] text-black hover:bg-[#f9fafa] hover:text-black cursor-pointer'
            : 'bg-[#212a30] text-white hover:bg-[#151a1d] hover:text-white cursor-pointer'
        }`}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

export default ThemeToggleButton;
