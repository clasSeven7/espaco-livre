Feature: Login no sistema

  Scenario: Login com credenciais válidas
  Given que o usuário acessa a página de login
  When ele insere o usuário "admin" e a senha "admin"
  Then ele deve ver a mensagem de login "Login realizado com sucesso"