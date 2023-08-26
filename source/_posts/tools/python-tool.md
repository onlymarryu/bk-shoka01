---
title: python
date: 2022-10-15-13:17:35
categories:
	- 工具软件安装
tags:
	- 工具软件安装
---


### Python升级

国内镜像：https://registry.npmmirror.com/binary.html

#### 一、**查看当前python版本**

```
#[root@ansible ~]# python -V
Python 2.7.5
```



#### 二、**下载新的python包并安装**

​	进入python官网（https://www.python.org），选择需要的版本。此处我选择当前最新版本Python3.6.1

```
yum install gcc gcc-c++ -y

wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tar.xz

tar xvf Python-3.7.3.tar.xz 

cd Python-3.7.3/

 ./configure
 
make

make install
```

#### 三、**验证**

```
#python -V     #一个是旧版本，一个是新版本
Python 2.7.5
### python3 -V
Python 3.7.3
```

#### 四、**设置3.X为默认版本**

​	查看 Python 的路径，在 /usr/bin 下面。可以看到 python 链接的是 python 2.7，所以，执行 python 就相当于执行 python 2.7。

```
#[root@ansible ~]# ls -al /usr/bin | grep python
-rwxr-xr-x.   1 root root       11232 Dec  2  2016 abrt-action-analyze-python
lrwxrwxrwx.   1 root root           7 May 26  2017 python -> python2
lrwxrwxrwx.   1 root root           9 May 26  2017 python2 -> python2.7
-rwxr-xr-x.   1 root root        7136 Nov  6  2016 python2.7
```

将原来 python 的软链接重命名：

```
  mv /usr/bin/python /usr/bin/python.bak
```

将 python 链接至 python3：

```
  ln -s /usr/local/bin/python3 /usr/bin/python
```

#### 五、**配置yum**

​	升级 Python 之后，由于将默认的 python 指向了 python3，yum 不能正常使用，需要编辑 yum 的配置文件，此时：

```
#[root@ansible-admin Python-3.7.3]# yum list
  File "/usr/bin/yum", line 30
    except KeyboardInterrupt, e:

SyntaxError: invalid syntax
```

​	修改/usr/bin/yum和/usr/libexec/urlgrabber-ext-down，将 #!/usr/bin/python 改为 #!/usr/bin/python2.7，保存退出即可。

> vim /usr/bin/yum
>
> vim /usr/libexec/urlgrabber-ext-down
