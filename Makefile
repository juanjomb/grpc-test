SHELL=/bin/bash
.DEFAULT_GOAL := help

.PHONY: start
start: 
	@docker compose up --build

.PHONY: test
test:
	@docker compose run app npm run test
