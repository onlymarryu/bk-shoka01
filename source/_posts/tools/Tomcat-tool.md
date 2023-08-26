---
title: Tomcat
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


### Tomcat安装

下载

下载地址：http://tomcat.apache.org/

![](Tomcat-tool/1646193444708.png)


#### 安装

tomcat由apache开源组织使用java开发的一款web容器,在使用之前需要安装JDK及配置JAVA_HOME.Tomcat是绿色软解，**解压就可使用**。如果之前已经安装了其他tomcat并且还配置了CATALINA_HOME 不要忘记修改CATALINA_HOME指向我们现在使用的这个tomcat

#### Tomcat启动

运行startup.bat文件。

一定要配置JAVA_HOME   C:\Program Files\Java\jdk1.8.0_161
部分电脑需要配置CATALINA_HOME   D:/***/***/apache-tomcat-9.0.41
记住一个习惯:以后我们装任何一个软件路径都应该避免中文,空格和特殊符号,可以使用_

#### Tomcat关闭

  运行shutdown.bat文件或者直接关闭掉启动窗口。

#### 访问Tomcat

访问Tomcat的URL格式：http://ip:port

访问本机Tomcat的URL格式：http://localhost:8080



### Tomcat安装

#### ——1

##### 1、下载Linux对应版本的Tomcat

​	  下载压缩文件     apache-tomcat-7.0.68.tar.gz         

##### 2、解压压缩文件

```shell
#tar -xvf   apache-tomcat-7.0.68.tar.gz -C /usr/local/  #解压到的路径 
```

##### 3、配置环境变量

```shell
vim  /etc/profile

###自己定义为位置
export CATALINA_BASE=/usr/local/apache-tomcat-7.0.68
export PATH=$CATALINA_BASE/bin:$PATH

```

##### 4、使用环境变量生效

````shell
source /etc/profile
````

##### 5、启动Tomcat服务

* 注：要是远程访问你关注防火墙问题

启动Tomcat服务：

````shell
./startup.sh
````


启动Tomcat并输出启动日志 :

````shell
  ./startup.sh & tail -f  ../logs/catalina.out
````

