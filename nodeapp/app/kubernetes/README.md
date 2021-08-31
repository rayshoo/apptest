```
$ kubectl create secret docker-registry registry-auth-by-cmd --docker-username=[username] --docker-password=[password]

$ docker build -t [name]:[version] .
$ docker push [name]:[version]

$ openssl rand -base64 741 > ./key.txt


$ kubectl create secret generic shared-bootstrap-data --from-file=internal-auth-mongodb-keyfile=./key.txt

$ kubectl create -f secret.ymal
$ kubectl create -f mongo

$ kubectl exec -it mongod-0 -c mongod-container -- /bin/bash

$ mongo

rs.initiate({_id: "MainRepSet", version: 1, members: [
       { _id: 0, host : "mongod-0.mongo-wol-service.default.svc.cluster.local:27017" },
       { _id: 1, host : "mongod-1.mongo-wol-service.default.svc.cluster.local:27017" },
       { _id: 2, host : "mongod-2.mongo-wol-service.default.svc.cluster.local:27017" }
]});


db.getSiblingDB("admin").createUser({
      user : "oddconcepts",
      pwd  : "devops",
      roles: [ { role: "root", db: "admin" } ]
});

db.getSiblingDB('admin').auth("oddconcepts", "devops");

rs.status()

use wol
db.createCollection('pcs')

exit
$ exit

$ kubectl create -f web-app.yaml



```