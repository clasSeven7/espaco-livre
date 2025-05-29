Feature: Tela de Home do sistema

  Scenario: Exibição da tela de Home antes do login

    Given que o usuário não está logado
    When ele acessa a tela de Home
    And ele deve ver o botão "Buscar Espaços"
    When ele clica no botão "Buscar Espaços"
    Then ele deve ser redirecionado a tela de login
    When ele acessa a tela de Home
    And ele deve ver o botão "Cadastre seu Espaço"
    When ele clica no botão "Cadastre seu Espaço"
    Then ele deve ser redirecionado a tela de login

  Scenario: Exibição da tela de Home após o login
    Given que o usuário está logado
    When ele acessa a tela de Home
    And ele deve ver o botão "Buscar Espaços"
    And ele deve ver o botão "Cadastre seu Espaço"
    When ele clica no botão "Buscar Espaços"
    Then ele deve ser redirecionado para a tela de busca de Espaços
    When ele clica no botão "Cadastre seu Espaço"
    Then ele deve ser redirecionado para a tela de cadastro de Espaços