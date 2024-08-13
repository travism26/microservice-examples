# Installation

[Reference](https://docs.konghq.com/gateway/latest/install/kubernetes/proxy/)

## Control Plane

Control Plane is the management plane for Kong Gateway. It is responsible for managing the configuration of Kong Gateway nodes.

```bash
helm repo add kong https://charts.konghq.com
helm repo update

# Create a namespace for Kong
kubectl create namespace kong

# Install Kong Enterprise with a license secret (I think its free?)
kubectl create secret generic kong-enterprise-license --from-literal=license="'{}'" -n kong

# Clustering Certificates
openssl req -new -x509 -nodes -newkey ec:<(openssl ecparam -name secp384r1) -keyout ./tls.key -out ./tls.crt -days 1095 -subj "/CN=kong_clustering"
kubectl create secret tls kong-cluster-cert --cert=./tls.crt --key=./tls.key -n kong

# Install Kong Enterprise
helm install kong-cp kong/kong -n kong --values ./values-cp.yaml
```

# Troubleshooting

```bash
# Check the status of the pods
kubectl get pods -n kong

# Check Pod Events
kubectl describe pod <pod-name> -n kong

# Check logs of a pod
kubectl logs <pod_name> -n kong -c <init_container_name>
kubectl logs <pod_name> -n kong -c <container_name>
```
