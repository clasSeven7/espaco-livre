'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import cadastroService, { CadastroClienteData } from '@/services/cadastro';
import { ApiError } from '@/types/error';
import { Calendar, Lock, Mail, MapPin, Phone, User } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Cadastro() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<
    Omit<CadastroClienteData, 'idade'> & { idade: string }
  >({
    email: '',
    senha: '',
    nome_usuario: '',
    telefone: '',
    idade: '',
    endereco_residencial: '',
    cidade: '',
    cep: '',
    tipo_ocupacao: 'startup',
    frequencia_uso: 'ocasional',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    tipo: string,
    categoria: 'tipo_ocupacao' | 'frequencia_uso'
  ) => {
    setFormData((prev) => ({
      ...prev,
      [categoria]: tipo,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validações
      if (!formData.tipo_ocupacao) {
        throw new Error('Selecione um tipo de ocupação');
      }
      if (!formData.frequencia_uso) {
        throw new Error('Selecione uma frequência de uso');
      }

      await cadastroService.cadastrarCliente({
        ...formData,
        idade: parseInt(formData.idade),
      });

      toast.success('Cadastro realizado com sucesso!');
      router.push('/login');
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.message || 'Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen relative bg-[#DDF0EF]">
        <Image
          src="/background.png"
          alt="Fundo"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 z-0 opacity-10"
        />

        <div className="flex items-center justify-center gap-4 mb-10">
          <Image
            src="/icon-logo.png"
            width={103.8}
            height={98.49}
            alt="Icon"
            className="z-10 text-zinc-950"
          />
          <span className="text-8xl font-bold mb-6 z-10 text-zinc-950">
            Cadastro
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-[50%] z-10 grid grid-cols-2 gap-4"
        >
          <div>
            <div className="mb-4 relative">
              <Mail
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite seu email"
                type="email"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <Lock
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <User
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="nome_usuario"
                value={formData.nome_usuario}
                onChange={handleInputChange}
                placeholder="Digite seu usuário"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <Phone
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="Digite seu telefone"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <Calendar
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="idade"
                value={formData.idade}
                onChange={handleInputChange}
                placeholder="Digite sua idade"
                type="number"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <MapPin
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="endereco_residencial"
                value={formData.endereco_residencial}
                onChange={handleInputChange}
                placeholder="Digite seu endereço"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
          </div>
          <div>
            <div className="mb-4 relative">
              <MapPin
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Digite sua cidade"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <MapPin
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="Digite o CEP"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 border-r-2 border-zinc-800 pr-15">
                <span className="text-2xl text-nowrap font-bold mb-4 block">
                  Tipo de Ocupação
                </span>
                <div className="grid grid-cols-2 gap-x-15 gap-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="startup"
                      checked={formData.tipo_ocupacao === 'startup'}
                      onClick={() =>
                        handleCheckboxChange('startup', 'tipo_ocupacao')
                      }
                    />
                    <label htmlFor="startup" className="text-base">
                      Startup
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="influencer"
                      checked={formData.tipo_ocupacao === 'influencer'}
                      onClick={() =>
                        handleCheckboxChange('influencer', 'tipo_ocupacao')
                      }
                    />
                    <label htmlFor="influencer" className="text-base">
                      Influencer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="produtor"
                      checked={formData.tipo_ocupacao === 'produtor'}
                      onClick={() =>
                        handleCheckboxChange('produtor', 'tipo_ocupacao')
                      }
                    />
                    <label htmlFor="produtor" className="text-base">
                      Produtor
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="gerente"
                      checked={formData.tipo_ocupacao === 'gerente'}
                      onClick={() =>
                        handleCheckboxChange('gerente', 'tipo_ocupacao')
                      }
                    />
                    <label htmlFor="gerente" className="text-base">
                      Gerente
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="freelancer"
                      checked={formData.tipo_ocupacao === 'freelancer'}
                      onClick={() =>
                        handleCheckboxChange('freelancer', 'tipo_ocupacao')
                      }
                    />
                    <label htmlFor="freelancer" className="text-base">
                      Freelancer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="fotografo"
                      checked={formData.tipo_ocupacao === 'fotografo'}
                      onClick={() =>
                        handleCheckboxChange('fotografo', 'tipo_ocupacao')
                      }
                    />
                    <label htmlFor="fotografo" className="text-base">
                      Fotógrafo
                    </label>
                  </div>
                </div>
              </div>
              <div className="h-full w-[2px] bg-zinc-800"></div>
              <div className="flex-1">
                <span className="text-2xl text-nowrap font-bold mb-4 block">
                  Frequência de Uso
                </span>
                <div className="grid grid-cols-2 gap-x-15 gap-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="ocasional"
                      checked={formData.frequencia_uso === 'ocasional'}
                      onClick={() =>
                        handleCheckboxChange('ocasional', 'frequencia_uso')
                      }
                    />
                    <label htmlFor="ocasional" className="text-base">
                      Ocasional
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="semanal"
                      checked={formData.frequencia_uso === 'semanal'}
                      onClick={() =>
                        handleCheckboxChange('semanal', 'frequencia_uso')
                      }
                    />
                    <label htmlFor="semanal" className="text-base">
                      Semanal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="diario"
                      checked={formData.frequencia_uso === 'diario'}
                      onClick={() =>
                        handleCheckboxChange('diario', 'frequencia_uso')
                      }
                    />
                    <label htmlFor="diario" className="text-base">
                      Diário
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-zinc-400 border-0"
                      id="mensal"
                      checked={formData.frequencia_uso === 'mensal'}
                      onClick={() =>
                        handleCheckboxChange('mensal', 'frequencia_uso')
                      }
                    />
                    <label htmlFor="mensal" className="text-base">
                      Mensal
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Button
          type="submit"
          form="cadastro-form"
          className="w-72 z-10 py-5 cursor-pointer text-[18px] font-bold mt-6"
          disabled={isLoading}
        >
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </div>
    </>
  );
}
