# Installation (Kong Gateway) WORK IN PROGRESS

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

## Data Plane

Data Plane is the data plane for Kong Gateway. It is responsible for processing incoming requests and responses.

```bash
helm install kong-dp kong/kong -n kong --values ./values-dp.yaml
```

## Local k8s

### Access Kong Gateway (NodePort)

```bash
# Find the IP address of your local Kubernetes node
NODE_IP=$(kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type=="InternalIP")].address}')
# Get the NodePort assigned to the Kong service
NODE_PORT=$(kubectl get svc kong-dp-kong-proxy -n kong -o jsonpath='{.spec.ports[?(@.name=="kong-proxy")].nodePort}')
# Access Kong Gateway
echo "http://$NODE_IP:$NODE_PORT"
```

### Access Kong Gateway (Port Forwarding)

```bash
# Forward the Kong Gateway port to your local machine
kubectl port-forward -n kong svc/kong-dp-kong-proxy 8080:80
# Access Kong Gateway
echo "http://localhost:8080"
```

### Test Kong Gateway

```bash
# Fetch the LoadBalancer address for the kong-dp service and store it in the PROXY_IP environment variable
export PROXY_IP=$(kubectl get svc kong-dp-kong-proxy -n kong -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
```
