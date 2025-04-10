'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IMaskInput } from 'react-imask';

interface FormData {
  email: string;
  senha: string;
  nome_usuario: string;
  telefone: string;
  idade: string;
  endereco_residencial: string;
  cidade: string;
  cpf: string;
  cep: string;
  aceitar_termos: boolean;
}

export default function Locatario() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
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
    const target = e.target as unknown as { name: string; value: string };
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.aceitar_termos) {
      toast.error('Você precisa aceitar os termos para continuar');
      return;
    }

    setIsLoading(true);
    try {
      const {
        email,
        senha,
        nome_usuario,
        telefone,
        idade,
        endereco_residencial,
        cidade,
        cpf,
        cep,
      } = formData;
      const dadosFormatados = {
        email,
        senha,
        nome_usuario,
        telefone: telefone.replace(/\D/g, ''),
        idade: Number(idade),
        endereco_residencial,
        cidade,
        cpf: cpf.replace(/\D/g, ''),
        cep: cep.replace(/\D/g, ''),
      };

      await api.post('/locatarios', dadosFormatados);
      toast.success('Cadastro realizado com sucesso!');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      const axiosError = error as AxiosError<{ error: string; field?: string }>;

      if (axiosError.response?.data?.field) {
        toast.error(
          `Erro no campo ${axiosError.response.data.field}: ${axiosError.response.data.error}`
        );
      } else {
        toast.error(
          axiosError.response?.data?.error ||
            'Erro ao realizar cadastro. Tente novamente.'
        );
      }
    } finally {
      setTimeout(() => setIsLoading(false), 100);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen relative bg-[#DDF0EF]">
        <Image
          src="/background.png"
          alt="Fundo"
          fill
          className="absolute top-0 left-0 z-0 opacity-10 object-cover"
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
          id="cadastro-form"
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
              <IMaskInput
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite seu email"
                type="email"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <Lock
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <IMaskInput
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <User
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <IMaskInput
                name="nome_usuario"
                value={formData.nome_usuario}
                onChange={handleInputChange}
                placeholder="Digite seu usuário"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <Phone
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <IMaskInput
                mask="(00) 00000-0000"
                name="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                placeholder="Digite seu telefone"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <Calendar
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <IMaskInput
                name="idade"
                value={formData.idade}
                onChange={handleInputChange}
                placeholder="Digite sua idade"
                type="number"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <MapPin
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <IMaskInput
                name="endereco_residencial"
                value={formData.endereco_residencial}
                onChange={handleInputChange}
                placeholder="Digite seu endereço"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
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
              <IMaskInput
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                placeholder="Digite sua cidade"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <CreditCard
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <IMaskInput
                mask="000.000.000-00"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                placeholder="Digite seu CPF"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="mb-4 relative">
              <MapPin
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <IMaskInput
                mask="00000-000"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                placeholder="Digite o CEP"
                required
                className="w-full bg-[#1178B9] text-zinc-50 py-3 px-10 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="aceitar_termos"
                name="aceitar_termos"
                checked={formData.aceitar_termos}
                onCheckedChange={(checked: boolean) => {
                  setFormData((prev) => ({
                    ...prev,
                    aceitar_termos: checked === true,
                  }));
                }}
                className="bg-zinc-400 border-0"
              />
              <label htmlFor="aceitar_termos" className="text-base">
                Eu, {formData.nome_usuario || '[Nome do Locador]'}, CPF/CNPJ{' '}
                {formData.cpf || '[Número]'}, declaro estar ciente e de acordo
                com as seguintes responsabilidades ao disponibilizar meu espaço
                para aluguel
              </label>
            </div>
          </div>
        </form>
        <div className="flex gap-6 justify-center items-center mt-6">
          <Button
            type="submit"
            form="cadastro-form"
            className="w-72 z-10 py-5 cursor-pointer text-[18px] font-bold text-white hover:bg-zinc-800 bg-black !opacity-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3-3-3h4z"
                  ></path>
                </svg>
                Cadastrando...
              </>
            ) : (
              'Cadastrar'
            )}
          </Button>
          <Link href="/" className="z-0">
            <Button className="w-44 bg-red-400 hover:bg-red-400 cursor-pointer py-5 text-[18px] font-bold">
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
