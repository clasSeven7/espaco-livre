Feature: Cadastro de Locatário

  Scenario: Cadastro com dados válidos
    Given que o locatário acessa a página de cadastro
    When ele preenche seus dados pessoais: e-mail, senha, usuário, telefone, idade, endereço, cidade, CPF, CEP
    And o locatário clica no botão "Cadastrar"
