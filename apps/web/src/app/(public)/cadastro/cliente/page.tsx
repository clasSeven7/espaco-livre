'use client';

import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/axios';
import { FormDataCLiente } from '@/types/index';
import { AxiosError } from 'axios';
import {
  ArrowRight,
  Calendar,
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

export default function Cliente() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormDataCLiente>({
    foto_de_perfil: null,
    nome_usuario: '',
    email: '',
    senha: '',
    data_de_nascimento: '',
    cidade: '',
    endereco_residencial: '',
    cep: '',
    telefone: '',
    tipo_ocupacao: '',
    frequencia_uso: '',
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

  const handleCheckboxChange = (
    value: string,
    field: 'tipo_ocupacao' | 'frequencia_uso'
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dadosFormatados = {
        ...formData,
        email: formData.email.toLowerCase(),
        data_de_nascimento: formData.data_de_nascimento,
        cep: formData.cep.replace(/\D/g, ''),
        telefone: formData.telefone.replace(/\D/g, ''),
      };

      if (file) {
        dadosFormatados.foto_de_perfil = file;
      }

      await api.post('/clientes', dadosFormatados, {
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
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
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
            id="pefil_inputs"
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
                    placeholder="ex: exemplo"
                    required
                    className={`w-full py-3 px-10 rounded-lg focus:outline-none border-1 border-white ${
                      isDarkMode
                        ? 'bg-transparent text-zinc-50 placeholder:text-white/50'
                        : 'bg-transparent text-zinc-50 placeholder:text-white/50'
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
                        ? 'bg-transparent text-white focus:ring-zinc-500 placeholder:text-white/50'
                        : 'bg-transparent text-white focus:ring-blue-500 placeholder:text-white/50'
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
              <div id="data_de_nascimento" className="mb-4 relative">
                <h1 className="text-lg font-semibold text-white mb-2">
                  Data de Nascimento
                </h1>
                <div className="mb-8 relative">
                  <Calendar
                    width={25}
                    height={25}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white"
                  />
                  <IMaskInput
                    mask="00/00/0000"
                    name="data_de_nascimento"
                    value={formData.data_de_nascimento}
                    onChange={handleInputChange}
                    placeholder="DD/MM/AAAA"
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

          <div
            id="checkboks"
            className="gap-4 mx-8 my-8 pb-8 border-b-2 border-white z-10"
          >
            <div className="grid grid-cols-2 gap-3 z-10 mx-22">
              <div
                id="tipo_ocupacao"
                className="border-r-2 border-white pr-8 z-10"
              >
                <span className="text-2xl text-white text-nowrap font-bold mb-10 block">
                  Tipo de Ocupação
                </span>
                <div className="grid grid-cols-2 gap-x-15 gap-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="startup"
                      checked={formData.tipo_ocupacao === 'startup'}
                      onClick={() =>
                        handleCheckboxChange('startup', 'tipo_ocupacao')
                      }
                    />
                    <label
                      htmlFor="startup"
                      className={`text-base font-medium transition-colors ${
                        formData.tipo_ocupacao === 'startup'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Startup
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="influencer"
                      checked={formData.tipo_ocupacao === 'influencer'}
                      onClick={() =>
                        handleCheckboxChange('influencer', 'tipo_ocupacao')
                      }
                    />
                    <label
                      htmlFor="influencer"
                      className={`text-base font-medium transition-colors ${
                        formData.tipo_ocupacao === 'influencer'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Influencer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="produtor"
                      checked={formData.tipo_ocupacao === 'produtor'}
                      onClick={() =>
                        handleCheckboxChange('produtor', 'tipo_ocupacao')
                      }
                    />
                    <label
                      htmlFor="produtor"
                      className={`text-base font-medium transition-colors ${
                        formData.tipo_ocupacao === 'produtor'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Produtor
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="gerente"
                      checked={formData.tipo_ocupacao === 'gerente'}
                      onClick={() =>
                        handleCheckboxChange('gerente', 'tipo_ocupacao')
                      }
                    />
                    <label
                      htmlFor="gerente"
                      className={`text-base font-medium transition-colors ${
                        formData.tipo_ocupacao === 'gerente'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Gerente
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="freelancer"
                      checked={formData.tipo_ocupacao === 'freelancer'}
                      onClick={() =>
                        handleCheckboxChange('freelancer', 'tipo_ocupacao')
                      }
                    />
                    <label
                      htmlFor="freelancer"
                      className={`text-base font-medium transition-colors ${
                        formData.tipo_ocupacao === 'freelancer'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Freelancer
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="fotografo"
                      checked={formData.tipo_ocupacao === 'fotografo'}
                      onClick={() =>
                        handleCheckboxChange('fotografo', 'tipo_ocupacao')
                      }
                    />
                    <label
                      htmlFor="fotografo"
                      className={`text-base font-medium transition-colors ${
                        formData.tipo_ocupacao === 'fotografo'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Fotógrafo
                    </label>
                  </div>
                </div>
              </div>

              <div id="frequencia_uso" className="pl-10 z-10">
                <span className="text-2xl text-white text-nowrap font-bold mb-10 block">
                  Frequência de Uso
                </span>
                <div className="grid grid-cols-2 gap-x-15 gap-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="ocasional"
                      checked={formData.frequencia_uso === 'ocasional'}
                      onClick={() =>
                        handleCheckboxChange('ocasional', 'frequencia_uso')
                      }
                    />
                    <label
                      htmlFor="ocasional"
                      className={`text-base font-medium transition-colors ${
                        formData.frequencia_uso === 'ocasional'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Ocasional
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="semanal"
                      checked={formData.frequencia_uso === 'semanal'}
                      onClick={() =>
                        handleCheckboxChange('semanal', 'frequencia_uso')
                      }
                    />
                    <label
                      htmlFor="semanal"
                      className={`text-base font-medium transition-colors ${
                        formData.frequencia_uso === 'semanal'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Semanal
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="diario"
                      checked={formData.frequencia_uso === 'diario'}
                      onClick={() =>
                        handleCheckboxChange('diario', 'frequencia_uso')
                      }
                    />
                    <label
                      htmlFor="diario"
                      className={`text-base font-medium transition-colors ${
                        formData.frequencia_uso === 'diario'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Diário
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-white"
                      id="mensal"
                      checked={formData.frequencia_uso === 'mensal'}
                      onClick={() =>
                        handleCheckboxChange('mensal', 'frequencia_uso')
                      }
                    />
                    <label
                      htmlFor="mensal"
                      className={`text-base font-medium transition-colors ${
                        formData.frequencia_uso === 'mensal'
                          ? 'text-black'
                          : 'text-white'
                      }`}
                    >
                      Mensal
                    </label>
                  </div>
                </div>
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
