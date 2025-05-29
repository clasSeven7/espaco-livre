'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSection = {
  id: string;
  title: string;
  items: FaqItem[];
};

const faqData: FaqSection[] = [
  {
    id: 'clientes',
    title: 'Para Clientes',
    items: [
      {
        question: 'Como faço para alugar um espaço?',
        answer:
          'Você pode pesquisar por tipo de espaço, localização e datas. Após escolher, clique em "Reservar", realize o pagamento e pronto!',
      },
      {
        question: 'Quais tipos de espaços posso alugar?',
        answer:
          'Sala de reuniões, coworking, estúdios de fotografia, estúdios de podcast, auditórios e outros.',
      },
      {
        question: 'Preciso criar uma conta para alugar?',
        answer:
          'Sim. É necessário criar uma conta gratuita para realizar reservas.',
      },
      {
        question: 'Quais formas de pagamento são aceitas?',
        answer: 'Aceitamos cartão de crédito, débito, pix e boleto.',
      },
      {
        question: 'Posso cancelar uma reserva?',
        answer:
          'Sim. Reservas podem ser canceladas com até 24h de antecedência para reembolso total.',
      },
      {
        question: 'Como sei se o espaço é confiável?',
        answer:
          'Todos os espaços possuem avaliações de outros usuários e verificação dos anfitriões.',
      },
      {
        question: 'O que acontece se o espaço não estiver como anunciado?',
        answer:
          'Entre em contato com nosso suporte imediatamente. Analisaremos o caso e, se necessário, você será reembolsado.',
      },
      {
        question:
          'Posso entrar em contato com o proprietário antes de reservar?',
        answer:
          'Sim, a plataforma permite a troca de mensagens antes da reserva.',
      },
    ],
  },
  {
    id: 'anfitrioes',
    title: 'Para Anfitriões',
    items: [
      {
        question: 'Como faço para cadastrar meu espaço?',
        answer:
          'Acesse seu painel, clique em "Cadastrar espaço" e siga o passo a passo para adicionar fotos, descrição e regras.',
      },
      {
        question: 'É cobrada alguma taxa para anunciar?',
        answer:
          'A plataforma cobra uma comissão sobre cada reserva realizada com sucesso.',
      },
      {
        question: 'Como recebo os pagamentos pelas reservas?',
        answer:
          'Os pagamentos são liberados em até 2 dias após o término da reserva, via transferência bancária.',
      },
      {
        question: 'Posso cancelar uma reserva feita por um cliente?',
        answer:
          'Sim, mas isso pode impactar sua reputação na plataforma. Use com moderação.',
      },
      {
        question: 'Quais regras devo seguir para publicar meu espaço?',
        answer:
          'Seu espaço deve ser limpo, com fotos reais e respeitar as normas de uso da plataforma.',
      },
      {
        question: 'Como aumentar as chances do meu espaço ser alugado?',
        answer:
          'Tenha boas fotos, preços competitivos, responda rápido e mantenha boas avaliações.',
      },
      {
        question: 'O que faço se o cliente causar danos ao meu espaço?',
        answer:
          'Você pode acionar o suporte e apresentar evidências para ativar nossa política de proteção ao anfitrião.',
      },
    ],
  },
  {
    id: 'geral',
    title: 'Geral / Suporte',
    items: [
      {
        question: 'Esqueci minha senha. O que faço?',
        answer:
          'Clique em "Esqueci minha senha" na tela de login e siga as instruções enviadas por e-mail.',
      },
      {
        question: 'Como posso entrar em contato com o suporte?',
        answer:
          'Você pode nos contatar por chat, e-mail ou telefone disponíveis na página de contato.',
      },
      {
        question: 'Meu pagamento falhou. E agora?',
        answer:
          'Verifique seus dados e tente novamente. Se persistir, entre em contato com o suporte.',
      },
      {
        question: 'Onde posso ver minhas reservas ou meus anúncios?',
        answer:
          'Acesse seu painel de usuário e navegue até "Minhas Reservas" ou "Meus Espaços".',
      },
    ],
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>(faqData[0].id);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Perguntas Frequentes (FAQ)
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {faqData.map((section) => (
          <Button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded transition cursor-pointer ${
              activeSection === section.id
                ? 'bg-[#1178B9] text-white hover:bg-blue-800'
                : 'bg-[#1178B9] text-white hover:bg-blue-800'
            }`}
          >
            {section.title}
          </Button>
        ))}
      </div>

      {faqData
        .filter((section) => section.id === activeSection)
        .map((section) => (
          <div key={section.id} className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex justify-between items-center text-left p-4 font-medium bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                    >
                      <span>{item.question}</span>
                      <span className="text-lg">
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 border-t bg-white">{item.answer}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
}
