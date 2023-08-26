---
title: HAProxy安装
date: 2022-10-15-13:17:35
categories:
	-  工具软件安装
tags:
	- 工具软件安装
---


#### HAProxy安装	

##### ——1

###### 1、准备好HAProxy的安装包

https://src.fedoraproject.org/repo/pkgs/haproxy/

###### 2、解压到/usr/local目录

###### 3、进入到解压后的目录，查看内核版本，进行编译

```shell
cd cd /usr/local/haproxy-1.8.25/

### 查看内核版本3.10=31
uname -r

make TARGET=linux31
```

###### 4、编译完成之后，开始进行安装

````shell
make install PREFIX=/usr/local/haproxy
````

###### 5、安装完成之后，创建目录，创建HAProxy配置文件

````shell
mkdir -p /usr/data/haproxy
mkdir /usr/local/haproxy/conf
vi /usr/local/haproxy/conf、haproxy.conf

````

6、向配置文件中添加配置信息

```shell
	global
		log 127.0.0.1 local0
##		#log 127.0.0.1 local1 notice
##		#log loghost local0 info
		maxconn 4096
		chroot /usr/local/haproxy
		pidfile /usr/data/haproxy/haproxy.pid
		uid 99
		gid 99
		daemon
##		#debug
##		#quiet
defaults
		log global
		mode tcp
		option abortonclose
		option redispatch
		retries 3
		maxconn 2000
		timeout connect 5000
		timeout client 50000
		timeout server 50000
listen proxy_status
	bind :48066
		mode tcp
		balance roundrobin
		server mycat_1 192.168.85.111:8066 check inter 10s
		server mycat_2 192.168.85.112:8066 check inter 10s
frontend admin_stats
	bind :7777
		mode http
		stats enable
		option httplog
		maxconn 10
		stats refresh 30s
		stats uri /admin
		stats auth admin:123123
		stats hide-version
		stats admin if TRUE
```

* stats uri /admin                   		   **账号**
* stats auth admin:123123       	   **密码**

###### 7、启动haproxy服务

```shell
	/usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/conf/haproxy.conf
```

###### 8、查看haproxy的进程，如果存在则说明没有问题

```shell
	ps -ef | grep haproxy
```

###### 9、打开浏览器访问,用户名为admin，密码为123123

​	http://192.168.1.164:7777/admin



