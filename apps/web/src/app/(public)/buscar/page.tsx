'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '@/lib/axios';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
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
};

export default function BuscaEspacos() {
  const [cidade, setCidade] = useState('');
  const [espacosOriginais, setEspacosOriginais] = useState<Espaco[]>([]);
  const [espacosFiltrados, setEspacosFiltrados] = useState<Espaco[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtros, setFiltros] = useState({
    titulo: '',
    avaliacao: 0,
    capacidade: 0,
    cidade: '',
  });

  useEffect(() => {
    const carregarEspacos = async () => {
      try {
        const response = await api.get('/espacos');
        setEspacosOriginais(response.data);
      } catch (erro) {
        console.error('Erro ao buscar espaços:', erro);
      } finally {
        setCarregando(false);
      }
    };

    carregarEspacos();
  }, []);

  useEffect(() => {
    const resultado = espacosOriginais.filter((espaco) => {
      const cidadeOk = filtros.cidade
        ? espaco.cidade.toLowerCase().includes(filtros.cidade.toLowerCase())
        : true;

      const tituloOk = filtros.titulo
        ? espaco.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
        : true;

      const avaliacaoOk = filtros.avaliacao
        ? espaco.avaliacao === filtros.avaliacao
        : true;

      const capacidadeOk = filtros.capacidade
        ? espaco.capacidade === filtros.capacidade
        : true;

      return cidadeOk && avaliacaoOk && capacidadeOk && tituloOk;
    });

    setEspacosFiltrados(resultado);
  }, [cidade, filtros, espacosOriginais]);

  const handleFiltro = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Input
            type="text"
            placeholder="Buscar por cidade..."
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-2 top-2.5 text-gray-500 w-5 h-5" />
        </div>
        <select
          name="disponibilidade"
          onChange={handleFiltro}
          className="border rounded p-2 w-full sm:w-auto"
        >
          <option value="">Disponibilidade</option>
          <option value="disponivel">Disponível</option>
          <option value="indisponivel">Indisponível</option>
        </select>
        <select
          name="tipo"
          onChange={handleFiltro}
          className="border rounded p-2 w-full sm:w-auto"
        >
          <option value="">Tipo</option>
          <option value="sala">Sala</option>
          <option value="coworking">Coworking</option>
        </select>
        <select
          name="recurso"
          onChange={handleFiltro}
          className="border rounded p-2 w-full sm:w-auto"
        >
          <option value="">Recurso</option>
          <option value="wifi">Wi-Fi</option>
          <option value="projetor">Projetor</option>
        </select>
      </div>

      {carregando ? (
        <p className="text-center text-blue-600 font-semibold">
          Carregando espaços...
        </p>
      ) : espacosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum espaço encontrado com os critérios informados.
        </p>
      ) : (
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-next',
              prevEl: '.swiper-prev',
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {espacosFiltrados.map((espaco) => (
              <SwiperSlide key={espaco.id}>
                <Card className="overflow-hidden shadow-lg">
                  <Image
                    src={espaco.fotos_imovel || '/bg.png'}
                    alt={espaco.titulo}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover"
                    unoptimized
                  />
                  <CardContent className="space-y-2 p-4">
                    <h3 className="font-bold text-lg">{espaco.titulo}</h3>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-blue-600">
                        R$ {espaco.valor_imovel}
                      </span>{' '}
                      • {espaco.capacidade} pessoas
                    </p>
                    <p className="text-yellow-500">
                      {'⭐'.repeat(espaco.avaliacao)}
                    </p>
                    <Button className="w-full mt-2">Saiba mais</Button>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navegação personalizada */}
          <button className="swiper-prev absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-white shadow rounded-full z-10">
            <ChevronLeft />
          </button>
          <button className="swiper-next absolute top-1/2 right-0 -translate-y-1/2 p-2 bg-white shadow rounded-full z-10">
            <ChevronRight />
          </button>
        </div>
      )}

      {/* Mapa */}
      <div className="w-full h-96 mt-10">
        <iframe
          src={`https://www.google.com/maps?q=${
            cidade || 'Brasil'
          }&output=embed`}
          width="100%"
          height="100%"
          className="rounded-lg shadow"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
