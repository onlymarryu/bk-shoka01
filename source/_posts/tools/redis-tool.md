---
title: redis
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---

## redis安装

### ——1

#### 1.安装依赖C语言依赖

​	redis使用C语言编写，所以需要安装C语言库

```
 yum install -y gcc-c++ automake autoconf libtool make tcl 
```

​	

#### 2.上传并解压

​	把redis-5.0.5.tar.gz上传到/usr/local/tmp中，解压文件

```
 cd /usr/local/tmp

 tar zxf redis-5.0.5.tar.gz
```

 

#### 3.编译并安装

​	进入解压文件夹

```
  cd /usr/local/tmp/redis-5.0.5/
```

​	编译

```
 make
```

​	安装	

```
 make install PREFIX=/usr/local/redis
```

 

#### 4.开启守护进程

​	复制cd /usr/local/tmp/redis-5.0.5/中redis.conf配置文件	

```
 cp redis.conf /usr/local/redis/bin/
```

 **修改配置文件**	

```
 cd /usr/local/redis/bin/

 vim redis.conf
```

​	把daemonize的值由no修改为yes

![](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/Redis-01.jpg)

#### 5.修改外部访问

​	在redis5中需要修改配置文件redis.conf允许外部访问。需要修改两处。

​	注释掉下面

​	bind 127.0.0.1

```
 bind 127.0.0.1
```

​	protected-mode yes 改成 no

![](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/Redis-02.jpg)

#### 6.启动并测试

​	启动redis

 ```shell
./redis-server redis.conf
 ```

​	重启redis

```
./redis-cli shutdown
./redis-server redis.conf
```

​	启动客户端工具

​	在redis5中客户端工具对命令会有提供功能。

 ```shell
./redis-cli 
 ```



####  ——2

##### 1、拉取镜像文件

```shell
docker pull redis[:(版本号)]
```

##### 2、去gitee库中下载redis配置文件（docker不自带配置文件）【也可不进行此步骤】

**建议看完，先别操作，再看三，看完三之后再决定如何操作**



然后按照文章内容进行，忽略下载。

文章地址： https://www.jb51.net/article/203274.htm 

、



![1645177895314](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/1645177895314.png)





 **docker 镜像中没有redis.conf文件，要自己配置** 

```undefined
git pull --rebase https://gitee.com/zjj3366/mydemo.git master
```

##### 3、创建一个redis 服务容器

**第二步进行了的**

```shell
docker run -p 6379:6379 \
--name myredis  \
-v /usr/local/docker/redis.conf:/etc/redis/redis.conf   \
-v /usr/local/docker/data:/data  \
--restart=always \
-d redis:5.0 \
redis-server  /etc/redis/redis.conf  \
--appendonly yes  
```

**第二步没有进行的**

```shell
docker run -p 6379:6379  \
--name myredis  \
-v /root/myredis/data:/data \
-v /root/myredis/conf/redis.conf:/etc/redis/redis.conf  \
-d redis:5.0  \
redis-server /etc/redis/redis.conf  \
--appendonly yes
```

**区别：**

​	其实也没有什么区别，只是映射的文件不同，也可以将第二步的文件直接创建到第二种创建服务容器的配置文件地址中去，这样也可使用第二个创建方式。







![1645177877202](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/1645177877202.png)





![1645177918077](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/1645177918077.png)



## 快速启动

**注意：**

​	配置文件一定要手动创建在特定目录

​	配置文件在上面，或者去github上面找，直接搜索redis，然后切换分支找对应版本，然后找conf即可。

### 单机模式

standalone.sh	单机模式启动，容器名称：redis，		端口：6379

```shell
docker run -p 6379:6379 \
--name redis  \
-v /root/redis/conf/redis.conf:/etc/redis/redis.conf   \
-v /root/redis/data:/data  \
--restart=always \
-d redis:6.2 \
redis-server  /etc/redis/redis.conf --appendonly yes
```

### 集群模式

cluster.sh		集群模式启动，容器名称：node(1..x)	端口：600(1..x)

```shell
#!/bin/bash
#for i in (1..3) 
while getopts ":s:m:d:" opt;do
   case $opt in
        m)
        # echo "参数a的值$OPTARG"
	echo "创建的集群数量为：$OPTARG"
	j=$OPTARG
	default_redis_cluster=j
	for ((i = 1 ;i<=$j;i++))
	do
	docker run -p 600$i:6379 \
	--name node$i  \
	-v /root/redis/conf/redis.conf:/etc/redis/redis.conf   \
	-v /root/redis/data:/data  \
	--restart=always \
	-d redis:6.2 \
	redis-server  /etc/redis/redis.conf --appendonly yes
	done
	unset j
        ;;
        s)
        #echo "参数b的值$OPTARG"
	ehco "修改redis中的一写配置：$OPTARG"
	
	for ((i=1 ; i<=$default_redis_cluster; i++))
	do
	docker exec -it node$i redis -s $OPTARG
	done
        ;;
	
	d)
        echo "redis集群搭建，默认3台设备"
	j=3
	default_redis_cluster=j
	for ((i = 1 ;i<=$default_redis_cluster;i++))
	do
	docker run -p 600$i:6379 \
	--name node$i  \
	-v /root/redis/conf/redis.conf:/etc/redis/redis.conf   \
	-v /root/redis/data:/data  \
	--restart=always \
	-d redis:6.2 \
	redis-server  /etc/redis/redis.conf --appendonly yes
	done
	unset j
	;;
        ?)
	echo "无效参数！"
        exit 1;;
    esac
done
```





## 问题补充

### 外部链接不上，有可能的原因

1. 配置文件中指定 `bind` 为127.0.0.1
2. 开启了守护者模式` protected-mode`  yes



