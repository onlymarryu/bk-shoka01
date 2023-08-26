---
title: 配置https
date: 2023-02-04 23:05:52

categories: 
  - 小实验
tags:
  - 小实验
---



前提：

1. 首先要有一个自己的域名，可以去阿里等平台购买
2. 要有一个阿里云或者腾讯云账号

参考自：

* [如何将域名http转换成https？](https://cloud.tencent.com/developer/article/1481387)
* [Tomcat SSL证书安装指南](https://www.trustauth.cn/ssl-guide/655.html)

# 前情提要
>http和https区别 ? 

1. HTTP协议以 **`明文方式发送内容，不提供任何方式的数据加密`** 。HTTP协议不适合传输一些敏感信息，比如：信用卡号、密码等支付信息。https则是 **`具有安全性的ssl加密传输协议`**。

2. http和https使用的是完全不同的连接方式，用的 **`端口也不一样`** ，前者是`80`，后者是`443`。

3. **https协议需要到ca申请证书**。

4. **http的连接很简单,是无状态的**。

5. **HTTPS协议是由 `SSL+HTTP` 协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全**。


HTTPS协议的主要作用可以分为两种：
* 一种是建立一个信息安全通道，来保证数据传输的安全
* 一种就是确认网站的真实性。

**HTTPS在HTTP的基础上加入了SSL协议，SSL依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。**

# 介绍

分享一篇将自己的[域名](https://cloud.tencent.com/act/pro/domain-sales?from=10680)由http转换成https的文章，由http转https首先要有个[备案](https://cloud.tencent.com/product/ba?from=10680)的域名和一个可用的服务器，然后在自己的服务器上安装ssl证书所对应的服务，先用tomcat的服务做演示。

# 在腾讯云找到ssl证书申请

> ​		这里以[腾讯云](https://console.cloud.tencent.com/ssl)为例，[阿里云](https://yundun.console.aliyun.com/?p=cas#/certExtend/free)也行。他们都是具有申请免费证书的。都是20个，但是只有一年有效期，过期得重新申请

![img](httpTohttps/r5ac462y3l.jpeg)

## 进入滑到最低下 点击开始使用

![img](httpTohttps/7ybz3pq1fh.png)

## 申请证书

![img](httpTohttps/cndlxb9hiq.jpeg)

## 填写相关信息

![img](httpTohttps/29gk7s19dj.jpeg)

* 通用名称--你自己的域名

* 申请邮箱--用于验证的 
* 证书备注名--自定义随便取个吧 
* 私钥密码--可填可不填（我这已经填了） 
* 所属项目--都是默认项目 
* ps:填完之后下一步，有三个选项
    * 如果你的域名已经绑定了服务器，就选择自动
    * 否则选择手动，最后一个基本不用管

# 下载证书

我这已经审核通过然后下载下来

![img](httpTohttps/usdmiv6p0p.png)

下载下来就长这个样

![img](httpTohttps/4mrx67821u.jpeg)

里面的内容

![img](httpTohttps/mzv158q214.jpeg)

Tomcat下的内容

![img](httpTohttps/o984rob9b5.jpeg)

SSL准备工作已经完成接下来在服务器上搭个tomcat运行起来

# 搭建服务

> 方式：`Tomcat` 

搭建服务首先在自己的服务器上安装jdk和tomcat并让tomcat正常运行起来这边我已经搭建好了 然后将我们的域名绑定服务器使用域名能访问的tomcat首页即正常

![img](httpTohttps/iudcsosu15.jpeg)

此时我们用的还是http形式访问，前期工作准备好接下来进入主题

# http转成https

## Tomcat配置证书

将下载的SSL证书tomcat下的文件拷贝出来

![img](httpTohttps/wwmwha9fg9.jpeg)

放到服务器tomcat目录下的conf中

![img](httpTohttps/9foc24d6qe.jpeg)

再将server.xml拷出来做相应的修改如下： Server.xml：

![img](httpTohttps/owo7czdo4q.jpeg)

Ps： 配置同目录下的server.xml文件,注意域名是否填写正确，区分com、cn

```html
<!-- 将8080端口需改为80-->
<!-- 配置SSl证书，步骤3 将8443修改为443，服务器端需要放开443-->
<Connector port="80" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="443" />
<!-- 配置SSl证书 -->
<Connector port="443" protocol="HTTP/1.1" SSLEnabled="true"
    maxThreads="150" scheme="https" secure="true"
    keystoreFile="conf/www.XXXXXXX.YYY.jks"
    keystorePass="密钥库密码文件中的密码"
    clientAuth="false" sslProtocol="TLS" />
<!--        
    配置文件参数 说明
    clientAuth 
    如果设为true，表示Tomcat要求所有的SSL客户出示安全证书，对SSL客户进行身份验证

    keystoreFile 
    指定keystore文件的存放位置，可以指定绝对路径，也可以指定相对于 （Tomcat安装目录）环境变量的相对路径。如果此项没有设定，默认情况下，Tomcat将从当前操作系统用户的用户目录下读取名为 “.keystore”的文件。
    
	keystorePass 
    密钥库密码，指定keystore的密码。（如果申请证书时有填写私钥密码，密钥库密码即私钥密码，否则填写密钥库密码文件中的密码）
    
	sslProtocol 
    指定套接字（Socket）使用的加密/解密协议，默认值为TLS

    继续在server.xml进行配置：
    我这里将默认端口改为了 80
-->

```

**如果服务有端口安全组要记得方对应的安全组**， 如：80和433端口我这已经开放所有端口



## Nginx配置证书

参考：

* [nginx中http转https的几种方式](https://blog.csdn.net/tiancityycf/article/details/121685698) 
* [Nginx配置ssl证书详细步骤](https://blog.csdn.net/qq_36908872/article/details/127284955)
* [Nginx-Config   Nginx在线编辑](https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN)



1. 进入到nginx目录,查看有没有**`http_ssl_module`**模块

```shell
./nginx -V
```

​	![Nginx配置ssl证书(https证书)_SSL](httpTohttps/08153632_6391940031dd075438.png)

2. 如果没有,找到源码,输入以下命令进行安装(**如果有,跳转到第6步**)

```shell
# prefix 后面的路径是你安装nginx的路径
./configure --prefix=/usr/local/nginx --with-http_ssl_module
```

3. `configure `执行完成后,输入 **`make`**  

    **注意**:千万**不要 **`make install`**，这样会覆盖原有的配置**

4. `make`完成后，**停止nginx服务**，进入 **`objs`** 目录,将**==nginx启动程序,拷贝到安装目录下,替换原有的启动程序==**

5. 启动nginx

    ```shell
    #查看是否安装成功
    ./nginx -V 
    ```

6. 新建一个目录cert ，把申请下来的证书上传上去

7. 打开配置文件nginx.conf,加入以下配置

    ```shell
    http{
     	
        # 配置ssl
        server{
        	# 设置SSL功能
        	# 监听的端口，nginx 1.15.0及以上版本，使用listen 443 ssl代替，1.15.0以下的使用listen 443
            listen 443 ssl; 
            # test.com 修改为证书绑定的域名
            server_name test.com; 
            
            # ssl证书地址
            # 指定pem文件所在路径，如果写相对路径，必须把该文件和nginx.conf文件放到一个目录下
            ssl_certificate cert/xxxx.pem; 
            ssl_certificate /usr/local/nginx/cert/ssl.crt;
            #指定私钥文件key所在路径，如果写相对路径，必须把该文件和nginx.conf文件放到一个目录下。
            ssl_certificate_key /usr/local/nginx/cert/ssl.key;
            
            # ssl验证相关配置
            # 缓存有效期
            ssl_session_timeout 5m;
            # 配置协议，也叫安全链接可选的加密协议
            ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
            # 加密套件，加密算法
            ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
            # 使用服务器端的首选算法
            ssl_prefer_server_ciphers on;
            #如果是静态文件,直接指向目录,如果是动态应用,用proxy_pass转发一下
            location / {
                    root /usr/local/service/ROOT;
                    index index.html;
            }
        }
        
        # 原来的转发
        # 监听80端口,并重定向到443
        server{
            listen 80;
            server_name test.com;
            # 用地址重写规则
            rewrite ^/(.*)$ https://test.com:443/$1 permanent;
        }
    }
    ```

8. 重启nginx

    ```shell
    ./nginx -s reload
    ```

    如果重启的时候提示rewrite错误,说明你的nginx没有安装rewrite模块,很不幸,照着2,3,4,5步回去重新配一下nginx

9. 提问

    1. 一个SSL证书只能对应一个端口吗 ？

        443端口只是SSL证书的默认端口，SSL证书也是支持其他非443自定义端口的。多个端口的nginx 在同一个ip地址里面是可以使用同一个ssl 证书的。

         换一下 端口号，剩下的步骤都是一样的（无需修改conf里面的端口号）。

        简单来说就是：**我们现在这个 ip 转发的东西都是安全的证书在我们这里就行，和端口无关**

    2. 服务器报警：启用了不安全的TLS1.0协议

        最近在使用过程中，进行安全漏扫的时候报了这个警告。

        TLS 1.0是于1996年发布的老版协议，使用的是弱加密算法和系统。比如SHA-1和MD5，这些算法和系统十分脆弱，存在重大安全，容易受到降级的严重影响。

        

        **修复方法：**
        将conf文件中的`ssl_protocols `改为  TLSv1.2 TLSv1.3

        ```
        ssl_protocols TLSv1.2 TLSv1.3;
        ```

        若配置文件里面没有ssl_protocols 则在开启了 ssl 的配置文件里面 添加上面那行代码

        ![Nginx配置ssl证书(https证书)_nginx_02](httpTohttps/08153632_639194005353b12616.png)

        然后重启nginx。

        

# 接下来启动tomcat 大功告成

![img](httpTohttps/gyun5wcjb2.jpeg)



Nginx 的就不在展示，效果类似





# Cloud申请SSL证书

## 缺点

### 缺点一

这个证书也有一个致命缺点，就是只能配合它家的CDN，小云朵使用，即要打开代理状态

![image-20220727162402250](httpTohttps/image-20220727162402250.png)

不然就是还是否会提示“Win没有足够信息，不能验证该证书”

![image-20220727162258109](httpTohttps/image-20220727162258109.png)

这就是关了小云朵后的提示



### 缺点二

即使申请的证书是15年，也是内部有效时间，对外，即客户层面看到的证书，还是cloudflare帮我们自动申请的，Let,s encrypt的E1证书

![image-20220727162759637](https://oss.mailberry.com.cn/picgo/202207/image-20220727162759637.png)


不过这个不用我们自己再申请了，还是会一劳永逸的方法

如果能接受上面的两缺点，那我们才开始操作吧，如果接受不了，就放弃吧



## 申请过程

### 第一步

> 登录cloudflare——SSL/TLS—— 概述——完全（严格）

![image-20220727163313490](httpTohttps/image-20220727163313490.png)

### 第二步

> SSL/TLS——源服务器——创建证书

![image-20220727163526121](httpTohttps/image-20220727163526121.png)

### 第三步

> 选择使用cloudflare生成私钥和CSR，类型默认RAS（2048）就可以了，创建

![image-20220727163640367](httpTohttps/image-20220727163640367.png)



### 第四步

> 复制pem和key，自行保存，这里的key只出现一次，**切记复制保存，切记复制保存，切记复制保存（重要）**

![image-20220727164346880](httpTohttps/image-20220727164346880.png)

### 第五步

> 解析域名并开启代理小云朵，大功告成



## 总结

优点是15年，不需要自己为证书牵挂，缺点就是要依赖小云朵的CDN，要保持一一对应关系

我们个人申请的Let's encrypt是R3级别的，cloudflare帮我们申请的是E1级别的，有什么区别也不是很清楚，只知道是不一样的

区别如官方图示

![ISRG Certificate Hierarchy Diagram, as of December 2020](httpTohttps/isrg-hierarchy.png)

# 啛啛喳喳

## example.com.pem

```ssh
-----BEGIN CERTIFICATE-----
MIIEqDCCA5CgAwIBAgIUY72BCEoxK0fttQnDNWoNWkMP3e0wDQYJKoZIhvcNAQEL
BQAwgYsxCzAJBgNVBAYTAlVTMRkwFwYDVQQKExBDbG91ZEZsYXJlLCBJbmMuMTQw
MgYDVQQLEytDbG91ZEZsYXJlIE9yaWdpbiBTU0wgQ2VydGlmaWNhdGUgQXV0aG9y
aXR5MRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRMwEQYDVQQIEwpDYWxpZm9ybmlh
MB4XDTIzMDIyODEzMjUwMFoXDTM4MDIyNDEzMjUwMFowYjEZMBcGA1UEChMQQ2xv
dWRGbGFyZSwgSW5jLjEdMBsGA1UECxMUQ2xvdWRGbGFyZSBPcmlnaW4gQ0ExJjAk
BgNVBAMTHUNsb3VkRmxhcmUgT3JpZ2luIENlcnRpZmljYXRlMIIBIjANBgkqhkiG
9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk8Rq0HKdTXBd87lVJxS68MIWIjIxDsdbQk9T
it+uDAfJM9w6FpGNdTCpJ2x62PY/DgQIaUbIIW4u5fOcwIADw9RJe87ReDT5/ALQ
FzKqY4nU+NYqR5pltP5EDd/hr3/DWkrzGsA2s2+1o66Yaz/sKkf3kGqhBfhzZzqI
OTGrQITdAffHXAvU58BdSSZMzaBSyRS8rBhzrozQO//JDFiDi5SwhEdT80GgwPdl
VH8TUevozT7nZJ+bfW2LUxYJDsXP8jmJrY1LTdzv/ATWFclbFoQ3U+Kl/TNGA6Nl
wh4gA03nKmq9Axe6OpsjbQAbI9u8dgizko4D44CZPRHW4z4QjQIDAQABo4IBKjCC
ASYwDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMCBggrBgEFBQcD
ATAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBTrVECBx9++zbl/MZYLfOa3fy1jmjAf
BgNVHSMEGDAWgBQk6FNXXXw0QIep65TbuuEWePwppDBABggrBgEFBQcBAQQ0MDIw
MAYIKwYBBQUHMAGGJGh0dHA6Ly9vY3NwLmNsb3VkZmxhcmUuY29tL29yaWdpbl9j
YTArBgNVHREEJDAighAqLnpqbmJvbmUuZXUub3Jngg56am5ib25lLmV1Lm9yZzA4
BgNVHR8EMTAvMC2gK6AphidodHRwOi8vY3JsLmNsb3VkZmxhcmUuY29tL29yaWdp
bl9jYS5jcmwwDQYJKoZIhvcNAQELBQADggEBAAim9VojlvnE71pLa5s8lzyJEplF
aNYdPd2Wu4PupjDb/ckvHs2UYw+YSrl9etw/9HsG3kv7Ili78F8DUo5icnyyCMeT
VEiT2c0ihEI7dCY7ibXTwzxItmXnEjo9NCNMNOttRTR1FRR0/HUU/Atb9LbWd6YU
oh0iyEsSQCB9A6fqdPJUalFBUuxE3d9WFX8vuPQ+wIcVTu0uv+gdXRFG9XOln/YL
Xph1a25sUQizE4RHRLLlGqECfhvT9wfECF8NFMmnduI8tcWgfrW1+07rTMcMAnLd
2rg+/0v2YzzDmrr/SnNUB/90T5B8hLYyoGXfgoqAebrQLIrNMEVunx/cb20=
-----END CERTIFICATE-----

```



## example.com.key

```pem
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTxGrQcp1NcF3z
uVUnFLrwwhYiMjEOx1tCT1OK364MB8kz3DoWkY11MKknbHrY9j8OBAhpRsghbi7l
85zAgAPD1El7ztF4NPn8AtAXMqpjidT41ipHmmW0/kQN3+Gvf8NaSvMawDazb7Wj
rphrP+wqR/eQaqEF+HNnOog5MatAhN0B98dcC9TnwF1JJkzNoFLJFLysGHOujNA7
/8kMWIOLlLCER1PzQaDA92VUfxNR6+jNPudkn5t9bYtTFgkOxc/yOYmtjUtN3O/8
BNYVyVsWhDdT4qX9M0YDo2XCHiADTecqar0DF7o6myNtABsj27x2CLOSjgPjgJk9
EdbjPhCNAgMBAAECggEAA0FVQZaRlvOqwFEValeEs4xGOAQ7k6HnDhf4vZK3WtYX
eSPuLlRL3CIcKOosd29f9UtZ+40Q9kDnqsgY9PwhOzx/TrhALquZ9jTgDokrdq99
1D+jjbv9zVO5bSPA7QTQ2FvVyugBGUk/YDCFyf10X3w1T/NFIE0UDtCCNzOI6TA/
zECGHxUJPhSc5H6kajApRCvQDrXxer+r7+QEj2irjs0zFtDfw1gpVHsBvENWWz4L
l3EvgYX9YfCuk31KkO+HueRDpx82ontawEADiYj1q/YcJXiAK2jLhUtzfE1m9DZe
+/WNLhrbfd/XDU8VAeW/PLo0n5sa8zrf0serVkIGYQKBgQDJEY4tJUz6ICLMGie5
79WGX4qNs19733d/dI/Agg3d1xNGDkFfrJcZ4aZTJcHRR+2Q5WJvBQDkWVjWJ1Q6
u1HBYfR+4x47qWWsvpOeI6oCg1EEY1zg946WMIrGY2fBAtG8G/I0quJGmkMs5qW8
OQLOZ+QTFfj47ZYPFnMaxADlSwKBgQC8Iwt2iU/2IApEky3KtFDaZZzqPq4nQTa+
FaebjkgioXUR/Qcm4RyZoAmDs3d5VJXEWYm4Gx9t9NsF80Z0IyKD3Iqz2Sa8Ht1S
NHDUqCDPhar/5iWh58cEJCKynH+CvyOOmnsStq1d1xN439zwYYRHLIceOg2jg04l
wW0KmqWyhwKBgHLBjj+99j0bckDC/MFmXJugk9dj9K8iT3Vy9UiN8ZQXWGy3XiBY
xLSE0QTLm97yCmiUQqXSWTv6snUnZS9QEc0pNv3kajDq8Zix/FZZTIK6p9a1TyEm
qT6W3d10hpbmIQYXfRkKHrLlAEn0KctPToa3TLiH5d1M3EQoL/GqxEgZAoGBAKQV
VHwPiiO5Eft4+ake1p2DnfVWsYEfCWWDcWjkENnTQ01rBv/LuavqviGVNpAlS3Gy
PcDKNwEpWpS39ix4MDQc9wOgUn4j1RdLEVUHRYZ4qAkDarLoeNSNx41LnJIlrhdD
eC98D3wWhq8XX5RvGHUSys18CEUh0dhv+HAVLIqlAoGAGUGbX/9EbJZ4GZH84hVV
DGj2EzRxju7AZxhXJHpDSLN1Qwj232lxmsLKiauZI6lP+UWWCYCJiXfyEjT71waD
mNTM4psHx9D11x3nmeFWF3yRbzdWo/DkAevqK/KnY8lw4GnBNHOe/OBRXQggMXZE
O7mmOQUScmPn1vk5z1WBSzI=
-----END PRIVATE KEY-----

```



