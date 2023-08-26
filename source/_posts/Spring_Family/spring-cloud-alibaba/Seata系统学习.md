---
title: Seata系统学习
date: 2023-07-10 21:56:23
categories: 微服务
tags: 
	- Seate
	- spring-cloud-alibaba
	- 分布式事务
---



# 分布式事务简介

## 概念

基础概念：事务ACID

* A（Atomic）：原子性，构成事务的所有操作，要么都执行完成，要么全部不执行，不可能出现部分成功部分失 败的情况。
* C（Consistency）：一致性，在事务执行前后，数据库的一致性约束没有被破坏。比如：张三向李四转100元， 转账前和转账后的数据是正确状态这叫一致性，如果出现张三转出100元，李四账户没有增加100元这就出现了数 据错误，就没有达到一致性。
* I（Isolation）：隔离性，数据库中的事务一般都是并发的，隔离性是指并发的两个事务的执行互不干扰，一个事 务不能看到其他事务运行过程的中间状态。通过配置事务隔离级别可以避脏读、重复读等问题。
* D（Durability）：持久性，事务完成之后，该事务对数据的更改会被持久化到数据库，且不会被回滚。

### 事务

* 本地事务：同一数据库和服务器，称为本地事务
  在计算机系统中，更多的是通过关系型数据库来控制事务，这是利用数据库本身的事务特性来实现的，因此叫数据库事务，由于应用主要靠关系数据库来控制事务，而数据库通常和应用在同一个服务器，所以基于关系型数据库的事务又被称为本地事务。
* 分布式事务：
  分布式事务指事务的参与者、支持事务的服务器、资源服务器以及事务管理器分别位于**不同的分布式系统**的不同节点之上，且属于不同的应用，分布式事务需要保证这些操作要么全部成功，要么全部失败。本质上来说，分布式事务就是为了保证不同数据库的数据一致性。
* 举例：
  分布式系统会把一个应用系统拆分为可独立部署的多个服务，因此需要服务与服务之间远程协作才能完成事务操 作，这种分布式系统环境下由不同的服务之间通过网络远程协作完成事务称之为分布式事务，例如用户注册送积分事务、创建订单减库存事务，银行转账事务等都是分布式事务。

![image20220111162727304.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998761000/4544996c3b5c4c619b58e6a9dba391ab.png)

通过以上的图中我们可以看出，其实只要涉及到操作多个数据源，就可能会产生事务问题，当然在实际开发中我们要尽量避免这种问题的出现，当然如果避免不了，我们就需要进行解决，在我们的微服务系统架构中，目前比较好，比较常用的解决方案就是Seata。

## 分布式事务理论

随着互联化的蔓延，各种项目都逐渐向分布式服务做转换。如今微服务已经普遍存在，本地事务已经无法满足分布式的要求，由此分布式事务问题诞生。 分布式事务被称为世界性的难题，目前分布式事务存在两大理论依据：CAP定律 BASE理论。

### CAP定律

这个定理的内容是指的是在一个分布式系统中、Consistency（一致性）、 Availability（可用性）、Partition tolerance（分区容错性），三者不可得兼。

* 一致性（C）
  在分布式系统中的所有数据备份，在同一时刻是否同样的值。（等同于所有节点访问同一份最新的数据副本）
* 可用性（A）
  在集群中一部分节点故障后，集群整体是否还能响应客户端的读写请求。（对数据更新具备高可用性）
* 分区容错性（P）
  以实际效果而言，分区相当于对通信的时限要求。系统如果不能在时限内达成数据一致性，就意味着发生了分区的情况，必须就当前操作在C和A之间做出选择

CAP是无法同时存在的，一下通过这个例子来说明

![image20220113155408713.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998761000/89536f53b26048e18ac8a9a34ba6894d.png)

1. 当库存服务减库存以后，那么需要将数据同步到其他的服务上，这是为了保证数据一致性C，但是网络是不可靠的，所以我们系统就需要保证分区容错性P，也就是我们必须容忍网络所带来的的一些问题，此时如果我们想保证C那么就需要舍弃A，也就是说我们在保证C的情况下，就必须舍弃A，也就是CP无法保证高可用。
2. 如果为了保证A，高可用的情况下，也就是必须在限定时间内给出响应，同样由于网络不可靠P，订单服务就有可能无法拿到新的数据，但是也要给用户作出响应，那么也就无法保证C一致性。所以AP是无法保证强一致性的。
3. 如果我们想保证CA，也就是高可用和一致性，也就是必须保证网络良好才能实现，那么也就是说我们需要将库存、订单、用户放到一起，但是这种情况也就丧失了P这个保证，这个时候系统也就不是分布式系统了。
4. 总结：在分布式系统中，p是必然的存在的，所以我们只能在C和A之间进行取舍，在这种条件下就诞生了BASE理论

### BASE理论

BASE是Basically Available（基本可用）、Soft state（软状态）和 Eventually consistent（最终一致性）三个短语的缩写。BASE理论是对CAP中一致性和可用性权衡的结果，其来源于对大规模互联网系统分布式实践的总结， 是基于CAP定理逐步演化而来的。BASE理论的核心思想是：即使无法做到强一致性，但每个应用都可以根据自身业务特点，采用适当的方式来使系统达到最终一致性。

* 基本可用
  基本可用是指分布式系统在出现不可预知故障的时候，允许损失部分可用性—-注意，这绝不等价于系统不可用。比如：
  （1）响应时间上的损失。正常情况下，一个在线搜索引擎需要在0.5秒之内返回给用户相应的查询结果，但由于出现故障，查询结果的响应时间增加了1~2秒
  （2）系统功能上的损失：正常情况下，在一个电子商务网站上进行购物的时候，消费者几乎能够顺利完成每一笔订单，但是在一些节日大促购物高峰的时候，由于消费者的购物行为激增，为了保护购物系统的稳定性，部分消费者可能会被引导到一个降级页面
* 软状态
  软状态指允许系统中的数据存在中间状态，并认为该中间状态的存在不会影响系统的整体可用性，即允许系统在不同节点的数据副本之间进行数据同步的过程存在延时
* 最终一致性
  最终一致性强调的是所有的数据副本，在经过一段时间的同步之后，最终都能够达到一个一致的状态。因此，最终一致性的本质是需要系统保证最终数据能够达到一致，而不需要实时保证系统数据的强一致性。

那这个位置我们依旧可以用我们刚才的例子来进行说明

**基本可用：**保证核心服务是可以使用的，至于其他的服务可以适当的降低响应时间，甚至是服务降级

![image20220113162344531.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998761000/6e34be5dc9114b5f9a10a5b790446333.png)

**软状态：**存在中间状态，不影响整体系统使用，数据同步存在延时

![image20220113162554630.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998761000/8477ce5071124a21a3c44b61de31318c.png)

**最终一致性：**再过了流量高峰期以后，经过一段时间的同步，保持各服务数据的一致

![image20220113162813542.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998761000/e060172f628f4baaad06b8f03cc57dd6.png)





# Seata简介

## 分布式事务解决方案

2PC即两阶段提交协议，是将整个事务流程分为两个阶段，P是指准备阶段，C是指提交阶段。

1. 准备阶段（Prepare phase）
2. 提交阶段（commit phase）

举例：比如说相亲对象两个人去吃饭，店老板要求，先付钱在吃饭，这是男女双方提出了AA，也就是说只有男女双方都付钱，才能落座吃饭，但是只要两个人中有一个不同意付款就不能落座吃饭。

* 准备阶段：老板要求男方付款，男方付款。老板要求女方付款，女方付款
* 提交阶段：老板出餐，两人纷纷落座

其实此例子就形成了一个事务，如果男女双方有一个人拒绝付款，那么老板就不会出餐，并且会把已收取的钱原路退回。

整个事务过程是由事务管理器和参与者组成的，店老板就是事务管管理器，男女双发就是参与者，事务管理器决策整个分布式事务在计算机中关系数据库支持的两阶段提交协议：

* 准备阶段（Prepare phase）：事务管理器给每个参与者发送Prepare消息，每个数据库参与者在本地执行事务，并写本地的Undo/Redo日志，此时事务没有提交。
* （Undo日志是记录修改前的数据，用于数据库回滚，Redo日志是记录修改后的数据，用于提交事务后写入数据文件）
* 提交阶段（commit phase）：如果事务管理器收到了参与者的执行失败或者超时消息时，直接给每个参与者发送回滚(Rollback)消息；否则，发送提交(Commit)消息；参与者根据事务管理器的指令执行提交或者回滚操作，并释放事务处理过程中使用的资源。

具体步骤图例：

成功：

![image20220113180953684.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/9a5b66ef19a4446a8a1f3cce3730de73.png)

失败：

![image20220113181028153.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/22d602b59e6d420c83b42625d146bf29.png)

## Seata简介

官网：[https://seata.io/zh-cn/docs/overview/what-is-seata.html](https://seata.io/zh-cn/docs/overview/what-is-seata.html)

概念：Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC、SAGA 和 XA 事务模式，为用户打造一站式的分布式解决方案。

![1459421917a2d469f94c84cd28c7e46ad75683636.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/7a247a0424714a2ba4bdc43ef6ae6dd0.png)

在我们的微服务系统中，对应业务被对应的拆分成独立模块，在官方提供的架构图中，我们可以看出当前是三个服务：

* 仓储服务：对给定的商品进行增删操作记录数量
* 订单服务：根据采购者的需求创建订单
* 账户服务：从用户账户中扣除余额、积分等

在这套架构中，用户下单购买商品的业务，就需要三个服务来完成，每个服务内部的数据一致性由本地事务来保证，但是全局的数据一致性问题就没办法保证，Seata就是来进行解决这种问题的解决方案。

## Seata术语

官网地址：[https://seata.io/zh-cn/docs/overview/terminology.html](https://seata.io/zh-cn/docs/overview/terminology.html)

要了解Seata，首先我们要了解一下Seata的几个关键的概念：

* TC (Transaction Coordinator) - 事务协调者
  维护全局和分支事务的状态，驱动全局事务提交或回滚。
* TM (Transaction Manager) - 事务管理器（发起者，同时也是RM的一种）
  定义全局事务的范围：开始全局事务、提交或回滚全局事务。
* RM (Resource Manager) - 资源管理器（每个参与事务的微服务）
  管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

![image20220111191919517.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/fab8a67b90834a58b7accbb86726eea2.png)

## Seata-Server下载

官方下载地址：[https://github.com/seata/seata/releases](https://github.com/seata/seata/releases)

![image20220112191252083.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/b3f0f8ae28e44ad49c7144448f6c625a.png)

下载完成之后需要解压

![image20220112191449051.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/6e9471205cd9417c979fec4f79146437.png)

## Seata-Server配置

1. 需要打开conf目录

![image20220112192512498.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/d79c502c145f4d9e9bc1b0269d86b00a.png)

2. 先配置registry.conf配置文件，修改Seata的注册中心和配置中心为Nacos

![image20220112192010321.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/278d4105c1e8490893fe49b9c3ae5d11.png)

![image20220112192038314.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/5bfd3ee2a99e496087b69d5d8632607c.png)

```sh
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP"
    namespace = ""
    cluster = "default"
    username = ""
    password = ""
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = 0
    password = ""
    cluster = "default"
    timeout = 0
  }
  zk {
    cluster = "default"
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
  }
  consul {
    cluster = "default"
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  etcd3 {
    cluster = "default"
    serverAddr = "http://localhost:2379"
  }
  sofa {
    serverAddr = "127.0.0.1:9603"
    application = "default"
    region = "DEFAULT_ZONE"
    datacenter = "DefaultDataCenter"
    cluster = "default"
    group = "SEATA_GROUP"
    addressWaitTime = "3000"
  }
  file {
    name = "file.conf"
  }
}

config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"

  nacos {
    serverAddr = "127.0.0.1:8848"
    namespace = ""
    group = "SEATA_GROUP"
    username = ""
    password = ""
    dataId = "seataServer.properties"
  }
  consul {
    serverAddr = "127.0.0.1:8500"
    aclToken = ""
  }
  apollo {
    appId = "seata-server"
    ## apolloConfigService will cover apolloMeta
    apolloMeta = "http://192.168.1.204:8801"
    apolloConfigService = "http://192.168.1.204:8080"
    namespace = "application"
    apolloAccesskeySecret = ""
    cluster = "seata"
  }
  zk {
    serverAddr = "127.0.0.1:2181"
    sessionTimeout = 6000
    connectTimeout = 2000
    username = ""
    password = ""
    nodePath = "/seata/seata.properties"
  }
  etcd3 {
    serverAddr = "http://localhost:2379"
  }
  file {
    name = "file.conf"
  }
}
```

3. 接着我们需要修改Seata的存储模式，修改file.conf文件，把Seata的默认存储模式修改为数据库"DB"，同时需要配置JDBC

![image20220112192451611.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/6b91ce75509148978c15ac2f3118be5d.png)

![image20220112192620774.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/827ac59ad07a46f790b90a40fdf12e4c.png)

![image20220112193120164.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/69d55657feeb4093b1b629a3118aec2e.png)

```
## transaction log store, only used in seata-server
store {
  ## store mode: file、db、redis
  mode = "db"
  ## rsa decryption public key
  publicKey = ""
  ## file store property
  file {
    ## store location dir
    dir = "sessionStore"
    # branch session size , if exceeded first try compress lockkey, still exceeded throws exceptions
    maxBranchSessionSize = 16384
    # globe session size , if exceeded throws exceptions
    maxGlobalSessionSize = 512
    # file buffer size , if exceeded allocate new buffer
    fileWriteBufferCacheSize = 16384
    # when recover batch read size
    sessionReloadReadSize = 100
    # async, sync
    flushDiskMode = async
  }

  ## database store property
  db {
    ## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp)/HikariDataSource(hikari) etc.
    datasource = "druid"
    ## mysql/oracle/postgresql/h2/oceanbase etc.
    dbType = "mysql"
    driverClassName = "com.mysql.jdbc.Driver"
    ## if using mysql to store the data, recommend add rewriteBatchedStatements=true in jdbc connection param
    url = "jdbc:mysql://localhost:3306/seata?useUnicode=true&characterEncoding=UTF-8"
    user = "root"
    password = "root"
    minConn = 5
    maxConn = 100
    globalTable = "global_table"
    branchTable = "branch_table"
    lockTable = "lock_table"
    queryLimit = 100
    maxWait = 5000
  }

  ## redis store property
  redis {
    ## redis mode: single、sentinel
    mode = "single"
    ## single mode property
    single {
      host = "127.0.0.1"
      port = "6379"
    }
    ## sentinel mode property
    sentinel {
      masterName = ""
      ## such as "10.28.235.65:26379,10.28.235.65:26380,10.28.235.65:26381"
      sentinelHosts = ""
    }
    password = ""
    database = "0"
    minConn = 1
    maxConn = 10
    maxTotal = 100
    queryLimit = 100
  }
}

```

## 启动

启动步骤为，先启动nacos然后在启动Seata-Server

启动Seata-Server的方式非常简单，直接双击此文件即可:seata-server-1.4.2\bin\seata-server.bat

![image20220112193257424.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/20f23172834f4a10b2bd93fa5386f0c9.png)

启动完成效果

![image20220112193410847.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/d008d69fc45645e788d4aedd879091ce.png)

然后在nacos控制台上就可以看到Seata-Server

![image20220112193500935.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1641998834000/382313d0fd6f43c19f9d7d4b23d321b5.png)

## Seata Server（TC）环境搭建详解

Server端存储模式（store.mode）支持三种：

1. file：单机模式，全局事务会话信息内存中读写并持久化本地文件root.data，性能较高（默认）
2. DB：高可用模式，全局事务会话信息通过DB共享，相对性能差一些
3. redis：Seata-Server1.3及以上版本支持，性能较高，存在事务信息丢失风险，需要配合实际场景使用。

## 具体操作

1. 修改Seata-Server模式为DB高可用模式

![image20220118173041657.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642518497000/9dbad8c2dacf488488e655535ccbc0d8.png)

找到以下对应的db配置，要修改其中的jdbc连接，以及要注意其中涉及到了三个表，分别是global_table，branch_table，lock_table分别是全局事务会话表，分支事务会话表，锁数据表；

![image20220118231142489.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642518497000/bcbeb0859cbd498c95f516e983292c58.png)

2. 建表语句地址：[https://github.com/seata/seata/blob/develop/script/server/db/mysql.sql](https://github.com/seata/seata/blob/develop/script/server/db/mysql.sql)

```sql
-- the table to store GlobalSession data
CREATE TABLE IF NOT EXISTS `global_table`
(
    `xid`                       VARCHAR(128) NOT NULL,
    `transaction_id`            BIGINT,
    `status`                    TINYINT      NOT NULL,
    `application_id`            VARCHAR(32),
    `transaction_service_group` VARCHAR(32),
    `transaction_name`          VARCHAR(128),
    `timeout`                   INT,
    `begin_time`                BIGINT,
    `application_data`          VARCHAR(2000),
    `gmt_create`                DATETIME,
    `gmt_modified`              DATETIME,
    PRIMARY KEY (`xid`),
    KEY `idx_gmt_modified_status` (`gmt_modified`, `status`),
    KEY `idx_transaction_id` (`transaction_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store BranchSession data
CREATE TABLE IF NOT EXISTS `branch_table`
(
    `branch_id`         BIGINT       NOT NULL,
    `xid`               VARCHAR(128) NOT NULL,
    `transaction_id`    BIGINT,
    `resource_group_id` VARCHAR(32),
    `resource_id`       VARCHAR(256),
    `branch_type`       VARCHAR(8),
    `status`            TINYINT,
    `client_id`         VARCHAR(64),
    `application_data`  VARCHAR(2000),
    `gmt_create`        DATETIME(6),
    `gmt_modified`      DATETIME(6),
    PRIMARY KEY (`branch_id`),
    KEY `idx_xid` (`xid`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

-- the table to store lock data
CREATE TABLE IF NOT EXISTS `lock_table`
(
    `row_key`        VARCHAR(128) NOT NULL,
    `xid`            VARCHAR(128),
    `transaction_id` BIGINT,
    `branch_id`      BIGINT       NOT NULL,
    `resource_id`    VARCHAR(256),
    `table_name`     VARCHAR(32),
    `pk`             VARCHAR(36),
    `status`         TINYINT      NOT NULL DEFAULT '0' COMMENT '0:locked ,1:rollbacking',
    `gmt_create`     DATETIME,
    `gmt_modified`   DATETIME,
    PRIMARY KEY (`row_key`),
    KEY `idx_status` (`status`),
    KEY `idx_branch_id` (`branch_id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
```

3. 重启Seata即可生效。





# Seata配置Nacos注册中心和配置中心

Seata支持注册服务到Nacos，以及支持Seata所有配置放到Nacos配置中心，在Nacos中统一维护；

高可用模式下就需要配合Nacos来完成

![image20220118234555417.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642524267000/a556e2af96964faea8dc93380cf52c83.png)

## 具体配置如下

### 注册中心

Seata-server端配置注册中心，在registry.conf中加入配置注册中心nacos
**注意：确保client与server的注册处于同一个namespace和group，不然会找不到服务。**

```sh
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"

  nacos {
    application = "seata-server"
    serverAddr = "127.0.0.1:8848"
    group = "SEATA_GROUP" # 这里的配置要和客户端保持一致
    namespace = "" # 这里的配置要和客户端保持一致
    cluster = "default"
    username = "nacos"
    password = "nacos"
  }
    ......
```

### 配置中心

1. Seata-server端配置配置中心，在registry.conf中加入配置使用nacos作为配置中心

```sh
config {
  # file、nacos 、apollo、zk、consul、etcd3
  type = "nacos"

  nacos {
    serverAddr = "127.0.0.1:8848"
    namespace = ""
    group = "SEATA_GROUP"
    username = "nacos"
    password = ""
    dataId = "seataServer.properties"
  }
............
```

2. 我们需要把Seata的一些配置上传到Nacos中，配置比较多，所以官方给我们提供了一个config.txt，我们下载并且修改其中参数，上传到Nacos中
   下载地址：[https://github.com/seata/seata/tree/develop/script/config-center](https://github.com/seata/seata/tree/develop/script/config-center)

```sh
#For details about configuration items, see https://seata.io/zh-cn/docs/user/configurations.html
#Transport configuration, for client and server
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableTmClientBatchSendRequest=false
transport.enableRmClientBatchSendRequest=true
transport.enableTcServerBatchSendResponse=false
transport.rpcRmRequestTimeout=30000
transport.rpcTmRequestTimeout=30000
transport.rpcTcRequestTimeout=30000
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
transport.shutdown.wait=3
transport.serialization=seata
transport.compressor=none

#Transaction routing rules configuration, only for the client
service.vgroupMapping.default_tx_group=default
#If you use a registry, you can ignore it
service.default.grouplist=127.0.0.1:8091
service.enableDegrade=false
service.disableGlobalTransaction=false

#Transaction rule configuration, only for the client
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=true
client.rm.tableMetaCheckerInterval=60000
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
client.rm.sagaJsonParser=fastjson
client.rm.tccActionInterceptorOrder=-2147482648
client.tm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000
client.tm.interceptorOrder=-2147482648
client.undo.dataValidation=true
client.undo.logSerialization=jackson
client.undo.onlyCareUpdateColumns=true
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000
client.undo.logTable=undo_log
client.undo.compress.enable=true
client.undo.compress.type=zip
client.undo.compress.threshold=64k
#For TCC transaction mode
tcc.fence.logTableName=tcc_fence_log
tcc.fence.cleanPeriod=1h

#Log rule configuration, for client and server
log.exceptionRate=100

#Transaction storage configuration, only for the server. The file, DB, and redis configuration values are optional.
store.mode=file
store.lock.mode=file
store.session.mode=file
#Used for password encryption
store.publicKey=

#If `store.mode,store.lock.mode,store.session.mode` are not equal to `file`, you can remove the configuration block.
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
store.file.maxGlobalSessionSize=512
store.file.fileWriteBufferCacheSize=16384
store.file.flushDiskMode=async
store.file.sessionReloadReadSize=100

#These configurations are required if the `store mode` is `db`. If `store.mode,store.lock.mode,store.session.mode` are not equal to `db`, you can remove the configuration block.
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=username
store.db.password=password
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.distributedLockTable=distributed_lock
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000

#These configurations are required if the `store mode` is `redis`. If `store.mode,store.lock.mode,store.session.mode` are not equal to `redis`, you can remove the configuration block.
store.redis.mode=single
store.redis.single.host=127.0.0.1
store.redis.single.port=6379
store.redis.sentinel.masterName=
store.redis.sentinel.sentinelHosts=
store.redis.maxConn=10
store.redis.minConn=1
store.redis.maxTotal=100
store.redis.database=0
store.redis.password=
store.redis.queryLimit=100

#Transaction rule configuration, only for the server
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
server.distributedLockExpireTime=10000
server.xaerNotaRetryTimeout=60000
server.session.branchAsyncQueueSize=5000
server.session.enableBranchAsyncRemove=false
server.enableParallelRequestHandle=false

#Metrics configuration, only for the server
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
```

2. 具体修改：
3. 注意：事务分组：用于防护机房停电，来启用备用机房，或者异地机房，容错机制，当然如果Seata-Server配置了对应的事务分组，Client也需要配置相同的事务分组
4. service.vgroupMapping.可以自定义=default
   default这里必须等于 registry.config 中的cluster="default"(当然可以更改 )

```properties
transport.type=TCP
transport.server=NIO
transport.heartbeat=true
transport.enableTmClientBatchSendRequest=false
transport.enableRmClientBatchSendRequest=true
transport.rpcRmRequestTimeout=5000
transport.rpcTmRequestTimeout=10000
transport.rpcTcRequestTimeout=10000
transport.threadFactory.bossThreadPrefix=NettyBoss
transport.threadFactory.workerThreadPrefix=NettyServerNIOWorker
transport.threadFactory.serverExecutorThreadPrefix=NettyServerBizHandler
transport.threadFactory.shareBossWorker=false
transport.threadFactory.clientSelectorThreadPrefix=NettyClientSelector
transport.threadFactory.clientSelectorThreadSize=1
transport.threadFactory.clientWorkerThreadPrefix=NettyClientWorkerThread
transport.threadFactory.bossThreadSize=1
transport.threadFactory.workerThreadSize=default
#-------------修改这个区域的映射--------------    
transport.shutdown.wait=3
service.vgroupMapping.mygroup=default # 事务分组
service.default.grouplist=127.0.0.1:8091
service.enableDegrade=false
service.disableGlobalTransaction=false
#------------------------------------------    
client.rm.asyncCommitBufferLimit=10000
client.rm.lock.retryInterval=10
client.rm.lock.retryTimes=30
client.rm.lock.retryPolicyBranchRollbackOnConflict=true
client.rm.reportRetryCount=5
client.rm.tableMetaCheckEnable=false
client.rm.tableMetaCheckerInterval=60000
client.rm.sqlParserType=druid
client.rm.reportSuccessEnable=false
client.rm.sagaBranchRegisterEnable=false
client.rm.sagaJsonParser=fastjson
client.rm.tccActionInterceptorOrder=-2147482648
client.tm.commitRetryCount=5
client.tm.rollbackRetryCount=5
client.tm.defaultGlobalTransactionTimeout=60000
client.tm.degradeCheck=false
client.tm.degradeCheckAllowTimes=10
client.tm.degradeCheckPeriod=2000
client.tm.interceptorOrder=-2147482648
store.mode=db # 修改
store.lock.mode=file
store.session.mode=file
store.publicKey=
store.file.dir=file_store/data
store.file.maxBranchSessionSize=16384
store.file.maxGlobalSessionSize=512
store.file.fileWriteBufferCacheSize=16384
store.file.flushDiskMode=async
store.file.sessionReloadReadSize=100
#-----------修改这个区域的JDBC连接-----------    
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.jdbc.Driver
store.db.url=jdbc:mysql://127.0.0.1:3306/seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=root
store.db.password=root
store.db.minConn=5
store.db.maxConn=30
#------------------------------------------    
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.distributedLockTable=distributed_lock
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000
store.redis.mode=single
store.redis.single.host=127.0.0.1
store.redis.single.port=6379
store.redis.sentinel.masterName=
store.redis.sentinel.sentinelHosts=
store.redis.maxConn=10
store.redis.minConn=1
store.redis.maxTotal=100
store.redis.database=0
store.redis.password=
store.redis.queryLimit=100
server.recovery.committingRetryPeriod=1000
server.recovery.asynCommittingRetryPeriod=1000
server.recovery.rollbackingRetryPeriod=1000
server.recovery.timeoutRetryPeriod=1000
server.maxCommitRetryTimeout=-1
server.maxRollbackRetryTimeout=-1
server.rollbackRetryTimeoutUnlockEnable=false
server.distributedLockExpireTime=10000
client.undo.dataValidation=true
client.undo.logSerialization=jackson
client.undo.onlyCareUpdateColumns=true
server.undo.logSaveDays=7
server.undo.logDeletePeriod=86400000
client.undo.logTable=undo_log
client.undo.compress.enable=true
client.undo.compress.type=zip
client.undo.compress.threshold=64k
log.exceptionRate=100
transport.serialization=seata
transport.compressor=none
metrics.enabled=false
metrics.registryType=compact
metrics.exporterList=prometheus
metrics.exporterPrometheusPort=9898
tcc.fence.logTableName=tcc_fence_log
tcc.fence.cleanPeriod=1h
```

4. 修改好这个文件以后，我们就需要把这个文件放到seata目录下

![image20220118195227875.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642524267000/1fb303b3c9574b1e94cce1b743825e0a.png)

5. 此时我们需要把这些配置一个个的加入到Nacos配置中，所以我们需要一个脚本来进行执行，官方已经提供好了，地址为：[https://github.com/seata/seata/blob/develop/script/config-center/nacos/nacos-config.sh](https://github.com/seata/seata/blob/develop/script/config-center/nacos/nacos-config.sh)

6. 我们需要在seata-server-1.4.2文件夹中新建一个脚本文件nacos-config.sh，然后把脚本内容复制进去

![image20220118200307770.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642524267000/5107e37cec114e27a22b1c8c1f226d85.png)

7. 利用git来进行执行命令：

```sh
sh nacos-config.sh -h localhost -p 8848 -g SEATA_GROUP -t 命名空间 -u nacos -w nacos
```

参数说明：

-h：host，默认值localhost

-p：port，默认值8848

-g：配置分组，默认为SEATA_GROUP

-t：租户信息，对应Nacos的命名空间ID，默认为空

![image20220118200423603.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642524267000/c08136f3e6184b7b88e83d15f733f3d0.png)

8. 在执行naocs-config文件的时候要注意，它默认寻找config.txt的路径和我们的路径不同，所以要打开naocs-config文件进行修改，否则无法执行。

![image20220119002450133.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642524267000/3f11434b59fb4356bb59f0b3919db51d.png)

### 测试启动

当以上的这些配置完成以后，我们就可以启动nacos和seata-server了，此时我们查看Nacos的配置中心，就会看到我们传入的所有配置信息

![image20220119003324612.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642524267000/800a9a0540244f079f86be63505f153f.png)

## 附加

各位我们Seata-Server默认端口是8091，那么如果我们是集群部署方式，我们如何修改端口那？

在 Linux/Mac 下

```
  sh ./bin/seata-server.sh
```

在 Windows 下

```
bin\seata-server.bat
```

### 支持的启动参数

| 参数 | 全写         | 作用                       | 备注                                                         |
| ---- | ------------ | -------------------------- | ------------------------------------------------------------ |
| -h   | --host       | 指定在注册中心注册的 IP    | 不指定时获取当前的 IP，外部访问部署在云环境和容器中的 server 建议指定 |
| -p   | --port       | 指定 server 启动的端口     | 默认为 8091                                                  |
| -m   | --storeMode  | 事务日志存储方式           | 支持 `file`,`db`,`redis`，默认为 `file` 注:redis需seata-server 1.3版本及以上 |
| -n   | --serverNode | 用于指定seata-server节点ID | 如 `1`,`2`,`3`..., 默认为 `1`                                |
| -e   | --seataEnv   | 指定 seata-server 运行环境 | 如 `dev`, `test` 等, 服务启动时会使用 `registry-dev.conf` 这样的配置 |

如：

```
 sh ./bin/seata-server.sh -p 8091 -h 127.0.0.1 -m file
```

# Seata-AT模式

概念：AT模式是一种无侵入的分布式事务解决方案，在 AT 模式下，用户只需关注自己的“业务 SQL”，用户的 “业务 SQL” 作为一阶段，Seata 框架会自动生成事务的二阶段提交和回滚操作。

## 整体机制

两阶段提交协议的演变：

* 一阶段：业务数据和回滚日志记录在同一个本地事务中提交，释放本地锁和连接资源。
* 二阶段：
  * 提交异步化，非常快速地完成。
  * 回滚通过一阶段的回滚日志进行反向补偿。

### 一阶段

在一阶段中，Seata会拦截“业务SQL“，首先解析SQL语义，找到要更新的业务数据，在数据被更新前，保存下来"undo"，然后执行”业务SQL“更新数据，更新之后再次保存数据”redo“，最后生成行锁，这些操作都在本地数据库事务内完成，这样保证了一阶段的原子性。

### 二阶段

相对一阶段，二阶段比较简单，负责整体的回滚和提交，如果之前的一阶段中有本地事务没有通过，那么就执行全局回滚，否在执行全局提交，回滚用到的就是一阶段记录的"undo Log"，通过回滚记录生成反向更新SQL并执行，以完成分支的回滚。当然事务完成后会释放所有资源和删除所有日志。

### 具体图解

![image20220118161225488.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/c5cda1c2014d4581a93ed75f26d234ab.png)

## 案例

1. 首先设计两个服务，一个订单order8801 一个库存stock8802
2. stock库存表为：![image20220117223403744.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/aaa39d7694324cce9deef2c10fdbf132.png)
3. order订单表为：![image20220117223340923.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/915363f21d474f04a63b0451955923ae.png)
4. 订单服务通过OpenFegin远程调用库存服务，然后库存服务减库存，订单服务生成订单，完成基本的调用以后我们给订单服务添加异常

```java
@Service
public class OrderServiceImpl implements OrderService {
    @Resource
    private OrderMapper orderMapper;

    @Resource
    private StockClient stockClient;

    @Override
    public void create() {
        // 减库存
        stockClient.decrement();

        // 添加异常
        int i = 1/0;

        // 创建订单
        orderMapper.create();
    }
}
```

5. 此时我们会发现访问接口出现异常情况，但是库存减少，订单没有增加此时已经出现了分布式事务的问题

![image20220117223455391.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/eecbf65494df46029c548c29159d4318.png)

订单表，没有增加数据

![image20220117223513706.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/56d1870baf4e4f7aa4120fad0513adae.png)

### 通过Seata的AT模式解决分布式事务

1. 首先增加对应的Seata依赖

```
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
    </dependency>
```

2. 在对应的微服务数据库上加上undo_log表，此表用于数据的回滚

```sql
DROP TABLE IF EXISTS `undo_log`;
CREATE TABLE `undo_log`  (
  `branch_id` bigint(20) NOT NULL COMMENT '分支事务ID',
  `xid` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '全局事务ID',
  `context` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '上下文',
  `rollback_info` longblob NOT NULL COMMENT '回滚信息',
  `log_status` int(11) NOT NULL COMMENT '状态，0正常，1全局已完成',
  `log_created` datetime(6) NOT NULL COMMENT '创建时间',
  `log_modified` datetime(6) NOT NULL COMMENT '修改时间',
  UNIQUE INDEX `ux_undo_log`(`xid`, `branch_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = 'AT transaction mode undo table' ROW_FORMAT = Compact;
```



![image20220117225203163.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/354464b4880e4d9e87fde0c8ab535963.png)

3. 配置yml（8801和8802Seata的配置保持一致）

```yml
server:
  port: 8802
spring:
  application:
    name: stock
  cloud:
    nacos:
      discovery:
        server-addr: localhost
  datasource:
    druid:
      driver-class-name: com.mysql.jdbc.Driver
      url:  jdbc:mysql://localhost:3306/test_at?characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
      username: root
      password: root

seata:
  tx-service-group: mygroup # 事务组名称，要和服务端对应
  service:
    vgroup-mapping:
       mygroup: default # key是事务组名称 value要和服务端的机房名称保持一致

```

4. 需要在order8801(TM)的Controller上添加注解

```java
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/order/create")
    @GlobalTransactional// 开启分布式事务
    public String create(){
        orderService.create();
        return "生成订单";
    }
}
```

5. 把8801和8802都跑起来，当然Nacos和Seata都要进行启动，这个时候我们进行访问Order的REST接口：[http://localhost:8801/order/create](http://localhost:8801/order/create)，我们就会发现此时已经解决了分布式事务问题
   库存没有减少
   订单也没有增加

![image20220118162757573.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/b6abca237f9547369db5e84d1e932e17.png)

![image20220118162832649.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/2f7c4ee907454b448d51cb90d0f1f7ad.png)

6. 那么为了验证undo_log表用于存储回滚的数据，我们在OrderServiceImpl上异常位置添加断点，同时以debug方式来启动8801订单服务

```
@Service
public class OrderServiceImpl implements OrderService {
    @Resource
    private OrderMapper orderMapper;

    @Resource
    private StockClient stockClient;

    @Override
    public void create() {
        // 减库存
        stockClient.decrement();

        // 添加异常
        int i = 1/0;// 此处添加断点

        // 创建订单
        orderMapper.create();
    }
}
```

7. 然后访问接口：[http://localhost:8801/order/create](http://localhost:8801/order/create)，程序会卡在断点上，此时我们来查看undo_log表和库存表，此时我们会发现，库存确实减少了，但是在undo_log表中出现了快照记录了当前修改前的数据，这个数据就是用于回滚的数据
   库存减少

![image20220118163714002.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/27a1b4bcde974baca7dba1df62f44f37.png)

```
	undo_log表记录快照
```

![image20220118163908365.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/bcf9f44d96864f58aef8d42726e2a811.png)

```
	放行以后，库存数量回复，回滚生效
```

![image20220118164019307.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1642764224000/4ef168339c6949b39b5f63bc2042ad81.png)

8. 此时我们就验证了AT事务的执行过程。

# Seata-XA模式

Seata 1.2.0 版本重磅发布新的事务模式：XA 模式，实现对 XA 协议的支持。

我们从三个方面来深入分析：

1. XA模式是什么？
2. 为什么支持XA？
3. XA模式如何实现的，以及如何使用？

## XA模式

首先我们需要先了解一下什么是XA？

XA 规范早在上世纪 90 年代初就被提出，用以解决分布式事务处理这个领域的问题。

注意：不存在某一种分布式事务机制可以完美适应所有场景，满足所有需求。

现在，无论 AT 模式、TCC 模式还是 Saga 模式，这些模式的提出，本质上都源自 XA 规范对某些场景需求的无法满足。

### 什么是XA协议

XA 规范 是 X/Open 组织定义的分布式事务处理（DTP，Distributed Transaction Processing）标准

XA 规范 描述了全局的事务管理器与局部的资源管理器之间的接口。 XA规范 的目的是允许的多个资源（如数据库，应用服务器，消息队列等）在同一事务中访问，这样可以使 ACID 属性跨越应用程序而保持有效。

XA 规范 使用两阶段提交（2PC，Two-Phase Commit）来保证所有资源同时提交或回滚任何特定的事务。

XA 规范 在上世纪 90 年代初就被提出。目前，几乎所有主流的数据库都对 XA 规范 提供了支持。

DTP模型定义如下角色：

* AP：即应用程序，可以理解为使用DTP分布式事务的程序
* RM：资源管理器，可以理解为事务的参与者，一般情况下是指一个数据库的实例（MySql），通过资源管理器对该数据库进行控制，资源管理器控制着分支事务
* TM：事务管理器，负责协调和管理事务，事务管理器控制着全局事务，管理实务生命周期，并协调各个RM。全局事务是指分布式事务处理环境中，需要操作多个数据库共同完成一个工作，这个工作即是一个全局事务。
* DTP模式定义TM和RM之间通讯的接口规范叫XA，简单理解为数据库提供的2PC接口协议，基于数据库的XA协议来实现的2PC又称为XA方案。

![20200722160231749.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/081cd4e8c4584620834469d663701fc2.png)

案例解释：

1. 应用程序（AP）持有订单库和商品库两个数据源。
2. 应用程序（AP）通过TM通知订单库（RM）和商品库（RM），来创建订单和减库存，RM此时未提交事务，此时商品和订单资源锁定。
3. TM收到执行回复，只要有一方失败则分别向其他RM发送回滚事务，回滚完毕，资源锁释放。
4. TM收到执行回复，全部成功，此时向所有的RM发起提交事务，提交完毕，资源锁释放。

![image20220209173222316.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/04a567aca96a410ea7f1fa0e8eba955b.png)

#### XA协议的痛点

如果一个参与全局事务的资源 “失联” 了（收不到分支事务结束的命令），那么它锁定的数据，将一直被锁定。进而，甚至可能因此产生死锁。

这是 XA 协议的核心痛点，也是 Seata 引入 XA 模式要重点解决的问题。

### Seata的事务模式

Seata 定义了全局事务的框架。

全局事务 定义为若干 分支事务 的整体协调：

1. TM 向 TC 请求发起（Begin）、提交（Commit）、回滚（Rollback）全局事务。
2. TM 把代表全局事务的 XID 绑定到分支事务上。
3. RM 向 TC 注册，把分支事务关联到 XID 代表的全局事务中。
4. RM 把分支事务的执行结果上报给 TC。（可选）
5. TC 发送分支提交（Branch Commit）或分支回滚（Branch Rollback）命令给 RM。

![TB19qmhOrY1gK0jSZTEXXXDQVXa1330924.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/7c9541b4dfc4450d84714078137081d3.png)

Seata 的 全局事务 处理过程，分为两个阶段：

* 执行阶段 ：执行分支事务，并保证执行结果满足是*可回滚的（Rollbackable）* 和*持久化的（Durable）*。
* 完成阶段： 根据 执行阶段 结果形成的决议，应用通过 TM 发出的全局提交或回滚的请求给 TC，TC 命令 RM 驱动 分支事务 进行 Commit 或 Rollback。

Seata 的所谓事务模式是指：运行在 Seata 全局事务框架下的 分支事务 的行为模式。准确地讲，应该叫作 分支事务模式。

不同的 事务模式 区别在于 分支事务 使用不同的方式达到全局事务两个阶段的目标。即，回答以下两个问题：

* 执行阶段 ：如何执行并 保证 执行结果满足是*可回滚的（Rollbackable）* 和*持久化的（Durable）*。
* 完成阶段： 收到 TC 的命令后，如何做到分支的提交或回滚？

我们以AT模式举例：

![TB1NTuzOBr0gK0jSZFnXXbRRXXa1330924.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/2f29d8621f98463db0101f6f3e1c9a35.png)

* 执行阶段：
  * 可回滚：根据 SQL 解析结果，记录回滚日志
  * 持久化：回滚日志和业务 SQL 在同一个本地事务中提交到数据库
* 完成阶段：
  * 分支提交：异步删除回滚日志记录
  * 分支回滚：依据回滚日志进行反向补偿更新

## Seata的XA模式

XA模式：

在 Seata 定义的分布式事务框架内，利用事务资源（数据库、消息服务等）对 XA 协议的支持，以 XA 协议的机制来管理分支事务的一种 事务模式。

![TB1hSpccIVl614jSZKPXXaGjpXa1330924.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/a4e733baeb4641efa9f81139d9eb9ef2.png)

* 执行阶段：
  * 可回滚：业务 SQL 操作放在 XA 分支中进行，由资源对 XA 协议的支持来保证 可回滚
  * 持久化：XA 分支完成后，执行 XA prepare，同样，由资源对 XA 协议的支持来保证*持久化*（即，之后任何意外都不会造成无法回滚的情况）
* 完成阶段：
  * 分支提交：执行 XA 分支的 commit
  * 分支回滚：执行 XA 分支的 rollback

### 为什么要在Seata中支持XA

为什么要在 Seata 中增加 XA 模式呢？支持 XA 的意义在哪里呢？

本质上，Seata 已经支持的 3 大事务模式：AT、TCC、Saga 都是 补偿型 的。

补偿型 事务处理机制构建在 事务资源 之上（要么在中间件层面，要么在应用层面），事务资源 本身对分布式事务是无感知的。

事务资源 对分布式事务的无感知存在一个根本性的问题：无法做到真正的 全局一致性 。

比如，一条库存记录，处在 补偿型 事务处理过程中，由 100 扣减为 50。此时，仓库管理员连接数据库，查询统计库存，就看到当前的 50。之后，事务因为异外回滚，库存会被补偿回滚为 100。显然，仓库管理员查询统计到的 50 就是 脏 数据。所以补偿型事务是存在中间状态的（中途可能读到脏数据）

### XA的价值

与 补偿型 不同，XA 协议 要求 事务资源 本身提供对规范和协议的支持。

因为 事务资源 感知并参与分布式事务处理过程，所以 事务资源（如数据库）可以保障从任意视角对数据的访问有效隔离，满足全局数据一致性。

比如，刚才提到的库存更新场景，XA 事务处理过程中，中间状态数据库存 50 由数据库本身保证，是不会仓库管理员的查询统计看到的。

除了 全局一致性 这个根本性的价值外，支持 XA 还有如下几个方面的好处：

1. 业务无侵入：和 AT 一样，XA 模式将是业务无侵入的，不给应用设计和开发带来额外负担。
2. 数据库的支持广泛：XA 协议被主流关系型数据库广泛支持，不需要额外的适配即可使用。
3. 多语言支持容易：因为不涉及 SQL 解析，XA 模式对 Seata 的 RM 的要求比较少。
4. 传统基于 XA 应用的迁移：传统的，基于 XA 协议的应用，迁移到 Seata 平台，使用 XA 模式将更平滑。

## XA模式的使用

我们从官方案例入手，具体的官方案例下载地址：[https://github.com/seata/seata-samples](https://github.com/seata/seata-samples)

官方案例演示图：

![image20220211150003482.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/7bc365555cce40bab992c3fc20d21d23.png)

案例解析：

![image20220211155757596.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/f80ebac36f754d3f9602c19ffbb0d707.png)

整体运行机制：

![TB19qmhOrY1gK0jSZTEXXXDQVXa1330924.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/c8387eae75ad4db0b7e4065d924b4c5a.png)

## 总结

在当前的技术发展阶段，不存一个分布式事务处理机制可以完美满足所有场景的需求。

一致性、可靠性、易用性、性能等诸多方面的系统设计约束，需要用不同的事务处理机制去满足。

Seata 项目最核心的价值在于：构建一个全面解决分布式事务问题的 标准化 平台。

基于 Seata，上层应用架构可以根据实际场景的需求，灵活选择合适的分布式事务解决方案。

![TB1lTSoOqL7gK0jSZFBXXXZZpXa1028528.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422177000/84f6e8e625c64f608ffa72ecf1f28f57.png)

XA 模式的加入，补齐了 Seata 在 全局一致性 场景下的缺口，形成 AT、TCC、Saga、XA 四大 事务模式 的版图，基本可以满足所有场景的分布式事务处理诉求。

# TCC事务模式

首先我们先来了解常规的TCC模式。

### 什么是TCC

TCC 是分布式事务中的二阶段提交协议，它的全称为 Try-Confirm-Cancel，即资源预留（Try）、确认操作（Confirm）、取消操作（Cancel），他们的具体含义如下：

1. Try：对业务资源的检查并预留；
2. Confirm：对业务处理进行提交，即 commit 操作，只要 Try 成功，那么该步骤一定成功；
3. Cancel：对业务处理进行取消，即回滚操作，该步骤回对 Try 预留的资源进行释放。

TCC 是一种侵入式的分布式事务解决方案，以上三个操作都需要业务系统自行实现，对业务系统有着非常大的入侵性，设计相对复杂，但优点是 TCC 完全不依赖数据库，能够实现跨数据库、跨应用资源管理，对这些不同数据访问通过侵入式的编码方式实现一个原子操作，更好地解决了在各种复杂业务场景下的分布式事务问题。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422117000/85e3fca01b714c99952ca6a06be2dc23.png)

### Seata的TCC模式

Seata TCC 模式跟通用型 TCC 模式原理一致。

### TCC和AT区别

AT 模式基于 **支持本地 ACID 事务** 的 **关系型数据库**：

* 一阶段 prepare 行为：在本地事务中，一并提交业务数据更新和相应回滚日志记录。
* 二阶段 commit 行为：马上成功结束，**自动** 异步批量清理回滚日志。
* 二阶段 rollback 行为：通过回滚日志，**自动** 生成补偿操作，完成数据回滚。

相应的，TCC 模式，不依赖于底层数据资源的事务支持：

* 一阶段 prepare 行为：调用**自定义** 的 prepare 逻辑。
* 二阶段 commit 行为：调用**自定义** 的 commit 逻辑。
* 二阶段 rollback 行为：调用**自定义** 的 rollback 逻辑。

所谓 TCC 模式，是指支持把 **自定义** 的分支事务纳入到全局事务的管理中。

![seata_tcc11644422133604.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422117000/94034492f123410197b33cd2c3573a1d.png)

## 特点：

1. 侵入性比较强，并且需要自己实现相关事务控制逻辑
2. 在整个过程基本没有锁，性能较强

## 详细讲解

![image20220125210417709.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644422117000/c01ba87b261645f5ae99b4925e1c6fd3.png)

具体使用案例：[https://seata.io/zh-cn/blog/integrate-seata-tcc-mode-with-spring-cloud.html](https://seata.io/zh-cn/blog/integrate-seata-tcc-mode-with-spring-cloud.html)

# Seata中的Saga事务模式

### 基本概念

Saga模式是SEATA提供的长事务解决方案，在Saga模式中，业务流程中每个参与者都提交本地事务，当出现某一个参与者失败则补偿前面已经成功的参与者，一阶段正向服务和二阶段补偿服务（执行处理时候出错了，给一个修复的机会）都由业务开发实现。

![TB1Y2kuw7T2gK0jSZFkXXcIQFXa445444.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644919973000/659fd4a073484f5888e3c3d7ee635e48.png)

Saga 模式下分布式事务通常是由事件驱动的，各个参与者之间是异步执行的，Saga 模式是一种长事务解决方案。

### 为什么需要Saga

之前我们学习的Seata分布式三种操作模型中所使用的的微服务全部可以根据开发者的需求进行修改，但是在一些特殊环境下，比如老系统，封闭的系统（无法修改，同时没有任何分布式事务引入），那么AT、XA、TCC模型将全部不能使用，为了解决这样的问题，才引用了Saga模型。

比如：事务参与者可能是其他公司的服务或者是遗留系统，无法改造，可以使用Saga模式。

![image20220215170345079.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644919973000/05d2c07b91dd46a4baa498f4e3f3d49e.png)

Saga模式是Seata提供的长事务解决方案，提供了**异构系统的事务统一处理模型**。在Saga模式中，所有的子业务都不在直接参与整体事务的处理（只负责本地事务的处理），而是全部交由了最终调用端来负责实现，而在进行总业务逻辑处理时，在某一个子业务出现问题时，则自动补偿全面已经成功的其他参与者，这样一阶段的正向服务调用和二阶段的服务补偿处理全部由总业务开发实现。

![Saga.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644919973000/cd988d659148427fbb3b5dafa1c12782.png)

### Saga状态机

目前Seata提供的Saga模式只能通过状态机引擎来实现，需要开发者手工的进行Saga业务流程绘制，并且将其转换为Json配置文件，而后在程序运行时，将依据子配置文件实现业务处理以及服务补偿处理，而要想进行Saga状态图的绘制，一般需要通过Saga状态机来实现。

基本原理：

* 通过状态图来定义服务调用的流程并生成json定义文件
* 状态图中一个节点可以调用一个服务，节点可以配置它的补偿节点
* 状态图 json 由状态机引擎驱动执行，当出现异常时状态引擎反向执行已成功节点对应的补偿节点将事务回滚
* 可以实现服务编排需求，支持单项选择、并发、子流程、参数转换、参数映射、服务执行状态判断、异常捕获等功能

![](file://E:/%E9%A9%AC%E5%A3%AB%E5%85%B5/%E5%BE%AE%E6%9C%8D%E5%8A%A1%E4%B8%93%E9%A2%98/%E8%AF%BE%E4%BB%B6/Seata%E5%9F%BA%E7%A1%80%E5%BA%94%E7%94%A8/09/demo_statelang.png?lastModify=1644919976)![demo_statelang.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644919973000/78e31d21cf3c4df6be73532c2b1cc08a.png)

### Saga状态机的应用

官方提供了一个状态机设计器

![image20220215175333918.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1396/1644919973000/e3535b08efed496086d1ed219cf580e2.png)

官方文档地址：[https://seata.io/zh-cn/docs/user/saga.html](https://seata.io/zh-cn/docs/user/saga.html)

Seata Safa状态机可视化图形设计器使用地址：[https://github.com/seata/seata/blob/develop/saga/seata-saga-statemachine-designer/README.zh-CN.md](https://github.com/seata/seata/blob/develop/saga/seata-saga-statemachine-designer/README.zh-CN.md)