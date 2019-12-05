# Hack9 2019 - Dashboard

Scoreboard for Hack9 2019


## Run in local

MySql in Docker container:

```
sudo docker run --name mysql-hack9 -p 3306:3306 \
-v `pwd`/db:/docker-entrypoint-initdb.d \
-e MYSQL_ROOT_PASSWORD=1234 \
-e MYSQL_USER=hack9 \
-e MYSQL_PASSWORD=hack9-2019 \
-e MYSQL_DATABASE=hack9-judge \
-d mysql/mysql-server:5.7
```

Run the application:

`sls offline`
