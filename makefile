.PHONY: default
default: start-app ## start the docker container and start the aplication

.PHONY: start-app
start-app: start-docker  run-proyect ## Build all docker containers locally and start clay application

.PHONY: start-docker
start-docker:
	docker-compose up -d

.PHONY: run-proyect
run-proyect:
	cd backend && yarn startdev

.PHONY: stop
stop:
	docker-compose stop

.PHONY: rm
rm:
	docker-compose rm