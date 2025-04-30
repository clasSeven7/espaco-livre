import { SpaceCardProps } from '@/types/index';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SpaceCard({
  nome,
  disponivel,
  preco,
  localizacao,
  imagem,
  destaque = false,
  nota,
  url = '#',
}: SpaceCardProps) {
  return (
    <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 relative">
      {destaque && (
        <span className="absolute top-2 left-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
          Em alta
        </span>
      )}

      <div className="w-full h-[140px] relative">
        <Image src={imagem} alt={nome} fill className="object-cover" />
      </div>

      <div className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-sm text-gray-900 dark:text-white">
            {nome}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-blue-600 fill-blue-600" />
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              {nota.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-xs text-blue-600">{disponivel}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {preco}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {localizacao}
        </p>

        <Link
          href={url}
          className="block mt-3 text-center bg-black text-white text-sm py-2 rounded-md hover:opacity-90 transition"
        >
          Saiba Mais
        </Link>
      </div>
    </div>
  );
}
