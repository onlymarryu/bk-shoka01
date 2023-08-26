---
title: Kafka
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


### Kafka 安装

> 安装前提，kafka安装运行最低支持jdk7；本篇演示版本是基于jdk1.8；

官方下载地址：[Apache Kafka](https://link.zhihu.com/?target=http%3A//kafka.apache.org/downloads)

kafka 是由scala语言编写，下载稳定版本，即前一个版本



![img](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/v2-9f6503ade62cfa48df87cc9da984e87d_720w.jpg)



点击进入后，按如下方式点击下载



![img](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/v2-bd19bea83d1cb978fbeed614ee126da6_720w.jpg)



下载完成后进行解压缩

```sh
tar -zxvf kafka_2.12-2.8.0.tgz 
mv kafka_2.12-2.8.0 /usr/local/kafka
```

解压完成后进入kafka目录

```sh
cd /usr/local/kafka
```



![img](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/v2-dfe360dfc7561953761f8ce69f782f4d_720w.png)



kafka 是基于 Zookeeper 的消息管理系统，所以启动的时候是需要使用到 Zookeeper ，但其内置了Zookeeper ，所以只需要根据bin目录下的文件进行启动即可

启动Zookeeper 服务端命令

```text
./bin/zookeeper-server-start.sh ./config/zookeeper.properties 
```

Zookeeper 启动成功后会出现 `binding to port 0.0.0.0/0.0.0.0:2181` 所示结果表示启动成功；



![img](https://pic1.zhimg.com/80/v2-6be2f91cd4ec47d589d3c5b58584c4b8_720w.png)



启动kafka服务端命令

```text
 ./bin/kafka-server-start.sh  ./config/server.properties
```

