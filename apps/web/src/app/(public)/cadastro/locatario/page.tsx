'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import {
  ArrowRight,
  Calendar,
  CreditCard,
  Earth,
  Eye,
  EyeOff,
  Mail,
  MapPin,
  Phone,
  RectangleEllipsis,
  Upload,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IMaskInput } from 'react-imask';

import { HeaderSimple } from '@/components/HeaderSimple';
import { FormDataLocatario } from '@/types/index';

export default function Locatario() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataLocatario>({
    foto_de_perfil: null,
    email: '',
    senha: '',
    nome_usuario: '',
    telefone: '',
    data_de_nascimento: '',
    endereco_residencial: '',
    cidade: '',
    cpf: '',
    cep: '',
    aceitar_termos: false,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as unknown as { name: string; value: string };
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        foto_de_perfil: file,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setFile(file);
      };
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.aceitar_termos) {
      toast.error('Você precisa aceitar os termos para continuar');
      return;
    }
    setIsLoading(true);

    try {
      const dadosFormatados = {
        ...formData,
        email: formData.email.toLowerCase(),
        cpf: formData.cpf.replace(/\D/g, ''),
        cep: formData.cep.replace(/\D/g, ''),
        telefone: formData.telefone.replace(/\D/g, ''),
      };

      if (file) {
        dadosFormatados.foto_de_perfil = file;
      }

      await api.post('/locatarios', dadosFormatados, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
      <HeaderSimple isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div
        className={`items-center justify-center h-full w-full relative ${
          isDarkMode
            ? 'bg-gradient-to-tl from-[#212a30] to-[#161c20]'
            : 'bg-gradient-to-tl from-[#1178B9] to-[#0d6196]'
        }`}
      >
        <div
          className={`absolute inset-0 z-0 opacity-5 bg-no-repeat bg-cover bg-center ${
            isDarkMode
              ? 'bg-[url("/bg_textura_login_escuro.png")]'
              : 'bg-[url("/bg_textura_login_claro.png")]'
          }`}
        />

        <form
          id="cadastro-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
        >
          <div className="border-b-2 border-white mb-4 pt-4 pb-3 mx-8">
            <h1 className="text-3xl text-white pl-12">Perfil</h1>
          </div>
          <div
            id="perfil_inputs"
            className="mx-8 my-8 border-b-2 border-white grid grid-cols-2 z-10"
          >
            <div id="lado_esquerdo" className="flex flex-col gap-2 mx-15">
              <div id="nome_usuario">
                <h1 className="text-lg font-semibold text-white mb-2">
                  Usuário
                </h1>
                <div className="mb-4 relative">
                  <User
                    width={25}
                    height={25}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  />
                  <IMaskInput
                    name="nome_usuario"
                    value={formData.nome_usuario}
                    onChange={handleInputChange}
                    placeholder="Digite seu usuário"
                    required
                    className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                      isDarkMode
                        ? 'bg-transparent text-white placeholder:text-white/50'
                        : 'bg-transparent text-white placeholder:text-white/50 '
                    }`}
                  />
                </div>
              </div>
              <div id="email">
                <h1 className="text-lg font-semibold text-white mb-2">Email</h1>
                <div className="mb-4 relative">
                  <Mail
                    width={25}
                    height={25}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  />
                  <IMaskInput
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="exemplo@gmail.com"
                    type="email"
                    required
                    className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                      isDarkMode
                        ? 'bg-transparent text-white placeholder:text-white/50'
                        : 'bg-transparent text-white placeholder:text-white/50 '
                    }`}
                  />
                </div>
              </div>
              <div id="senha">
                <h1 className="text-lg font-semibold text-white mb-2">Senha</h1>
                <div className="mb-4 relative">
                  <RectangleEllipsis
                    width={25}
                    height={25}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  />
                  <IMaskInput
                    name="senha"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.senha}
                    onChange={handleInputChange}
                    placeholder="1234@$678"
                    required
                    className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                      isDarkMode
                        ? 'bg-transparent text-white placeholder:text-white/50'
                        : 'bg-transparent text-white placeholder:text-white/50 '
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                  </button>
                </div>
              </div>
              <div id="cpf" className="mb-8">
                <h1 className="text-lg font-semibold text-white mb-2">CPF</h1>
                <div className="mb-4 relative">
                  <CreditCard
                    width={25}
                    height={25}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  />
                  <IMaskInput
                    mask="000.000.000-00"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    required
                    className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                      isDarkMode
                        ? 'bg-transparent text-white placeholder:text-white/50'
                        : 'bg-transparent text-white placeholder:text-white/50 '
                    }`}
                  />
                </div>
              </div>
            </div>
            <div id="lado_direito" className="flex flex-col gap-2 mx-15">
              <div id="foto_de_perfil" className="mb-8 relative">
                <h1 className="flex justify-center text-2xl text-white border-b-2 border-white pb-4 mx-40">
                  Foto de Perfil
                </h1>
                <div className="flex justify-center items-center mt-4">
                  <div className="relative w-28 h-28 bg-white text-white rounded-full cursor-pointer hover:bg-gray-100">
                    <IMaskInput
                      type="file"
                      onChange={handleFileChange}
                      className="w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#1178B9] font-bold w-10 h-10" />
                  </div>

                  {imagePreview && <ArrowRight className="text-white" />}
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Preview of uploaded profile picture"
                      width={112}
                      height={112}
                      className="rounded-full object-cover w-28 h-28 border-2 border-white"
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                </div>
              </div>
              <div id="data_de_nascimento">
                <h1 className="text-lg font-semibold text-white mb-2">
                  Data de Nascimento
                </h1>
                <div className="mb-4 relative">
                  <Calendar
                    width={25}
                    height={25}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  />
                  <IMaskInput
                    mask="00/00/0000"
                    placeholder="DD/MM/AAAA"
                    name="data_de_nascimento"
                    value={formData.data_de_nascimento}
                    onChange={handleInputChange}
                    required
                    className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                      isDarkMode
                        ? 'bg-transparent text-white placeholder:text-white/50'
                        : 'bg-transparent text-white placeholder:text-white/50 '
                    }`}
                  />
                </div>
              </div>
              <div id="aceitar_termos" className="mb-8">
                <div className="flex items-center space-x-2 mt-8">
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
                    className="bg-white border-0 z-10 cursor-pointer"
                  />
                  <label
                    htmlFor="aceitar_termos"
                    className="text-base text-white z-10"
                  >
                    Eu,{' '}
                    <span className="font-bold uppercase">
                      {formData.nome_usuario || '[Nome do Locatário]'}
                    </span>
                    , CPF/CNPJ{' '}
                    <span className="font-bold uppercase">
                      {formData.cpf || '[Número]'}
                    </span>
                    , declaro estar ciente e de acordo com as seguintes
                    responsabilidades ao disponibilizar meu espaço para aluguel
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div
            id="endereco_inputs"
            className="gap-4 mx-8 my-8 pb-8 border-b-2 border-white grid grid-cols-2 z-10"
          >
            <div id="cidade" className="flex flex-col gap-2 mx-15">
              <h1 className="text-lg font-semibold text-white">Cidade</h1>
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
                  placeholder="ex: São Paulo"
                  required
                  className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                    isDarkMode
                      ? 'bg-transparent text-white placeholder:text-white/50'
                      : 'bg-transparent text-white placeholder:text-white/50'
                  }`}
                />
              </div>
            </div>
            <div id="cep" className="flex flex-col gap-2 mx-15">
              <h1 className="text-lg font-semibold text-white">CEP</h1>
              <div className="mb-4 relative">
                <Earth
                  width={25}
                  height={25}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                />
                <IMaskInput
                  mask="00000-000"
                  name="cep"
                  value={formData.cep}
                  onChange={handleInputChange}
                  placeholder="00000-000"
                  required
                  className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                    isDarkMode
                      ? 'bg-transparent text-white placeholder:text-white/50'
                      : 'bg-transparent text-white placeholder:text-white/50'
                  }`}
                />
              </div>
            </div>
            <div id="endereco" className="flex flex-col gap-2 mx-15">
              <h1 className="text-lg font-semibold text-white">
                Endereço Residencial
              </h1>
              <div className="mb-4 relative">
                <MapPin
                  width={25}
                  height={25}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                />
                <IMaskInput
                  name="endereco_residencial"
                  value={formData.endereco_residencial}
                  onChange={handleInputChange}
                  placeholder="rua: pedro feliz,43"
                  required
                  className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                    isDarkMode
                      ? 'bg-transparent text-white placeholder:text-white/50'
                      : 'bg-transparent text-white placeholder:text-white/50'
                  }`}
                />
              </div>
            </div>
            <div id="telefone" className="flex flex-col gap-2 mx-15">
              <h1 className="text-lg font-semibold text-white">Telefone</h1>
              <div className="mb-4 relative">
                <Phone
                  width={25}
                  height={25}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                />
                <IMaskInput
                  mask="(00) 00000-0000"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
                  required
                  className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                    isDarkMode
                      ? 'bg-transparent text-white placeholder:text-white/50'
                      : 'bg-transparent text-white placeholder:text-white/50'
                  }`}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="flex gap-6 justify-around items-center mt-8 pb-8">
          <Link href="/login" className="z-0">
            <Button
              className={`w-60 z-10 py-4 cursor-pointer text-base font-bold ${
                isDarkMode
                  ? 'bg-red-800 hover:bg-red-900 text-white'
                  : 'bg-red-800 hover:bg-red-900 text-white'
              }`}
            >
              Voltar
            </Button>
          </Link>
          <Button
            type="submit"
            form="cadastro-form"
            className={`w-60 z-10 py-4 cursor-pointer text-base font-bold !opacity-100 ${
              isDarkMode
                ? 'bg-green-800 text-white hover:bg-green-900'
                : 'bg-green-800 text-white hover:bg-green-900'
            }`}
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
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
