Feature: Cadastro de Locatário

  Scenario: Cadastro com dados válidos
    Given que o alocador acessa a página de cadastro
    When ele preenche seus dados pessoais (nome, e-mail, telefone) e as informações sobre os espaços que disponibiliza (tipo de ambiente, localização, capacidade, etc.)
    And ele clica no botão "Cadastrar"