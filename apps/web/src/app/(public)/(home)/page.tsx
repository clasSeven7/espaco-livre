'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import Cookies from 'js-cookie';
import {
  Facebook,
  Github,
  Instagram,
  MessageCircle,
  Star,
  Twitter,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Rafael Lima',
    role: 'Gerente de Marketing',
    image: '/icon_1.png',
    content:
      'Utilizamos a plataforma para organizar uma série de workshops para o nosso núcleo. A escolha do espaço e a facilidade de contato com os responsáveis pelo local foi excelente. O processo foi muito simples e certamente vamos usar novamente.',
  },
  {
    name: 'Felipe Martins',
    role: 'Diretor de Vendas',
    image: '/icon_2.png',
    content:
      'Encontramos uma maneira de vendas com clientes importantes e escolhemos um espaço através da plataforma. A experiência foi excepcional e tudo era perfeito, desde a localização até os equipamentos disponíveis para apresentar. Definitivamente, uma solução que facilita nossa rotina.',
  },
  {
    name: 'Laura Santos',
    role: 'Coordenadora de Projetos',
    image: '/icon_3.png',
    content:
      'Nossa equipe precisou de um espaço bem equipado para um workshop de treinamento e encontramos tudo que precisávamos na plataforma. A interface fácil de usar e a comunicação rápida com os proprietários foram um ponto muito positivo no processo muito mais eficiente.',
  },
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const token = Cookies.get('token') || null;

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
        isDarkMode ? 'bg-zinc-900 text-white' : 'bg-[#DDF0EF] text-black'
      }`}
    >
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}
        token={token}
      />

      {/* Hero Section */}
      <section className="relative min-h-[700px] w-full">
        <div>
          <Image
            src="/background_home.png"
            alt="Background"
            width={1920}
            height={1080}
            className="absolute opacity-10 w-full h-full"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight">
                <span
                  className={`drop-shadow-sm ${
                    isDarkMode ? 'text-white' : 'text-[#2E7AB8]'
                  }`}
                >
                  Do seu jeito, no seu tempo.
                  <br />
                  Alugue espaços perfeitos
                  <br />
                  para qualquer ocasião.
                </span>
              </h1>
              <p
                className={`text-lg mb-60 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Escolha o espaço certo para cada momento. Use os filtros e
                encontre a melhor opção!
              </p>
              <div className="flex gap-14">
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-gray-800 px-11 py-6 text-lg rounded-sm cursor-pointer"
                >
                  <Link href="/espaco/buscar">Buscar Espaços</Link>
                </Button>
                <Button
                  variant="default"
                  className={`px-11 py-6 text-lg rounded-sm cursor-pointer ${
                    isDarkMode
                      ? 'bg-white hover:bg-gray-300'
                      : 'bg-[#2E7AB8] hover:bg-blue-600'
                  }`}
                >
                  <Link href="/espaco/cadastro/1">Cadastre seu Espaço</Link>
                </Button>
              </div>
            </div>
            <div className="h-full">
              <ResizablePanelGroup
                direction="horizontal"
                className="w-full lg:w-1/2 h-64 mt-6 lg:mt-0"
              >
                <ResizablePanel
                  defaultSize={50}
                  className="flex justify-center items-center rounded-lg overflow-hidden"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/home_image_1.png"
                      alt="Imagem 1"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                  defaultSize={50}
                  className="flex justify-center items-center overflow-hidden"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/home_image_2.png"
                      alt="Imagem 2"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">Comentários</h2>
        <p
          className={`text-center mb-12 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Opiniões dos clientes que usaram a plataforma.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg ${
                isDarkMode ? 'bg-[#212a30]' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3
                    className={`font-semibold ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}
                  >
                    {testimonial.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-2xl text-justify tracking-wide">
              Enquanto um andar está movimentado, o outro permanece vazio. Por
              que não aproveitar essa oportunidade? Cadastre seu espaço na nossa
              plataforma e alcance pessoas que estão em busca do lugar ideal.{' '}
              <span className="text-blue-600 font-bold">
                Dê vida ao seu espaço e faça ele trabalhar por você!
              </span>
            </p>
          </div>
          <div>
            <Image
              src="/image_1.png"
              alt="Espaço de coworking"
              width={500}
              height={300}
              className="rounded-lg w-full "
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div>
            <Image
              src="/image_2.png"
              alt="Usuário usando laptop"
              width={500}
              height={300}
              className="rounded-lg w-full"
            />
          </div>
          <div className="space-y-6">
            <p className="text-2xl text-justify tracking-wide">
              Encontrar o espaço ideal sem uma plataforma adequada pode consumir
              horas do seu dia. Nossa plataforma torna isso rápido e fácil: com
              apenas alguns cliques, você encontra o local perfeito, com todas
              as informações e fotos que precisa.{' '}
              <span className="text-blue-600 font-bold">
                Encontre e reserve sem complicação, economizando seu tempo e
                indo direto ao que importa!
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={` text-white py-8 ${
          isDarkMode ? 'bg-[#212a30]' : 'bg-[#2E7AB8]'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center space-x-8">
              <Link href="/sobre" className="hover:underline">
                Sobre
              </Link>
              <Link href="/acessibilidade" className="hover:underline">
                Acessibilidade
              </Link>
              <Link href="/parceiros" className="hover:underline">
                Parceiros
              </Link>
              <Link href="/suporte" className="hover:underline">
                Suporte
              </Link>
            </div>
            <div className="flex justify-center space-x-6">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="hover:text-gray-200"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="hover:text-gray-200"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="hover:text-gray-200"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                className="hover:text-gray-200"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="hover:text-gray-200"
              >
                <Youtube size={24} />
              </Link>
              <Link
                href="https://whatsapp.com"
                target="_blank"
                className="hover:text-gray-200"
              >
                <MessageCircle size={24} />
              </Link>
            </div>
            <div className="text-center">
              <p>© 2025 Espaço Livre. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
