import EspacoCard from '@/components/SpaceCard';
import { SpaceProps } from '@/types/index';
import Image from 'next/image';
import { useState } from 'react';

const categorias = [
  { nome: 'Auditório', icon: '/space/icone/group.svg' },
  { nome: 'Estúdio de Fotografia', icon: '/space/icone/photo.svg' },
  { nome: 'Estúdio de Podcast', icon: '/space/icone/microphone.svg' },
  { nome: 'Sala de Reunião', icon: '/space/icone/cinema.svg' },
  { nome: 'Coworking', icon: '/space/icone/coworking.svg' },
];

const espacos = [
  {
    nome: 'WorkHub Alpha',
    imagem: '/space/workhub_alpha.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Tambaú, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Coworking',
  },
  {
    nome: 'Espaço Lumière',
    imagem: '/space/espaco_lumiere.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Altiplano, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Estúdio de Fotografia',
  },
  {
    nome: 'Studio Voz Alta',
    imagem: '/space/studio_voz_alta.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Bessa, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Estúdio de Podcast',
  },
  {
    nome: 'Sala Connect',
    imagem: '/space/sala_connect.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Bancários, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Sala de Reunião',
  },
  {
    nome: 'Auditório Prisma',
    imagem: '/space/auditorio_prisma.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Torre, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Auditório',
  },
  {
    nome: 'Auditório Versatille',
    imagem: '/space/auditorio_versatille.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Manaíra, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Auditório',
  },
  {
    nome: 'Auditório Versatille',
    imagem: '/space/auditorio_versatille.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Manaíra, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Auditório',
  },
  {
    nome: 'Studio Voz Alta',
    imagem: '/space/studio_voz_alta.png',
    disponivel: 'Disponível Hoje',
    preco: 'R$ 70/h',
    localizacao: 'Bessa, João Pessoa - PB',
    destaque: true,
    nota: 5.0,
    categoria: 'Estúdio de Podcast',
  },
];

export const Space: React.FC<SpaceProps> = ({ isDarkMode }) => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    string | null
  >(null);

  const espacosFiltrados = categoriaSelecionada
    ? espacos.filter((e) => e.categoria === categoriaSelecionada)
    : espacos;

  return (
    <section className="container mx-auto px-4 py-10 space-y-12">
      {/* Filtro por categoria */}
      <div className="flex lg:flex-wrap md:flex-wrap sm:flex-row justify-center sm:gap-20 md:gap:30 lg:gap-40 border-b pb-6">
        {categorias.map((cat) => (
          <button
            key={cat.nome}
            onClick={() =>
              setCategoriaSelecionada((prev) =>
                prev === cat.nome ? null : cat.nome
              )
            }
            className={`flex flex-col items-center gap-2 text-sm font-medium px-5 py-3 border-b-2 rounded-lg transition
            cursor-pointer ${
              categoriaSelecionada === cat.nome
                ? 'border-[#1178B9] text-black dark:border-white dark:text-white bg-gray-200 dark:bg-gray-700 shadow-lg'
                : 'border-gray-800 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md'
            }`}
          >
            <Image
              src={cat.icon}
              alt={cat.nome}
              width={100}
              height={100}
              className={`mb-1 ${isDarkMode ? 'invert' : ''}`}
            />
            <div className={`${isDarkMode ? 'text-white' : ''}`}>
              {cat.nome}
            </div>
          </button>
        ))}
      </div>

      {/* Lista de espaços */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {espacosFiltrados.map((espaco, index) => (
          <EspacoCard key={index} {...espaco} />
        ))}
      </div>
    </section>
  );
};
