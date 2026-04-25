Feature: Cadastro de Cliente (Profissional Autônomo)

  Scenario: Cadastro com dados válidos
    Given que o profissional autônomo acessa a página de cadastro
    When ele preenche seus dados pessoais (nome, e-mail, telefone) e suas informações profissionais (especialidade, experiência, etc.)
    And ele clica no botão "Cadastrar"
