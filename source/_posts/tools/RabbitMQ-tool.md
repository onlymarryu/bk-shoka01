---
title: RabbitMQ
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---




### RabbitMQ**安装**



#### 1 **上传并解压**

​	上传rabbitmq-server-generic-unix-3.7.18.tar.xz到/usr/loca/tmp中

```
  cd /usr/local/tmp
  
  tar xf rabbitmq-server-generic-unix-3.7.18.tar.xz -C /usr/local/tmp
```

#### 2 **复制到local下**

​	复制解压文件到/usr/local下，命名为rabbitmq

```
  cp -r rabbitmq_server-3.7.18 /usr/local/rabbitmq
```

#### 3 **配置环境变量**

```
  vim /etc/profile
```

​	在文件中添加 

```
export PATH=$PATH:/usr/local/rabbitmq/sbin
```

​	解析文件

```
 source /etc/profile
```

####  4 **开启web管理插件**

​	进入rabbitmq/sbin目录

```
 cd /usr/local/rabbitmq/sbin
```

 	查看插件列表

```
  ./rabbitmq-plugins list
```

 	生效管理插件

```
  ./rabbitmq-plugins enable rabbitmq_management
```

####  5 **后台运行**

​	启动rabbitmq。

```
  ./rabbitmq-server -detached
```

​	停止命令，如果无法停止，使用kill -9 进程号进行关闭

```
 ./rabbitmqctl stop_app
```

#### 6 **查看web管理界面**

​	默认可以在安装rabbitmq的电脑上通过用户名：guest密码guest进行访问web管理界面

​	端口号：15672（放行端口，或关闭防火墙）

​	在虚拟机浏览器中输入：

​	<http://localhost:15672>

###  * RabbitMq账户管理

#### 1 **创建账户**

​	语法：./rabbitmqctl add_user username password

```
 cd /usr/local/rabbitmq/sbin
 
 ./rabbitmqctl add_user mashibing mashibing
```

#### 2 **给用户授予管理员角色**

​	其中smallming为新建用户的用户名

```
 ./rabbitmqctl set_user_tags mashibing administrator
```

####  3 **给用户授权**

​	“/” 表示虚拟机

​	mashibing 表示用户名

​	".*" ".*" ".*" 表示完整权限

```
 ./rabbitmqctl set_permissions -p "/" mashibing ".*" ".*" ".*"
```

####  4 **登录**

​	使用新建账户和密码在windows中访问rabbitmq并登录 

​	在浏览器地址栏输入：

​	<http://ip:15672/>

 	用户名：mashibing

​	密码：mashibing







