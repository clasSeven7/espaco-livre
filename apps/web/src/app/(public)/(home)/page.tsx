'use client';

import {Comment} from '@/components/sections/Comment';
import {Feature} from '@/components/sections/Feature';
import {Footer} from '@/components/sections/Footer';
import {Header} from '@/components/sections/Header';
import {Hero} from '@/components/sections/Hero';
import {Space} from '@/components/sections/Space';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function Home() {
  const router = useRouter();
  const token = Cookies.get('token') || null;

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

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.clear();
    router.push('/');
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}
        token={token}
      />

      <Hero isDarkMode={isDarkMode}/>
      <Space isDarkMode={isDarkMode}/>
      <Comment isDarkMode={isDarkMode}/>
      <Feature isDarkMode={isDarkMode}/>
      <Footer isDarkMode={isDarkMode}/>
    </main>
  );
}
