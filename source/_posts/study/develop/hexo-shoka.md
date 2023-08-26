---
title: hexo_shoka
date: 2023-02-27 14:27:41

categories:
  - 小实验
tags:
  - 小实验
---

# 简介

1. 想要快速搭建起来，下载完主题，安装核心依赖，然后修改 hexo 全局配置中的 `theme` 为 `shoka` 即可
2. 完全参考我的，无脑跟着操作即可，其他配置可以参考文档来添加
   官方参考文档：https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/

# 主题

```sh
git clone https://github.com/amehime/hexo-theme-shoka.git ./themes/shoka
```

# 核心插件\*

```sh
npm i  hexo-autoprefixer   --save
# algolia搜索
npm i  hexo-algoliasearch   --save
# 图片地址自动转化为hexo要求
npm i  hexo-image-link   --save
# 要下载 主题专属的Markdown解析插件必须设置这个
export PUPPETEER_SKIP_DOWNLOAD='true'
npm i  hexo-renderer-multi-markdown-it   --save
npm i  hexo-feed   --save
npm i  hexo-symbols-count-time   --save
```

# 卸载自带的一些依赖

```sh
# 因为shoka主题自己有特定的解析器，自带的一律卸载
npm un hexo-renderer-marked
# 这是默认主题，直接卸载
npm un hexo-theme-landscape
```

# 可选插件

1. 评论

```sh
npm i  hexo-plugin-gitalk   --save
```

2. git 上传。这只是上传我们编译好的文件 public

```sh
npm i  hexo-deployer-git   --save
```

3. 文件加密

```sh
npm i  hexo-blog-encrypt   --save
```

# shoka 主题配置

> 在博客根目录建立一个 `_config.shoka.yml` 做为主题的专项配置，就不用去 theme 中专门去改，他会覆盖掉 theme 中的配置项
> 我的配置：

```yml
alternate: 雾都博客

# Assets
statics: / #//cdn.jsdelivr.net/gh/amehime/shoka@latest/

open_graph:
  #twitter_id:
  #google_plus:
  #fb_admins:
  #fb_app_id:

# 自动定位,返回你之前看到的地方
auto_scroll: false

# 侧边栏
sidebar:
  # Sidebar Position.
  position: left
  # position: right
  # Replace the default avatar image and set the url here.
  avatar: avatar.jpg

menu:
  home: / || home
  archives: /archives/ || list-alt
  posts:
    default: / || feather
    categories: /categories/ || th
    tags: /tags/ || tags
    toolsPage: /toolPage/ || feather
    projectBuild: /projectBuild/ || th
  mianshi: /mianshi/ || calendar
  study: /study/ || sakura
  friends: /friends/ || heart
  about: /about/ || calendar

# Social Links
# Usage: `Key: permalink || icon || color`
# Key is the link label showing to end users.
# Value before `||` delimiter is the target permalink,
# secend value is the name of Font icon.
# project of https://www.iconfont.cn/
# //at.alicdn.com/t/font_1832207_c8i9n1ulxlt.css => 1832207_c8i9n1ulxlt
iconfont: "1832207_igi8uaupcus"
# iconfont: "3731160_8pmmsyz1p7k"

social:
  #这里有问题要换成你自己的
  github: https://github.com/onlymarryu || github || "#191717"
  # github: https://github.com/onlymarryu || github1 || "#191717"
  # CSDN: https://blog.csdn.net/Bkhole?spm=1000.2115.3001.5343 || csdn || "#ea716e"
  # fengye: https://cloud.fynote.com/edit?nid=113796&id=1567528016345563136&t=1665816345587 || icon9 || "#55acd5"
  # yuque: https://www.yuque.com/dashboard/recent || tubiaozhizuomoban || "#20FB25"
  # google: https://plus.google.com/ || google
  # twitter: https://twitter.com/amehime || twitter || "#00aff0"
  zhihu: https://www.zhihu.com/people/rurismzk || zhihu || "#1e88e5"
  music: https://music.163.com/#/my/m/music/playlist?id=3166060790 || cloud-music || "#e60026"
  weibo: https://weibo.com/amehime || weibo || "#ea716e"
  # about: https://about.me/amehime || address-card || "#3b5998"
  # email: mailto:yourname@mail.com || envelope || "#55acd5"
  #facebook: https://www.facebook.com/yourname || facebook
  #stackoverflow: https://stackoverflow.com/yourname || stack-overflow
  #youtube: https://youtube.com/yourname || youtube
  #instagram: https://instagram.com/yourname || instagram
  #skype: skype:yourname?call|chat || skype
  #douban: https://www.douban.com/people/yourname/ || douban

footer:
  # Specify the date when the site was setup. If not defined, current year will be used.
  since: 2010
  count: true

post:
  count: true

# ---------------------------------------------------------------
# Third Party Plugins & Services Settings
# ---------------------------------------------------------------

# Comments
# Valine
# For more information: https://valine.js.org, https://github.com/xCss/Valine
# valine:
#   enable: false
#   appId: CcRFYrQF2jeLivqZJ02IX02H-gzGzoHsz  #Your_appId
#   appKey: xDkO9dJRzIJK7n0GofHoyP0y  #Your_appkey
#   placeholder: ヽ(○´∀`)ﾉ♪  # Comment box placeholder
#   avatar: wavatar  # Gravatar style : mp, identicon, monsterid, wavatar, robohash, retro
#   pageSize: 10  # Pagination size
#   lang: zh-CN
#   visitor: true # 文章访问量统计
#   NoRecordIP: false # 不记录 IP
#   serverURLs: # When the custom domain name is enabled, fill it in here (it will be detected automatically by default, no need to fill in)
#   powerMode: true # 默认打开评论框输入特效
#   tagMember:
#     master:
#       # - hash of master@email.com
#       # - hash of master2@email.com
#     friend:
#       # - hash of friend@email.com
#       # - hash of friend2@email.com
#     investor:
#       # - hash of investor1@email.com
# valine:
#   appId: #这里不要忘了改
#   appKey: #这里不要忘了改
#   placeholder: ヽ(○´∀`)ﾉ♪ # Comment box placeholder
#   pageSize: 10 # Pagination size
#   lang: zh-CN
#   tagMember:
#     master:
#       # - deea5a8d259d17182a53be1772e4c182
#     friend:
#       - deea5a8d259d17182a53be1772e4c182

# 随机图床Api 百度
# image_server: "https://api.ixiaowai.cn/api/api.php"
# image_server: "https://api.yimian.xyz/img"

# bgm
audio:
  - title: 网易音乐
    list:
      # 这里有问题，要换成你自己的
      - https://music.163.com/#/my/m/music/playlist?id=xxxx
  - title: QQ音乐
    # QQ 音乐要自带.html
    list:
      # 这里有问题，要换成你自己的
      - https://y.qq.com/n/ryqq/playlist/xxxx.html

# Dependencies: https://github.com/amehime/hexo-renderer-multi-markdown-it
pangu: true

# ---------------------------------------------------------------
# analytics & SEO Settings
# ---------------------------------------------------------------

# Disable Baidu transformation on mobile devices.
disable_baidu_transformation: true

# Automatically add external URL with Base64 encrypt & decrypt.
exturl: true

#Algolia Search
algolia_search:
  enable: true
  hits:
    per_page: 6
  labels:
    input_placeholder: Search for Posts !
    hits_empty: "我们没有找到任何搜索结果：${query}"
    hits_stats: "找到约${hits}条结果 (用时${time}ms)"

# local searach
local_sreach:
  enable: false

# 是否显示页面加载动画 loading-cat
loader:
  start: true # 当初次打开页面时，显示加载动画
  switch: false # tab 切换到其他页面时，显示加载动画
```

# hexo 全局配置

> 就是修改 `_config.yml`

```yml
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: #你自己的
subtitle: ""
# description: '记录“美食”每刻'
description: #你自己的
keywords:
author: #你自己的
language: zh-CN
timezone: "Asia/Shanghai"

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: #你自己的
root: /
permalink: :title/ # edit for Theme.shoka
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link:
  enable: true # Open external links in new tab
  field: site # Apply to the whole site
  exclude: ""
filename_case: 0
render_drafts: false
post_asset_folder: true
relative_link: false
future: true
highlight:
  enable: false # edit for Theme.shoka
  line_number: true
  auto_detect: false
  tab_replace: ""
prismjs:
  enable: false # edit for Theme.shoka

# Category & Tag
default_category: uncategorized
category_map: # edit for Theme.shoka
tag_map:

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: shoka # edit for Theme.shoka

# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: "git"
  repo: #你自己的 #https://bitbucket.org/JohnSmith/johnsmith.bitbucket.io
  branch: #你自己的
  token: #你自己的

# edit for Theme.shoka
autoprefixer:
  exclude:
    - "*.min.css"

markdown:
  render: # 渲染器设置
    html: true # 过滤 HTML 标签
    xhtmlOut: true # 使用 '/' 来闭合单标签 （比如 <br />）。
    breaks: true # 转换段落里的 '\n' 到 <br>。
    linkify: true # 将类似 URL 的文本自动转换为链接。
    typographer:
    quotes: "“”‘’"
  plugins: # markdown-it插件设置
    - plugin:
        name: markdown-it-toc-and-anchor
        enable: true
        options: # 文章目录以及锚点应用的class名称，shoka主题必须设置成这样
          tocClassName: "toc"
          anchorClassName: "anchor"
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
    - plugin:
        name: markdown-it-emoji
        enable: true

# hexo-plugin-gitalk
plugins:
  gitalk:
    clientID: #你自己的
    clientSecret: #你自己的
    repo: #你自己的
    owner: #你自己的
    admin:
      -  #你自己的
    distractionFreeMode: false
    language: zh-CN
    proxy: #你自己的
    perPage: 15

minify:
  html:
    enable: true
    stamp: false
    exclude:
      - "**/json.ejs"
      - "**/atom.ejs"
      - "**/rss.ejs"
  css:
    enable: true
    stamp: false
    exclude:
      - "**/*.min.css"
  js:
    enable: true
    stamp: false
    mangle:
      toplevel: true
    output:
    compress:
    exclude:
      - "**/*.min.js"

feed:
  limit: 20
  order_by: "-date"
  tag_dir: false
  category_dir: false
  rss:
    enable: true
    template: "themes/shoka/layout/_alternate/rss.ejs"
    output: "rss.xml"
  atom:
    enable: true
    template: "themes/shoka/layout/_alternate/atom.ejs"
    output: "atom.xml"
  jsonFeed:
    enable: true
    template: "themes/shoka/layout/_alternate/json.ejs"
    output: "feed.json"

algolia:
  appId: #你自己的
  apiKey: #你自己的
  adminApiKey: #你自己的
  chunkSize: 5000
  indexName: #你自己的
  fields:
    - title #必须配置
    - path #必须配置
    - categories #推荐配置
    - content:strip:truncate,0,4000
    - tags
    - mianshi
    - toolPage
# 文章加密  hexo-blog-encrypt
encrypt:
  enable: true
  abstract: 这是一篇加密文章，内容可能是个人情感宣泄或者收费技术。如果你非常好奇，请与我联系。
  message: 这是一篇加密文章，请输入密码，查看文章。
  # 可以直接指定 tag 加密
  tags:
    - { name: tagName, password: 密码A }
  wrong_pass_message: 抱歉, 这个密码看着不太对, 请再试试.
  wrong_hash_message: 抱歉, 这个文章不能被校验, 不过您还是能看看解密后的内容.
```
