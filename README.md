NextJS & Kubernetes
===================

Run docker-compose firest. This will build and tag the nextjs image (also useful for quickly testing the image was build and runs) and starts a local Docker Registry.
This local DOcker registry will be used from our Local Kubernetes. Using a local DOcker registry is faster both in downloading and most importantly uploading the built image.

```bash
docker-compose up -d
docker tag nextjs-k8s 192.168.1.4:5000/nextjs-k8s
docker push 192.168.1.4:5000/nextjs-k8s
```

For more convenience I have tagged this image as karadalex/nextjs-k8s and pushed it at the public Docker hub (this is a slow operation).

Deploy to Kubernetes
```bash
cd k8s
kubectl apply -f next-deployment.yaml
kubectl apply -f next-service.yaml
```

Quickly test nextjs via port-forwarding
```bash
kubectl port-forward service/next 3000
```