import { HeroProps } from '@/types/index';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const images = [
  { src: '/home_image_1.png', alt: 'Imagem 1' },
  { src: '/home_image_2.png', alt: 'Imagem 2' },
];

export const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <section
      className={`relative min-h-[700px] w-full ${
        isDarkMode ? 'text-white bg-zinc-900' : 'text-black bg-gray-100 '
      }`}
    >
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
      <div className="container mx-auto px-4 py-16 relative">
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
          <div className="h-full w-full flex justify-center items-center">
            <Carousel
              opts={{ align: 'start' }}
              orientation="horizontal"
              className="w-full h-full"
              defaultValue={0}
            >
              <CarouselContent className="h-[500px]">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="h-full w-full">
                    <div className="h-full w-full">
                      <Card className="h-full w-full bg-transparent border-none">
                        <CardContent className="relative h-full w-full">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="rounded-md object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer" />
              <CarouselNext className="cursor-pointer" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};
