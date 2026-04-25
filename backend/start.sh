#!/bin/bash

# Garante que o script seja executado a partir do diretório onde ele está localizado
cd "$(dirname "$0")"

# Interrompe a execução imediatamente se um comando falhar
set -e

# Definição de cores para saída
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função de limpeza executada ao sair
cleanup() {
    exit_code=$?
    if [ $exit_code -ne 0 ]; then
        echo -e "\n${RED}🔴 O script foi encerrado com erro ou interrompido.${NC}"
    else
        echo -e "\n${YELLOW}🟡 Backend parado.${NC}"
    fi
}
trap cleanup EXIT

# Verifica se o ambiente virtual existe e o ativa
VENV_DIR="../.venv"

if [ -d "$VENV_DIR" ]; then
    echo -e "${GREEN}🐍 Ativando ambiente virtual...${NC}"
    source "$VENV_DIR/bin/activate"
else
    echo -e "${YELLOW}⚠️  Ambiente virtual não encontrado em '$VENV_DIR'.${NC}"
    echo -e "${YELLOW}Certifique-se de que as dependências estão instaladas no ambiente global.${NC}"
fi

# Verifica se o Daphne está instalado
if ! command -v daphne &> /dev/null; then
    echo -e "${RED}❌ Daphne não encontrado! Instale as dependências com 'pip install -r requirements.txt'.${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Iniciando Backend (Daphne)...${NC}"
if daphne -b 0.0.0.0 -p 8001 setup.asgi:application; then
    echo -e "${GREEN}✅ Backend finalizado com sucesso.${NC}"
else
    echo -e "${RED}❌ Erro ao iniciar o Backend.${NC}"
    exit 1
fi
