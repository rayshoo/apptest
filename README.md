# Build
## docker
```sh
## nodeapp build - 1
docker build -t m1:5000/rayshoo/nodeapp:1.0 -f nodeapp/Dockerfile nodeapp
## nodeapp build - 2
cd nodeapp/app && npm run build && cd ../..
docker build -t m1:5000/rayshoo/nodeapp:1.0 -f nodeapp/dockerfile nodeapp
## nginx build
docker build -t m1:5000/rayshoo/nginx:1.0 nginx
```
## docker-compose
```sh
docker-compose build
```
## podman-compose
```sh
podman-compose build
```
# Push
## docker
```sh
docker push m1:5000/rayshoo/nodeapp:1.0
docker push m1:5000/rayshoo/nginx:1.0
```
## docker-compose
```sh
docker-compose push
```
## podman-compose
```sh
podman-compose push
```

# Run
## docker
```sh
docker run -d --name nodeapp m1:5000/rayshoo/nodeapp:1.0
docker run -d --name nginx --link nodeapp -p 80:5000 m1:5000/rayshoo/nginx:1.0
```
# docker-compose
```sh
docker-compose up --build -d
```
# podman-compose
```sh
podman-compose up --build -d
```
## kubernetes
```sh
kubectl apply -f kubernetes

kubectl rollout -n apptest restart deployment/nodeapp
kubectl rollout -n apptest restart deployment/nginx

kubectl delete pod -n apptest --all
```

# Delete
## docker
```sh
docker rm $(docker stop nodeapp nginx)
```
## podman
```sh
podman pod rm $(podman pod stop apptest)
```
## docker-compose
```sh
docker-compose down
```
## podman-compose
```sh
podman-compose down
```
## kubernetes
```sh
kubectl delete -f kubernetes
```

# Test
```sh
curl -I \
[external ip]/test/library.jpg
```