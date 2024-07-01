#!/bin/bash

#Run Storybook in Docker
cd docker
docker compose -f shared-ui.yml down
docker compose -f shared-ui.yml build
docker compose -f shared-ui.yml build up -d