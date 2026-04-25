# ==============================================================================
# Docker Compose Environment Manager
# ==============================================================================
# Usage:
#   make dev              - Start development environment
#   make staging          - Start staging environment
#   make prod             - Start production environment
#   make down             - Stop current environment
#   make dev-down         - Stop development environment
#   make staging-down     - Stop staging environment
#   make prod-down        - Stop production environment
#   make dev-logs         - Follow logs for development
#   make staging-logs     - Follow logs for staging
#   make prod-logs        - Follow logs for production
#   make dev-ps           - Show running containers (dev)
#   make dev-build        - Build images for development
#   make staging-build    - Build images for staging
#   make prod-build       - Build images for production
#   make help             - Show this help message
# ==============================================================================


BASE_COMPOSE    := docker-compose.yaml
DEV_COMPOSE     := docker-compose.dev.yaml
STAGING_COMPOSE := docker-compose.staging.yaml
PROD_COMPOSE    := docker-compose.production.yaml

DC_DEV     := docker compose -f ${BASE_COMPOSE} -f ${DEV_COMPOSE}
DC_STAGING := docker compose -f ${BASE_COMPOSE} -f ${STAGING_COMPOSE}
DC_PROD    := docker compose -f ${BASE_COMPOSE} -f ${PROD_COMPOSE}

.DEFAULT_GOAL := help

# ------------------------------------------------------------------------------
# Iniciar ambientes
# ------------------------------------------------------------------------------

.PHONY: dev
dev: ## Inicia ambiente de desenvolvimento
	@echo "Iniciando ambiente de desenvolvimento..."
	$(DC_DEV) up -d
	@echo "✅ Ambiente de desenvolvimento está no ar."

.PHONY: staging
staging: ## Inicia ambiente de homologação
	@echo "Iniciando ambiente de homologação..."
	$(DC_STAGING) up -d
	@echo "✅ Ambiente de homologação está no ar."

.PHONY: prod
prod: ## Inicia ambiente de produção
	@echo "Iniciando ambiente de produção..."
	$(DC_PROD) up -d
	@echo "✅ Ambiente de produção está no ar."

# ------------------------------------------------------------------------------
# Iniciar ambientes com logs
# ------------------------------------------------------------------------------

.PHONY: dev-fg
dev-fg: ## Inicia ambiente de desenvolvimento com logs
	@echo "Iniciando ambiente de desenvolvimento com logs..."
	$(DC_DEV) up

.PHONY: staging-fg
staging-fg: ## Inicia ambiente de homologação com logs
	@echo "Iniciando ambiente de homologação com logs..."
	$(DC_STAGING) up

.PHONY: prod-fg
prod-fg: ## Inicia ambiente de produção com logs
	@echo "Iniciando ambiente de produção com logs..."
	$(DC_PROD) up

# ------------------------------------------------------------------------------
# Criar imagens
# ------------------------------------------------------------------------------

.PHONY: dev-build
dev-build: ## Cria imagens para desenvolvimento
	@echo "Criando imagens para desenvolvimento..."
	$(DC_DEV) build

.PHONY: staging-build
staging-build: ## Cria imagens para homologação
	@echo "Criando imagens para homologação..."
	$(DC_STAGING) build

.PHONY: prod-build
prod-build: ## Cria imagens para produção
	@echo "Criando imagens para produção..."
	$(DC_PROD) build

# ------------------------------------------------------------------------------
# Parar ambientes
# ------------------------------------------------------------------------------

.PHONY: dev-down
dev-down: ## Para ambiente de desenvolvimento
	@echo "Parando ambiente de desenvolvimento..."
	$(DC_DEV) down

.PHONY: staging-down
staging-down: ## Para ambiente de homologação
	@echo "Parando ambiente de homologação..."
	$(DC_STAGING) down

.PHONY: prod-down
prod-down: ## Para ambiente de produção
	@echo "Parando ambiente de produção..."
	$(DC_PROD) down

.PHONY: down
down: ## Para todos os ambientes
	@echo "Parando todos os ambientes..."
	$(DC_DEV) down 2>/dev/null || true
	$(DC_STAGING) down 2>/dev/null || true
	$(DC_PROD) down 2>/dev/null || true
	@echo "Todos os ambientes foram parados."

# ------------------------------------------------------------------------------
# Reiniciar ambientes
# ------------------------------------------------------------------------------

.PHONY: dev-restart
dev-restart: dev-down dev ## Reinicia ambiente de desenvolvimento

.PHONY: staging-restart
staging-restart: staging-down staging ## Reinicia ambiente de homologação

.PHONY: prod-restart
prod-restart: prod-down prod ## Reinicia ambiente de produção

# ------------------------------------------------------------------------------
# Logs
# ------------------------------------------------------------------------------

.PHONY: dev-logs
dev-logs: ## Acompanha logs para o ambiente de desenvolvimento
	$(DC_DEV) logs -f

.PHONY: staging-logs
staging-logs: ## Acompanha logs para o ambiente de homologação
	$(DC_STAGING) logs -f

.PHONY: prod-logs
prod-logs: ## Acompanha logs para o ambiente de produção
	$(DC_PROD) logs -f

# ------------------------------------------------------------------------------
# Status
# ------------------------------------------------------------------------------

.PHONY: dev-ps
dev-ps: ## Mostra os conteineres sendo executados no ambiente de desenvolvimento
	$(DC_DEV) ps

.PHONY: staging-ps
staging-ps: ## Mostra os conteineres sendo executados no ambiente de homologação
	$(DC_STAGING) ps

.PHONY: prod-ps
prod-ps: ## Mostra os conteineres sendo executados no ambiente de produção
	$(DC_PROD) ps

# ------------------------------------------------------------------------------
# Limpeza
# ------------------------------------------------------------------------------

.PHONY: dev-clean
dev-clean: ## Para o desenvolvimento e remove os volumes (necessita confirmação)
	@read -p "Tem certeza? Isso removerá todos os volumes incluindo o banco de dados. [Y/N]: " check; \
	[ "$$check" = "y" ] || [ "$$check" = "Y" ] \
	&& $(DC_DEV) down -v --remove-orp \
	|| echo "Cancelado."

.PHONY: staging-clean
staging-clean: ## Para a homologação e remove os volumes (necessita confirmação)
	@read -p "Tem certeza? Isso removerá todos os volumes incluindo o banco de dados. [Y/N]: " check; \
	[ "$$check" = "y" ] || [ "$$check" = "Y" ] \
	&& $(DC_STAGING) down -v --remove \
	|| echo "Cancelado."

.PHONY: prod-clean
prod-clean: ## Para a produção e remove os volumes (necessita confirmação)
	@read -p "Tem certeza? Isso removerá todos os volumes incluindo o banco de dados. [Y/N]: " check; \
	[ "$$check" = "y" ] || [ "$$check" = "Y" ] \
	&& $(DC_PROD) down -v --remove-or \
	|| echo "Cancelado."

# ------------------------------------------------------------------------------
# Backend — Django (requer containers dev em execução)
# ------------------------------------------------------------------------------

.PHONY: migrate
migrate: ## Aplica as migrations no backend
	$(DC_DEV) exec backend python manage.py migrate

.PHONY: migrations
migrations: ## Cria novas migrations no backend
	$(DC_DEV) exec backend python manage.py makemigrations

.PHONY: backend-shell
backend-shell: ## Abre o Django shell interativo
	$(DC_DEV) exec backend python manage.py shell

.PHONY: backend-lint
backend-lint: ## Verifica o código Python com ruff (pip install ruff)
	$(DC_DEV) exec backend ruff check .

.PHONY: backend-format
backend-format: ## Formata o código Python com black
	$(DC_DEV) exec backend black .

# ------------------------------------------------------------------------------
# Frontend — Next.js (requer containers dev em execução)
# ------------------------------------------------------------------------------

.PHONY: frontend-lint
frontend-lint: ## Verifica o código TypeScript com ESLint
	$(DC_DEV) exec frontend npm run lint

.PHONY: frontend-install
frontend-install: ## Instala dependências npm dentro do container
	$(DC_DEV) exec frontend npm install

# ------------------------------------------------------------------------------
# Ajuda
# ------------------------------------------------------------------------------

.PHONY: help
help: ## Mostra comandos disponíveis
	@echo ""
	@echo "Docker Compose Environment Manager"
	@echo "==================================="
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""