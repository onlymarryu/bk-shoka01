---
title: Nginx
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


### nginx安装

#### ——1

##### 安装：yum

```sh
 yum install yum-utils
```

##### 切换目录：

```sh
cd /etc/yum.repos.d/
```

#####  创建文件：

```sh
vim nginx.repo
```

*修改文件内容：*

```sh
[nginx-stable]

name=nginx stable repo

baseurl=http://nginx.org/packages/centos/$releasever/$basearch/

gpgcheck=1

enabled=1

gpgkey=https://nginx.org/keys/nginx_signing.key

module_hotfixes=true

[nginx-mainline]

name=nginx mainline repo

baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/

gpgcheck=1

enabled=0

gpgkey=https://nginx.org/keys/nginx_signing.key

module_hotfixes=true
```



##### Nginx的安装：

```sh
yum install nginx
```

安装完成：我们的版本：nginx.x86_64 1:1.20.2-1.el7.ngx

<div name="nginx_install_2">

#### ——2

##### 1、拉取镜像

```shell
docker pull nginx:1.16.1
```

##### 2、创建挂载数据卷

```shell
mkdir -p /root/nginx/conf
vim /root/nginx/conf/nginx.conf
```

`nginx.conf内容：`

```shell
user  root;
worker_processes  1;
 
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
 
 
events {
    worker_connections  1024;
}
 
 
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
 
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
 
    access_log  /var/log/nginx/access.log  main;
 
    sendfile        on;
#    #tcp_nopush     on;
 
    keepalive_timeout  65;
 
#    #gzip  on;
    
    
    server {
    	listen       80;
    	server_name  localhost;

#    	#charset koi8-r;
#    	#access_log  /var/log/nginx/host.access.log  main;

    	location / {
        	root   /usr/share/nginx/html;
        	index  index.html index.htm;
    	}

#    	#error_page  404              /404.html;

#    	# redirect server error pages to the static page /50x.html

    	error_page   500 502 503 504  /50x.html;
    	location = /50x.html {
        	root   /usr/share/nginx/html;
    	}
   
    }
}


```





##### 3、创建容器

```shell
### 注意ip一定要与检测ip相同
docker run \
-p 80:80 \
--name nginx  \
-v /root/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-d nginx:1.16.1 

```





##### 4、查看

````shell
docker ps 
````



