---
title: CentOS-7安装
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
    - 工具软件安装
---






**1.下载镜像文件**

  [ 清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/)  

**2.开始安装**

![1646489101763](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489101763.png)





![1646489187835](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489187835.png)



![1646489210450](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489210450.png)





![1646489375149](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489375149.png)





![1646489450527](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489450527.png)



**3.开始进去虚拟机配置我们的软件**

**3.1语言**

![1646489591914](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489591914.png)

**3.2时区、软件选择**

软件选择：按照自己的需求选，第一次多选也不要少选

![1646489600666](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489600666.png)

4.硬、软配置完成，开始安装，同时要创建管理员Root 和 基础用户

![1646489605373](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489605373.png)



![1646489621243](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489621243.png)

5.安装成功

![1646489626446](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646489626446.png)





**系统配置**

<div name="Linux_install_centos7">进入系统后~</div>

1、首先配置网络

要先切换到 root 用户上去，不然没权限。

```shell
方式一
sudo -i
password:当前普通用户密码

方式二
su -
password：root用户密码

```

 将  **ONBOOT ** 改为 yes ： 

```shell
 vim /etc/sysconfig/network-scripts/ifcfg-ens33
```

![1646490152508](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646490152508.png)



重启网络

```shell
service network restart

### 检查是否通畅
ping 114.114.114.114
```



2、 安装net-tools 和 vim（**有的话可直接跳过**）

```shell
yum install -y net-tools vim
```

检查自己的ip

```shell
ifconfig
```



![1646490384192](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/img/1646490384192.png)



3 启动sshd服务

```shell
service sshd start
```

<div name="Linux_minInstall_4"></div >

4、修改登录，让Root用户直接登录

#[具体步骤](#problem-6)   		

<div name="Linux_minInstall_5"></div >

5、修改DNS连接,让xshell访问快一点

#[具体步骤](#problem-5)

6、 **关闭指定端口防火墙：** 

```shell
systemctl status firewalld  

###开启80端口

firewall-cmd --zone=public --add-port=80/tcp --permanent  

###开启3306端口

firewall-cmd --zone=public --add-port=3306/tcp --permanent  

###重启防火墙：

firewall-cmd --reload

关闭防火墙 ，重启失效(Linux系统一重启Linux中的防火墙又会被开起)
service firewalld stop
禁用防火墙，永久有效
systemctl disable firewalld 或者  systemctl disable firewalld.service
启动防火墙 (对禁用的防火墙进行启动)
systemctl enable firewalld

```





