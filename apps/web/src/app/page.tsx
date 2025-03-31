'use client';

import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Cookies from 'js-cookie';
import { Facebook, Github, Instagram, MessageCircle, Star, Twitter, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const testimonials = [
    {
      name: 'Rafael Lima',
      role: 'Gerente de Marketing',
      image: '/icon_1.png',
      content: 'Utilizamos a plataforma para organizar uma série de workshops para o nosso núcleo. A escolha do espaço e a facilidade de contato com os responsáveis pelo local foi excelente. O processo foi muito simples e certamente vamos usar novamente.'
    },
    {
      name: 'Felipe Martins',
      role: 'Diretor de Vendas',
      image: '/icon_2.png',
      content: 'Encontramos uma maneira de vendas com clientes importantes e escolhemos um espaço através da plataforma. A experiência foi excepcional e tudo era perfeito, desde a localização até os equipamentos disponíveis para apresentar. Definitivamente, uma solução que facilita nossa rotina.'
    },
    {
      name: 'Laura Santos',
      role: 'Coordenadora de Projetos',
      image: '/icon_3.png',
      content: 'Nossa equipe precisou de um espaço bem equipado para um workshop de treinamento e encontramos tudo que precisávamos na plataforma. A interface fácil de usar e a comunicação rápida com os proprietários foram um ponto muito positivo no processo muito mais eficiente.'
    }
  ];

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.clear();
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-[#DDF0EF]">
      {/* Header with Logout */}
      <header className="bg-[#f2f7f6] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image src="/icon-logo.png" alt="Logo" width={40} height={40} />
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[700px] w-full">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/background_home.png"
            alt="Background"
            fill
            className="object-cover opacity-10"
            priority
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-[#1E3A8A] leading-tight">
                <span className="text-[#2E7AB8] drop-shadow-sm">
                  Do seu jeito, no seu tempo.
                  <br />
                  Alugue espaços perfeitos
                  <br />
                  para qualquer ocasião.
                </span>
              </h1>
              <p className="text-gray-600 text-lg mb-60">
                Escolha o espaço certo para cada momento. Use os filtros e encontre a melhor opção!
              </p>
              <div className="flex gap-10">
                <Button variant="default" className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-lg rounded-sm">
                  Buscar Espaços
                </Button>
                <Button variant="default" className="bg-[#2E7AB8] hover:bg-blue-600 px-6 py-3 text-lg rounded-sm">
                  Cadastre seu Espaço
                </Button>
              </div>
            </div>
            <div className="h-[500px] rounded-lg">
              <ResizablePanelGroup
                direction="horizontal"
                className="w-full lg:w-1/2 h-64 mt-6 lg:mt-0"
              >
                <ResizablePanel
                  defaultSize={50}
                  className="flex justify-center items-center rounded-lg"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/home_image_1.jpg"
                      alt="Imagem 1"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                  defaultSize={50}
                  className="flex justify-center items-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src="/home_image_2.jpg"
                      alt="Imagem 2"
                      fill
                      style={{ objectFit: 'contain' }}
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
        <p className="text-center text-gray-600 mb-12">Opiniões dos clientes que usaram a plataforma.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Enquanto um andar está movimentado, o outro permanece vazio. Por que não aproveitar essa oportunidade?
            </h2>
            <p>
              Cadastre seu espaço na nossa plataforma e alcance pessoas que estão em busca do lugar ideal.{' '}
              <span className="text-blue-600">Dê vida ao seu espaço e faça ele trabalhar por você!</span>
            </p>
          </div>
          <div>
            <Image
              src="/image_1.png"
              alt="Espaço de coworking"
              width={500}
              height={300}
              className="rounded-lg"
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
              className="rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Encontrar o espaço ideal sem uma plataforma adequada pode consumir horas do seu dia.
            </h2>
            <p>
              Nossa plataforma torna isso rápido e fácil: com apenas alguns cliques, você encontra o local perfeito, com todas as informações e fotos que precisa.{' '}
              <span className="text-blue-600">Encontre e reserve sem complicação, economizando seu tempo e indo direto ao que importa!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E7AB8] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center space-x-8">
              <Link href="/sobre" className="hover:underline">Sobre</Link>
              <Link href="/acessibilidade" className="hover:underline">Acessibilidade</Link>
              <Link href="/parceiros" className="hover:underline">Parceiros</Link>
              <Link href="/suporte" className="hover:underline">Suporte</Link>
            </div>
            <div className="flex justify-center space-x-6">
              <Link href="https://facebook.com" target="_blank" className="hover:text-gray-200">
                <Facebook size={24} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-gray-200">
                <Instagram size={24} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-gray-200">
                <Twitter size={24} />
              </Link>
              <Link href="https://github.com" target="_blank" className="hover:text-gray-200">
                <Github size={24} />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="hover:text-gray-200">
                <Youtube size={24} />
              </Link>
              <Link href="https://whatsapp.com" target="_blank" className="hover:text-gray-200">
                <MessageCircle size={24} />
              </Link>
            </div>
            <div className="text-center">
              <p>© 2024 Espaço Livre. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
