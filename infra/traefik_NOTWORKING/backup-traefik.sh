#!/bin/bash

# Define filenames
RESOURCE_FILE="traefik-resources.yaml"
VALUES_FILE="traefik-helm-values.yaml"

# Export Kubernetes resources
kubectl get all -l app.kubernetes.io/name=traefik -n default -o yaml > $RESOURCE_FILE
kubectl get configmap -l app.kubernetes.io/name=traefik -n default -o yaml >> $RESOURCE_FILE
kubectl get ingress -l app.kubernetes.io/name=traefik -n default -o yaml >> $RESOURCE_FILE

# Export Helm values
helm get values traefik -n default > $VALUES_FILE

echo "Backup complete: $RESOURCE_FILE and $VALUES_FILE"
