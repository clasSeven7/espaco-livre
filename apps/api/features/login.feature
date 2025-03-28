Feature: Login no sistema

  Scenario: Login com credenciais válidas
    Given que o usuário acessa a página de login
    When ele insere o usuário "admin" e a senha "12345"
    Then ele deve ver a mensagem "Login realizado com sucesso"
