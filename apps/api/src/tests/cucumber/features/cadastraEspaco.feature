# Feature: Cadastro de Espaço

#   Scenario: Cadastro com dados válidos
#     Given que o usuário está na tela de cadastro de Espaços
#     When ele preenche o campo "Nome do Espaço"
#     And ele preenche o campo "Descrição do Espaço"
#     And ele preenche o campo "Equipamentos Disponíveis"
#     And ele adiciona fotos no campo "Adicionar Fotos"
#     And ele preenche o campo "Cidade"
#     And ele preenche o campo "Rua"
#     And ele preenche o campo "Bairro"
#     And ele preenche o campo "Observação de Localização"
#     And ele configura os "Horários Disponíveis para Uso" personalizando dias e horários
#     And ele preenche o campo "Valor do Espaço"
#     And ele seleciona os "Métodos de Pagamento"
#     And ele clica no botão "Cadastrar Espaço"
#     Then o sistema deve salvar o novo espaço
#     And o sistema deve exibir uma mensagem de sucesso "Espaço cadastrado com sucesso!"

#   Scenario: Cadastro com dados inválidos
#     Given que o usuário está na tela de cadastro de Espaços
#     When ele não preenche o campo "Nome do Espaço"
#     And ele não preenche o campo "Descrição do Espaço"
#     And ele não preenche o campo "Equipamentos Disponíveis"
#     And ele não adiciona fotos no campo "Adicionar Fotos"
#     And ele não preenche o campo "Cidade"
#     And ele não preenche o campo "Rua"
#     And ele não preenche o campo "Bairro"
#     And ele não preenche o campo "Observação de Localização"
#     And ele não configura os "Horários Disponíveis para Uso" personalizando dias e horários
#     And ele não preenche o campo "Valor do Espaço"
#     And ele não seleciona os "Métodos de Pagamento"
#     And ele clica no botão "Cadastrar Espaço"
#     Then o sistema deve exibir mensagens de erro para cada campo obrigatório
