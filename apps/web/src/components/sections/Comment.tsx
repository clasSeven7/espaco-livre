import { Star } from 'lucide-react';
import Image from 'next/image';

import { CommentProps } from '@/types/index';

const comments = [
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

export const Comment: React.FC<CommentProps> = ({ isDarkMode }) => {
  return (
    <section id="comentarios" className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2
          className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Comentários
        </h2>
        <p
          className={`mt-4 text-lg ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          Opiniões dos clientes que usaram a plataforma.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {comments.map((comment, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-md transition hover:shadow-lg ${
              isDarkMode ? 'bg-[#1f2937]' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={comment.image}
                alt={comment.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <h3
                  className={`font-semibold text-lg ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {comment.name}
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {comment.role}
                </p>
              </div>
            </div>

            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>

            <p
              className={`text-sm leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
