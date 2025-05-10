export interface Espaco {
  locatario_id: number;
  titulo: string;
  descricao?: string;
  cidade: string;
  rua: string;
  bairro?: string;
  observacoes?: string;
  valor_imovel: number;
  taxa_limpeza: number;
  disponivel_24h: boolean;
  hora_inicio?: string;
  hora_fim?: string;
  recursos_imovel: string[];
  fotos_imovel: string[];
  todos_dias?: boolean;
  dias_disponiveis: string[];
  metodos_pagamento: string[];
}