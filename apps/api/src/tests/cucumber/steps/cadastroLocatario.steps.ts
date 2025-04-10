import { Given, When } from '@cucumber/cucumber';

let dadosLocatario: Record<string, string> = {};

Given('que o locatário acessa a página de cadastro', async function () {
  console.log('Locatário acessou a página de cadastro.');
});

When(
  'ele preenche seus dados pessoais: e-mail, senha, usuário, telefone, idade, endereço, cidade, CPF, CEP',
  async function () {
    dadosLocatario = {
      email: 'locatario@email.com',
      senha: 'senha123',
      usuario: 'locatario01',
      telefone: '(83) 91234-5678',
      idade: '30',
      endereco: 'Rua das Flores, 123',
      cidade: 'João Pessoa',
      cpf: '123.456.789-00',
      cep: '58000-000',
    };

    console.log('Dados preenchidos:', dadosLocatario);
  }
);

When('o locatário clica no botão {string}', async function (botao: string) {
  if (botao === 'Cadastrar') {
    console.log('Botão "Cadastrar" clicado. Enviando dados...');
    console.log('Dados enviados com sucesso:', dadosLocatario);
  } else {
    throw new Error(`Botão "${botao}" não reconhecido.`);
  }
});
