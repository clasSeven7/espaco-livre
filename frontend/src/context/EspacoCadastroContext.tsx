import React, {createContext, useContext, useState} from 'react';
import {Espaco} from '@/types/espaco';
import Cookies from 'js-cookie';

type EspacoContextType = {
  espaco: Partial<Espaco>;
  atualizarCampo: (dados: Partial<Espaco>) => void;
  limparCampos: () => void;
};

const EspacoCadastroContext = createContext<EspacoContextType | undefined>(undefined);

export const EspacoCadastroProvider = ({children}: { children: React.ReactNode }) => {
  const [espaco, setEspaco] = useState<Partial<Espaco>>(() => {
    const cookie = Cookies.get('espaco-cadastro');
    return cookie ? JSON.parse(cookie) : {};
  });

  const atualizarCampo = (dados: Partial<Espaco>) => {
    const atualizado = {...espaco, ...dados};
    setEspaco(atualizado);
    Cookies.set('espaco-cadastro', JSON.stringify(atualizado));
  };

  const limparCampos = () => {
    setEspaco({});
    Cookies.remove('espaco-cadastro');
  };

  return (
    <EspacoCadastroContext.Provider value={{espaco, atualizarCampo, limparCampos}}>
      {children}
    </EspacoCadastroContext.Provider>
  );
};

export const useEspacoCadastro = () => {
  const context = useContext(EspacoCadastroContext);
  if (!context) throw new Error('useEspacoCadastro deve estar dentro de EspacoCadastroProvider');
  return context;
};
