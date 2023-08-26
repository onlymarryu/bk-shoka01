---
title: Erlang
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


### **Erlang安装**

#### ——1

​	RabbitMQ是使用Erlang语言编写的，所以需要先配置Erlang

##### 1 **修改主机名**

​	RabbitMQ是通过主机名进行访问的，必须指定能访问的主机名。

```
  vim /etc/sysconfig/network
  
  添加
  NETWORKING=yes
#  HOSTNAME=node-1 #名字可以随意
```

![](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/RabbitMQ-06.jpg)

```
    vim /etc/hosts
  
    ip network_hostname
eg: 192.168.1.195 node-1  
```

​	新添加了一行，前面为服务器ip，空格后面添加计算机主机名

![](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/RabbitMQ-07.jpg)

##### 2 **安装依赖**

```
  yum -y install make gcc gcc-c++ kernel-devel m4 ncurses-devel openssl-devel unixODBC unixODBC-devel
```

##### 3 **上传并解压**

​	上传otp_src_22.0.tar.gz到/usr/local/tmp目录中，进入目录并解压。

 	解压时注意，此压缩包不具有gzip属性，解压参数没有z，只有xf

```
  cd /usr/local/tmp
  tar xf otp_src_22.0.tar.gz -C /usr/local/tmp
```

##### 4 **配置参数**

​	先新建/usr/local/erlang文件夹，作为安装文件夹

```
  mkdir -p /usr/local/erlang
```

​	 进入文件夹

```
  cd otp_src_22.0
```

​	 配置参数

```
  ./configure --prefix=/usr/local/erlang --with-ssl --enable-threads --enable-smp-support --enable-kernel-poll --enable-hipe --without-javac
```

#####  5 **编译并安装**

​	编译 

```
  make
```

​	 安装

```
  make install
```

#####  6 **修改环境变量**

​	修改/etc/profile文件

```
 vim /etc/profile
```

​	 在文件中添加下面代码 

```
export PATH=$PATH:/usr/local/erlang/bin
```

​	运行文件，让修改内容生效

```
  source /etc/profile
```

#####  7 **查看配置是否成功**

```
  erl -version
```

![](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/RabbitMQ-08.jpg)





