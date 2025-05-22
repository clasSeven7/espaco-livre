'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  Search,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Espaco = {
  id: number;
  fotos_imovel: string;
  titulo: string;
  valor_imovel: number;
  avaliacao: number;
  capacidade: number;
  cidade: string;
  rua: string;
};

export default function BuscaEspacos() {
  const [espacosOriginais, setEspacosOriginais] = useState<Espaco[]>([]);
  const [espacosFiltrados, setEspacosFiltrados] = useState<Espaco[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState({
    buscaGeral: '',
    disponibilidade: '',
    tipo: '',
    recurso: '',
  });

  const normalizar = (texto: string) =>
    texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  useEffect(() => {
    const carregarEspacos = async () => {
      try {
        const response = await api.get('/espacos');
        const espacosComValores = response.data.map((espaco: Espaco) => ({
          ...espaco,
          valor_imovel: Math.floor(Math.random() * 10000) + 100,
          capacidade: Math.floor(Math.random() * 491) + 10,
          avaliacao: Math.floor(Math.random() * 5) + 1,
        }));
        setEspacosOriginais(espacosComValores);
      } catch (erro) {
        console.error('Erro ao buscar espaços:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarEspacos();
  }, []);

  useEffect(() => {
    const busca = normalizar(filtros.buscaGeral);

    const resultado = espacosOriginais.filter((espaco) => {
      const cidade = normalizar(espaco.cidade);
      const rua = normalizar(espaco.rua);
      const titulo = normalizar(espaco.titulo);

      return (
        cidade.includes(busca) || rua.includes(busca) || titulo.includes(busca)
      );
    });

    setEspacosFiltrados(resultado);
  }, [filtros, espacosOriginais]);

  const handleFiltro = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 space-y-10 max-w-[1600px] mx-auto min-h-screen">
      {/* Barra de busca */}
      <div className="relative">
        <Input
          type="text"
          name="buscaGeral"
          placeholder="Buscar por cidade, rua ou nome do espaço..."
          value={filtros.buscaGeral}
          onChange={handleFiltro}
          className="w-full pl-12 h-14 text-lg shadow-lg rounded-xl"
        />
        <Search className="absolute left-4 top-4 text-gray-500 w-6 h-6" />
      </div>

      {/* Lista de espaços */}
      {carregando ? (
        <p className="text-center text-blue-600 text-lg font-semibold">
          Carregando espaços...
        </p>
      ) : espacosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Nenhum espaço encontrado com os critérios informados.
        </p>
      ) : (
        <div className="relative">
          {typeof window !== 'undefined' && (
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
            >
              {espacosFiltrados.map((espaco) => (
                <SwiperSlide key={espaco.id}>
                  <Card className="overflow-hidden shadow-xl border rounded-2xl">
                    <Image
                      src={
                        espaco.fotos_imovel
                          ? String(espaco.fotos_imovel)
                          : '/space/sala_connect.png'
                      }
                      alt="Imagem do espaço"
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                      unoptimized
                    />
                    <CardContent className="space-y-2 p-4 text-gray-800">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Home className="w-5 h-5 text-blue-600" />{' '}
                        {espaco.titulo}
                      </h3>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />{' '}
                        {espaco.rua}, {espaco.cidade}
                      </p>
                      <p className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />{' '}
                        {espaco.avaliacao} / 5
                      </p>
                      <Button className="w-full mt-3">Saiba mais</Button>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          {/* Botões de navegação */}
          <button className="swiper-prev absolute top-1/2 left-0 -translate-y-1/2 p-3 bg-white shadow-xl rounded-full z-10 hover:bg-gray-100">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button className="swiper-next absolute top-1/2 right-0 -translate-y-1/2 p-3 bg-white shadow-xl rounded-full z-10 hover:bg-gray-100">
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      )}

      {/* Mapa */}
      <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={`https://www.google.com/maps?q=${
            filtros.buscaGeral || 'Brasil'
          }&output=embed`}
          width="100%"
          height="100%"
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
