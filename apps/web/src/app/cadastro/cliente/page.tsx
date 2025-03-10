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
                placeholder="Digite sua senha"
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
                placeholder="Digite seu usuário"
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
                placeholder="Digite seu telefone"
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
                placeholder="Digite sua idade"
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
                placeholder="Digite seu endereço"
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
                placeholder="Digite sua cidade"
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
                placeholder="Digite o CEP"
                className="bg-[#1178B9] text-zinc-50 py-5 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 pr-10 placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 border-r-2 border-zinc-800 pr-15">
                <span className="text-2xl text-nowrap font-bold mb-4 block">Tipo de Ocupação</span>
                <div className="grid grid-cols-2 gap-x-15 gap-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="startup" />
                    <label htmlFor="startup" className="text-base">Startup</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="influencer" />
                    <label htmlFor="influencer" className="text-base">Influencer</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="produtor" />
                    <label htmlFor="produtor" className="text-base">Produtor</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="gerente" />
                    <label htmlFor="gerente" className="text-base">Gerente</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="freelancer" />
                    <label htmlFor="freelancer" className="text-base">Freelancer</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="fotografo" />
                    <label htmlFor="fotografo" className="text-base">Fotógrafo</label>
                  </div>
                </div>
              </div>
              <div className="h-full w-[2px] bg-zinc-800"></div>
              <div className="flex-1">
                <span className="text-2xl text-nowrap font-bold mb-4 block">Frequência de Uso</span>
                <div className="grid grid-cols-2 gap-x-15 gap-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="ocasional" />
                    <label htmlFor="ocasional" className="text-base">Ocasional</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="semanal" />
                    <label htmlFor="semanal" className="text-base">Semanal</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="diario" />
                    <label htmlFor="diario" className="text-base">Diário</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="bg-zinc-400 border-0" id="mensal" />
                    <label htmlFor="mensal" className="text-base">Mensal</label>
                  </div>
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
