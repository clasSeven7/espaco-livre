'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Calendar, Lock, Mail, MapPin, Phone, User } from 'lucide-react';
import Image from 'next/image';

export default function Cadastro() {
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
        <div className="w-[50%] z-10 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-4 relative">
              <Mail
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50 "
              />
              <Input
                placeholder="Digite seu email"
                className="bg-[#1178B9] text-zinc-50 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
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
                placeholder="Digite sua senha"
                className="bg-[#1178B9] text-zinc-50 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
              />
            </div>
            <div className="mb-4 relative">
              <User
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                placeholder="Digite seu usuário"
                className="bg-[#1178B9] text-zinc-50 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
              />
            </div>
            <div className="mb-4 relative">
              <Phone
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                placeholder="Digite seu telefone"
                className="bg-[#1178B9] text-zinc-50 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
              />
            </div>
            <div className="mb-4 relative">
              <Calendar
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                placeholder="Digite sua idade"
                className="bg-[#1178B9] text-zinc-50 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
              />
            </div>
            <div className="mb-4 relative">
              <MapPin
                width={25}
                height={25}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-50"
              />
              <Input
                placeholder="Digite seu endereço"
                className="bg-[#1178B9] text-zinc-50 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/90"
              />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold">Tipo de Ocupação</span>
            <div className="grid grid-cols-2 mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Startup
                  </label>
                </div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Influencer
                  </label>
                </div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Produtor
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Gerente
                  </label>
                </div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Freelancer
                  </label>
                </div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Fotógrafo
                  </label>
                </div>
              </div>
            </div>
            <span className="text-2xl font-bold">Frequência de Uso</span>
            <div className="grid grid-cols-2 mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ocasional
                  </label>
                </div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Semanal
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Diário
                  </label>
                </div>
                <div className="flex items-center space-x-2 mb-2.5">
                  <Checkbox className="bg-zinc-400 border-0" id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mensal
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button className="w-72 z-10 py-5 cursor-pointer text-[18px] font-bold mt-6">
          Cadastrar
        </Button>
      </div>
    </>
  );
}
