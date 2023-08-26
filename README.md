# 雾都博客

> 这个仓库主要就是为了保存我们的雾都博客环境
> 里面包含了我们的学习资料，以及项目工程框架，所以我们在每次提交编译后的源码之后
> 一定要再更新一下我们的环境仓库信息



# 介绍

`hexo`是一个基于nodejs的静态博客网站生成器，作者是来自台湾的`Tommy Chen`，为许多技术博客的博主所青睐，主要有如下的一些优点：

* 支持Markdown语法，编辑简单，排版优美；

* 能够快速生成静态html文件；

* 部署容易，接口简单； 兼容于各大主流操作系统；

* 社区主题、插件很多，遇到问题的时候能查到的参考材料也很多。

Hexo官方文档：https://hexo.io/zh-cn/docs/

Gitee Pages：https://gitee.com/help/articles/4136#article-header0

# 环境配置

搭建hexo首先需要有nodejs的环境，可以从官网直接下载。

![nodejs](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/2xKvaPTDoyZcFbp.png)

# 生成博客

## 安装

有了npm包管理软件，安装hexo就很方便了，只需要一行命令：

```shell
npm install node # homebrew安装nodejs
```

其中-g参数表示全局安装，没有这个参数就只在当前目录下安装，建议全局安装。

## 初始化

运行命令：

```shell
hexo init
```

```shell
INFO  Cloning hexo-starter https://github.com/hexojs/hexo-starter.git
INFO  Install dependencies
# 一些可能的中间信息
INFO  Start blogging with Hexo!
```

然后进入博客目录：

>  cd "博客目录"

安装博客需要的其他支持：

 ```sh
 npm install # 安装的依赖项在package.json文件的dependencies字段中可以看到
 ```

## 博客项目目录结构介绍

查看目录结构：

 ```sh
tree -L 1 
 ```

结果如下：

> .
> ├── _config.landscape.yml
> ├── _config.yml
> ├── node_modules
> ├── package-lock.json
> ├── package.json
> ├── scaffolds
> ├── source
> └── themes

各部分的含义：

* \`_config.yml `
    * 为全局配置文件，网站的很多信息都在这里配置，比如说网站名称，副标题，描述，作者，语言，主题等等。具体可以参考官方文档：https://hexo.io/zh-cn/docs/configuration.html。
* ` _scaffolds `
    * 骨架文件，是生成新页面或者新博客的模版。可以根据需求编辑，当`hexo`生成新博客的时候，会用这里面的模版进行初始化。
* `_source`
    *  这个文件夹下面存放的是网站的`markdown`源文件，里面有一个`_post`文件夹，所有的`.md`博客文件都会存放在这个文件夹下。现在，你应该能看到里面有一个`hello-world.md`文件。_
* ` _themes `
    * 网站主题目录，`hexo`有非常丰富的主题支持，主题目录会存放在这个目录下面。
    * 我们后续会以默认主题来演示，更多的主题参见：https://hexo.io/themes/

## 生成新文章

```sh
hexo new post "test" # 会在 source/_posts/ 目录下生成文件 ‘test.md’，打开编辑
hexo generate        # 生成静态HTML文件到 /public 文件夹中
hexo server          # 本地运行server服务预览，打开 http://localhost:4000 即可预览你的博客
```

**本地预览效果：**

![image-20221006120456734](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221006120456734.png)

这是hexo的默认主题，更多的主题可以从官网下载。

更详细的hexo命令可以查看文档：https://hexo.io/zh-cn/docs/commands

# Hexo配置并部署

> 提前对要提交的仓库配置ssh

##  1.安装部署工具

```sh
npm install hexo-deployer-git --save
```

## 2.配置部署信息

站点配置文件_config.yml

```yml
deploy:
  type: git
  repo: <repository url> # 输入你的仓库地址
  branch: [branch] # 输入分支
  token:   #token
```

> deploy:
>
>  type: git
>
>  repo: git@gitee.com:cysheng/cysheng.git # 输入你的仓库地址
>
>  branch: master # 输入分支

## 3.部署

```sh
 hexo clean  
 hexo g  
 hexo d 
```

* hexo clean

  清除缓存文件 (db.json) 和已生成的静态文件 (public)。

* hexo g

  hexo解析站点文件夹，生成一个public文件夹（只包含浏览器可以解析的html、css、js），也就是我们需要部署的文件夹。

* hexo d

  部署，即将我们的public文件夹推送到我们配置的仓库

## 4.开启Gitee Pages服务

找到新创建的仓库->【服务】->【Gitee Pages】  ![hexo/image-20221006120734926](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221006120734926.png)

如图，选择部署分支，部署目录


* 部署分支，与本地hexo配置一致

* 部署目录，不填即整个仓库

* 强制使用https

  一个是进行加密，还有一个是我在用next主题时使用http访问会有跨域问题导致图标显示不出来

* 点击启动

* 访问给出的网站地址（以我的为例：https://cysheng.gitee.io）



# hexo 框架常用的指令：

| 指令                   | 说明                                      |
| :--------------------- | :---------------------------------------- |
| `hexo clean && hexo g` | 清除本地项目并重新生成 （重新部署时使用） |
| `hexo g`               | 重新生成                                  |
| `Hexo s`               | 开启本地预览                              |
| `Hexo d`               | 推送到github                              |



# 功能设置

## 标题和分类

在文章开头我们可以设置 FontMatter，例如

```yml
---
title: jQuery对表单的操作及更多应用 # 标题
date: 2022-01-07 22:53:43 # 创建时间
categories: # 分类，级别递减
- web前端 # 一级分类
- web前端2 # 二级分类
tags: # 标签，没有级别
    - a1
    - a2
---
```

​	为了简化我们的操作，所以我们可以以设置模板，在 `/scaffolds` 下的 `draft.md` 、`page.md` 、 `post.md`  我们用来设置模板，例如我们最常使用的`post` 目录下的文件，所以我们配置一下`post.md`

```yaml
---
title: {{ title }}
date: {{ date }}
comments:
tags:
---
```

**问题**

如果我们在没有找到 tags 、categories 、link 、about文件时，我们手动创建

```sh
hexo new page tags
hexo new page categories 
hexo new page link 
hexo new page about
```

成功后，提示

```sh
INFO  Created: ~/Documents/blog/source/xxx/index.md
```

根据上面的路径，找到`index.md`这个文件，打开后默认内容是这样的：

```yaml
---
title: 文章分类
date: 2022-01-07 22:53:43
type: "categories" # 哪个文件就是那个类型
layout: "categories" # 哪个文件就是那个类型
---
```

最后清除缓存，重新启动就行了 

```sh
hexo cl && hexo g && hexo s
```



## 搜索

### 1、注册账号

官网：https://www.algolia.com/users/sign_in

### 2、之后在左侧导航栏中找到Search

![image-20221007104401652](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221007104401652.png)

### 3、创建Index

![image-20221007104429043](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221007104429043.png)

![image-20221007104449209](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221007104449209.png)

**随便写**

### 4、创建APPID

![image-20221007105625601](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221007105625601.png)

![image-20221007105704120](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221007105704120.png)

这两个后面有用

![image-20221007105750168](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221007105750168.png)

> Indices 是我们上面创建 index 

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/20210516112405506.png)



### 5、到博客根目录下安装hexo-algolia

```sh
npm install hexo-algolia --save
```

### 6、前往站点根目录打开_config.yml添加以下代码

> **注意：**这是对全局的配置，所以是根目录的配置

```sh
algolia:
  appId:  "***"  #上面的application ID
  apiKey:  "****"  # 上面的 Search-Only API Key
  adminApiKey:  "***"  #上面的 Admin API Keys
  chunkSize:  5000
  indexName:  "test001" # Indices的index
  fields: # 要搜索的词条范围
    - title #必须配置
    - path #必须配置
    - categories #推荐配置
    - content:strip:truncate,0,2000
    - tags
```

例如：

```yml
algolia:
  appId: "Z7A3XW4R2I"
  apiKey: "12db1ad54372045549ef465881c17e743"
  adminApiKey: "40321c7c207e7f73b63a19aa24c4761b"
  chunkSize: 5000
  indexName: "my-hexo-blog"
  fields:
    - content:strip:truncate,0,500
    - excerpt:strip
    - gallery
    - permalink
    - photos
    - slug
    - tags
    - title
```

### 7、设置HEXO_ALGOLIA_INDEXING_KEY

在博客根目录右击git bash

```sh
# export HEXO_ALGOLIA_INDEXING_KEY="你刚才新创建的 APPKEY、appId、adminApiKey "一个试一下 
export HEXO_ALGOLIA_INDEXING_KEY="******" 
# 将我们的信息上川岛algolia
hexo algolia
```

### 8、修改主题内的_config.yml

> **注意：** 这是是对主题的配置

```yml
#Algolia Search
algolia_search:
  enable: true
  hits:
    per_page: 6
  labels:
    input_placeholder: Search for Posts !
    hits_empty: '我们没有找到任何搜索结果：${query}'
    hits_stats: '找到约${hits}条结果 (用时${time}ms)'

# local searach
local_sreach:
  enable : false
```

### 9、启动即可

```sh
hexo s
```

### 10、测试

![image-20221007123724497](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221007123724497.png)

参考：https://blog.csdn.net/qq_45173404/article/details/122861321







## 目录

==toc 插件是：添加生成文章目录的一个插件==

一、安装(这里是hexo的路径下，也就是博客根目录下)

```shell
npm install hexo-toc --save
```

二、配置博客根目录下的_config.yml文件：

```yml
toc:  
  maxdepth: 3 
```



在最后的空白处添加

三、在markdown里使用

在Markdown中需要显示文章目录的地方添加

```shell
<!-- toc -->
```

然后就会将他==后面==的内容按照标题级别分层



##  图片显示

### 方法一：

**typroa设置**

打开typora，选择：偏好设置 - 图像 - 插入图片时，做如下更改：

> 复制到指定路径
>
> ./${filename}

当插入图片时，会生成一个和文件名相同的文件夹，并将图片存入这个文件夹内。

**Hexo 设置**

1. 安装 `hexo-renderer-marked`

```sh
npm install hexo-renderer-marked --save
```

2. 之后更改 _config.yml 配置

```yml
post_asset_folder: true 
```

安装插件`hexo-image-link `

```shell
npm install hexo-image-link --save
```

此时，在typora 文件中正常显示的图片，在hexo发布后依旧能正常显示。

**NOTE：**

1. 如果想用插件 `Hexo-renderer-markdown-it `（推荐）代替 `Hexo-renderer-marked `

```sh
npm uninstall hexo-renderer-marker --save  #卸载 marked 

npm install hexo-renderer-markdown-it --save  #安装markdown-it
```

2. 路径转换的解释

假设：
文件名: ./test.md

图片路径: ./test/image.jpg

```
当插入图片 image.jpg 到 test.md 中时，typora 的引用路径为
 {% asset_img image.jpg  %} 

Hexo 发布后的引用路径为
![](image.jpg) 
```

因此，typora的md文件引入hexo时，应转换路径。即删掉图片路径中的 "test/"部分；（此时md文件已不能正常显示图片，而 hexo server 可正常显示）

插件hexo-image-link帮助实现了这种路径转换。

安装后，typora 文件中正常显示的图片，在hexo发布后依旧能正常显示。

### 方法2：

> 同样的思路，相对路径，

下载插件

```shell
npm install hexo-asset-img --save
```

> 文件要求：
>
> ​	图片必须在 xx.md 同一级目录下的同名文件中存储，也就是在xx 文件夹下，所以md文档的图片路径就是	==![图片注释]\(xx/图片名)==



## 每篇文章的log设置

```
---
***
cover: 图床链接/图片路径
---
```



# 主题

* [aurora](https://aurora.tridiamond.tech/zh/guide/getting-started.html#%E4%BE%9D%E8%B5%96%E7%8E%AF%E5%A2%83)    	（最推荐）
* [shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)        （好看，但是少东西，好多要自己配）
* [next](https://github.com/next-theme/hexo-theme-next)           （中等，但是好多人用，配东西好查的一批）
* [butterfly  ](https://github.com/jerryc127/hexo-theme-butterfly)（中等，要自己配一些）

## aurora

官网：https://aurora.tridiamond.tech/zh/guide/#%E4%B8%8E-obsidian-%E7%9B%B8%E6%AF%94

直接按照官网的一步一步操作下来就行

## shoka

官网：https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/

```shell
npm i  hexo-renderer-multi-markdown-it --save
npm i  hexo-autoprefixer --save
npm i  hexo-algoliasearch --save
npm i  hexo-symbols-count-time --save
npm i  hexo-feed --save
npm un hexo-renderer-marked --save      #删除多余的库

git clone https://github.com/amehime/hexo-theme-shoka.git ./themes/shoka
```

\_config.yml

```yaml
# markdown渲染
markdown:
  render: # 渲染器设置
    html: false # 过滤 HTML 标签
    xhtmlOut: true # 使用 '/' 来闭合单标签 （比如 <br />）。
    breaks: true # 转换段落里的 '\n' 到 <br>。
    linkify: true # 将类似 URL 的文本自动转换为链接。
    typographer: 
    quotes: '“”‘’'
  plugins: # markdown-it 插件设置
    - plugin:
        name: markdown-it-toc-and-anchor
        enable: true
        options: # 文章目录以及锚点应用的 class 名称，shoka 主题必须设置成这样
          tocClassName: 'toc'
          anchorClassName: 'anchor'
    - plugin:
        name: markdown-it-multimd-table
        enable: true
        options:
          multiline: true
          rowspan: true
          headerless: true
    - plugin:
        name: ./markdown-it-furigana
        enable: true
        options:
          fallbackParens: "()"
    - plugin:
        name: ./markdown-it-spoiler
        enable: true
        options:
          title: "你知道得太多了"

# 压缩CSS/hTML
minify:
  html:
    enable: true
    exclude: # 排除 hexo-feed 用到的模板文件
      - '**/json.ejs'
      - '**/atom.ejs'
      - '**/rss.ejs'
  css:
    enable: true
    exclude:
      - '**/*.min.css'
  js:
    enable: true
    mangle:
      toplevel: true
    output:
    compress:
    exclude:
      - '**/*.min.js'

#css文件后缀
autoprefixer:
  exclude:
    - '*.min.css'

# 全文搜索
algolia:
  appId: #Your appId
  apiKey: #Your apiKey
  adminApiKey: #Your adminApiKey
  chunkSize: 5000
  indexName: #"shoka"
  fields:
    - title #必须配置
    - path #必须配置
    - categories #推荐配置
    - content:strip:truncate,0,2000
    - gallery
    - photos
    - tags
    
```





## 未完成

# Netlify部署

> **前提**：
>
> 	在github上建立一个仓库，权限无所谓
> 	上传也只需要传编译后的public文件就行了

* [Netlify](https://www.netlify.com/) 账号注册

* 添加新的站点

    ![image-20221013222215469](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221013222215469.png)

    ![connect-github](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/oSa6BOtIQ8WkZX1.png)

* 选取一个仓库，作为我们的资源地址

    ![image-20221013222447157](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221013222447157.png)

* 一切默认，除了构建命令改成我们之前设置的`npm run netlify` ，当然也可以不设置

    前提要在`package.json` 里面添加一个 `netlify` 命令 ，例如我们的：

    ```json
    "scripts": {
        	"build": "hexo generate",
        	"clean": "hexo clean",
        	"deploy": "hexo deploy",
        	"server": "hexo server",
        	// 每次提交会清除内容，然后重新建立项目，不要在项目中写这个注释，报错
        	"netlify": "npm run clean && npm run build" 
      },
    ```

    还要有将你的全部文件上传到github，才可以使用`npm`
    
    ![site-config](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/p3P2NJaQzuIZnYs.png)

> 这里BaseDirectory为空表示项目目录是仓库目录的根目录。

* 构建完成后我们就能够看到一个URL，打开网址就是我们的个人博客了

![image-20221013223348730](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221013223348730.png)

* 修改地址前缀（**因为后缀不能改**）

    网站设置—》常规—》更改站点名，完成后缀是固定的 ` *.netlify.app` ，要想改变就要买域名，然后配置域名的映射。

* 配置域名映射

    ![image-20221013223414819](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/image-20221013223414819.png)

    * 配置域名的前提自然是要购买域名了，从任意域名服务商处购买一个域名。

    ![domian-purchase](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/DFHYzywifpJTxqj.png)

    * 然后设置域名解析，类型为CNAME（DNS知识点参见计算机网络相关教程），内容为xxxxx.netlify.app，其中xxxxx为你自己设置的个性二级域名。

    ![domain-resolve](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/5OVcw9ypvRKQePJ.png)

    * 设置完毕之后需要等待一段时间，因为DNS服务器需要一段时间来进行同步。

        然后，我们还需要回到netlify中配置一下自己的用户域名，这样的话可以在国外获得netlify本身的CDN支持。

        * 在netlify设置用户域名。

            ![set-custom-domain](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/MDjxbIcWBEoLURA.png)

            * 进行相关的配置，由于我们的域名本身已经配置了解析，这里会显示出来，不用再额外添加记录，只需要一路默认即可。

                ![add-record](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/cqwL9xF8Eov6yVa.png)

                ![activate-dns](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/RTLcjynQYXbW9vI.png)

            * 设置一下netlify本身的对于国外CDN的支持。

                ![netlify-cdn](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/8v3ROjQc2WY9q7T.png)

                之后，我们就可以通过自己配置的域名访问自己的个人博客。

    >这里`https`访问需要在`netlify`中配置，否则应该只能`http`访问。
    >[![https-config](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/f3q8hPbG5vsImeY.png)](https://s2.loli.net/2022/09/05/f3q8hPbG5vsImeY.png)
    >需要注意一下的是，此刻的https配置过程中的dns验证已经可以通过，但是证书检查会失败，等到后面clouldflare加速配置完成之后，这个问题 就可以解决了。所以暂时应该只能http访问。

    **但是，此刻我们的博客访问依然需要科学上网，因为我们还没有国内的CDN的支持，下面，我们来解决这个问题。**



# ClouldFlare加速

## 介绍

Netlify 虽然已经提供了 CDN 加速，但在使用过程中发现国内访问还是比较慢，Cloudflare 相对于国内的七牛云、阿里云等云服务商的 CDN 速度会慢一些，但是它有免费版本，而且最重要的是域名不用备案。

## 加速步骤

1. 注册[Clouldflare](https://www.cloudflare.com/zh-cn/)并登陆

2. 添加站点

    - [![add-site](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/rqNObP5dzE6GY83.png)](https://s2.loli.net/2022/09/05/rqNObP5dzE6GY83.png)
    - [![config-site](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/Dk3Y4BrltQeCOHI.png)](https://s2.loli.net/2022/09/05/Dk3Y4BrltQeCOHI.png)

3. 选择免费套餐

    - [![choose-project](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/SrhEAvmGZeqn8Co.png)](https://s2.loli.net/2022/09/05/SrhEAvmGZeqn8Co.png)

4. 添加 DNS 记录

    - 一般情况下 Cloudflare 会检测出来几条 DNS 记录，类型大多数是A，或者AAAA，由于我们是转发，所以应该是 CNAME 类型才对。有必要的话可能得手动配置一下。

        [
            ![update-record](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/fSsAGV5JCeZuF1w.png)](https://s2.loli.net/2022/09/05/fSsAGV5JCeZuF1w.png)

    - 更改名称服务器
        - 这个步骤Cloudflare会提供一个在线的教程，主要步骤是在你的域名服务商那里修改 dns 解析服务器为 cloudflare 提供的地址，修改完成后点击完成。
        - [![modify-server](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/vd2WxXGbJHmgAey.png)](https://s2.loli.net/2022/09/05/vd2WxXGbJHmgAey.png)
        - 以阿里云为例，设置的步骤如下:
            1. 进入域名的配置界面
                - [![dns-manage](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/ZfLiNUejRsCyhG3.png)](https://s2.loli.net/2022/09/05/ZfLiNUejRsCyhG3.png)
            2. 将域名服务器从阿里云的默认服务器改成clouldflare的服务器
                - [![change-server](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/juxWl7i9QaeLTGK.png)](https://s2.loli.net/2022/09/05/juxWl7i9QaeLTGK.png)
        - 配置完成后，clouldflare会有邮件通知(一般不会等太久)
            [![mail-notice](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/JbBvp18Trne37kC.png)](https://s2.loli.net/2022/09/05/JbBvp18Trne37kC.png)

    ## 配置https

    在clouldflare配置完成之后，我们可以回到netlify去配置一下https访问。

    1. 先确认一下dns解析
    2. :
        - [![verify-dns](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/r6iHKWLktnRap1j.png)](https://s2.loli.net/2022/09/05/r6iHKWLktnRap1j.png)
    3. 然后自动安装证书:
        - [![certify](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/KvDupBFh8b9CScN.png)](https://s2.loli.net/2022/09/05/KvDupBFh8b9CScN.png)
    4. 最后看到如下的界面，就说明https配置完成了
        - [![15](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/aaa.jpg)](https://s2.loli.net/2022/09/05/f3q8hPbG5vsImeY.png)

    # 测试站点

    等待一段时间之后，我们可以试着用自己的浏览器去访问自己配置的域名地址，如果在不科学上网的情况下能够正常看到如下的默认页面，则我们的个人博客就配置成功了。

    [![default-page](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/HESMpeXbUFT3rsR.png)](https://s2.loli.net/2022/09/05/HESMpeXbUFT3rsR.png)

    本机能够正常访问之后，我们可以用[拨测](https://www.boce.com/)来检测一下域名解析与访问的速度。

    [![22](https://cdn.jsdelivr.net/gh/onlymarryu/typora-ims-test@master/daisnvonqov.jpg)](https://s2.loli.net/2022/09/05/7C496Ruof1rBknM.png)

    到此为止，我们的个人博客就彻底搭建完成啦。后续我们只需要修改博客的配置文件和博客本身的markdown源文件，然后push到github上，netlify会自动帮我们运行当初配置的建站脚本，然后将生成在public文件夹中的静态网页部署出去。

    关于hexo博客的[写作方法](https://hexo.io/zh-cn/docs/writing)与各种好看的[主题的配置](https://hexo.io/themes/)可以查看官方的文档，多尝试多摸索，配置自己的个性页面吧。

