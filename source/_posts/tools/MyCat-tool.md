---
title: MyCat
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


## MyCat（Linux）

### (Server安装)

* 前提：

#* 1、[jdk安装](#jdk_install)

#* 2、[mysql安装](#mysql_install)

* 官网：http://www.mycat.org.cn/

* 首先准备四台虚拟机，安装好mysql，方便后续做读写分离和主从复制。**(3.3内容)**

    ```shell
    192.168.85.45 node01
    192.168.85.46 node02
    192.168.85.47 node03
    192.168.85.48 node04
    ```

    

#### 1、下载MyCat

http://dl.mycat.org.cn/1.6.7.6/20210930213049/Mycat-server-1.6.7.6-release-20210930213049-linux.tar.gz

```shell
windows下载安装包
```

#### 2、上传并解压压缩文件

```shell
 tar -zxvf Mycat-server-1.6.7.5-release-20200422133810-linux.tar.gz -C /usr/local/ 
```

#### 3、修改配置

0、配置环境变量（可选）

```shell
vim /etc/profile
### 添加如下配置信息：
export MYCAT_HOME=/usr/local/mycat
export PATH=$MYCAT_HOME/bin:$PATH:$JAVA_HOME/bin

### 生效
source /etc/profile

```



**修改server.xml schema.xml之前先备份**

```shell
cd /usr/local/mycat

cd conf

cp server.xml server.xml.list
cp schema.xml schema.xml.list

```

1、修改完成后的  **server.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- - - Licensed under the Apache License, Version 2.0 (the "License"); 
        - you may not use this file except in compliance with the License. - You 
        may obtain a copy of the License at - - http://www.apache.org/licenses/LICENSE-2.0 
        - - Unless required by applicable law or agreed to in writing, software - 
        distributed under the License is distributed on an "AS IS" BASIS, - WITHOUT 
        WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. - See the 
        License for the specific language governing permissions and - limitations 
        under the License. -->
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
        <user name="root" defaultAccount="true">
                <property name="password">root</property>
                <property name="schemas">TESTDB</property>
                <property name="defaultSchema">TESTDB</property>
        </user>
</mycat:server>

```



2、修改完成后的 schema.xml

```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
        <schema name="TESTDB" checkSQLschema="false" sqlMaxLimit="100" dataNode="dn1">
        </schema>
        <dataNode name="dn1" dataHost="host1" database="msb" />
        <dataHost name="host1" maxCon="1000" minCon="10" balance="0"
                          writeType="0" dbType="mysql" dbDriver="native" switchType="1"  slaveThreshold="100">
                <heartbeat>select user()</heartbeat>
                <writeHost host="hostM1" url="192.168.1.45:3306" user="root"
                                   password="root">
                         <readHost host="hostS1" url="192.168.1.46:3306" user="root" password="root"></readHost>
                </writeHost>
        </dataHost>
</mycat:schema>

```



3、修改 **hosts**  文件

```shell
vim /etc/hosts

###添加
###ip name
192.168.1.164 node01
```

#### 4、启动mycat

​		mycat的启动有两种方式，一种是控制台启动，一种是后台启动，在初学的时候建议大家使用控制台启动的方式，当配置文件写错之后，可以方便的看到错误，及时修改，但是在生产环境中，使用后台启动的方式比较稳妥。

​		**控制台启动：**

```shell
cd /usrlocal/mycat/bin
./mycat console

###加入环境变量后可直接启动
mycat console
```

​		**后台启动：**

```shell
cd /usrlocal/mycat/bin
./mycat start

###加入环境变量后可直接启动
mycat start
```

​		按照如上配置在安装的时候应该不会报错，如果出现错误，根据错误的提示解决即可。



#### 5、登录验证

​		**管理窗口的登录**

​		从另外的虚拟机去登录访问当前mycat，输入如下命令即可

```
mysql -uroot -proot -P 9066 -h ip
```

​		此时访问的是mycat的管理窗口，可以通过show @@help查看可以执行的命令

​		**数据窗口的登录**

​		从另外的虚拟机去登录访问mycat，输入命令如下：【用户设置】

```
mysql -uroot -proot -P8066 -h ip
```

​		当都能够成功的时候以为着mycat已经搭建完成。

### mycat-web

#### ——1

##### 1、下载mycat-web安装包

​	官方地址：http://dl.mycat.org.cn/

##### 2、解压安装包到/usr/local目录

```shell
tar -zxvf Mycat-web-1.0-SNAPSHOT-20170102153329-linux.tar.gz -C /usr/local/

```

#### 3、进入mycat-web的目录运行启动命令

```shell
	./start.sh &

```

#### 4、mycat-web的服务端口是8082，查看服务是否启动

```shell
	netstat -nlpt | grep 8082

```

#### 5、通过地址访问服务

```shell
	192.168.1.164:8082/mycat/
```

#### 6、mycat-web配置

##### 6.1、配置zookeeper(可选)

```shell
cd /usr/local/mycat-web/mycat-web/WEB-INF/classes

###修改mycat.properties文件，可以修改zookeeper的地址
vim mycat.properties
```

##### 6.2、添加mycat实例

	* 在页面的mycat配置
	
	* mycat服务管理中添加mycat实例，需要填写相关的参数

