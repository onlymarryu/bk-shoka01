---
title: 关于关于Nacos配置中心的配置
date: 2023-07-10 21:58:56
categories: 微服务
tags: 
	- nacos
	- spring-cloud-alibaba
---



# 一、共享配置(shared-configs)和扩展配(extension-config)

日常开发中，多个模块可能会有很多共用的配置，比如数据库连接信息，Redis 连接信息，RabbitMQ 连接信息，监控配置等等。那么此时，我们就希望可以加载多个配置，多个项目共享同一个配置之类等功能，Nacos Config 也确实支持。

- Nacos在配置路径`spring.cloud.nacos.config.extension-config`下，允许我们指定⼀个或多个额外配置。
- Nacos在配置路径`spring.cloud.nacos.config.shared-configs`下，允许我们指定⼀个或多个共享配置。

上述两类配置都⽀持三个属性：`data-id`、`group`(默认为字符串`DEFAULT_GROUP`)、`refresh`(默认为`true`)。

## 1.1 版本说明

- Nacos：2.0.0
- spring-cloud.version：Hoxton.SR9
- spring-boot.version：2.3.6.RELEASE
- alibaba.cloud.version：2.2.3.RELEASE

## 1.2 maven依赖

```xml
<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
   <version>2.2.3.RELEASE</version>
</dependency>

<dependency>
   <groupId>com.alibaba.cloud</groupId>
   <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
   <version>2.2.3.RELEASE</version>
</dependency>
```

## 1.3 配置文件将application改成bootstrap

application.yml作用域在于当前应用有效，bootstrap.yml系统级别的配置有效（一般采用远程配置的时候才会用到）。

因此，将项目中原来的application.yml、application-dev.yml对应改成bootstrap.yml、bootstrap-dev.yml 。

# 二、配置实例

```yml
spring:
  application:
    name: nacos-config-multi
  main:
    allow-bean-definition-overriding: true
  cloud:
    nacos:
      username: ${nacos.username}
      password: ${nacos.password}
      config:
        server-addr: ${nacos.server-addr}
        namespace: ${nacos.namespace}
        # 用于共享的配置文件
        shared-configs:
          - data-id: common-mysql.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP

          - data-id: common-redis.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP

          - data-id: common-base.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP

        # 常规配置文件
        # 优先级大于 shared-configs，在 shared-configs 之后加载
        extension-configs:
          - data-id: nacos-config-advanced.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP
            refresh: true

          - data-id: nacos-config-base.yaml
            group: SPRING_CLOUD_EXAMPLE_GROUP
            refresh: true
```

参数解析：

- data-id : Data Id
- group：自定义 Data Id 所在的组，不明确配置的话，默认是 DEFAULT_GROUP。
- refresh: 控制该 Data Id 在配置变更时，是否支持应用中可动态刷新， 感知到最新的配置值。默认是不支持的。

注意：这里的`Data ID`后面是加`.yaml`后缀的，且不需要指定`file-extension`。

# 三、共享配置和扩展配置的区

实际上，Nacos中并未对`extension-configs`和`shared-configs`的差别进⾏详细阐述。我们从他们的结构，看不出本质差别；除了优先级不同以外，也没有其他差别。那么，Nacos项⽬组为什么要引⼊两个类似的配置呢?我们可以从当初该功能的需求（issue）上找到其原始⽬的。

## 3.1 Nacos对配置的默认理念

- `namespace`区分环境：开发环境、测试环境、预发布环境、⽣产环境。
- `group`区分不同应⽤：同⼀个环境内，不同应⽤的配置，通过`group`来区分。

## 3.2 主配置是应⽤专有的配置

因此，主配置应当在`dataId`上要区分，同时最好还要有`group`的区分，因为`group`区分应⽤（虽然`dataId`上区分了，不⽤设置`group`也能按应⽤单独加载）。

## 3.3 要在各应⽤之间共享⼀个配置，请使⽤上⾯的 shared-configs

因此按该理念，`shared-configs`指定的配置，本来应该是不指定`group`的，也就是应当归⼊`DEFAULT_GROUP`这个公共分组。

## 3.4 如果要在特定范围内（⽐如某个应⽤上）覆盖某个共享dataId上的特定属性，请使⽤ extension-config

⽐如，其他应⽤的数据库url，都是⼀个固定的url，使⽤`shared-configs.dataId = mysql`的共享配置。但其中有⼀个应⽤`ddd-demo`是特例，需要为该应⽤配置扩展属性来覆盖。



```yml
spring:
 application:
   name: ddd-demo-service
 cloud:
   nacos:
     config:
       server-addr: nacos-2.nacos-headless.public.svc.cluster.local:8848
       namespace: ygjpro-test2
       group: ddd-demo
       ......
       shared-configs[3]:
         data-id: mysql.yaml
         refresh: true
       ......
       extension-configs[3]:
         data-id: mysql.yaml
         group: ddd-demo
         refresh: true
```

## 3.5 关于优先级

1、上述两类配置都是数组，对同种配置，数组元素对应的下标越⼤，优先级越⾼。也就是排在后⾯的相同配置，将覆盖排在前⾯的同名配置。

- 同为扩展配置，存在如下优先级关系：`extension-configs[3] > extension-configs[2] > extension-configs[1] > extension-configs[0`。
- 同为共享配置，存在如下优先级关系：`shared-configs[3] > shared-configs[2] > shared-configs[1] > shared-configs[0]`。

2、不同种类配置之间，优先级按顺序如下：主配置 > 扩展配置(extension-configs) > 共享配置(shared-configs)



作者：AC编程
链接：https://www.jianshu.com/p/8715072d3f4c
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。