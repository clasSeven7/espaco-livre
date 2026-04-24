'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { useState } from 'react';

export default function RecuperarSenhaPage() {
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [senhaNova, setSenhaNova] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`A senha foi alterada com sucesso!`);

    setSenhaAntiga('');
    setSenhaNova('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-sky-300 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Recuperar senha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div id="senha_antiga">
                <Label htmlFor="senha_antiga">Senha antiga</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="senha_antiga"
                    type="password"
                    placeholder="Digite sua senha antiga"
                    value={senhaAntiga}
                    onChange={(e) => setSenhaAntiga(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div id="senha_nova">
                <Label htmlFor="senha_nova">Senha nova</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="senha_nova"
                    type="password"
                    placeholder="Digite seu e-mail"
                    value={senhaNova}
                    onChange={(e) => setSenhaNova(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Alterar senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
