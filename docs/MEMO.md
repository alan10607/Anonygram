# MEMO
### 進入docker mysql
docker exec -it leaf-mysql bash
mysql -u root -p

### ab test
ab -n 2000 -c 100 -p post -T application/json http://localhost:8080/view/test

### 臨時設定redis
CONFIG SET requirepass "root"
AUTH root

### redis-cli其他port
redis-cli -h 127.0.0.1 -p 6380

### maven install skip test
mvn -Dmaven.test.skip=true install

### docker build / 其他platform
docker build -f Dockerfile -t alan10607/leaf:0.8.5 .
docker buildx ls
docker build --platform linux/amd64 -f Dockerfile -t alan10607/anonygram:2.0.1 .

### docker run
docker run --env-file env/leaf-env -p 8081:8080 -v ~/docker/volume/leaf/log:/log --name leaf-server -d alan10607/leaf:0.8.5 ./wait-for-it.sh leaf-mysql:3306 -- ./wait-for-it.sh leaf-redis:6379 -- java -jar /leaf-server.jar
docker run --env-file env/mysql-env -p 3307:3306 --name leaf-mysql -d mysql
docker run -p 6380:6379 -v ~/docker/volume/redis/data:/data -v ~/docker/volume/redis/conf:/usr/local/etc/redis/redis.conf --name leaf-redis -d redis redis-server /usr/local/etc/redis/redis.conf --appendonly yes --requirepass "root"

### create-db checkout
git checkout master  src/main/java/com/alan10607/leaf/dto
git checkout master  src/main/java/com/alan10607/leaf/dao
git checkout master  src/main/java/com/alan10607/leaf/model

### JVM params
-DLOG_PATH=/Users/kuoping/Documents/GitHub/Leaf/log
-DMYSQL_HOST=localhost
-DMYSQL_PORT=3307
-DMYSQL_USER=root
-DMYSQL_PASSWORD=root
-DREDIS_HOST=localhost
-DREDIS_PORT=6380
-DREDIS_PASSWORD=root

## GCP setting
https://console.cloud.google.com  
compute engine > create vm

1. 取得遠端更新的檔案清單
```bash
sudo apt-get -y update
 ```
2. 在 Docker 加入官方 GPG KEY https://docs.docker.com/engine/install/ubuntu/
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
OR
```
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```
3. 新增APP伺服器
```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu ${lsb_release -cs} stable"
```
OR
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
4. 安裝docker-ce
```bash
sudo apt-get install -y docker-ce
```
OR
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

5. 查看docker
```bash
docker -v
```
6. docker-compose(其他版本: https://github.com/docker/compose/releases)
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m`" -o /usr/local/bin/docker-compose
```
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.11.0/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
```

7. 增加權限
```bash
sudo chmod +x /usr/local/bin/docker-compose
```
8. 查看docker-compose
```bash
docker-compose -v
```

9. 新增sudo user
```bash
sudo adduser alan10607
sudo usermod -aG sudo alan10607
```

10. 新增docker user
```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

11. 確認user
```bash
su - alan10607
exit
docker run hello-world
```


## Swap
https://klab.tw/2022/06/what-is-linux-swap-and-how-to-add-it/

1. fallocate空間
```
sudo fallocate -l 4G /swapfile
```

2. chmod讀寫權限
```
sudo chmod 600 /swapfile
```

3. 建立Swap空間
```
sudo mkswap /swapfile
# Setting up swapspace version 1, size = 1024 MiB (1073737728 bytes)
# no label, UUID=b3b91233-6a5b-44d3-9d13-d7c66285a166
```

4. 建立Swap
```
sudo swapon /swapfile
```

5. check空間
```
free
```

6. check swap
```
swapon --show
```

7. 備份fstab(重要文件)
```
sudo cp /etc/fstab /etc/fstab.backup
```

8. 修改fstab, 之後重開機後自動啟動swap
```
sudo nano /etc/fstab
```
在最後一行加入：
```
/swapfile swap swap defaults 0 0
```

9. Swap使用頻率, swappiness越大使用率越高
```
cat /proc/sys/vm/swappiness
sudo sysctl vm.swappiness=10
```

10. 修改swappiness, 之後重開機後自動啟動swap, 可先備份sysctl.conf

在最後一行加入：
```
vm.swappiness=10
```

## HTTPS keytool

1. 是否安裝keytool
```
keytool
```

2. 生成金鑰對

alias別名, keyalg算法, storetype金鑰庫型別, keystore檔名, validity有效期限(日)
```
keytool -genkeypair -alias anonygram_ssl -keyalg RSA -keysize 2048 -storetype PKCS12 -keystore anonygram_ssl.p12 -validity 1000
```
3. 匯出證書(安裝後瀏覽器重啟生效)
```
keytool -export -keystore anonygram_ssl.p12 -alias anonygram_ssl -file anonygram_cert.crt
```
```
cat anonygram_cert.crt
```