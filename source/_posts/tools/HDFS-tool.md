---
title: HDFS安装
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


### HDFS安装

#### ——1



#### ——2

1.拉取Hadoop镜像（可以在docker hub上找合适的镜像）：

```shell
docker pull singularities/hadoop
```

2.创建docker-compose.yml文件（可以在文本编辑器中写好后，复制），内容如下：

```yml
version: "2"

services:
  namenode:
    image: singularities/hadoop
    command: start-hadoop namenode
    environment:
      HDFS_USER: hdfsuser
    ports:
      - "8020:8020"
      - "14000:14000"
      - "50070:50070"
      - "10020:10020"
      - "13562:13562"
      - "19888:19888"
  datanode:
    image: singularities/hadoop
    command: start-hadoop datanode namenode
    environment:
      HDFS_USER: hdfsuser
    links:
      - namenode

```



3.创建hadoop，执行如下命令

```shell
docker-compose up -d
docker ps
```

4.开启多个datanode

```shell
docker-compose scale datanode=3
docker ps
```

5.查看hadoop控制面板。由于服务刚初始化，可能需要等一会。访问类似如下url：

```ruby
#http://192.168.1.195:50070/dfshealth.html#tab-datanode
```

6.进入任意hadoop相关容器，**直接进行hdfs基础操作**
在任意datanode的容器中操作hdfs，会自动同步到其他的datanode容器中。

```bash
### 查看所有命令
hadoop fs
### 创建目录
#hadoop fs -mkdir /hdfs #在根目录下创建hdfs文件夹
### 查看目录
#hadoop fs -ls  /   #列出根目录下的文件列表
### 创建多级目录
hadoop fs -mkdir -p /hdfs/d1/d2
### 上传文件到HDFS
#echo "hello world" >> local.txt   #创建文件
#hadoop fs -put local.txt /hdfs/   #上传文件到hdfs
### 下载hdfs文件
hadoop fs -get /hdfs/local.txt
### 删除hdfs中的文件
hadoop fs -rm /hdfs/local.txt
### 删除hdfs中的目录
hadoop fs -rmdir /hdfs/d1/d2
```

