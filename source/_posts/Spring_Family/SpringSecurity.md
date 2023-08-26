---
title: SpringSecurity
date: 2022-4-2
categories: 
  - Spring全家桶

tags:
  - 框架
  - SpringSecurity
---



<hr/>
<p style="font-size:70px; color:red;background-color:66FF66">Spring Security</p><br/><hr/>

# 一、简介

​		**Spring Security** 是 Spring 家族中的一个安全管理框架。相比与另外一个安全框架**Shiro**，它提供了更丰富的功能，社区资源也比Shiro丰富。

​	一般来说中大型的项目都是使用**SpringSecurity** 来做安全框架。小项目有Shiro的比较多，因为相比与SpringSecurity，Shiro的上手更加的简单。

​	 一般Web应用的需要进行**认证**和**授权**。

​		**认证：验证当前访问系统的是不是本系统的用户，并且要确认具体是哪个用户**

​		**授权：经过认证后判断当前用户是否有权限进行某个操作**

​	而**认证**和**授权**也是SpringSecurity作为安全框架的**核心功能**。



# 二、第一个Spring Security项目

## 1.导入依赖

​	Spring Security已经被Spring boot进行集成，使用时直接引入启动器即可。

```xml
    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
    </properties>	

	<dependencies>
        <!--thymeleaf-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <!--druid-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>1.2.8</version>
        </dependency>
        <!--mysql-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!--mybatis-plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.2</version>
        </dependency>
        <!--redis依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!--fastjson依赖-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.33</version>
        </dependency>
        <!--jwt依赖-->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt</artifactId>
            <version>0.9.0</version>
        </dependency>
        <!--spring-security-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!--spring-web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--Spring test-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
```

## 2.写一个控制器

```java

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello(){
        return "hello";
    }
}

```



## 3.访问页面

​	导入spring-boot-starter-security启动器后，Spring Security已经生效，默认拦截全部请求，如果用户没有登录，跳转到内置登录页面。

​	在项目中新建login.html页面后

​	在浏览器输入：http://localhost:8080/login.html后会显示下面页面

![](SpringSecurity/springSecurity-01.jpg)


​	默认的username为user，password打印在控制台中。当然了，每个人的显示的肯定和我的不一样。![](img/springSecurity-02.jpg)

​		在浏览器中输入账号和密码后会显示login.html页面内容。



# 三、用户认证

## 3.1 登陆校验流程

![](SpringSecurity/image-20211215094003288.png)


## 3.2 原理初探

​	想要知道如何实现自己的登陆流程就必须要先知道入门案例中SpringSecurity的流程。

### 3.2.1 SpringSecurity完整流程

​	SpringSecurity的原理其实就是一个过滤器链，内部包含了提供各种功能的过滤器。这里我们可以看看入门案例中的过滤器。

![](SpringSecurity/image-20211214144425527.png)


​	图中只展示了核心过滤器，其它的非核心过滤器并没有在图中展示。

**UsernamePasswordAuthenticationFilter**:负责处理我们在登陆页面填写了用户名密码后的登陆请求。入门案例的认证工作主要有它负责。

**ExceptionTranslationFilter：**处理过滤器链中抛出的任何AccessDeniedException和AuthenticationException 。

**FilterSecurityInterceptor：**负责权限校验的过滤器。

​	

​	我们可以通过Debug查看当前系统中SpringSecurity过滤器链中有哪些过滤器及它们的顺序。

![](SpringSecurity/image-20211214145824903.png)




### 3.2.2 认证流程详解

![](SpringSecurity/image-20211214151515385.png)


概念速查:

Authentication接口: 它的实现类，表示当前访问系统的用户，封装了用户相关信息。

AuthenticationManager接口：定义了认证Authentication的方法 

UserDetailsService接口：加载用户特定数据的核心接口。里面定义了一个根据用户名查询用户信息的方法。

UserDetails接口：提供核心用户信息。通过UserDetailsService根据用户名获取处理的用户信息要封装成UserDetails对象返回。然后将这些信息封装到Authentication对象中。



## 3.3 实现方式

* 前后端不分离，登录页面由自己提供——3.1(不推荐)
* 前后端分离，登录页面由前端提供     ——3.2(推荐，后序我们其他授权和别的操作，均以这个为主)

在第二部分的基础上，进行操作

### 3.3.1 前后端不分离

#### 1 准备工作

##### application.yml

```yaml
spring:
  application:
    name: msb-spring-security
  datasource:
    druid:
      url: jdbc:mysql://localhost:3306/mydb?characterEncoding=utf-8&serverTimezone=UTC
      username: root
      password: root
      driver-class-name: com.mysql.cj.jdbc.Driver

mybatis-plus:
  mapper-locations: classpath:mapper/*.xml
logging:
  level:
    com:
      zjj:
        mapper: debug
server:
  port: 8081
```

##### 数据库准备

```sql

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `menu_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NULL' COMMENT '菜单名',
  `path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件路径',
  `visible` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '#' COMMENT '菜单图标',
  `create_by` bigint(20) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `update_by` bigint(20) NULL DEFAULT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  `del_flag` int(11) NULL DEFAULT 0 COMMENT '是否删除（0未删除 1已删除）',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '菜单表' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色权限字符串',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '角色状态（0正常 1停用）',
  `del_flag` int(1) NULL DEFAULT 0 COMMENT 'del_flag',
  `create_by` bigint(200) NULL DEFAULT NULL,
  `create_time` datetime NULL DEFAULT NULL,
  `update_by` bigint(200) NULL DEFAULT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色表' ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `role_id` bigint(200) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `menu_id` bigint(200) NOT NULL DEFAULT 0 COMMENT '菜单id',
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NULL' COMMENT '用户名',
  `nick_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NULL' COMMENT '昵称',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'NULL' COMMENT '密码',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '账号状态（0正常 1停用）',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `phonenumber` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `sex` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户性别（0男，1女，2未知）',
  `avatar` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像',
  `user_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '用户类型（0管理员，1普通用户）',
  `create_by` bigint(20) NULL DEFAULT NULL COMMENT '创建人的用户id',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint(20) NULL DEFAULT NULL COMMENT '更新人',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `del_flag` int(11) NULL DEFAULT 0 COMMENT '删除标志（0代表未删除，1代表已删除）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;


DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `user_id` bigint(200) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `role_id` bigint(200) NOT NULL DEFAULT 0 COMMENT '角色id',
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;



INSERT INTO `sys_menu` VALUES (2, 'demo:select', NULL, NULL, '0', '0', NULL, '#', NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `sys_menu` VALUES (3, 'demo:update', NULL, NULL, '0', '0', NULL, '#', NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `sys_menu` VALUES (4, 'demo:insert', NULL, NULL, '0', '0', NULL, '#', NULL, NULL, NULL, NULL, 0, NULL);
INSERT INTO `sys_menu` VALUES (5, 'demo:delete', NULL, NULL, '0', '0', NULL, '#', NULL, NULL, NULL, NULL, 0, NULL);

INSERT INTO `sys_role` VALUES (3, '管理员', NULL, '0', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role` VALUES (4, '员工', NULL, '0', 0, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `sys_role` VALUES (5, '普通用户', NULL, '0', 0, NULL, NULL, NULL, NULL, NULL);

INSERT INTO `sys_role_menu` VALUES (1, 1);
INSERT INTO `sys_role_menu` VALUES (1, 2);
INSERT INTO `sys_role_menu` VALUES (1, 3);
INSERT INTO `sys_role_menu` VALUES (1, 4);
INSERT INTO `sys_role_menu` VALUES (2, 1);
INSERT INTO `sys_role_menu` VALUES (2, 4);
INSERT INTO `sys_role_menu` VALUES (3, 1);

INSERT INTO `sys_user` VALUES (1, 'zhangsan', 'zhangsan', '$2a$10$CFr1dsdBA3XDNrNRtsfX3ezUj/pUVsEhkg6cpKa9QG0oraGBMOZ5u', '0', '12@qq.com', '123', '1', NULL, '0', NULL, '2022-08-03 08:51:48', NULL, '2022-08-27 08:51:54', 0);
INSERT INTO `sys_user` VALUES (2, 'lisi', 'lisi', '$2a$10$GRjbaR73zd9c9tCnj0BnnexqGSbQzXCVrXTPVEiOJqaypwCijbe4O', '0', '65.@126.com', '456', '0', NULL, '0', NULL, '2022-08-19 08:51:51', NULL, '2022-08-27 08:51:59', 0);
INSERT INTO `sys_user` VALUES (3, 'wangwu', 'wangwu', '$2a$10$PsFb4a4bn0A.5pf4Rq5kheKaOkrhJOaz6hlu2WmBnkE8H9wZOoNXS', '0', NULL, NULL, NULL, NULL, '1', NULL, NULL, NULL, NULL, 0);

INSERT INTO `sys_user_role` VALUES (1, 1);
INSERT INTO `sys_user_role` VALUES (2, 2);
INSERT INTO `sys_user_role` VALUES (3, 3);
```

##### 实体类1

​	这里目前只提供了登录所需要的User对象，以及我们自己封装的 USerDetails 对象，其余对象自己后续生成。（easycode 、 mybatisX、....都行）

```java
package com.zjj.pojo;

import java.util.Date;
import com.baomidou.mybatisplus.extension.activerecord.Model;
import java.io.Serializable;
import lombok.*;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;

/**
 * 用户表(User)表实体类
 *
 * @author makejava
 * @since 2022-08-24 21:09:13
 */

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@TableName(value = "sys_user")
public class User implements Serializable {
    /**
    * 主键    
    */ 
    @TableField("id")
    private Long id;
    
    /**
    * 用户名    
    */ 
    @TableField("user_name")
    private String username;
    
    /**
    * 昵称    
    */ 
    @TableField("nick_name")
    private String nickName;
    
    /**
    * 密码    
    */ 
    @TableField("password")
    private String password;
    
    /**
    * 账号状态（0正常 1停用）    
    */ 
    @TableField("status")
    private String status;
    
    /**
    * 邮箱    
    */ 
    @TableField("email")
    private String email;
    
    /**
    * 手机号    
    */ 
    @TableField("phonenumber")
    private String phonenumber;
    
    /**
    * 用户性别（0男，1女，2未知）    
    */ 
    @TableField("sex")
    private String sex;
    
    /**
    * 头像    
    */ 
    @TableField("avatar")
    private String avatar;
    
    /**
    * 用户类型（0管理员，1普通用户）    
    */ 
    @TableField("user_type")
    private String userType;
    
    /**
    * 创建人的用户id    
    */ 
    @TableField("create_by")
    private Long createBy;
    
    /**
    * 创建时间    
    */ 
    @TableField("create_time")
    private Date createTime;
    
    /**
    * 更新人    
    */ 
    @TableField("update_by")
    private Long updateBy;
    
    /**
    * 更新时间    
    */ 
    @TableField("update_time")
    private Date updateTime;
    
    /**
    * 删除标志（0代表未删除，1代表已删除）    
    */ 
    @TableField("del_flag")
    private Integer delFlag;
    

}
```

##### 实体类2

```java
import com.alibaba.fastjson.annotation.JSONField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class LoginUser implements UserDetails {
    private User user;

    private List<String> permission;

    public LoginUser(User user, List<String> permission) {
        this.user = user;
        this.permission = permission;
    }

    @JSONField(serialize = false) //redis存储的话会出现问题，不让他序列化，主要为了安全
    List<SimpleGrantedAuthority> authorities ;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // 把permission中的String类型的权限信息封装成 SimpleGrantedAuthority 对象
        if (null != authorities) return authorities;//要是有信息就不用再授权了
        authorities = permission.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
```



#### 2 重写一个登录服务(ServiceImpl)

​	这里要实现一个实现 UserDetailsService ，重写loadUserByUsername，因为这里是我们认证的地方，在下一个章节我们会具体说明

```java
package com.zjj.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zjj.mapper.UserMapper;
import com.zjj.pojo.LoginUser;
import com.zjj.pojo.User;
import com.zjj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 用户表(User)表服务实现类
 * @author makejava
 * @since 2022-08-24 21:09:13
 */
@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService, UserDetailsService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LambdaQueryWrapper<User> qw = new LambdaQueryWrapper<>();
        qw.eq(User::getUsername, username);
        User user = userMapper.selectOne(qw);
        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException("没有该用户");
        }

        // TODO 权限信息后序添加
        List<String> menus = userMapper.findMenuByUserId(user.getId());
        List<String> roles = userMapper.findRoleByUserId(user.getId());
        List<String> res = new ArrayList<>();

        for (String menu : menus) {
            res.add(menu);
        }
        for (String role : roles) {
            res.add("ROLE_"+role);
        }
        // 用户的权限和角色直接赋值 的话 要注意写法
        /*
        1、我们没有user对象直接往回 new UserDetails(username,password,Authorities) 对象时，
            要注意Authorities手动String转化可以用 AuthorityUtils.commaSeparatedStringToAuthorityList(String str)
                但是里面的 str里面包含了权限以及角色，每个要用 “,” 间隔，而且角色开头要要拼接 ROLE_

        2、我们自定义了user 实现了 UserDetails 对象 我们重写了 getAuthorities属性，具体看这个类的注释
            他在初始化值的时候我们传参传递的是一个list对象，这个时候我们不需要用 “，” 间隔，但是角色前要加 ROLE_
         */
        return new LoginUser(user,res);
    }
}
```

#### 3 重写mapper层和对应的映射文件

```java
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.zjj.pojo.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 用户表(User)表数据库访问层
 *
 * @author makejava
 * @since 2022-08-24 21:09:13
 */

@Mapper
public interface UserMapper extends BaseMapper<User> {
    public List<String> findMenuByUserId(Long id);
    public List<String> findRoleByUserId(Long id);

}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.zjj.mapper.UserMapper">

    <sql id="AllUserColumn">id , user_name , nick_name , password , status , email , phonenumber , sex , avatar , user_type , create_by , create_time , update_by , update_time , del_flag </sql>   
    <resultMap type="com.zjj.pojo.User" id="UserMap">
        <result property="id" column="id" />
        <result property="userName" column="user_name" />
        <result property="nickName" column="nick_name" />
        <result property="password" column="password" />
        <result property="status" column="status" />
        <result property="email" column="email" />
        <result property="phonenumber" column="phonenumber" />
        <result property="sex" column="sex" />
        <result property="avatar" column="avatar" />
        <result property="userType" column="user_type" />
        <result property="createBy" column="create_by" />
        <result property="createTime" column="create_time" />
        <result property="updateBy" column="update_by" />
        <result property="updateTime" column="update_time" />
        <result property="delFlag" column="del_flag" />
    </resultMap>
    <select id="findMenuByUserId" resultType="java.lang.String">
        SELECT
            distinct(m.menu_name)
        FROM
            sys_user_role ur
                LEFT JOIN sys_user u on u.id = ur.user_id
                LEFT JOIN sys_role r ON ur.role_id = r.id
                LEFT JOIN sys_role_menu rm ON ur.role_id = rm.role_id
                LEFT JOIN sys_menu m ON m.id = rm.menu_id
        WHERE
            u.id = #{args1}
          AND r.status = 0
          AND m.status = 0
    </select>
    <select id="findRoleByUserId" resultType="java.lang.String">
        SELECT
            distinct(r.name)
        FROM
            sys_user_role ur
                LEFT JOIN sys_user u on u.id = ur.user_id
                LEFT JOIN sys_role r ON ur.role_id = r.id
                LEFT JOIN sys_role_menu rm ON ur.role_id = rm.role_id
                LEFT JOIN sys_menu m ON m.id = rm.menu_id
        WHERE
            u.id = #{args1}
          AND r.status = 0
          AND m.status = 0
    </select>
    

</mapper>
```



#### 4 导入我们的登录页面

```html
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>内容</title>
    </head>
    <body>
        <form action="/login" method="post">
            username:<input type="text" name="username"/><br/>
            password:<input type="password" name="password"/><br/>
            <input type="submit" value="提交"/>
        </form>

    </body>
</html>
```

#### 5 提供登录接口

​	就是一个页面的跳转指定我们的登录页面(==要配置的==)

```java
import com.zjj.pojo.User;
import com.zjj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping("/demo")
    @ResponseBody
    public String demo() {
        return "demo";
    }

    // 登录页面
    @RequestMapping("/showLogin")
    public String logint() {
        System.out.println("logint invoked");
        return "login";
    }
}
```

#### 6 修改配置类

​	主要内容和细节，在formLogin里面，一定仔细查看注释，小细节很多

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class MySecurityCore extends WebSecurityConfigurerAdapter {
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // http.formLogin() 所有和表单有关系的
        http.formLogin()
                // 登录页面，走一个controller
                // 注意要和，LoginProcessingUrl 配合使用，不然在表单中的action中 url 失效
                // 因为只配置loginPage()， 会导致在初始化的时候将loginProcessingUrl的配置相同化，可以自己debug 在AbstractAuthenticationFilterConfigurer 的 updateAuthenticationDefaults 方法
                // 也就是说loginPage("/login")  loginProcessingUrl("/login"),导致提交信息失败最终导致认证失败
                .loginPage("/showLogin")
                // 当发现什么URL时，把请求转发给自定义登录逻辑
                // 表单提交的地址 action ,他就会直接去认证进入到 UserDetailsServiceImpl
                // 去这里进行用户的验证 和 用户权限信息的集体封装
                .loginProcessingUrl("/login")
                // 登录成功的操作
                // 下面两种方法都可以，推荐第二种，两种同时写第一个直接失效
                // 第一种写法，要注意在写映射的时候要注意请求的方法 get/post
                .successForwardUrl("/showMain")
                .successHandler((request, response, authentication) -> {
                    System.out.println("successHandler invoked");
                    // 我们在每次请求同一个页面尽量使用重定向，要是请求转发
                    // 因为请求转发是浏览器的行为，每次都要请求服务器并且重复提交表单，不好
                    // response.sendRedirect("/fail");
                    LoginUser loginUser = (LoginUser) authentication.getPrincipal();
                    for (String s : loginUser.getPermission()) {
                        System.out.println(s);
                    }
                })
                // 登录失败的操作
                // 内容和上述情况相同，只是一个成功的一个失败的
                .failureForwardUrl("/fail")
                // 当前端表单传递过来的用户名参数、密码参数名和后端不对应，可以利用下列方法
                // 指定前端传递过来的用户名参数名称，默认 username
                //.usernameParameter("MyuserName")
                // 指定前端传递过来的密码参数名称，默认 password
                //.passwordParameter("MypassWord")
        ;

        // http.authorizeRequests() 所有和授权相关
        http.authorizeRequests()
                // 这里面支持 正则 和 ant表达式
                .antMatchers("/showLogin").anonymous()
                .antMatchers("/js/**").permitAll()
                .anyRequest().authenticated();


        // http.csrf
        http.csrf().disable()
                // 不通过Session获取SecurityContext
                // 因为我们使用了前后端分离的思想，在session中不存在参数，要用让东西存在它里面，所以不让他生成
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    }
}
```



#### 7 启动测试

这个时候我们的用户名、密码都是我们在数据库中存储的（==密码必须使我们提供的加密方式加密之后的==）

![](SpringSecurity/image-20220825114004014.png)


登录是否成功，一方面看是否请求被阻拦

![](SpringSecurity/image-20220825114855873.png)


另一方面，我在配置中设置了认证成功之后的操作 successHandler(request,response.authentication) 我在里面将我们获得认证的用户权限信息全部打印在了控制台，如果错误了也可同样配置一些信息，具体配置将在后序章节详细总结我们的配置类中的配置，现在主要目的是理清逻辑即可

![](SpringSecurity/image-20220825114558928.png)


#### 8 补充——密码加密

实际项目中我们不会把密码明文存储在数据库中。

​	默认使用的PasswordEncoder要求数据库中的密码格式为：{id}password 。它会根据id去判断密码的加密方式。但是我们一般不会采用这种方式。所以就需要替换PasswordEncoder。

​	我们一般使用SpringSecurity为我们提供的BCryptPasswordEncoder。

​	我们只需要使用把BCryptPasswordEncoder对象注入Spring容器中，SpringSecurity就会使用该PasswordEncoder来进行密码校验。

​	我们可以定义一个SpringSecurity的配置类，SpringSecurity要求这个配置类要继承WebSecurityConfigurerAdapter。

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
```



### 3.3.2  前后端分离

#### 1 准备工作

数据库、实体类均和3.3.1中相同

application.yml

```yaml
spring:
  application:
    name: spring-security
  datasource:
    druid:
      url: jdbc:mysql://localhost:3306/mydb?characterEncoding=utf-8&serverTimezone=UTC
      username: root
      password: root
      driver-class-name: com.mysql.cj.jdbc.Driver
  redis:
    host: localhost
    port: 6379
mybatis-plus:
  mapper-locations: classpath:mapper/*.xml
logging:
  level:
    com:
      zjj:
        mapper: debug
```

统一返回类

```java
package com.zjj.common;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseResult<T> {
    /**
     * 状态码
     */
    private Integer code;
    /**
     * 提示信息，如果有错误时，前端可以获取该字段进行提示
     */
    private String msg;
    /**
     * 查询到的结果数据，
     */
    private T data;

    public ResponseResult(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public ResponseResult(Integer code, T data) {
        this.code = code;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public ResponseResult(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
```

工具类

```java
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;
import com.alibaba.fastjson.parser.ParserConfig;
import org.springframework.util.Assert;
import java.nio.charset.Charset;

/**
 * Redis使用FastJson序列化
 * 
 * @author sg
 */
public class FastJsonRedisSerializer<T> implements RedisSerializer<T>
{

    public static final Charset DEFAULT_CHARSET = Charset.forName("UTF-8");

    private Class<T> clazz;

    static
    {
        ParserConfig.getGlobalInstance().setAutoTypeSupport(true);
    }

    public FastJsonRedisSerializer(Class<T> clazz)
    {
        super();
        this.clazz = clazz;
    }

    @Override
    public byte[] serialize(T t) throws SerializationException
    {
        if (t == null)
        {
            return new byte[0];
        }
        return JSON.toJSONString(t, SerializerFeature.WriteClassName).getBytes(DEFAULT_CHARSET);
    }

    @Override
    public T deserialize(byte[] bytes) throws SerializationException
    {
        if (bytes == null || bytes.length <= 0)
        {
            return null;
        }
        String str = new String(bytes, DEFAULT_CHARSET);

        return JSON.parseObject(str, clazz);
    }


    protected JavaType getJavaType(Class<?> clazz)
    {
        return TypeFactory.defaultInstance().constructType(clazz);
    }
}
```

```java
package com.zjj.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

/**
 * JWT工具类
 */
public class JwtUtil {

    //有效期为
    public static final Long JWT_TTL = 60 * 60 *1000L;// 60 * 60 *1000  一个小时
    //设置秘钥明文
    public static final String JWT_KEY = "sangeng";

    public static String getUUID(){
        String token = UUID.randomUUID().toString().replaceAll("-", "");
        return token;
    }
    
    /**
     * 生成jtw
     * @param subject token中要存放的数据（json格式）
     * @return
     */
    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(subject, null, getUUID());// 设置过期时间
        return builder.compact();
    }

    /**
     * 生成jtw
     * @param subject token中要存放的数据（json格式）
     * @param ttlMillis token超时时间
     * @return
     */
    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, getUUID());// 设置过期时间
        return builder.compact();
    }

    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if(ttlMillis==null){
            ttlMillis=JwtUtil.JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)              //唯一的ID
                .setSubject(subject)   // 主题  可以是JSON数据
                .setIssuer("sg")     // 签发者
                .setIssuedAt(now)      // 签发时间
                .signWith(signatureAlgorithm, secretKey) //使用HS256对称加密算法签名, 第二个参数为秘钥
                .setExpiration(expDate);
    }

    /**
     * 创建token
     * @param id
     * @param subject
     * @param ttlMillis
     * @return
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(subject, ttlMillis, id);// 设置过期时间
        return builder.compact();
    }

    public static void main(String[] args) throws Exception {
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjYWM2ZDVhZi1mNjVlLTQ0MDAtYjcxMi0zYWEwOGIyOTIwYjQiLCJzdWIiOiJzZyIsImlzcyI6InNnIiwiaWF0IjoxNjM4MTA2NzEyLCJleHAiOjE2MzgxMTAzMTJ9.JVsSbkP94wuczb4QryQbAke3ysBDIL5ou8fWsbt_ebg";
        Claims claims = parseJWT(token);
        System.out.println(claims);
    }

    /**
     * 生成加密后的秘钥 secretKey
     * @return
     */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }
    
    /**
     * 解析
     *
     * @param jwt
     * @return
     * @throws Exception
     */
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }


}
```

```java
package com.zjj.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.BoundSetOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

@SuppressWarnings(value = { "unchecked", "rawtypes" })
@Component
public class RedisCache
{
    @Autowired
    public RedisTemplate redisTemplate;

    /**
     * 缓存基本的对象，Integer、String、实体类等
     *
     * @param key 缓存的键值
     * @param value 缓存的值
     */
    public <T> void setCacheObject(final String key, final T value)
    {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 缓存基本的对象，Integer、String、实体类等
     *
     * @param key 缓存的键值
     * @param value 缓存的值
     * @param timeout 时间
     * @param timeUnit 时间颗粒度
     */
    public <T> void setCacheObject(final String key, final T value, final Integer timeout, final TimeUnit timeUnit)
    {
        redisTemplate.opsForValue().set(key, value, timeout, timeUnit);
    }

    /**
     * 设置有效时间
     *
     * @param key Redis键
     * @param timeout 超时时间
     * @return true=设置成功；false=设置失败
     */
    public boolean expire(final String key, final long timeout)
    {
        return expire(key, timeout, TimeUnit.SECONDS);
    }

    /**
     * 设置有效时间
     *
     * @param key Redis键
     * @param timeout 超时时间
     * @param unit 时间单位
     * @return true=设置成功；false=设置失败
     */
    public boolean expire(final String key, final long timeout, final TimeUnit unit)
    {
        return redisTemplate.expire(key, timeout, unit);
    }

    /**
     * 获得缓存的基本对象。
     *
     * @param key 缓存键值
     * @return 缓存键值对应的数据
     */
    public <T> T getCacheObject(final String key)
    {
        ValueOperations<String, T> operation = redisTemplate.opsForValue();
        return operation.get(key);
    }

    /**
     * 删除单个对象
     *
     * @param key
     */
    public boolean deleteObject(final String key)
    {
        return redisTemplate.delete(key);
    }

    /**
     * 删除集合对象
     *
     * @param collection 多个对象
     * @return
     */
    public long deleteObject(final Collection collection)
    {
        return redisTemplate.delete(collection);
    }

    /**
     * 缓存List数据
     *
     * @param key 缓存的键值
     * @param dataList 待缓存的List数据
     * @return 缓存的对象
     */
    public <T> long setCacheList(final String key, final List<T> dataList)
    {
        Long count = redisTemplate.opsForList().rightPushAll(key, dataList);
        return count == null ? 0 : count;
    }

    /**
     * 获得缓存的list对象
     *
     * @param key 缓存的键值
     * @return 缓存键值对应的数据
     */
    public <T> List<T> getCacheList(final String key)
    {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    /**
     * 缓存Set
     *
     * @param key 缓存键值
     * @param dataSet 缓存的数据
     * @return 缓存数据的对象
     */
    public <T> BoundSetOperations<String, T> setCacheSet(final String key, final Set<T> dataSet)
    {
        BoundSetOperations<String, T> setOperation = redisTemplate.boundSetOps(key);
        Iterator<T> it = dataSet.iterator();
        while (it.hasNext())
        {
            setOperation.add(it.next());
        }
        return setOperation;
    }

    /**
     * 获得缓存的set
     *
     * @param key
     * @return
     */
    public <T> Set<T> getCacheSet(final String key)
    {
        return redisTemplate.opsForSet().members(key);
    }

    /**
     * 缓存Map
     *
     * @param key
     * @param dataMap
     */
    public <T> void setCacheMap(final String key, final Map<String, T> dataMap)
    {
        if (dataMap != null) {
            redisTemplate.opsForHash().putAll(key, dataMap);
        }
    }

    /**
     * 获得缓存的Map
     *
     * @param key
     * @return
     */
    public <T> Map<String, T> getCacheMap(final String key)
    {
        return redisTemplate.opsForHash().entries(key);
    }

    /**
     * 往Hash中存入数据
     *
     * @param key Redis键
     * @param hKey Hash键
     * @param value 值
     */
    public <T> void setCacheMapValue(final String key, final String hKey, final T value)
    {
        redisTemplate.opsForHash().put(key, hKey, value);
    }

    /**
     * 获取Hash中的数据
     *
     * @param key Redis键
     * @param hKey Hash键
     * @return Hash中的对象
     */
    public <T> T getCacheMapValue(final String key, final String hKey)
    {
        HashOperations<String, String, T> opsForHash = redisTemplate.opsForHash();
        return opsForHash.get(key, hKey);
    }

    /**
     * 删除Hash中的数据
     * 
     * @param key
     * @param hkey
     */
    public void delCacheMapValue(final String key, final String hkey)
    {
        HashOperations hashOperations = redisTemplate.opsForHash();
        hashOperations.delete(key, hkey);
    }

    /**
     * 获取多个Hash中的数据
     *
     * @param key Redis键
     * @param hKeys Hash键集合
     * @return Hash对象集合
     */
    public <T> List<T> getMultiCacheMapValue(final String key, final Collection<Object> hKeys)
    {
        return redisTemplate.opsForHash().multiGet(key, hKeys);
    }

    /**
     * 获得缓存的基本对象列表
     *
     * @param pattern 字符串前缀
     * @return 对象列表
     */
    public Collection<String> keys(final String pattern)
    {
        return redisTemplate.keys(pattern);
    }
}
```

```java
package com.zjj.util;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class WebUtils
{
    /**
     * 将字符串渲染到客户端
     * 
     * @param response 渲染对象
     * @param string 待渲染的字符串
     * @return null
     */
    public static String renderString(HttpServletResponse response, String string) {
        try
        {
            response.setStatus(200);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(string);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return null;
    }
}
```

```java
package com.zjj.config;

import com.zjj.util.FastJsonRedisSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    @SuppressWarnings(value = { "unchecked", "rawtypes" })
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory)
    {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        FastJsonRedisSerializer serializer = new FastJsonRedisSerializer(Object.class);

        // 使用StringRedisSerializer来序列化和反序列化redis的key值
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);

        // Hash的key也采用StringRedisSerializer的序列化方式
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);

        template.afterPropertiesSet();
        return template;
    }
}
```



#### 2  重写登录服务(ServiceImpl)

​	这里我们需要写一个LoginService 、LoginServiceImpl 以及==认证服务==  UserDetailServiceImpl (后续会详细解释)

```java
package com.zjj.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.zjj.mapper.UserMapper;
import com.zjj.pojo.LoginUser;
import com.zjj.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LambdaQueryWrapper<User> qw = new LambdaQueryWrapper<>();
        qw.eq(User::getUserName, username);
        User user = userMapper.selectOne(qw);
        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException("没有该用户");
        }

        // TODO 权限信息后序添加
        List<String> menus = userMapper.findMenuByUserId(user.getId());
        List<String> roles = userMapper.findRoleByUserId(user.getId());
        List<String> res = new ArrayList<>();

        
        for (String menu : menus) {
            res.add(menu);
        }
        for (String role : roles) {
            res.add("ROLE_"+role);
        }
        // 用户的权限和角色直接赋值 的话 要注意写法
        /*
        1、我们没有user对象直接往回 new UserDetails(username,password,Authorities) 对象时，
            要注意Authorities手动String转化可以用 AuthorityUtils.commaSeparatedStringToAuthorityList(String str)
                但是里面的 str里面包含了权限以及角色，每个要用 “,” 间隔，而且角色开头要要拼接 ROLE_

        2、我们自定义了user 实现了 UserDetails 对象 我们重写了 getAuthorities属性，具体看这个类的注释
            他在初始化值的时候我们传参传递的是一个list对象，这个时候我们不需要用 “，” 间隔，但是角色前要加 ROLE_
         */
        return new LoginUser(user,res);
    }
}
```

```java
public interface LoginService {
    public ResponseResult login(User user);

    ResponseResult logout();
}
```

```java
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.zjj.mapper.UserMapper;
import com.zjj.pojo.LoginUser;
import com.zjj.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LambdaQueryWrapper<User> qw = new LambdaQueryWrapper<>();
        qw.eq(User::getUserName, username);
        User user = userMapper.selectOne(qw);
        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException("没有该用户");
        }

        // TODO 权限信息后序添加
        List<String> menus = userMapper.findMenuByUserId(user.getId());
        List<String> roles = userMapper.findRoleByUserId(user.getId());
        List<String> res = new ArrayList<>();

        for (String menu : menus) {
            res.add(menu);
        }
        for (String role : roles) {
            res.add("ROLE_"+role);
        }
        // 用户的权限和角色直接赋值 的话 要注意写法
        /*
        1、我们没有user对象直接往回 new UserDetails(username,password,Authorities) 对象时，
            要注意Authorities手动String转化可以用 AuthorityUtils.commaSeparatedStringToAuthorityList(String str)
                但是里面的 str里面包含了权限以及角色，每个要用 “,” 间隔，而且角色开头要要拼接 ROLE_

        2、我们自定义了user 实现了 UserDetails 对象 我们重写了 getAuthorities属性，具体看这个类的注释
            他在初始化值的时候我们传参传递的是一个list对象，这个时候我们不需要用 “，” 间隔，但是角色前要加 ROLE_
         */
        return new LoginUser(user,res);
    }
}
```

#### 3 重写mapper层和对应的映射文件

和3.3.1的准备相同

#### 4 配置类配置

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
```

#### 5 对接登录接口

假定登录接口为	"/user/login"

```java
@Controller
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/user/login")
    @ResponseBody
    public ResponseResult login(@RequestBody User user){
        return loginService.login(user);
    }
    @RequestMapping("/user/logout")
    @ResponseBody
    public ResponseResult logout() {
        return loginService.logout();
    }
}
```

5 测试接口

这里用接口测试工具即可，我们没有登录页面，页面是前端提供的，所以我们只需要确保接口测试正确即可

http://localhost:8080/user/login

```json
{
    "userName":"zhangsan",
    "password":"zhangsan"
    // "userName":"lisi",
    // "password":"lisi"
    // "userName":"wangwu",
    // "password":"wangwu"
}
```

![](SpringSecurity/image-20220825120818298.png)


#### 6 优化认证——引入Redis

​	我们在项目中，不可能每次这种常用数据都去数据库访问，这样会给数据库造成极大的负担，导致我们的数据库宕机。因此我们引入的NoSQL数据库、缓存数据库 Redis 用来存储我们短期常用数据。但是问题又来了。怎么存储呢？

​	引入 3.2.1SpringSecurity完整流程 

![](SpringSecurity/image-20211214144425527.png)


​	我们每次的登录验证都需要经过 UsernamePasswordAuthenticationFilter ，在这个过滤器下我们必须得到一个认证的用户，所以我们在这里为了得到用户的认证信息我们老办法就是去数据库中查找，但是我们现在不想让他老去数据库中找，在他之前我们要是直接能得到这个认证过的用户岂不皆大欢喜，所以我们在他之前也加上一个过滤器用来查找每次请求是否有这个认证用户有的话我们就可以省略掉去数据库中查找他的信息的过程。

​	那么问题又来了我们如何存储一个用户的信息呢？

这里我们可以利用JWT根据我们的用户ID生成一个Token，以他为键值存储到redis中

[JWT详解](https://blog.csdn.net/weixin_45070175/article/details/118559272) ：除了讲解JWT，还很好的帮忙回顾了Token的优势

```java
package com.zjj.filter;

import com.zjj.pojo.LoginUser;
import com.zjj.util.JwtUtil;
import com.zjj.util.RedisCache;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@Component
public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    private RedisCache redisCache;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //获取token
        String token = request.getHeader("token");
        if (!StringUtils.hasText(token)) {
            //放行
            /*
            * 解释一下，为什么没有Token还放行，因为没有token可以但是可能他是登录请求
            * 我们还是要放行的，不然所有人都登录不了，但是问题是如果不是为什么还要放行
            * 这里不用担心，如果不是登录请求他就可能会存在User对象的账户和密码，就无法完成第一步的认证工作，跟别说后面的鉴权了，所以他会直接被挡住
            * 其次我们倒数第二个过滤器就是为我们处理我们出现的问题的过滤器，出了问题让他解决就行了，这里的问题其实大多数都是token错误，需要重新认证
            * */
            filterChain.doFilter(request, response);
            return;
        }
        //解析token
        String userid;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userid = claims.getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("token非法");
        }
        //从redis中获取用户信息
        String redisKey = "login:" + userid;
        LoginUser loginUser = redisCache.getCacheObject(redisKey);
        if(Objects.isNull(loginUser)){
            throw new RuntimeException("用户未登录");
        }
        //存入SecurityContextHolder ——> 认证成功的对象都在这
        //TODO 获取权限信息封装到Authentication中
        /*
        * 三参构造可以获取该对象是否是以认证状态
        *  */
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginUser,null,loginUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        //放行
        filterChain.doFilter(request, response);
    }
}
```

#### 7 修改配置类

```java
package com.zjj.config;

import com.zjj.filter.JwtAuthenticationTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter;
    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        // 认证、授权错误处理
        http.exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);
        // 认证过滤器添加
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        // url拦截
        http.authorizeRequests()
                // anonymous 匿名 没有认证的才可以访问，permitALL 谁都能访问，不需要认证
                .antMatchers("/user/login","/login","/loginPage").anonymous()
                .antMatchers("/login.html","/fail.html").permitAll()
                // authenticated 认证了才能访问
                .anyRequest().authenticated();

        //关闭CSRF
        http.csrf().disable()
                // 不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Cors
        http.cors();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
```

#### 8 测试

这里要打开你的 redis服务端 ，如果不是本地的，你要去配置中添加配置

最后根据 步骤5 再次测试，成功后你的redis 中会多出一组数据，这就是我们的Token，具体步骤不再演示！





# 四、UserDetailsService详解

​	当什么也没有配置的时候，账号和密码是由Spring Security定义生成的。而在实际项目中账号和密码都是从数据库中查询出来的。 所以我们要通过自定义逻辑控制**==认证逻辑==**。

![](SpringSecurity/image-20211214151515385.png)


​	如果需要自定义逻辑时，只需要实现UserDetailsService接口即可。接口定义如下：

![](SpringSecurity/springSecurity-03.jpg)


## 1.返回值

​	返回值UserDetails是一个接口，定义如下

![](SpringSecurity/springSecurity-04.jpg)


​	要想返回UserDetails的实例就只能返回接口的实现类。Spring Security中提供了如下的实例。对于我们只需要使用里面的User类即可。注意User的全限定路径是：

​	org.springframework.security.core.userdetails.User

​	此处经常和系统中自己开发的User类弄混。

![](SpringSecurity/springSecurity-05.jpg)


​	在User类中提供了很多方法和属性。

![](SpringSecurity/springSecurity-06.jpg)


​	其中构造方法有两个，调用其中任何一个都可以实例化UserDetails实现类User类的实例。而三个参数的构造方法实际上也是调用7个参数的构造方法。

​	username:用户名

​	password:密码

​	authorities：用户具有的权限。此处不允许为null

![](SpringSecurity/springSecurity-07.jpg)


​	此处的用户名应该是客户端传递过来的用户名。而密码应该是从数据库中查询出来的密码。Spring Security会根据User中的password和客户端传递过来的password进行比较。如果相同则表示认证通过，如果不相同表示认证失败。

​	authorities里面的权限对于后面学习授权是很有必要的，包含的所有内容为此用户具有的权限，如有里面没有包含某个权限，而在做某个事情时必须包含某个权限则会出现403。==通常都是通过AuthorityUtils.commaSeparatedStringToAuthorityList(“”)来创建authorities集合对象的==。参数是一个字符串，==多个权限使用逗号分隔，角色信息前要加<font color=blue>  ROLE_  </font>来标识不然会当成权限信息处理==。



**建议**

> ​	我们的项目中对于用户信息的表，肯定是不同的，我们可以利用这个类，对于用来认证的UserDetails对象进行进一步封装，自定义我们的认证对象。例如：
>
> ```java
> package com.zjj.pojo;
> 
> import com.alibaba.fastjson.annotation.JSONField;
> import lombok.AllArgsConstructor;
> import lombok.Data;
> import lombok.NoArgsConstructor;
> import lombok.ToString;
> import org.springframework.security.core.GrantedAuthority;
> import org.springframework.security.core.authority.SimpleGrantedAuthority;
> import org.springframework.security.core.userdetails.UserDetails;
> 
> import java.util.Collection;
> import java.util.List;
> import java.util.stream.Collectors;
> 
> @AllArgsConstructor
> @NoArgsConstructor
> @Data
> @ToString
> public class LoginUser implements UserDetails {
>     private User user;
> 
>     private List<String> permission;
> 
>     public LoginUser(User user, List<String> permission) {
>         this.user = user;
>         this.permission = permission;
>     }
> 
>     @JSONField(serialize = false) //redis存储的话会出现问题，不让他序列化，主要为了安全
>     List<SimpleGrantedAuthority> authorities ;
>     @Override
>     public Collection<? extends GrantedAuthority> getAuthorities() {
>         // 把permission中的String类型的权限信息封装成 SimpleGrantedAuthority 对象
>         if (null != authorities) return authorities;//要是有信息就不用再授权了
>         authorities = permission.stream()
>                 .map(SimpleGrantedAuthority::new)
>                 .collect(Collectors.toList());
>         return authorities;
>     }
> 
>     @Override
>     public String getPassword() {
>         return user.getPassword();
>     }
> 
>     @Override
>     public String getUsername() {
>         return user.getUsername();
>     }
> 
>     @Override
>     public boolean isAccountNonExpired() {
>         return true;
>     }
> 
>     @Override
>     public boolean isAccountNonLocked() {
>         return true;
>     }
> 
>     @Override
>     public boolean isCredentialsNonExpired() {
>         return true;
>     }
> 
>     @Override
>     public boolean isEnabled() {
>         return true;
>     }
> }
> ```
>
> ​	这里只是一个例子，我重写了getAuthorities() ，其他的信息我们可以根据我们自己的数据库的User信息进行初始化，这里我为了测试方便其余都事 TRUE 打开了他们的权限
>
> ​	这里我自定义个 permission 用来存储我们查询到的权限信息，用它来对authorities来初始化 以及对getAuthorities() 的重写，authorities 是我们根据SpringSecurity 要求封装的权限集合 ，但是要注意，不要让他存储到redis中，redis存储的话会出现问题，不要让他序列化，主要为了安全。
>
> ​	这样我们每次认证的时候就直接可以利用这个认证对象，而我们的原生User还可以进行别的操作，这样做更加灵活。==推荐********==



## 2.方法参数

​	方法参数表示用户名。此值是客户端表单传递过来的数据。默认情况下必须叫username，否则无法接收。



## 3.异常

​	UsernameNotFoundException 用户名没有发现异常。在loadUserByUsername中是需要通过自己的逻辑从数据库中取值的。如果通过用户名没有查询到对应的数据，应该抛出UsernameNotFoundException，系统就知道用户名没有查询到。![image-20220825143654996](img/image-20220825143654996.png)



# 五、配置类说明 1 — 认证配置

## 1.失败跳转

​	表单处理中成功会跳转到一个地址，失败也可以跳转到一个地址中。

### 1.1编写页面

​	在src/main/resources/static下新建fail.html并编写如下内容

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        操作失败，请重新登录. <a href="/login.html">跳转</a>
    </body>
</html>
```

### 1.2修改表单配置

​	在配置方法中表单认证部分添加failureForwardUrl()方法，表示登录失败跳转的url。此处依然是POST请求，所以跳转到可以接收POST请求的控制器/fail中。

```java
// 表单认证
http.formLogin()
    .loginProcessingUrl("/login")   //当发现/login时认为是登录，需要执行UserDetailsServiceImpl
    .successForwardUrl("/toMain")   //此处是post请求
    .failureForwardUrl("/fail")     //登录失败跳转地址
    .loginPage("/login.html");
```

### 1.3添加控制器方法

​	在控制器类中添加控制器方法，方法映射路径/fail。此处要注意：由于是POST请求访问/fail。所以如果返回值直接转发到fail.html中，及时有效果，控制台也会报警告，提示fail.html不支持POST访问方式。

```java
@PostMapping("/fail")
public String fail(){
    return "redirect:/fail.html";
}
```

### 1.4设置fail.html不需要认证

​	认证失败跳转到fail.html页面中，所以必须配置fail.html不需要被认证。需要修改配置类中内容

```java
// url 拦截
http.authorizeRequests()
        .antMatchers("/login.html").permitAll() //login.html不需要被认证
        .antMatchers("/fail.html").permitAll()  //fail.html不需要被认证
        .anyRequest().authenticated();//所有的请求都必须被认证。必须登录后才能访问。
```

## 2.设置请求账户和密码的参数名

### 2.1源码简介

​	当进行登录时会执行UsernamePasswordAuthenticationFilter过滤器。

​	usernamePasrameter:账户参数名

​	passwordParameter:密码参数名

​	postOnly=true:默认情况下只允许POST请求。

![](SpringSecurity/springSecurity-10-1661413396371.jpg)


### 2.2修改配置

```java
// 表单认证
http.formLogin()
        .loginProcessingUrl("/login")   //当发现/login时认为是登录，需要执行UserDetailsServiceImpl
        .successForwardUrl("/toMain")   //此处是post请求
        .failureForwardUrl("/fail")     //登录失败跳转地址
        .loginPage("/login.html")
        .usernameParameter("myusername")
        .passwordParameter("mypassword");
```

### 2.3修改页面

​	修改login.html

```html
<form action = "/login" method="post">
    用户名：<input type="text" name="myusername"/><br/>
    密码:<input type="password" name="mypassword"/><br/>
    <input type="submit" value="登录"/>
</form>
```



## 3.自定义登录成功处理器

### 3.1源码分析

​	使用successForwardUrl()时表示成功后转发请求到地址。内部是通过successHandler（）方法进行控制成功后交给哪个类进行处理

![](SpringSecurity/springSecurity-11-1661413396370.jpg)


​	ForwardAuthenticationSuccessHandler内部就是最简单的请求转发。由于是请求转发，当遇到需要跳转到站外或在前后端分离的项目中就无法使用了。

![](SpringSecurity/springSecurity-12-1661413396371.jpg)


​	当需要控制登录成功后去做一些事情时，可以进行自定义认证成功控制器。

### 3.2代码实现

#### 3.2.1自定义类

​	新建类MyAuthenticationSuccessHandler 实现 AuthenticationSuccessHandler ，编写如下：

```java
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        //Principal 主体，存放了登录用户的信息
        User user = (User)authentication.getPrincipal();
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());//密码输出为null
        System.out.println(user.getAuthorities());
        //重定向到百度。这只是一个示例，具体需要看项目业务需求
        httpServletResponse.sendRedirect("http://www.baidu.com");
    }
}
```

#### 3.2.2修改配置项

使用successHandler()方法设置成功后交给哪个对象进行处理

```java
// 表单认证
http.formLogin()
        .loginProcessingUrl("/login")   //当发现/login时认为是登录，需要执行UserDetailsServiceImpl
        .successHandler(new MyAuthenticationSuccessHandler())
        //.successForwardUrl("/toMain")   //此处是post请求
        .failureForwardUrl("/fail")     //登录失败跳转地址
        .loginPage("/login.html");
```

## 4.自定义登录失败处理器

### 4.1源码分析

​	failureForwardUrl()内部调用的是failureHandler()方法![](img/springSecurity-13.jpg)

​	**ForwardAuthenticationFailureHandler**中也是一个请求转发，并在request作用域中设置			 SPRING_SECURITY_LAST_EXCEPTION的key，内容为异常对象。

![](SpringSecurity/springSecurity-14.jpg)


### 4.2代码实现

#### 4.2.1新建控制器

​	新建MyForwardAuthenticationFailureHandler实现 AuthenticationFailureHandler 。在方法中添加重定向语句

```java
public class MyForwardAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.sendRedirect("/fail.html");
    }
}
```

#### 4.2.2修改配置类

​	修改配置类中表单登录部分。设置失败时交给失败处理器进行操作。failureForwardUrl和failureHandler不可共存。

```java
        // 表单认证
        http.formLogin()
                .loginProcessingUrl("/login")   //当发现/login时认为是登录，需要执行UserDetailsServiceImpl
                .successHandler(new MyAuthenticationSuccessHandler())
                //.successForwardUrl("/toMain")   //此处是post请求
                .failureHandler(new MyForwardAuthenticationFailureHandler())
//                .failureForwardUrl("/fail")     //登录失败跳转地址
                .loginPage("/login.html");
```



## 5 总结

```java
		// http.formLogin() 所有和表单有关系的
        http.formLogin()
                // 登录页面，走一个controller
                // 注意要和，LoginProcessingUrl 配合使用，不然在表单中的action中 url 失效
                // 因为只配置loginPage()， 会导致在初始化的时候将loginProcessingUrl的配置相同化，可以自己debug 在AbstractAuthenticationFilterConfigurer 的 updateAuthenticationDefaults 方法
                // 也就是说loginPage("/login")  loginProcessingUrl("/login"),导致提交信息失败最终导致认证失败
                .loginPage("/showLogin")
                // 当发现什么URL时，把请求转发给自定义登录逻辑
                // 表单提交的地址 action ,他就会直接去认证进入到 UserDetailsServiceImpl
                // 去这里进行用户的验证 和 用户权限信息的集体封装
                .loginProcessingUrl("/login")
            
                // 登录成功的操作
                // 下面两种方法都可以，推荐第二种，两种同时写第一个直接失效
                // 第一种写法，要注意在写映射的时候要注意请求的方法 get/post
                .successForwardUrl("/showMain")
                .successHandler((request, response, authentication) -> {
                    System.out.println("successHandler invoked");
                    // 我们在每次请求同一个页面尽量使用重定向，要是请求转发
                    // 因为请求转发是浏览器的行为，每次都要请求服务器并且重复提交表单，不好
                    // response.sendRedirect("/fail");
                    LoginUser loginUser = (LoginUser) authentication.getPrincipal();
                    for (String s : loginUser.getPermission()) {
                        System.out.println(s);
                    }
                })
                // 登录失败的操作
                // 内容和上述情况相同，只是一个成功的一个失败的
                .failureForwardUrl("/fail")
                // 当前端表单传递过来的用户名参数、密码参数名和后端不对应，可以利用下列方法
                // 指定前端传递过来的用户名参数名称
                //.usernameParameter("MyuserName")
                // 指定前端传递过来的密码参数名称
                // .passwordParameter("MypassWord")
        ;
```





# 六、用户授权

## 1 权限系统的作用

​	例如一个学校图书馆的管理系统，如果是普通学生登录就能看到借书还书相关的功能，不可能让他看到并且去使用添加书籍信息，删除书籍信息等功能。但是如果是一个图书馆管理员的账号登录了，应该就能看到并使用添加书籍信息，删除书籍信息等功能。

​	总结起来就是<a>**不同的用户可以使用不同的功能**</a>。这就是权限系统要去实现的效果。



## 2 授权基本流程

​	在SpringSecurity中，会使用默认的**FilterSecurityInterceptor**来进行权限校验。在 **FilterSecurityInterceptor**中会从**SecurityContextHolder**获取其**Authentication**，然后获取其中的权限信息。当前用户是否拥有访问当前资源所需的权限。

​	<a>所以我们在项目中只需要把当前登录用户的权限信息也存入Authentication。</a>然后设置我们的资源所需要的权限即可。



## 3 RBAC权限模型

参考博客：https://blog.csdn.net/qzw752890913/article/details/124461952


​	RBAC（Role Based Access Control，基于角色的访问控制），就是用户通过角色与权限进行关联，而不是直接将权限赋予用户。

​	一个用户拥有若干个角色，每个角色拥有若干个权限，这样就构成了“用户-角色-权限”的授权模型。这种授权模型的好处在于，不必每次创建用户时都进行权限分配的操作，只要分配用户相应的角色即可，而且角色的权限变更比用户的权限变更要少得多，减少频繁设置。

RBAC模型中，用户与角色之间、角色与权限之间，一般是多对多的关系。

所谓“多对多”，就是双向的一对多。

![](SpringSecurity/image-20220825151716381.png)


​	![image-20211222110249727](img/image-20211222110249727.png)

## 4 授权实现

* 基于配置——在SpringSecurity的配置类中和登录页一样进行权限配置(<font color=red>不推荐，过程繁琐，开发麻烦</font>)
* 基于注解——直接可以对我们次处理，也就是对我们的控制层进行权限的设置(<font color=red>强烈推荐</font>)

### 4.1 基于配置授权

这里没什么好说的，从刚开始我们就开始写了权限的认证，就是我们重写的配置类

```java
// http.authorizeRequests() 所有和授权相关
http.authorizeRequests()
    // 这里面支持 正则 和 ant表达式	
    // anonymous 匿名 没有认证的才可以访问，permitALL 谁都能访问，不需要认证
    .antMatchers("/user/login","/login","/loginPage").anonymous()
    .antMatchers("/js/**").permitAll()
    // authenticated 认证了才能访问
    .anyRequest().authenticated();
```

这样写，除了静态资源权限需要这么写，其余请求折磨写太麻烦，我们的业务众多，这样写极大的增加了业务开发的负担，再加上静态资源我们都已经前后端分离也就涉及不到他的权限问题，所以这种方式了解就好。主要重点放在注解学习上。

### 4.2 基于注解授权

#### 准备阶段

​	SpringSecurity为我们提供了基于注解的权限控制方案，这也是我们项目中主要采用的方式。我们可以使用注解去指定访问对应的资源所需的权限。

​	==但是要使用它我们需要先开启相关配置。==，==不打开直接用会 500==

~~~~java
@EnableGlobalMethodSecurity(prePostEnabled = true)//启动类上添加注解
~~~~

#### 找到对应的接口

这里我们找到需要授权的接口，对他们进行授权，主要有3个主要注解 

* @Secured
* @PerAuthorize() 、@PostAuthorize

只要对我们的接口上添加相对应的注解即可，例如

```java
@Controller
public class loginController{
    @Secured("ROLE_abc") //专门用于判断是否具有角色的。能写在方法或类上。参数要以ROLE_开头。
    @RequestMapping("/toMain")
    public String toMain(){
        return "redirect:/main.html";
    }
    
    @RequestMapping("/hello3")
    @ResponseBody
    // 是方法或类级别注解。
    @PreAuthorize("hasAnyAuthority('demo:delete')")
    public String testThree(){
        return "success!";
    }

    @RequestMapping("/hello4")
    @ResponseBody
    //  是方法或类级别注解。
    @PostAuthorize("hasAnyRole('ROLE_管理员')")
    public String testFour(){
        return "success!";
    }
}
```





# 七、配置类说明 2 —访问控制

在前面讲解了认证中所有常用配置，主要是对http.formLogin()进行操作。而在配置类中		http.authorizeRequests()主要是对url进行控制，也就是我们所说的授权（访问控制）。http.authorizeRequests()也支持连缀写法，总体公式为：

​	url匹配规则.权限控制方法

通过上面的公式可以有很多url匹配规则和很多权限控制方法。这些内容进行各种组合就形成了Spring Security中的授权。

​	在所有匹配规则中取所有规则的交集。配置顺序影响了之后授权效果，越是具体的应该放在前面，越是笼统的应该放到后面。	

## 1.anyRequest()

​	在之前认证过程中我们就已经使用过anyRequest()，表示匹配所有的请求。一般情况下此方法都会使用，设置全部内容都需要进行认证。

​	代码示例:

```java
anyRequest().authenticated();
```

## 2.antMatcher()

​	方法定义如下：

```java
public C antMatchers(String... antPatterns)
```

​	参数是不定向参数，每个参数是一个 正则/ant表达式，用于匹配URL规则。

​	规则如下：

​	? 匹配一个字符

​	* 匹配0个或多个字符

​	** 匹配0个或多个目录

​	在实际项目中经常需要放行所有静态资源，下面演示放行js文件夹下所有脚本文件。

```java
.antMatchers("/js/**").permitAll()
```

还有一种配置方式是只要是.js文件都放行

```java
antMatchers("/**/*.js").permitAll()
```



## 3.regexMatchers()

### 3.1介绍

使用正则表达式进行匹配。和antMatchers()主要的区别就是参数，antMatchers()参数是ant表达式，regexMatchers()参数是正则表达式。

演示所有以.js结尾的文件都被放行。

```java
.regexMatchers(".+[.]js").permitAll()
```

### 3.2两个参数时使用方式

无论是antMatchers()还是regexMatchers()都具有两个参数的方法，其中第一个参数都是HttpMethod，表示请求方式，当设置了HttpMethod后表示只有设定的特定的请求方式才执行对应的权限设置。

枚举类型HttpMethod内置属性如下：

![](SpringSecurity/springSecurity-15.jpg)


## 4 内置访问控制方法介绍

​	Spring Security匹配了URL后调用了permitAll()表示不需要认证，随意访问。在Spring Security中提供了多种内置控制。

### 1.permitAll()

​	**permitAll()表示所匹配的URL任何人都允许访问。**![](img/springSecurity-16.jpg)

### 2.authenticated()

​	**authenticated()表示所匹配的URL都需要被认证才能访问。**![](img/springSecurity-17.jpg)

### 3.anonymous()

​	**anonymous()表示可以匿名访问匹配的URL。和permitAll()效果类似，只是设置为anonymous()的url会执行filter 链中**

​	官方源码定义如下：

![](SpringSecurity/springSecurity-18.jpg)


### 4.denyAll()

​	**denyAll()表示所匹配的URL都不允许被访问。**

![](SpringSecurity/springSecurity-19.jpg)


### 5.rememberMe()

​	**被“remember me”的用户允许访问**

![](SpringSecurity/springSecurity-20.jpg)


### 6.fullyAuthenticated()

​	**如果用户不是被remember me的，才可以访问**。

![](SpringSecurity/springSecurity-21.jpg)


### 7.hasIpAddress(String)

如果请求是指定的IP就运行访问。

​	可以通过request.getRemoteAddr()获取ip地址。

​	需要注意的是在本机进行测试时localhost和127.0.0.1输出的ip地址是不一样的。

​	当浏览器中通过localhost进行访问时控制台打印的内容：

![](SpringSecurity/springSecurity-25-1661415211434.jpg)


​	当浏览器中通过127.0.0.1访问时控制台打印的内容：

![](SpringSecurity/springSecurity-26-1661415211434.jpg)


​	当浏览器中通过具体ip进行访问时控制台打印内容：

![](SpringSecurity/springSecurity-27-1606734864126-1661415211434.jpg)


​	使用Spring Security时经常会看见403（无权限），默认情况下显示的效果如下：

![](SpringSecurity/springSecurity-28-1661415211434.jpg)


​	而在实际项目中可能都是一个异步请求，显示上述效果对于用户就不是特别友好了。Spring Security支持自定义权限受限。

#### 1.新建类

​	新建类实现**AccessDeniedHandler**

```java
@Component
public class MyAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
        httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
        httpServletResponse.setHeader("Content-Type","application/json;charset=utf-8");
        PrintWriter out = httpServletResponse.getWriter();
        out.write("{\"status\":\"error\",\"msg\":\"权限不足，请联系管理员!\"}");
        out.flush();
        out.close();
    }
}
```

#### 2.修改配置类

​	配置类中重点添加异常处理器。设置访问受限后交给哪个对象进行处理。

​	myAccessDeniedHandler是在配置类中进行自动注入的。

```java
//异常处理
http.exceptionHandling()
        .accessDeniedHandler(myAccessDeniedHandler);
```



## 5 总结

在选择特定请求时 2/3 任选其一 效果相同，主要注意内置访问控制方法的选择





# 八、配置类说明 3 —基于表达式的访问控制

## 1.access()方法使用

​	之前学习的登录用户权限判断实际上底层实现都是调用access(表达式)

![](SpringSecurity/springSecurity-29.jpg)


​	可以通过access()实现和之前学习的权限控制完成相同的功能。

### 1.1以hasRole和permitAll举例

​	下面代码和直接使用permitAll()和hasRole()是等效的。

![](SpringSecurity/springSecurity-30.jpg)


## 2.自定义权限验证方法

​	虽然这里面已经包含了很多的表达式(方法)但是在实际项目中很有可能出现需要自己自定义逻辑的情况。

​	判断登录用户是否具有访问当前URL权限。

### 2.1新建接口及实现类

​	新建接口com.msb.service.MyService后新建实现类。

```java
public interface MyService {
    boolean hasPermission(HttpServletRequest request, Authentication authentication);
}
```

```java
@Component
public class MyServiceImpl implements MyService {
    @Override
    public boolean hasPermission(HttpServletRequest request, Authentication authentication) {
        Object obj = authentication.getPrincipal();
        if(obj instanceof UserDetails){
            UserDetails user = (UserDetails) obj;
            Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
            return authorities.contains(new SimpleGrantedAuthority(request.getRequestURI()));
        }
        return false;
    }
}
```

### 2.2修改配置类

​	在access中通过@bean的id名.方法(参数)的形式进行调用

​	配置类中修改如下：

```java
 // url 拦截 (授权)
http.authorizeRequests()
        .antMatchers("/login.html").access("permitAll")
        .antMatchers("/fail.html").permitAll()
    	// @Bean的名字，表示引入某个Bean，我们的Bean在主动命名的情况下，都是以首字母小写命名
        .anyRequest().access("@myServiceImpl.hasPermission(request,authentication)");
```



# 九、基于注解的访问控制

​	在Spring Security中提供了一些访问控制的注解。这些注解都是默认是都不可用的，需要通过@EnableGlobalMethodSecurity进行开启后使用。

​	==如果设置的条件允许，程序正常执行。如果不允许会报500==![](img/springSecurity-31.jpg)

​	这些注解可以写到Service接口或方法上上也可以写到Controller或Controller的方法上。通常情况下都是写在控制器方法上的，控制接口URL是否允许被访问。

## 1.@Secured

​	@Secured是==专门用于判断是否具有角色的==。能写在==方法或类==上。==参数要以ROLE_开头==。

![](SpringSecurity/springSecurity-32-1661416083118.jpg)


### 1.1实现步骤

#### 1.1.1 开启注解

​	在启动类(也可以在配置类等能够扫描的类上)上添加@EnableGlobalMethodSecurity(securedEnabled = true)

```java
@SpringBootApplication
@EnableGlobalMethodSecurity(securedEnabled = true)
public class MyApp {
    public static void main(String [] args){
        SpringApplication.run(MyApp.class,args);
    }
}
```

#### 1.1.2在控制器方法上添加@Secured注解

​	在LoginController中方法上添加注解

```java
@Secured("ROLE_abc")
@RequestMapping("/toMain")
public String toMain(){
    return "redirect:/main.html";
}
```

#### 1.1.3配置类

​	配置类中方法配置保留最基本的配置即可。

```java
protected void configure(HttpSecurity http) throws Exception {
    // 表单认证
    http.formLogin()
            .loginProcessingUrl("/login")   //当发现/login时认为是登录，需要执行UserDetailsServiceImpl
            .successForwardUrl("/toMain")   //此处是post请求
            .loginPage("/login.html");

    // url 拦截
    http.authorizeRequests()
            .antMatchers("/login.html").permitAll() //login.html不需要被认证
            .anyRequest().authenticated();//所有的请求都必须被认证。必须登录后才能访问。

    //关闭csrf防护
    http.csrf().disable();

}
```

## 2.@PreAuthorize/@PostAuthorize

​	@PreAuthorize和@PostAuthorize都是方法或类级别注解。![](img/springSecurity-33.jpg)

​	**@PreAuthorize ** 表示访问方法或类在==执行之前先判断权限==，大多情况下都是使用这个注解，注解的参数和access()方法参数取值相同，都是权限表达式。

​	@**PostAuthorize** 表示==方法或类执行结束后判断权限==，此注解很少被使用到。

![](SpringSecurity/image-20220825155542682.png)


### 2.1实现步骤

#### 2.1.1开启注解

​	在启动类中开启@PreAuthorize注解。

```java
@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MyApp {
    public static void main(String [] args){
        SpringApplication.run(MyApp.class,args);
    }
}
```

#### 2.1.2添加@PreAuthorize

​	在控制器方法上添加@PreAuthorize，参数可以是任何access()支持的表达式

```java
@PreAuthorize("hasRole('abc')")
@RequestMapping("/toMain")
public String toMain(){
    return "redirect:/main.html";
}
```

## 3.自定义权限校验方法(针对Pre注解)

我们如果觉得单纯验证不合适，或者说不符合我们的业务我们也可以自定义方法

### 其它权限校验方法

​	我们前面都是使用@PreAuthorize注解，然后在在其中使用的是hasAuthority方法进行校验。SpringSecurity还为我们提供了其它方法例如：hasAnyAuthority，hasRole，hasAnyRole等。

   

​	这里我们先不急着去介绍这些方法，我们先去理解hasAuthority的原理，然后再去学习其他方法你就更容易理解，而不是死记硬背区别。并且我们也可以选择定义校验方法，实现我们自己的校验逻辑。

​	**hasAuthority**方法实际是执行到了**SecurityExpressionRoot**的**hasAuthority**，大家只要断点调试既可知道它内部的校验原理。

​	它内部其实是调用**authentication**的**getAuthorities**方法获取用户的权限列表。然后判断我们存入的方法参数数据在权限列表中。



​	**hasAnyAuthority**方法可以传入多个权限，只有用户有其中任意一个权限都可以访问对应资源。

~~~~java
    @PreAuthorize("hasAnyAuthority('admin','test','system:dept:list')")
    public String hello(){
        return "hello";
    }
~~~~

​	**hasRole**要求有对应的角色才可以访问，但是它内部会把我们传入的参数拼接上 **ROLE_** 后再去比较。所以这种情况下要用用户对应的权限也要有 **ROLE_** 这个前缀才可以。

~~~~java
    @PreAuthorize("hasRole('system:dept:list')")
    public String hello(){
        return "hello";
    }
~~~~

​	**hasAnyRole** 有任意的角色就可以访问。它内部也会把我们传入的参数拼接上 **ROLE_** 后再去比较。所以这种情况下要用用户对应的权限也要有 **ROLE_** 这个前缀才可以。

~~~~java
    @PreAuthorize("hasAnyRole('admin','system:dept:list')")
    public String hello(){
        return "hello";
    }
~~~~



### 自定义权限校验方法

​	我们也可以定义自己的权限校验方法，在@PreAuthorize注解中使用我们的方法。

~~~~java
@Component("ex")
public class MyExpressionRoot {
	// 一定要返回一个Bool值
    public boolean hasAuthority(String authority){
        //获取当前用户的权限
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        List<String> permissions = loginUser.getPermissions();
        //判断用户权限集合中是否存在authority
        return permissions.contains(authority);
    }
}
~~~~

​	 **在SPEL表达式中使用 @ex相当于获取容器中bean的名字为ex的对象。然后再调用这个对象的hasAuthority方法**

~~~~java
    @RequestMapping("/hello")
    @PreAuthorize("@ex.hasAuthority('system:dept:list')")
    public String hello(){
        return "hello";
    }
~~~~







# 十、自定义失败处理

​	我们还希望在认证失败或者是授权失败的情况下也能和我们的接口一样返回相同结构的json，这样可以让前端能对响应进行统一的处理。要实现这个功能我们需要知道SpringSecurity的异常处理机制。

​	在SpringSecurity中，如果我们在认证或者授权的过程中出现了异常会被ExceptionTranslationFilter捕获到。在ExceptionTranslationFilter中会去判断是认证失败还是授权失败出现的异常。

​	如果是==认证过程中出现的异常==会被封装成**AuthenticationException**然后调用**AuthenticationEntryPoint**对象的方法去进行异常处理。

​	如果是==授权过程中出现的异常==会被封装成**AccessDeniedException**然后调用**AccessDeniedHandler**对象的方法去进行异常处理。

​	所以如果我们==需要自定义异常处理==，我们只需要==自定义AuthenticationEntryPoint和AccessDeniedHandler然后配置给SpringSecurity即可==。

## ①自定义实现类

~~~~java
@Component
public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ResponseResult result = new ResponseResult(HttpStatus.FORBIDDEN.value(), "权限不足");
        String json = JSON.toJSONString(result);
        WebUtils.renderString(response,json);
    }
}

~~~~

~~~~java
@Component
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        ResponseResult result = new ResponseResult(HttpStatus.UNAUTHORIZED.value(), "认证失败请重新登录");
        String json = JSON.toJSONString(result);
        WebUtils.renderString(response,json);
    }
}

~~~~



## ②配置给SpringSecurity

​	先注入对应的处理器

~~~~java
    @Autowired
    private AuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;
~~~~

​	然后我们可以使用HttpSecurity对象的方法去配置。

~~~~java
        http.exceptionHandling()
            .authenticationEntryPoint(authenticationEntryPoint)
            .accessDeniedHandler(accessDeniedHandler);
~~~~





# 十一、Remember Me功能实现

​	Spring Security 中Remember Me为“记住我”功能，用户只需要在登录时添加remember-me复选框，取值为true。Spring Security会自动把用户信息存储到数据源中，以后就可以不登录进行访问。

## 1.添加依赖

​	Spring Security实现Remember Me 功能时底层实现依赖Spring-JDBC，所以需要导入Spring-JDBC。以后多使用MyBatis框架而很少直接导入spring-jdbc，所以此处导入mybatis启动器

同时还需要添加MySQL驱动

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.6</version>
</dependency>
```

## 2.配置数据源

​	在application.properties中配置数据源。请确保数据库中已经存在security数据库

```properties
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/mashibing
spring.datasource.username=root
spring.datasource.password=root
```

## 3.编写配置

​	新建com.msb.config.RememberMeConfig类，并创建Bean对象

```java
@Configuration
public class RememberMeConfig {
    @Autowired
    private DataSource dataSource;
    @Bean
    public PersistentTokenRepository getPersistentTokenRepository() {
        JdbcTokenRepositoryImpl jdbcTokenRepositoryImpl=new JdbcTokenRepositoryImpl();
        jdbcTokenRepositoryImpl.setDataSource(dataSource);
        //自动建表，第一次启动时需要，第二次启动时注释掉
//        jdbcTokenRepositoryImpl.setCreateTableOnStartup(true);
        return jdbcTokenRepositoryImpl;
    }
}
```

## 4.修改SecurityConfig

​	在SecurityConfig中添加RememberMeConfig和UserDetailsService实现类对象，并自动注入。

​	在configure中添加下面配置内容。

```java
http.rememberMe()
    .userDetailsService(userDetailsService) //登录逻辑交给哪个对象
    .tokenRepository(repository);   //持久层对象
```

## 5.在客户端页面中添加复选框

​	在客户端登录页面中添加remember-me的复选框，只要用户勾选了复选框下次就不需要进行登录了。

```html
<form action = "/login" method="post">
    用户名：<input type="text" name="username"/><br/>
    密码:<input type="text" name="password"/><br/>
    <input type="checkbox" name="remember-me" value="true"/> <br/>
    <input type="submit" value="登录"/>
</form>
```

## 6.有效时间

​	默认情况下重启项目后登录状态失效了。但是可以通过设置状态有效时间，即使项目重新启动下次也可以正常登录。

```java
//remember Me
http.rememberMe()
        .tokenValiditySeconds(120)//单位：秒
        .tokenRepository(repository)
        .userDetailsService(userDetailsServiceImpl);
```



# 十二、Thymeleaf中Spring Security的使用

​	Spring Security可以在一些视图技术中进行控制显示效果。例如：JSP或Thymeleaf。在非前后端分离且使用Spring Boot的项目中多使用Thymeleaf作为视图展示技术。

​	Thymeleaf对Spring Security的支持都放在thymeleaf-extras-springsecurityX中，目前最新版本为5。所以需要在项目中添加此jar包的依赖和thymeleaf的依赖。

```xml
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-springsecurity5</artifactId>
    <version>3.0.4.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

​	在html页面中引入thymeleaf命名空间和security命名空间

```html
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5">
```

## 1.获取属性

​	可以在html页面中通过 sec:authentication=""获取UsernamePasswordAuthenticationToken中所有getXXX的内容，包含父类中的getXXX的内容。

​	根据源码得出下面属性：

​	l name：登录账号名称

​	l principal：登录主体，在自定义登录逻辑中是UserDet ails

​	l credentials：凭证

​	l authorities：权限和角色

​	l details：实际上是WebAuthenticationDetails的实例。可以获取remoteAddress(客户端ip)和sessionId(当	前sessionId)

### 1.1实现步骤：

#### 1.1.1新建demo.html

​	在项目resources中新建templates文件夹，在templates中新建demo.html页面

![](SpringSecurity/springSecurity-34.jpg)


#### 1.1.2编写demo.html

​	在demo.html中编写下面内容，测试获取到的值

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity5">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    登录账号:<span sec:authentication="name"></span><br/>
    登录账号:<span sec:authentication="principal.username"></span><br/>
    凭证：<span sec:authentication="credentials"></span><br/>
    权限和角色：<span sec:authentication="authorities"></span><br/>
    客户端地址：<span sec:authentication="details.remoteAddress"></span><br/>
    sessionId：<span sec:authentication="details.sessionId"></span><br/>
</body>
</html>  
```

#### 1.1.3编写控制器

​	thymeleaf页面需要控制转发，在控制器类中编写下面方法

```java
@RequestMapping("/demo")
public String demo(){
    return "demo";
}
```

## 2.权限判断

​	在html页面中可以使用sec:authorize=”表达式”进行权限控制，判断是否显示某些内容。表达式的内容和access(表达式)的用法相同。如果用户具有指定的权限，则显示对应的内容；如果表达式不成立，则不显示对应的元素。

### 2.1不同权限的用户显示不同的按钮

#### 2.1.1设置用户角色和权限

​	设定用户具有admin，/insert，/delete权限ROLE_abc角色。

```java
return new User(username,password, 
                AuthorityUtils.commaSeparatedStringToAuthorityList("admin,ROLE_abc,/insert,/delete"));
```

#### 2.1.2控制页面显示效果

在页面中根据用户权限和角色判断页面中显示的内容

```html
通过权限判断：
<button sec:authorize="hasAuthority('/insert')">新增</button>
<button sec:authorize="hasAuthority('/delete')">删除</button>
<button sec:authorize="hasAuthority('/update')">修改</button>
<button sec:authorize="hasAuthority('/select')">查看</button>
<br/>
通过角色判断：
<button sec:authorize="hasRole('abc')">新增</button>
<button sec:authorize="hasRole('abc')">删除</button>
<button sec:authorize="hasRole('abc')">修改</button>
<button sec:authorize="hasRole('abc')">查看</button>
```



# 十三、SpringSecurity 的"跨域"问题

​	浏览器出于安全的考虑，使用 XMLHttpRequest对象发起 HTTP请求时必须遵守同源策略，否则就是跨域的HTTP请求，默认情况下是被禁止的。 同源策略要求源相同才能正常进行通信，即协议、域名、端口号都完全一致。 

​	前后端分离项目，前端项目和后端项目一般都不是同源的，所以肯定会存在跨域请求的问题。

​	所以我们就要处理一下，让前端能进行跨域请求。

## ①先对SpringBoot配置，运行跨域请求

这里的方式多种多想可以 配置类，也可以对跨域的请求直接加注解 ，自己视情况而定

~~~~java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
      // 设置允许跨域的路径
        registry.addMapping("/**")
                // 设置允许跨域请求的域名
                .allowedOriginPatterns("*")
                // 是否允许cookie
                .allowCredentials(true)
                // 设置允许的请求方式
                .allowedMethods("GET", "POST", "DELETE", "PUT")
                // 设置允许的header属性
                .allowedHeaders("*")
                // 跨域允许时间
                .maxAge(3600);
    }
}
~~~~

## ②开启SpringSecurity的跨域访问

由于我们的资源都会收到SpringSecurity的保护，所以想要跨域访问还要让SpringSecurity运行跨域访问。

~~~~java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //关闭csrf
                .csrf().disable()
                //不通过Session获取SecurityContext
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                // 对于登录接口 允许匿名访问
                .antMatchers("/user/login").anonymous()
                // 除上面外的所有请求全部需要鉴权认证
                .anyRequest().authenticated();

        //添加过滤器
        http.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

        //配置异常处理器
        http.exceptionHandling()
                //配置认证失败处理器
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler);

        //允许跨域
        http.cors();
    }

~~~~





# 十三、退出登录

​	用户只需要向Spring Security项目中发送/logout退出请求即可。

## 1.退出实现

实现退出非常简单，只要在页面中添加/logout的超链接即可。

```html
<a href="/logout">退出登录</a>

```

​	为了实现更好的效果，通常添加退出的配置。默认的退出url为/logout，退出成功后跳转到/login?logout![](img/springSecurity-35.jpg)

​	如果不希望使用默认值，可以通过下面的方法进行修改。

```java
http.logout()     
    .logoutUrl(**"/logout"**)     
    .logoutSuccessUrl(**"/login.html"**);
```

## 2.logout其他常用配置源码解读

### 2.1.addLogoutHandler(LogoutHandler)

​	默认是contextLogoutHandler![](img/springSecurity-36.jpg)

​	默认实例内容

![](SpringSecurity/springSecurity-37.jpg)


### 2.2clearAuthentication(boolean)

​	是否清除认证状态，默认为true![](img/springSecurity-38.jpg)

##### 2.3invalidateHttpSession(boolean)

​	是否销毁HttpSession对象，默认为true![](img/springSecurity-39.jpg)

### 2.4logoutSuccessHandler(LogoutSuccessHandler)

​	退出成功处理器。![](img/springSecurity-40.jpg)

​	也可以自己进行定义退出成功处理器。只要实现了LogoutSuccessHandler接口。与之前讲解的登录成功处理器和登录失败处理器极其类似。



# 十四、Spring Security 中 CSRF

​	从刚开始学习Spring Security时，在配置类中一直存在这样一行代码：http.csrf().disable();如果没有这行代码导致用户无法被认证。这行代码的含义是：关闭csrf防护。

## 1.什么是CSRF

​	CSRF（Cross-site request forgery）跨站请求伪造，也被称为“One Click Attack” 或者Session Riding。通过伪造用户请求访问受信任站点的非法请求访问。

​	跨域：只要网络协议，ip地址，端口中任何一个不相同就是跨域请求。

​	客户端与服务进行交互时，由于http协议本身是无状态协议，所以引入了cookie进行记录客户端身份。在cookie中会存放session id用来识别客户端身份的。在跨域的情况下，session id可能被第三方恶意劫持，通过这个session id向服务端发起请求时，服务端会认为这个请求是合法的，可能发生很多意想不到的事情。

## 2.Spring Security中CSRF

​	从Spring Security4开始CSRF防护默认开启。默认会拦截请求。进行CSRF处理。CSRF为了保证不是其他第三方网站访问，要求访问时携带参数名为_csrf值为token(token在服务端产生)的内容，如果token和服务端的token匹配成功，则正常访问。 

### 2.1实现步骤

#### 2.1.1 编写控制器方法

​	编写控制器方法，跳转到templates中login.html页面。

```java
@GetMapping("/showLogin")
public String showLogin() {
    return "login";
}
```

#### 2.1.2新建login.html

在项目resources下新建templates文件夹，并在文件夹中新建login.html页面。红色部分是必须存在的否则无法正常登录。

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action = "/login" method="post">
    <input type="hidden" th:value="${_csrf.token}" name="_csrf" th:if="${_csrf}"/>
    用户名：<input type="text" name="username"/><br/>
    密码:<input type="password" name="password"/><br/>
    <input type="submit" value="登录"/>
</form>
</body>
</html>     
```

#### 2.1.3修改配置类

在配置类中注释掉CSRF防护失效

```java
//关闭csrf防护
//http.csrf().disable();
```

 


