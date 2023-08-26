---
title: Keepalived
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


### Keepalived安装

#### ——1

##### 1、准备好Keepalived安装包

#####  2、解压到/usr/local目录

```shell
tar -zxvf /usr/local/tmp/keepalived-1.4.5.tar.gz -C /usr/local/

```

#####  3、安装需要依赖的环境组件

```shell
yum install gcc openssl-devel popt-devel -y

```

##### 4、进入到解压目录，进行编译

	cd /usr/local/keepalived-1.4.5
	./configure --prefix=/usr/local/keepalived	

##### 5、编译完成之后，进行安装

```shell
make && make install
```

##### 6、将keepalived的服务注册为系统服务

```shell
cp  -rf   /usr/local/keepalived-1.4.5/keepalived/etc/init.d/keepalived /etc/init.d/
mkdir /etc/keepalived
cp   -rf  /usr/local/keepalived/etc/keepalived/keepalived.conf /etc/keepalived/
cp   -rf  /usr/local/keepalived-1.4.5/keepalived/etc/sysconfig/keepalived /etc/sysconfig/
cp   -rf  /usr/local/keepalived/sbin/keepalived /usr/sbin/

```

##### 7、修改配置文件

```shell
vim  /etc/keepalived/keepalived.conf

```

**CentOS-6   下的配置文件**

```shell
! Configuration File for keepalived
global_defs {
   notification_email {
     acassen@firewall.loc
     failover@firewall.loc
     sysadmin@firewall.loc
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 127.0.0.1
   smtp_connect_timeout 30
   router_id LVS_DEVEL
   vrrp_skip_check_adv_addr
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

vrrp_instance VI_1 {
##	# 配置为主
    state MASTER
#    # 设置网卡
    interface eth0
#     # 虚拟路由ID，全局唯一
    virtual_router_id 51
#    # 优先级，权重值
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
         192.168.1.100/24  dev eth0 label eth0:3:
    }
}

```

**CentOS-7   下的配置文件**

```conf
! Configuration File for keepalived
global_defs {
   notification_email {
     acassen@firewall.loc
     failover@firewall.loc
     sysadmin@firewall.loc
   }
   notification_email_from Alexandre.Cassen@firewall.loc
   smtp_server 127.0.0.1
   smtp_connect_timeout 30
   router_id LVS_DEVEL
   vrrp_skip_check_adv_addr
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

vrrp_instance VI_1 {
##	# 配置为主
    state MASTER
#    # 设置网卡
    interface ens33
#     # 虚拟路由ID，全局唯一
    virtual_router_id 51
#    # 优先级，权重值
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.1.100/24 
    }
}

```

###### 8、启动keepalived

```shell
service keepalived start
###或者
systemctl start keepalived.service

```

###### 9、登录验证

```shell
mysql -uroot -p123456 -h 192.168.1.100 -P 48066

```



