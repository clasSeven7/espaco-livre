import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';

export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <div className="w-80">
          <Input
            placeholder="Digite aqui seu login!"
            icon={<User />}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Digite aqui a sua senha!"
            icon={<Lock />}
            className="mb-4"
          />
          <Button className="w-full">Entrar</Button>
        </div>
        <div className="mt-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Salvar senha
          </label>
        </div>
        <div className="mt-4">
          <p>
            Não tem conta?{' '}
            <a href="/criar-conta" className="text-blue-500 hover:underline">
              Crie agora!
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
