```sh
# build

## docker build
### nodeapp build - 1
docker build -t m1:5000/rayshoo/nodeapp:1.0 -f nodeapp/Dockerfile nodeapp
### nodeapp build - 2
npm run build
docker build -t m1:5000/rayshoo/nodeapp:1.0 -f nodeapp/dockerfile nodeapp
### nginx build
docker build -t m1:5000/rayshoo/nginx:1.0 nginx

## docker push
docker push m1:5000/rayshoo/nodeapp:1.0
docker push m1:5000/rayshoo/nginx:1.0

# run
## docker
docker run -d --name nodeapp m1:5000/rayshoo/nodeapp:1.0
docker run -d --name nginx --link nodeapp -p 80:5000 m1:5000/rayshoo/nginx:1.0

## docker compose
docker-compose up --build -d
```
