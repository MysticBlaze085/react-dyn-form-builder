#!/bin/bash

set -e # fail if any command fails

##################################################################################################
#
# This script is intend to deploy the microservice to a given environment, and to run within our
# BITBUCKET PIPELINES ONLY. This file takes in an environment specific values file as a parameter,
# and uses the pipeline variables to set secret values.
#
##################################################################################################
printf "Shared UI :: Running Deploy Script\n"

# Check for required params & environment variables
[ -z "$1" ] && echo "Values yaml file param required as 1st arg" && exit 1;

aws ecr get-login-password --region "${AWS_DEFAULT_REGION}" | helm registry login --username AWS --password-stdin "${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"

# Directly install the helm chart with the values
helm upgrade atlas-console-ui "oci://${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/atlas-archetype" -f "$1" \
    --version "^0.1.x" \
    --description "${2-"Upgrade complete"}" \
    --namespace "atlas-system" \
    --set "serviceDefinitions[0].workload.image.tag"="${APP_VERSION}-${ENVIRONMENT}" \
    --create-namespace \
    --dependency-update \
    --install

printf "Shared UI :: Deploy Script Finished\n"
