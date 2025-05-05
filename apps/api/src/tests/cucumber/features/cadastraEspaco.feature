Feature: Tela de Cadastro de Espaços

  Scenario: Exibição da tela de Cadastro de Espaços antes do login
    Given que o usuário não está logado
    When ele acessa a tela de Cadastro de Espaços
    Then ele deve ser redirecionado para a tela de login

  Scenario: Exibição da tela de Cadastro de Espaços após o login
    Given que o usuário acessou a aplicação e está logado
    When ele acessa a tela de Cadastro de Espaços
    Then ele deve ver o formulário para cadastrar o espaço

  Scenario: Sucesso no preenchimento do formulário
    Given que o usuário acessou a aplicação e está logado
    When ele preenche os campos obrigatórios corretamente e submete o formulário
    Then ele deve ser redirecionado para a página de confirmação de cadastro
    And ele deve ver a mensagem "Espaço cadastrado com sucesso"

  Scenario: Falha ao tentar cadastrar o espaço com dados incompletos
    Given que o usuário acessou a aplicação e está logado
    When ele preenche o formulário com dados incompletos
    And ele tenta submeter o formulário
    Then ele deve ver uma mensagem de erro indicando campos obrigatórios

  Scenario: Falha ao tentar cadastrar o espaço com nome já existente
    Given que o usuário acessou a aplicação e está logado
    When ele preenche o formulário com nome de espaço já existente e submete
    Then ele deve ver uma mensagem de erro indicando que o nome já está em uso

  Scenario: Falha ao tentar cadastrar o espaço com capacidade inválida
    Given que o usuário acessou a aplicação e está logado
    When ele preenche o formulário com capacidade inválida e submete
    Then ele deve ver uma mensagem de erro indicando que a capacidade não é válida