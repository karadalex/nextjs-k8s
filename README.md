NextJS & Kubernetes
===================

## General instructions

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
./kube-up.sh
```

Quickly test nextjs via port-forwarding
```bash
kubectl port-forward service/nextjs-k8s 3000
```

and visit the Nextjs app at [http://localhost:3000](http://localhost:3000)


## Autoscaling

Install metrics server (with insecure flag passed, do not use in production) to use cpu metrics for the autoscaling
```bash
kubectl apply -f metrics-server.yaml
```

Set autoscaling strategy
```bash
cd k8s
kubectl autoscale deployment nextjs-k8s --cpu-percent=50 --min=2 --max=10
```

Simulate load
```bash
kubectl run -i --tty load-generator --image=busybox /bin/sh
while true; do wget -q -O- http://nextjs-k8s:3000; done
```

Scale down
```bash
kubectl scale deploy nextjs-k8s --replicas=2
kubectl get pods -w
```

For more complex load scenarios install k6 [https://k6.io/docs/getting-started/installation/](https://k6.io/docs/getting-started/installation/)
start the port-forwarding
```bash
kubectl port-forward service/nextjs-k8s 3000
```

and then run the load test
```bash
k6 run load-test-autoscaling.js
```