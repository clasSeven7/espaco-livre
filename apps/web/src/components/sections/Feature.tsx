import { FeatureProps } from '@/types/index';
import Image from 'next/image';
import Link from 'next/link';

const Feature: React.FC<FeatureProps> = ({ isDarkMode }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Primeiro bloco */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <article className="space-y-6">
          <p
            className={`text-2xl text-justify font-extralight tracking-wide ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Enquanto um andar está movimentado, o outro permanece vazio. Que tal
            aproveitar essa oportunidade? Cadastre seu espaço na nossa
            plataforma e conecte-se com pessoas que estão em busca do lugar
            ideal para suas necessidades. Não deixe o potencial do seu espaço
            parado!{' '}
            <span className="text-blue-600 font-medium">
              <Link
                href="#"
                className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
              >
                Dê vida ao seu espaço e faça ele trabalhar por você!
              </Link>
            </span>
          </p>
        </article>

        <figure>
          <Image
            src="/image_1.png"
            alt="Espaço de coworking"
            width={500}
            height={300}
            className="rounded-lg w-full object-cover"
          />
        </figure>
      </div>

      {/* Segundo bloco */}
      <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
        <figure>
          <Image
            src="/image_2.png"
            alt="Usuário usando laptop"
            width={500}
            height={300}
            className="rounded-lg w-full object-cover"
          />
        </figure>

        <article className="space-y-6">
          <p
            className={`text-2xl text-justify font-extralight tracking-wide ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Encontrar o espaço ideal sem uma plataforma adequada pode consumir
            horas do seu dia. Nossa plataforma torna isso rápido e fácil: com
            apenas alguns cliques, você encontra o local perfeito, com todas as
            informações e fotos de que precisa. Tudo isso em um só lugar, feito
            para facilitar sua experiência do início ao fim.{' '}
            <span className="text-blue-600 font-medium">
              <Link
                href="#"
                className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
              >
                Encontre e reserve com facilidade, poupando tempo!
              </Link>
            </span>
          </p>
        </article>
      </div>
    </section>
  );
};

export default Feature;
