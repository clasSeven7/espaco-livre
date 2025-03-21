'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import cadastroService from '@/services/cadastro';
import { ApiError } from '@/types/error';
import {
  Calendar,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function CadastroAlocador() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome_usuario: '',
    telefone: '',
    idade: '',
    endereco_residencial: '',
    cidade: '',
    cpf: '',
    cep: '',
    aceitar_termos: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validações
      if (!formData.aceitar_termos) {
        throw new Error('Você precisa aceitar os termos para continuar');
      }

      await cadastroService.cadastrarAlocador({
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
          className="w-[50%] grid grid-cols-2 gap-4 z-10"
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
              <CreditCard
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="Digite seu CPF"
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
                placeholder="Digite seu CEP"
                required
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>

            <div className="flex items-center space-x-2 mt-8">
              <Checkbox
                id="terms"
                name="aceitar_termos"
                checked={formData.aceitar_termos}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    aceitar_termos: checked === true,
                  }))
                }
                className="bg-zinc-400 border-0 mt-20"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none mt-22 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-justify"
              >
                Eu, [Nome do Locador], CPF/CNPJ [Número], declaro estar ciente e
                de acordo com as seguintes responsabilidades ao disponibilizar
                meu espaço para aluguel
              </label>
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
