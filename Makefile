# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help


export COMPOSE_FILE ?= docker-compose.yml
export COMPOSE_PROJECT_NAME ?= mkdocs


# TASKS

.PHONY: up
up: ## Docker-compose up
	@docker compose up --build --detach --force-recreate --remove-orphans

.PHONY: stop
stop: ## Docker-compose stop
	@docker compose stop

.PHONY: down
down: ## Docker-compose down
	@docker compose down

.PHONY: logs
logs: ## Get logs (follow, tail 10), for example: make logs args="app" OR make logs
	@docker compose logs --timestamps -f --tail 10 $(args)
