# Restoring the Deployment just realized this api gateway costs money

If you have saved the Kubernetes resources or Helm values, you can restore the deployment. There are two ways to do this:

## 1 Apply the Kubernetes Resources:

```bash
kubectl apply -f traefik-resources.yaml
```

## 2 Re-deploy with Helm (if using Helm):

You can re-deploy Traefik with the saved Helm values:

```bash
helm upgrade --install traefik traefik/traefik --namespace default -f traefik-helm-v
```
