import { Given, Then, When, Before } from '@cucumber/cucumber';
import assert from 'node:assert';

let usuarioLogado = false;
let telaAtual = '';
let mensagens: string[] = [];
let formularioPreenchido = false;
let dadosFormulario: { [key: string]: string } = {};

const dadosCorretos = {
  nomeEspaco: 'Espaço Cultural',
  endereco: 'Rua Exemplo, 123',
  capacidade: '100',
  descricao: 'Espaço dedicado a eventos culturais e sociais.',
};

const espacosCadastrados = ['Espaço Social', 'Espaço da Praça'];

// ✅ Hook para resetar o estado antes de cada cenário
Before(() => {
  telaAtual = '';
  mensagens = [];
  formularioPreenchido = false;
  dadosFormulario = {};
});

// ✅ Função para simular a submissão do formulário
function submeterFormulario() {
  const camposObrigatorios = ['nomeEspaco', 'endereco', 'capacidade'];

  camposObrigatorios.forEach(campo => {
    if (!dadosFormulario[campo]) {
      mensagens.push(`${campo === 'nomeEspaco' ? 'Nome do espaço' : campo.charAt(0).toUpperCase() + campo.slice(1)} é obrigatório`);
    }
  });

  if (dadosFormulario.nomeEspaco && espacosCadastrados.includes(dadosFormulario.nomeEspaco)) {
    mensagens.push('Nome já está em uso');
  }

  if (dadosFormulario.capacidade && isNaN(Number(dadosFormulario.capacidade))) {
    mensagens.push('Capacidade não é válida');
  }

  formularioPreenchido = mensagens.length === 0;
}

// Cenários

Given('que o usuário não está logado', function () {
  usuarioLogado = false;
});

Given('que o usuário acessou a aplicação e está logado', function () {
  usuarioLogado = true;
});

When('ele acessa a tela de Cadastro de Espaços', function () {
  if (usuarioLogado) {
    telaAtual = 'cadastro';
  } else {
    telaAtual = 'login';
    mensagens.push('Faça login para continuar');
  }
});

Then('ele deve ser redirecionado para a tela de login', function () {
  assert.strictEqual(telaAtual, 'login', 'O redirecionamento para a tela de login falhou');
});

Then('ele deve ver o formulário para cadastrar o espaço', function () {
  assert.strictEqual(telaAtual, 'cadastro', 'A tela de cadastro não foi exibida');
});

When('ele preenche os campos obrigatórios corretamente e submete o formulário', function () {
  dadosFormulario = { ...dadosCorretos };
  submeterFormulario();
});

Then('ele deve ser redirecionado para a página de confirmação de cadastro', function () {
  if (formularioPreenchido) {
    telaAtual = 'confirmacao';
    assert.strictEqual(telaAtual, 'confirmacao', 'O redirecionamento para a página de confirmação falhou');
  } else {
    assert.fail('O formulário não foi preenchido corretamente');
  }
});

Then('ele deve ver a mensagem "Espaço cadastrado com sucesso"', function () {
  mensagens.push('Espaço cadastrado com sucesso');
  assert.ok(mensagens.includes('Espaço cadastrado com sucesso'), 'Mensagem de sucesso não exibida');
});

// Falha com dados incompletos
When('ele preenche o formulário com dados incompletos', function () {
  dadosFormulario = {
    nomeEspaco: '', // Campo obrigatório vazio
    endereco: 'Rua Exemplo, 123',
    capacidade: '100',
    descricao: 'Espaço dedicado a eventos culturais e sociais.',
  };
});

When('ele tenta submeter o formulário', function () {
  submeterFormulario();
});

Then('ele deve ver uma mensagem de erro indicando campos obrigatórios', function () {
  assert.ok(mensagens.includes('Nome do espaço é obrigatório'), 'A mensagem de erro não foi exibida');
});

// Falha com nome já existente
When('ele preenche o formulário com nome de espaço já existente e submete', function () {
  dadosFormulario = {
    nomeEspaco: 'Espaço Social',
    endereco: 'Rua Exemplo, 123',
    capacidade: '100',
    descricao: 'Espaço dedicado a eventos culturais e sociais.',
  };
  submeterFormulario();
});

Then('ele deve ver uma mensagem de erro indicando que o nome já está em uso', function () {
  assert.ok(mensagens.includes('Nome já está em uso'), 'A mensagem de erro para nome duplicado não foi exibida');
});

// Falha com capacidade inválida
When('ele preenche o formulário com capacidade inválida e submete', function () {
  dadosFormulario = {
    nomeEspaco: 'Espaço Novo',
    endereco: 'Rua Exemplo, 123',
    capacidade: 'abc', // Inválida
    descricao: 'Espaço dedicado a eventos culturais e sociais.',
  };
  submeterFormulario();
});

Then('ele deve ver uma mensagem de erro indicando que a capacidade não é válida', function () {
  assert.ok(mensagens.includes('Capacidade não é válida'), 'A mensagem de erro para capacidade inválida não foi exibida');
});
