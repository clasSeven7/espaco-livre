Feature: Cadastro de Cliente (Profissional Autônomo)

  Scenario: Cadastro com dados válidos
    Given que o profissional autônomo Cliente acessa a página de cadastro
    When ele preenche seus dados pessoais: e-mail, senha, usuário, telefone, idade, endereço, cidade, CEP
    And o cliente clica no botão "Cadastrar"
