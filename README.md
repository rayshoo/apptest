# build

## docker build
### nodeapp build - 1
```sh
docker build -t m1:5000/rayshoo/nodeapp:1.0 -f nodeapp/Dockerfile nodeapp
```
### nodeapp build - 2
```sh
cd nodeapp/app && npm run build && cd ../..
docker build -t m1:5000/rayshoo/nodeapp:1.0 -f nodeapp/dockerfile nodeapp
```
### nginx build
```sh
docker build -t m1:5000/rayshoo/nginx:1.0 nginx
```
## docker push
```sh
docker push m1:5000/rayshoo/nodeapp:1.0
docker push m1:5000/rayshoo/nginx:1.0
```
# run
## docker
```sh
docker run -d --name nodeapp m1:5000/rayshoo/nodeapp:1.0
docker run -d --name nginx --link nodeapp -p 80:5000 m1:5000/rayshoo/nginx:1.0
```
## docker compose
```sh
docker-compose up --build -d
```
