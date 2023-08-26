---
title: Solr
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---



## Solr安装

### ——1

​	Solr是使用Java编写，所以必选先安装JDK。

#### 1.上传并解压

​	上传压缩包solr-7.7.2.tgz到/usr/local/tmp中。

​	解压

```
 cd /usr/local/tmp
 tar zxf solr-7.7.2.tgz -C /usr/local/tmp
```

#### 2.复制到/usr/local中

```
 cp -r solr-7.7.2 ../solr
```

#### 3.修改启动参数

​	修改启动参数，否则启动时报警告。提示设置SOLR_ULIMIT_CHECKS=false

```
 cd /usr/local/solr/bin
 vim solr.in.sh
```

![](Solr/solr-02.jpg)

####  4.启动Solr

​	Solr内嵌Jetty，直接启动即可。监听8983端口。

​	solr默认不推荐root账户启动，如果是root账户启动需要添加-force参数。

```
## ./solr start -force
```

#### 5、可视化管理界面

​	在关闭防火墙的前提下，可以在windows的浏览器中访问Solr。

​	输入: http://192.168.93.10:8983 就可以访问Solr的可视化管理界面。

​	左侧有5个菜单。分别是：

​	（1）Dashboard：面板显示Solr的总体信息。

​	（2）Logging：日志

​	（3）Core Admin：Solr的核心。类似于数据的Database

​	（4）Java Perperties：所有Java相关属性。

​	（5）Thread Dump：线程相关信息。

​	（6）如果有Core，将显示在此处。

![](Solr/solr-03.JPG)

#### 6、新建核心

​	Solr安装完成后默认是没有核心的。需要手动配置。

​	需要在solr/server/solr下新建文件夹，并给定配置文件，否则无法建立。

![](Solr/solr-04.JPG)

##### 6.1.新建目录

​	在/usr/local/solr/server/solr中新建自定义名称目录。此处示例名称为testcore。

```
 cd /usr/local/solr/server/solr
 mkdir testcore
```

##### 6.2.复制配置文件

​	在configsets里面包含了_default和sample_techproducts_configs。里面都是配置文件示例。_default属于默认配置，较纯净。sample_techproducts_configs是带有了一些配置示例。

```
## cp -r configsets/_default/conf/ testcore/
```

##### 6.3.填写Core信息

​	在可视化管理界面中Core Admin中编写信息后点击Add Core后，短暂延迟后testcore就会创建成功。schema处不用更改。

![](Solr/solr-05.JPG)

###### 6.4.出现testcore

​	在客户端管理界面中，选择新建的Core后，就可以按照自己项目的需求进行操作了。

![](Solr/solr-06.jpg)

#### 7、分词Analysis

​	在Solr可视化管理界面中，Core的管理菜单项中都会有Analysis。表示根据Scheme.xml(managed-schema)中配置要求进行解析。

​	对英文解析就比较简单了，只要按照空格把英文语句拆分成英文单词即可。

![](Solr/solr-07.jpg)

​	但是如果条件是中文时，把一句话按照字进行拆分就不是很合理了。正确的方式是按照合理的词组进行拆分。![](Solr/solr-08.jpg)

###### 7.1.配置步骤

​	上传ik-analyzer.jar到webapps中。

​	去https://search.maven.org/search?q=com.github.magese下载对应版本的ik-analyzer。可以在资料中直接获取。

###### 7.1.1上传jar到指定目录

​	上传ik-analyzer-7.7.0.jar到

​	/usr/local/solr/server/solr-webapp/webapp/WEB-INF/lib目录中

###### 7.1.2修改配置文件

​	修改/usr/local/solr/server/solr/testcore/conf/managed-schema

```
## vim /usr/local/solr/server/solr/testcore/conf/managed-schema
```

​	添加下面内容。

​	排版：Esc 退出编辑状态下：gg=G

```
<field name="myfield" type="text_ik" indexed="true" stored="true" />
    <fieldType name="text_ik" class="solr.TextField">
            <analyzer type="index">
                    <tokenizer class="org.wltea.analyzer.lucene.IKTokenizerFactory" useSmart="false" conf="ik.conf"/>
                    <filter class="solr.LowerCaseFilterFactory"/>
            </analyzer>
            <analyzer type="query">
                    <tokenizer class="org.wltea.analyzer.lucene.IKTokenizerFactory" useSmart="true" conf="ik.conf"/>
                    <filter class="solr.LowerCaseFilterFactory"/>
            </analyzer>
    </fieldType>
```

###### 7.1.3重启

```
## cd /usr/local/solr/bin
## ./solr stop -all
## ./solr start -force
```

###### 7.1.4验证

​	可以在可视化管理界面中找到myfield属性进行验证。

![](Solr/solr-09.jpg)

###### 7.2.managed-schema配置说明

###### 7.2.1< fieldType/>

​	表示定义一个属性类型。在Solr中属性类型都是自定义的。在上面配置中name=”text_ik”为自定义类型。当某个属性取值为text_ik时IK Analyzer才能生效。

###### 7.2.2< field/>

​	表示向Document中添加一个属性。

​	常用属性：

​		name: 属性名

​		type:属性类型。所有类型都是solr使用<fieldType>配置的

​		indexed: 是否建立索引

​		stored: solr是否把该属性值响应给搜索用户。

​		required：该属性是否是必须的。默认id是必须的。

​		multiValued：如果为true，表示该属性为复合属性，此属性中包含了多个其他的属性。常用在多个列作为搜索条件时，把这些列定义定义成一个新的复合属性，通过搜索一个复合属性就可以实现搜索多个列。当设置为true时与< copyField source="" dest=""/>结合使用

###### 7.2.3< uniqueKey>

​	唯一主键，Solr中默认定义id属性为唯一主键。ID的值是不允许重复的。

###### 7.2.4< dynamicField>

​	名称中允许*进行通配。代表满足特定名称要求的一组属性。

 	msb_java    

​	msb_bigdata

​	msb_UI

​        msb_*

#### 8、Dataimport

​	可以使用Solr自带的Dataimport功能把数据库中数据快速导入到solr中.

​	**必须保证managed-schema和数据库中表的列对应。，添加配置**



###### 8.1.修改配置文件

​	修改solrconfig.xml，添加下面内容

```
 <!-- 配置数据导入的处理器 -->
  <requestHandler name="/dataimport" class="org.apache.solr.handler.dataimport.DataImportHandler">
    <lst name="defaults">
	  <!--  加载data-config.xml  -->
      <str name="config">data-config.xml</str>
     </lst>
  </requestHandler>
```

###### 8.2.新建data-config.xml

​	和solrconfig.xml同一目录下新建data-config.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<dataConfig>
        <dataSource type="JdbcDataSource"   
                driver="com.mysql.jdbc.Driver"   
                url="jdbc:mysql://192.168.1.135:3306/mytest"   
                user="root"   
                password="root"/>
        <document>
            <entity name="product" query="SELECT id,name,price from t_product">
                <!-- 
                 实现数据库的列和索引库的字段的映射
                 column 指定数据库的列表
                 name  指定索引库的字段名字，必须和schema.xml中定义的一样
                 -->
                 <field column="id" name="id"/>
                 <field column="name" name="name"/>
				 <field column="price" name="price"/>
            </entity>
         </document>
</dataConfig>
```

###### 8.3.添加jar

​	向solr-webapp中添加**三个jar**。在**dist中两个还有一个数据库驱动。（自己去maven-repository里面找一个 mysql-connector-java ）**

![](Solr/solr-10.jpg)

###### 8.4.操作   

​	重启solr后，在可视化管理页面中进行数据导入。

​	注意：

​	点击导入按钮后，要记得点击刷新按钮。
