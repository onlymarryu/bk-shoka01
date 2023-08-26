---
title: MybatisPlus
date: 2021-10-07
categories: 
  - ORM
tags:
  - 框架
  - ORM
 
---



#  简介

[MyBatis-Plus (opens new window)](https://github.com/baomidou/mybatis-plus)（简称 MP）是一个 [MyBatis (opens new window)](https://www.mybatis.org/mybatis-3/)的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

> 愿景
>
> 我们的愿景是成为 MyBatis 最好的搭档，就像 [魂斗罗](https://baomidou.com/img/contra.jpg) 中的 1P、2P，基友搭配，效率翻倍。

## 特性

- **无侵入**：只做增强不做改变，引入它不会对现有工程产生影响，如丝般顺滑
- **损耗小**：启动即会自动注入基本 CURD，性能基本无损耗，直接面向对象操作
- **强大的 CRUD 操作**：内置通用 Mapper、通用 Service，仅仅通过少量配置即可实现单表大部分 CRUD 操作，更有强大的条件构造器，满足各类使用需求
- **支持 Lambda 形式调用**：通过 Lambda 表达式，方便的编写各类查询条件，无需再担心字段写错
- **支持主键自动生成**：支持多达 4 种主键策略（内含分布式唯一 ID 生成器 - Sequence），可自由配置，完美解决主键问题
- **支持 ActiveRecord 模式**：支持 ActiveRecord 形式调用，实体类只需继承 Model 类即可进行强大的 CRUD 操作
- **支持自定义全局通用操作**：支持全局通用方法注入（ Write once, use anywhere ）
- **内置代码生成器**：采用代码或者 Maven 插件可快速生成 Mapper 、 Model 、 Service 、 Controller 层代码，支持模板引擎，更有超多自定义配置等您来使用
- **内置分页插件**：基于 MyBatis 物理分页，开发者无需关心具体操作，配置好插件之后，写分页等同于普通 List 查询
- **分页插件支持多种数据库**：支持 MySQL、MariaDB、Oracle、DB2、H2、HSQL、SQLite、Postgre、SQLServer 等多种数据库
- **内置性能分析插件**：可输出 SQL 语句以及其执行时间，建议开发测试时启用该功能，能快速揪出慢查询
- **内置全局拦截插件**：提供全表 delete 、 update 操作智能分析阻断，也可自定义拦截规则，预防误操作

## 支持数据库

> 任何能使用 `MyBatis` 进行 CRUD, 并且支持标准 SQL 的数据库，具体支持情况如下，如果不在下列表查看分页部分教程 PR 您的支持。

- MySQL，Oracle，DB2，H2，HSQL，SQLite，PostgreSQL，SQLServer，Phoenix，Gauss ，ClickHouse，Sybase，OceanBase，Firebird，Cubrid，Goldilocks，csiidb
- 达梦数据库，虚谷数据库，人大金仓数据库，南大通用(华库)数据库，南大通用数据库，神通数据库，瀚高数据库

## 框架结构

![framework](MybatisPlus/mybatis-plus-framework.jpg)



# 快速使用

> 使用的mybatis 3.5之前版本，也就是官方的旧版本

## 初始化工程

创建一个空的 Spring Boot 工程（工程将以 H2 作为默认数据库进行演示）

提示

可以使用 [Spring Initializer (opens new window)](https://start.spring.io/)快速初始化一个 Spring Boot 工程



## `pom` 添加依赖

```xml
	
	<properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.7.RELEASE</spring-boot.version>
    </properties>

    <dependencies>


        <!-- MybatisPlus 逆向工程所需要的依赖 -->
        <!--mybatis-plus-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.4.1</version>
        </dependency>
        
        <!-- 逆向生产结束后可注释下方文件 -->
        <!--freemarker-->
        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
        </dependency>
        <!--velocity-->
        <dependency>
            <groupId>org.apache.velocity</groupId>
            <artifactId>velocity-engine-core</artifactId>
            <version>2.2</version>
        </dependency>
        <!--generator-->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-generator</artifactId>
            <version>3.4.1</version>
        </dependency>
        <!--jdbc-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <!--lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!--spring-start-web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--spring-test-->
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
        <!--junit4-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.3.7.RELEASE</version>
                <configuration>
                    <mainClass>com.example.TestMybatisplusApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

```



## 模板准备

因为个人习惯原因，我修改了一下entity的模板。

> **先看注意**
> 在`resource/templates `下创建一个`MyEntity.java.ftl`(就这个名字吧，不然还要改代码，再者这个没啥用，只用于我们的逆向工程) ，直接将下面的内容粘贴创建即可。
>
> 注意：
> * 创建的时候先创建一个 `txt` 格式的文件，将内容粘贴进去后，再修改为`MyEntity.java.ftl`，IDEA有自动格式修改
>   会导致我们模板变形。。。。切记切记
> * 我用的模板引擎是 `freemarker` 一定得加依赖
> * 用 .vm 就要加 `velocity` 依赖

### 不带Swagger

#### .ftl文件

```xml
package ${package.Entity};

<#list table.importPackages as pkg>
import ${pkg};
</#list>
<#if swagger2>
</#if>
<#if entityLombokModel>
    import lombok.*;
</#if>


/**
* ${table.comment!}
*
* @author ${author}
* @since ${date}
*/
<#if entityLombokModel>

    <#if chainModel>
@Accessors(chain = true)
    </#if>
</#if>
<#if table.convert>
@TableName("${table.name}")
</#if>
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
// 它默认仅使用该类中定义的属性且不调用父类的方法
<#if superEntityClass??>
//@EqualsAndHashCode(callSuper = true)
<#else>
//@EqualsAndHashCode(callSuper = false)
</#if>
<#if superEntityClass??>
public class ${entity} extends ${superEntityClass}<#if activeRecord><${entity}></#if> {
<#elseif activeRecord>
public class ${entity} extends Model<${entity}> {
<#else>
public class ${entity} implements Serializable {
</#if>

<#if entitySerialVersionUID>
    private static final long serialVersionUID = 1L;
</#if>
<#-- ----------  BEGIN 字段循环遍历  ---------->
<#list table.fields as field>
    <#if field.keyFlag>
        <#assign keyPropertyName="${field.propertyName}"/>
    </#if>

    <#if field.comment!?length gt 0>
        <#if swagger2>
    @ApiModelProperty(value = "${field.comment}")
        <#else>
    /**
    * ${field.comment}
    */
        </#if>
    </#if>
    <#if field.keyFlag>
    <#-- 主键 -->
        <#if field.keyIdentityFlag>
    @TableId(value = "${field.annotationColumnName}", type = IdType.AUTO)
        <#elseif idType??>
    @TableId(value = "${field.annotationColumnName}", type = IdType.${idType})
        <#elseif field.convert>
    @TableId("${field.annotationColumnName}")
        </#if>
    <#-- 普通字段 -->
    <#elseif field.fill??>
    <#-- -----   存在字段填充设置   ----->
        <#if field.convert>
    @TableField(value = "${field.annotationColumnName}", fill = FieldFill.${field.fill})
        <#else>
    @TableField(fill = FieldFill.${field.fill})
        </#if>
    <#elseif field.convert>
    @TableField("${field.annotationColumnName}")
    </#if>
<#-- 乐观锁注解 -->
    <#if (versionFieldName!"") == field.name>
    @Version
    </#if>
<#-- 逻辑删除注解 -->
    <#if (logicDeleteFieldName!"") == field.name>
    @TableLogic
    </#if>
    private ${field.propertyType} ${field.propertyName};
</#list>
<#------------  END 字段循环遍历  ---------->

<#if !entityLombokModel>
    <#list table.fields as field>
        <#if field.propertyType == "boolean">
            <#assign getprefix="is"/>
        <#else>
            <#assign getprefix="get"/>
        </#if>
        public ${field.propertyType} ${getprefix}${field.capitalName}() {
        	return ${field.propertyName};
        }

        <#if chainModel>
        public ${entity} set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
        <#else>
        public void set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
        </#if>
            this.${field.propertyName} = ${field.propertyName};
            <#if chainModel>
                return this;
            </#if>
        }
    </#list>
</#if>

<#if entityColumnConstant>
    <#list table.fields as field>
    public static final String ${field.name?upper_case} = "${field.name}";

    </#list>
</#if>
<#if activeRecord>
    @Override
    protected Serializable pkVal() {
    <#if keyPropertyName??>
        return this.${keyPropertyName};
    <#else>
        return null;
    </#if>
    }

</#if>
<#if !entityLombokModel>
    @Override
    public String toString() {
    return "${entity}{" +
    <#list table.fields as field>
        <#if field_index==0>
            "${field.propertyName}=" + ${field.propertyName} +
        <#else>
            ", ${field.propertyName}=" + ${field.propertyName} +
        </#if>
    </#list>
    "}";
    }
</#if>
}
```

#### .vm文件

```xml
package ${package.Entity};

<#list table.importPackages as pkg>
import ${pkg};
</#list>
<#if swagger2>
</#if>
<#if entityLombokModel>
import lombok.*;
</#if>

/**
* ${table.comment!}
*
* @author ${author}
* @since ${date}
*/
<#if entityLombokModel>
    <#if chainModel>
@Accessors(chain = true)
    </#if>
</#if>
<#if table.convert>
@TableName("${table.name}")
</#if>
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
//它默认仅使用该类中定义的属性且不调用父类的方法
    <#if superEntityClass??>
//@EqualsAndHashCode(callSuper = true)
    <#else>
//@EqualsAndHashCode(callSuper = false)
    </#if>
<#if superEntityClass??>
public class ${entity} extends ${superEntityClass}<#if activeRecord><${entity}></#if> {
<#elseif activeRecord>
public class ${entity} extends Model<${entity}> {
<#else>
public class ${entity} implements Serializable {
</#if>

<#if entitySerialVersionUID>
    private static final long serialVersionUID = 1L;
</#if>
<#-- ----------  BEGIN 字段循环遍历  ---------->
<#list table.fields as field>
    <#if field.keyFlag>
        <#assign keyPropertyName="${field.propertyName}"/>
    </#if>

    <#if field.comment!?length gt 0>
        <#if swagger2>
    @ApiModelProperty(value = "${field.comment}")
        <#else>
    /**
    * ${field.comment}
    */        
        </#if>
    </#if>
    <#if field.keyFlag>
    <#-- 主键 -->
        <#if field.keyIdentityFlag>
     @TableId(value = "${field.annotationColumnName}", type = IdType.AUTO)
        <#elseif idType??>
     @TableId(value = "${field.annotationColumnName}", type = IdType.${idType})
        <#elseif field.convert>
     @TableId("${field.annotationColumnName}")
        </#if>
    <#-- 普通字段 -->
    <#elseif field.fill??>
    <#-- -----   存在字段填充设置   ----->
        <#if field.convert>
	@TableField(value = "${field.annotationColumnName}", fill = FieldFill.${field.fill})
        <#else>
	@TableField(fill = FieldFill.${field.fill})
        </#if>
    <#elseif field.convert>
	@TableField("${field.annotationColumnName}")
    </#if>
<#-- 乐观锁注解 -->
    <#if (versionFieldName!"") == field.name>
	@Version
    </#if>
<#-- 逻辑删除注解 -->
    <#if (logicDeleteFieldName!"") == field.name>
	@TableLogic
    </#if>
    private ${field.propertyType} ${field.propertyName};
</#list>
<#------------  END 字段循环遍历  ---------->

<#if !entityLombokModel>
    <#list table.fields as field>
        <#if field.propertyType == "boolean">
            <#assign getprefix="is"/>
        <#else>
            <#assign getprefix="get"/>
        </#if>
	public ${field.propertyType} ${getprefix}${field.capitalName}() {
		return ${field.propertyName};
	}

	<#if chainModel>
	public ${entity} set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
	<#else>
	public void set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
	</#if>
        this.${field.propertyName} = ${field.propertyName};
        <#if chainModel>
            return this;
        </#if>
	}
    </#list>
</#if>

<#if entityColumnConstant>
    <#list table.fields as field>
	public static final String ${field.name?upper_case} = "${field.name}";
    </#list>
</#if>
<#if activeRecord>
    @Override
    protected Serializable pkVal() {
    <#if keyPropertyName??>
        return this.${keyPropertyName};
    <#else>
        return null;
    </#if>
    }

</#if>
<#if !entityLombokModel>
    @Override
    public String toString() {
    return "${entity}{" +
    <#list table.fields as field>
        <#if field_index==0>
            "${field.propertyName}=" + ${field.propertyName} +
        <#else>
            ", ${field.propertyName}=" + ${field.propertyName} +
        </#if>
    </#list>
    "}";
    }
</#if>
}
```



### 带Swagger

#### .ftl

> 提示：在`resource/templates` 下创建
>
> 主要就提供我们 `接口的信息` 和 `Pojo信息` 即可，所以修改 `Controller` 和 `Entity` 模板即可。 

##### `MyController.java.ftl`

```xml
package ${package.Controller};

import org.springframework.web.bind.annotation.RequestMapping;
<#if restControllerStyle>
import org.springframework.web.bind.annotation.RestController;
<#else>
import org.springframework.stereotype.Controller;
</#if>
<#if superControllerClassPackage??>
import ${superControllerClassPackage};
</#if>
<#if swagger2>
import io.swagger.annotations.*;
</#if>

/**
* ${table.comment!}
*
* @author ${author}
* @since ${date}
*/

<#if restControllerStyle>
@RestController
<#else>
@Controller
</#if>
<#-- Swagger配置 -->
<#if swagger2>
// tags 说明该类的作用，非空时将覆盖value的值
@Api(value = "<#if package.ModuleName?? && package.ModuleName != "">/${package.ModuleName}</#if>/<#if controllerMappingHyphenStyle??>${controllerMappingHyphen}<#else>${table.entityPath}</#if>" ,tags	= "${table.comment!}" )
</#if>
@RequestMapping("<#if package.ModuleName?? && package.ModuleName != "">/${package.ModuleName}</#if>/<#if controllerMappingHyphenStyle??>${controllerMappingHyphen}<#else>${table.entityPath}</#if>")
<#if kotlin>
class ${table.controllerName}<#if superControllerClass??> : ${superControllerClass}()</#if>
<#else>
    <#if superControllerClass??>
public class ${table.controllerName} extends ${superControllerClass} {
    <#else>
public class ${table.controllerName} {
    </#if>
    /**
    * 服务对象
    */
    //@Autowired //提示快捷键自动生产(需要自定义): `apr`
    //@ApiParam(name="",defaultValue="",)


}
</#if>
```

##### `MyEntity.java.ftl`

```xml
package ${package.Entity};

<#list table.importPackages as pkg>
import ${pkg};
</#list>
<#if swagger2>
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiModel;
</#if>
<#if entityLombokModel>
    import lombok.*;
</#if>


/**
* ${table.comment!}
*
* @author ${author}
* @since ${date}
*/
<#if entityLombokModel>

    <#if chainModel>
@Accessors(chain = true)
    </#if>
</#if>
<#if table.convert>
@TableName("${table.name}")
</#if>
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Data
// 它默认仅使用该类中定义的属性且不调用父类的方法
<#if superEntityClass??>
//@EqualsAndHashCode(callSuper = true)
<#else>
//@EqualsAndHashCode(callSuper = false)
</#if>
<#if swagger2>
@ApiModel(value = "${table.comment!}" , description = "${table.remark!}")
</#if>
<#if superEntityClass??>
public class ${entity} extends ${superEntityClass}<#if activeRecord><${entity}></#if> {
<#elseif activeRecord>
public class ${entity} extends Model<${entity}> {
<#else>
public class ${entity} implements Serializable {
</#if>

<#if entitySerialVersionUID>
    private static final long serialVersionUID = 1L;
</#if>
<#-- ----------  BEGIN 字段循环遍历  ---------->
<#list table.fields as field>
    <#if field.keyFlag>
        <#assign keyPropertyName="${field.propertyName}"/>
    </#if>

    <#if field.comment!?length gt 0>
        <#if swagger2>
    @ApiModelProperty(value = "${field.comment!}")
        <#else>
    /**
    * ${field.comment}
    */
        </#if>
    </#if>
    <#if field.keyFlag>
    <#-- 主键 -->
        <#if field.keyIdentityFlag>
    @TableId(value = "${field.annotationColumnName}", type = IdType.AUTO)
        <#elseif idType??>
    @TableId(value = "${field.annotationColumnName}", type = IdType.${idType})
        <#elseif field.convert>
    @TableId("${field.annotationColumnName}")
        </#if>
    <#-- 普通字段 -->
    <#elseif field.fill??>
    <#-- -----   存在字段填充设置   ----->
        <#if field.convert>
    @TableField(value = "${field.annotationColumnName}", fill = FieldFill.${field.fill})
        <#else>
    @TableField(fill = FieldFill.${field.fill})
        </#if>
    <#elseif field.convert>
    @TableField("${field.annotationColumnName}")
    </#if>
<#-- 乐观锁注解 -->
    <#if (versionFieldName!"") == field.name>
    @Version
    </#if>
<#-- 逻辑删除注解 -->
    <#if (logicDeleteFieldName!"") == field.name>
    @TableLogic
    </#if>
    private ${field.propertyType} ${field.propertyName};
</#list>
<#------------  END 字段循环遍历  ---------->

<#if !entityLombokModel>
    <#list table.fields as field>
        <#if field.propertyType == "boolean">
            <#assign getprefix="is"/>
        <#else>
            <#assign getprefix="get"/>
        </#if>
        public ${field.propertyType} ${getprefix}${field.capitalName}() {
        	return ${field.propertyName};
        }

        <#if chainModel>
        public ${entity} set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
        <#else>
        public void set${field.capitalName}(${field.propertyType} ${field.propertyName}) {
        </#if>
            this.${field.propertyName} = ${field.propertyName};
            <#if chainModel>
                return this;
            </#if>
        }
    </#list>
</#if>

<#if entityColumnConstant>
    <#list table.fields as field>
    public static final String ${field.name?upper_case} = "${field.name}";

    </#list>
</#if>
<#if activeRecord>
    @Override
    protected Serializable pkVal() {
    <#if keyPropertyName??>
        return this.${keyPropertyName};
    <#else>
        return null;
    </#if>
    }

</#if>
<#if !entityLombokModel>
    @Override
    public String toString() {
    return "${entity}{" +
    <#list table.fields as field>
        <#if field_index==0>
            "${field.propertyName}=" + ${field.propertyName} +
        <#else>
            ", ${field.propertyName}=" + ${field.propertyName} +
        </#if>
    </#list>
    "}";
    }
</#if>
}
```









## 逆向工程

> 通用模板代码，符合我的习惯。
>
> 其他具体的风格配置可以因人而异再次修改。代码中注释很多

```java
import com.baomidou.mybatisplus.core.toolkit.StringPool;
import com.baomidou.mybatisplus.generator.AutoGenerator;
import com.baomidou.mybatisplus.generator.InjectionConfig;
import com.baomidou.mybatisplus.generator.config.*;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Scanner;

/**
 * 逆向工程生产 pojo、controller、.....
 */
public class Generator {

    @Test
    public void t1(){
        System.out.println(System.getProperty("user.dir"));
    }
    /*
     * 逆向工程
     * 要修改前缀、后缀的东西策略中，
     * 其他的修改去代码里面翻一翻，大多数都注释了，找不到了可以看官网
     *  */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("====================================");
        System.out.println("==============1.生成部分表============");
        System.out.println("==============2.生成全部表============");
        System.out.println("=====================================");
        System.out.println("提示：如果你要在子模块中使用，需要修改配置");
        System.out.println("1.如果你要在子模块中使用，需要修改配置");
        System.out.println("Run Configuration的Working directory也配置相对地址$MODULE_WORKING_DIR$即可");
        System.out.println("=====================================");
        System.out.println("2.如果要从服务器中的数据库读取要到下方 generator 方法中主动修改你的 IP 和 Port");
        System.out.println("我们默认都是 127.0.0.1:3306");
        System.out.println("=====================================");
        System.out.println("3.乐观锁字段默认名称为 `version` ");
        System.out.println("修改去 `generator` 方法中 策略组中设定即可");
        System.out.println("=====================================");
        System.out.println("4.Swagger 注解模式默认没有开启 ");
        System.out.println("    1.修改去 `generator` 方法中 全局修改`gc.setSwagger2`");
        System.out.println("    2.修改去 `generator` 方法中 模板设置 `templateConfig.setController` 注释解开即可");
        System.out.println("=====================================");
        System.out.println("=====================================");
        System.out.println("=====================================");
        System.out.println("========请先看完上面的提示再操作========");
        System.out.println("=====================================");

        int i = scanner.nextInt();
        switch (i) {
            case 1:
                System.out.println("请输入你要逆向生成的表名和他所在的数据库，·回车·");
                System.out.println("数据库默认为mydb");

                System.out.print("表名：");
                String name = scanner.next();
                System.out.print("数据库：");
                String dataBase = scanner.next();
                generator(name,dataBase);
                System.out.println("Success!!!");
                break;
            case 2:{
                System.out.println("请输入你要逆向生成的表所在的数据库!");
                System.out.println("数据库默认为mydb");

                System.out.print("数据库：");
                dataBase = scanner.next();
                generator(null,dataBase);
                System.out.println("Success!!!");
            }break;

        }
    }

    public static void generator(String tableName,String DataBaseName){
        // 代码生成器
        AutoGenerator mpg = new AutoGenerator();

        // 全局配置
        GlobalConfig gc = new GlobalConfig();
        System.out.println(System.getProperty("user.dir"));
        String projectPath = System.getProperty("user.dir");
        gc.setOutputDir(projectPath + "/src/main/java");
        gc.setAuthor("zjj"); // 作者
        gc.setOpen(false); // 是否打开目录
        gc.setBaseResultMap(true);//xml 开启 BaseResultMap
        gc.setBaseColumnList(true);//xml 开启 BaseColumn
        gc.setSwagger2 (true); // 实体属性 Swagger2 注解
        mpg.setGlobalConfig(gc);

        // 数据源配置
        DataSourceConfig dsc = new DataSourceConfig();
        /*
        String DataBaseURL = "jdbc:mysql://" +
                "ip" + ":" +
                "post" +"/" +
                "dataBaseName" +
                "?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai";
        */
        String DataBaseURL = "jdbc:mysql://" +
                // "Your_IP_Name" + ":" +
                "127.0.0.1" + ":" +
                // "Your_Port_" +"/" +
                "3306" +"/" +
                "" + (null==DataBaseName?"mydb":DataBaseName) +
                "?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai";
        dsc.setUrl(DataBaseURL);
        // dsc.setSchemaName("public");
        dsc.setDriverName("com.mysql.cj.jdbc.Driver");
        dsc.setUsername("root");
        dsc.setPassword("root");
        mpg.setDataSource(dsc);

        // 包配置
        PackageConfig pc = new PackageConfig();
        //pc.setModuleName (scanner ("模块名"));
        pc.setParent("com.zjj")
                .setEntity("pojo")
                .setMapper("mapper")
                .setService("service")
                .setServiceImpl("service.impl")
                .setController("controller");
        mpg.setPackageInfo(pc);

        // 自定义配置
        InjectionConfig cfg = new InjectionConfig() {
            @Override
            public void initMap() {
                // to do nothing
            }
        };

        // 如果模板引擎是 freemarker
        String templatePath = "/templates/mapper.xml.ftl";
        // 如果模板引擎是 velocity
        // String templatePath = "/templates/mapper.xml.vm";

        // 自定义输出配置
        List<FileOutConfig> focList = new ArrayList<>();
        // 自定义配置会被优先输出
        focList.add(new FileOutConfig(templatePath) {
            @Override
            public String outputFile(TableInfo tableInfo) {
                // 自定义输出文件名 ， 如果你 Entity 设置了前后缀、此处注意 xml 的名称会跟着发生变化！！
                System.out.println(pc.getModuleName());
                return projectPath + "/src/main/resources/mapper" + pc.getModuleName()
                        + "/" + tableInfo.getEntityName() + "Mapper" + StringPool.DOT_XML;
            }
        });

        cfg.setFileOutConfigList(focList);
        mpg.setCfg(cfg);

        // 配置模板
        TemplateConfig templateConfig = new TemplateConfig();
        // 配置自定义输出模板
        // 指定自定义模板路径，注意不要带上.ftl/.vm, 会根据使用的模板引擎自动识别
        templateConfig.setEntity("/templates/MyEntity.java");
        // templateConfig.setController("/templates/MyController.java");
        // templateConfig.setService();
        // templateConfig.setController();
        templateConfig.setXml(null);
        mpg.setTemplate(templateConfig);

        // 策略配置
        StrategyConfig strategy = new StrategyConfig();
        // 数据库表映射到实体的命名策略
        strategy.setNaming(NamingStrategy.underline_to_camel);
        // 数据库表字段映射到实体的命名策略
        strategy.setColumnNaming(NamingStrategy.no_change);
        //strategy.setSuperEntityClass ("你自己的父类实体，没有就不用设置！");
        //lombok 模型
        strategy.setEntityLombokModel(true);
        // 生成 RestController
        strategy.setRestControllerStyle(true);
        // 公共父类
        //strategy.setSuperControllerClass ("你自己的父类控制器，没有就不用设置！");
        // 写于父类中的公共字段
        //strategy.setSuperEntityColumns("id");
        if (!Objects.isNull(tableName)) {
            //strategy.setInclude (scanner ("表名，多个英文逗号分割").split (","));
            strategy.setInclude(tableName.split(","));
        }
        strategy.setControllerMappingHyphenStyle(true);
        // 乐观锁
        strategy.setVersionFieldName("version");


        // 表前缀
        // strategy.setTablePrefix("t_");
        mpg.setStrategy(strategy);
        mpg.setTemplateEngine(new FreemarkerTemplateEngine());
        mpg.execute();
    }
}
```



## 注意

​		其中我在子项目中一直未曾使用过，最近发现有个小问题，我们在获取模块的时候使用了 `System.getProperty("user.dir")` 这里有一个bug，他的值在单元测试和基本方法中的并不是一个值。

在普通方法中它显示的是：父模块的相对路径

在单元测试中它显示的是：自己本身的相对路径



​		经查阅资料, 大致得知. `System.getProperty("user.dir") `是取的`配置中的Working directory`. 然后我就看了, 我Run/Debug Configuration的配置. 发现Debug环境和Run环境配置的不一样.`Debug Configuration的Working directory配置的是相对路径(期望中的)`

![img](MybatisPlus/379b70133054430db474b452878497c4.png)

`Run Configuration的Working directory`配置的是空的(不知道是不是默认为空),然后取到的地址就不是期望中的.

![img](MybatisPlus/3447e157a0cd4c40a927c6ee6e0cd3f3.png)



​		这下找到了问题所在, 解决办法就很简单, 把Run Configuration的Working directory也配置相对地址 **\$MODULE_WORKING_DIR$**	即可



参考为`丨404 NotFound `大佬的文章：https://blog.csdn.net/m0_37920368/article/details/126952594



