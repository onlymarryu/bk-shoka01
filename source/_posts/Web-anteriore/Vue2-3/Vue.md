---
title: Vue2
date: 2023-6-2
categories: 
  - 前端
  - 框架
tags:
  - 框架
---



**Vue技术栈(全家桶)**

> 尚硅谷前端研究院

# 第 1 章：Vue 核心

## 1.1. Vue 简介

### 1.1.1. 官网

1.  英文官网: [[https://vuejs.org/]{.underline}](https://vuejs.org/)

2.  中文官网:
    [[https://cn.vuejs.org/]{.underline}](https://cn.vuejs.org/)

### 1.1.2. 介绍与描述

1.  动态构建用户界面的**渐进式** JavaScript 框架

2.  作者: 尤雨溪

### 1.1.3. Vue 的特点

1.  遵循 **MVVM** 模式

2.  编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发

3.  它本身只关注 UI, 也可以引入其它第三方库开发项目

### 1.1.4. 与其它 JS 框架的关联

1.  借鉴 Angular 的**模板**和**数据绑定**技术

2.  借鉴 React 的**组件化**和**虚拟 DOM** 技术

### 1.1.5. Vue 周边库

1.  vue-cli: vue 脚手架

2.  vue-resource

3.  axios

4.  vue-router: 路由

5.  vuex: 状态管理

6.  element-ui: 基于 vue 的 UI 组件库(PC 端)

> ......

## 1.2. 初识 Vue

![](./media/image1.jpg){width="3.730944881889764in"
height="2.4135837707786525in"}

## 1.3. 模板语法

### 1.3.1. 效果

![](./media/image2.jpg){width="3.4712226596675415in"
height="2.501083770778653in"}

### 1.3.2. 模板的理解

> html 中包含了一些 JS 语法代码，语法分为两种，分别为：

1.  插值语法（双大括号表达式）

2.  指令（以 v-开头）

### 1.3.3. 插值语法

1.  功能: 用于解析**标签体**内容

2.  语法: {{xxx}} ，xxxx 会作为 js 表达式解析

### 1.3.4. 指令语法

1.  功能: 解析**标签属性**、解析**标签体内容**、**绑定事件**

2.  举例：v-bind:href = \'xxxx\' ，xxxx 会作为 js 表达式被解析

3.  说明：Vue 中有有很多的指令，此处只是用 v-bind 举个例子

## 1.4. 数据绑定

### 1.4.1. 效果

![](./media/image3.jpg){width="3.291360454943132in"
height="3.0205282152230972in"}

### 1.4.2. 单向数据绑定

-----------------------------------------------------------------------
  v-bind:href =\"xxx\"

-----------------------------------------------------------------------

1.  语法：或简写为 :href

2.  特点：数据只能从 data 流向页面

### 1.4.3. 双向数据绑定

----------------------------------------------------------------

v-mode:value=\"xxx\"     

-------------------------------------------------------------

1.  语法： 或简写为     v-model=\"xxx\"      
2.  特点：数据不仅能从 data 流向页面，还能从页面流向 data
3.  注意：仅在 表单类元素 中使用，input、text等

## 1.5. MVVM 模型

1.  M：模型(Model) ：对应 data 中的数据

2.  V：视图(View) ：模板

3.  VM：视图模型(ViewModel) ： Vue 实例对象

![](./media/image4.jpg){width="4.693444881889763in"
height="2.7649726596675417in"}

## **1.6. 事件处理**

### 1.6.1. 效果

![](./media/image5.jpg){width="4.325388232720909in"
height="2.9198337707786526in"}

### 1.6.2. 绑定监听

1.  v-on:xxx=\"fun\"

2.  @xxx=\"fun\"

3.  @xxx=\"fun(参数)\"

4.  默认事件形参: event

5.  隐含属性对象: \$event

### 1.6.3. 事件修饰符

1.  .prevent : 阻止事件的默认行为 event.preventDefault()

2.  .stop : 停止事件冒泡 event.stopPropagation()

### 1.6.4. 按键修饰符

1.  keycode : 操作的是某个 keycode 值的键

2.  .keyName : 操作的某个按键名的键(少部分)

## 1.7. 计算属性与监视

### 1.7.1. 效果

![](./media/image6.jpg){width="2.706639326334208in"
height="1.7865004374453193in"}

### 1.7.2. 计算属性-computed

1.  要显示的数据不存在，要通过计算得来。

2.  在 computed 对象中定义计算属性。

3.  在页面中使用{{方法名}}来显示计算的结果。

### 1.7.3. 监视属性-watch

![](./media/image7.jpg){width="3.508028215223097in"
height="2.959417104111986in"}

1.  通过通过 vm 对象的\$watch()或 watch 配置来监视指定的属性

2.  当属性变化时, 回调函数自动调用, 在函数内部进行计算

## 1.8. class 与 style 绑定

### 1.8.1. 理解

1.  在应用界面中, 某个(些)元素的样式是变化的

2.  class/style 绑定就是专门用来实现动态样式效果的技术

### 1.8.2. class 绑定

1.  :class=\'xxx\'

2.  表达式是字符串: \'classA\'

3.  表达式是对象: {classA:isA, classB: isB}

4.  表达式是数组: \[\'classA\', \'classB\'\]

### 1.8.3. style 绑定

1.  :style=\"{ color: activeColor, fontSize: fontSize + \'px\' }\"

2.  其中 activeColor/fontSize 是 data 属性

## 1.9. 条件渲染

### 1.9.1. 条件渲染指令

1.  v-if 、v-else-if、 v-else

2.  v-show

### 1.9.2. 比较 v-if 与 v-show

1.  如果需要频繁切换 v-show 较好

2.  当条件不成立时, v-if 的所有子节点不会解析(项目中使用)

## 1.10. 列表渲染

### 1.10.1. 效果

> ![](./media/image8.jpg){width="2.405250437445319in"
> height="1.9621948818897639in"}![](./media/image9.png){width="2.9516666666666667in"
> height="2.005in"}![](./media/image10.jpg){width="3.9413615485564306in"
> height="1.7976104549431322in"}

### 1.10.2. 列表显示指令

> 遍历数组: v-for / index 遍历对象: v-for / key

## 1.11. 收集表单数据

![](./media/image12.jpg){width="3.9490004374453194in"
height="5.004555993000875in"}

## 1.12. 过滤器

### 1.12.1. 效果

![](./media/image13.jpg){width="2.845528215223097in"
height="1.7052504374453192in"}

### 理解过滤器

1.  功能: 对要显示的数据进行特定格式化后再显示

2.  注意: 并没有改变原本的数据, 是产生新的对应的数据

## 1.13. 内置指令与自定义指令

### 1.13.1. 常用内置指令

1.  v-text : 更新元素的 textContent

2.  v-html : 更新元素的 innerHTML

3.  v-if : 如果为 true, 当前标签才会输出到页面

4.  v-else: 如果为 false, 当前标签才会输出到页面

5.  v-show : 通过控制 display 样式来控制显示/隐藏

6.  v-for : 遍历数组/对象

7.  v-on : 绑定事件监听, 一般简写为@

8.  v-bind : 绑定解析表达式, 可以省略 v-bind

9.  v-model : 双向数据绑定

10. v-cloak : 防止闪现, 与 css 配合

    ```css
    [v-cloak] {
        display: none 
    }
    ```

11.  v-once：初次渲染之后，就视为静态内容了，以后不在动态渲染

### 自定义指令

#### 1. 注册全局指令

```js
Vue.directive('my-directive', function(el, binding){
    el.innerHTML = binding.value.toupperCase()
})
```



#### 2. 注册局部指令

```js
directives : {
    'my-directive' : { bind (el, binding) {
        	el.innerHTML = binding.value.toupperCase()
    	}
    }
}
```



1\) 使用指令

> v-my-directive=\'xxx\'

## 1.14. Vue 实例生命周期

### 1.14.1. 效果

![](./media/image16.jpg){width="2.484417104111986in"
height="1.1413604549431322in"}

### 生命周期流程图

![生命周期](Vue/生命周期.png)

#### 1.14.3. vue 生命周期分析

1)  初始化显示

    -   beforeCreate()
    
    -   created()
    
    -   beforeMount()
    
    -   mounted()

2)  更新状态: this.xxx = value

    -   beforeUpdate()
    
    -   updated()

3)  销毁 vue 实例: vm.\$destory()

    -   beforeDestory()
    
    -   destoryed()

#### 1.14.4. 常用的生命周期方法

1.  mounted(): 发送 ajax 请求, 启动定时器等异步任务

2.  beforeDestory(): 做收尾工作, 如: 清除定时器

# 第 2 章：Vue 组件化编程

## 2.1 模块与组件、模块化与组件化

### 2.1.1. 模块

1.  理解: 向外提供特定功能的 js 程序, 一般就是一个 js 文件

2.  为什么: js 文件很多很复杂

3.  作用: 复用 js, 简化 js 的编写, 提高 js 运行效率

### 2.1.2. 组件

1.  理解: 用来实现局部(特定)功能效果的代码集合(html/css/js/image.....)

2.  为什么: 一个界面的功能很复杂

3.  作用: 复用编码, 简化项目编码, 提高运行效率

**2.1.3. 模块化**

> 当应用中的 js 都以模块来编写的, 那这个应用就是一个模块化的应用。

**2.1.4. 组件化**

> 当应用中的功能都是多组件的方式来编写的,
> 那这个应用就是一个组件化的应用,。

## 2.2. 非单文件组件

1.  模板编写没有提示

2.  没有构建过程, 无法将 ES6 转换成 ES5

3.  不支持组件的 CSS

4.  真正开发中几乎不用

## 2.3. 单文件组件

### 2.3.1. 一个.vue 文件的组成(3 个部分)

#### 1. 模板页面

```vue
<template> 页面模板

</template>
```



#### 2. JS 模块对象

```js


        data() {
            return {}
        },
        methods: {}, 
        computed: {},
        components: {}
	}
</script>
```



#### 3. 样式

```css
<style>
	样式定义
</style>
```



### 2.3.2. 基本使用

1.  引入组件

2.  映射成标签

3.  使用组件标签

# 第 3 章：使用 Vue 脚手架

## 3.1 初始化脚手架

###  3.1.1 说明

1.  Vue 脚手架是 Vue 官方提供的标准化开发工具（开发平台）。

2.  最新的版本是 4.x。

3.  文档:
    [[https://cli.vuejs.org/zh/]{.underline}。](https://cli.vuejs.org/zh/)

###  3.1.2 具体步骤

```shell
# 第一步（仅第一次执行）：全局安装@vue/cli。
npm install -g @vue/cli
# 第二步：**切换到你要创建项目的目录**，然后使用命令创建项目
vue create xxxx
#第三步：启动项目
npm run serve
```

> 备注：

1.  如出现下载缓慢请配置 npm 淘宝镜像：npm config set registry
    https://registry.npm.taobao.org
2.  Vue 脚手架隐藏了所有 webpack 相关的配置，若想查看具体的 webpakc
    配置，请执行：

```shell
vue inspect > output.js
```



###  3.1.3 模板项目的结构

```
├── node_modules
├── public
│ ├── favicon.ico: 页签图标
│ └── index.html: 主页面
├── src
│ ├── assets: 存放静态资源
│ │ └── logo.png
│ │── component: 存放组件│ │ └── HelloWorld.vue
│ │── App.vue: 汇总所有组件	
│ │── main.js: 入口文件
├── .gitignore: git 版本管制忽略的配置
├── babel.config.js: babel 的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```



## 3.2 ref 与 props

### ref

1.  **作用：**用于给节点打标识

2.  **读取方式：**this.\$refs.xxxxxx

### props

1.  **作用：**用于父组件给子组件传递数据

2.  **读取方式一: 只指定名称**

> props: \[\'name\', \'age\', \'setName\'\]

3. 读取方式二: 指定名称和类型

> props: { 
>
> ​	name: String, age: Number,
>
> ​	setNmae: Function
>
> }

4. 读取方式三: 指定名称/类型/必要性/默认值

> props: {
>
> ​	name: {
>
> ​		type: String, 
>
> ​		required: true, default:xxx
>
> ​	},
>
> }

5. 补充

> 子传父的时候，我们可以回归一下 v-bind:"xxx" 我们在传的过程中，只需要在父中定义一个接收的method，在子组件中将 xxx 方法如上方数据一样接收即可，在我们要传给父内容时操作他（调用它），然后我们父组件通过参数配置即可拿到数据。

## 3.3 css混入

1. 局部

   我们将混入的配置抽出来为一个JS，然后在多个组件中分别配置即可。

   * 抽出来的`mixin.js`：

     ```js
     // 我们要混入的配置均为 vue的配置对象，一旦混入，所有的引入组件都有该混入的配置，且配置先一步赋值————》意为着有可能被覆盖
     export const hunhe = {
     	methods: {
     		showName(){
     			alert(this.name)
     		}
     	},
     	mounted() {
     		console.log('你好啊！')
     	},
     }
     export const hunhe2 = {
     	data() {
     		return {
     			x:100,
     			y:200
     		}
     	},
     }
     ```

   * 组件1：

     ```vue
     <template>
     	<div>
     		<h2 @click="showName">学校名称：{{name}}</h2>
     		<h2>学校地址：{{address}}</h2>
     	</div>
     </template>
     
     <script>
     	//引入一个hunhe
     	import {hunhe,hunhe2} from '../mixin'
     
     	export default {
     		name:'School',
     		data() {
     			return {
     				name:'尚硅谷',
     				address:'北京',
     				x:666
     			}
     		},
     		mixins:[hunhe,hunhe2],
     	}
     </script>
     ```

   * 组件2

     ```vue
     <template>
     	<div>
     		<h2 @click="showName">学生姓名：{{name}}</h2>
     		<h2>学生性别：{{sex}}</h2>
     	</div>
     </template>
     
     <script>
     	import {hunhe,hunhe2} from '../mixin'
     
     	export default {
     		name:'Student',
     		data() {
     			return {
     				name:'张三',
     				sex:'男'
     			}
     		},
     		mixins:[hunhe,hunhe2]
     	}
     </script>
     ```

2. 全局

直接在`main.js`中配置混入即可

```js
import {hunhe,hunhe2} from './mixin'

Vue.mixin(hunhe)
Vue.mixin(hunhe2)
```



## 3.4 插件

1.  Vue 插件是一个包含 install 方法的**对象**。
2.  通过 install 方法给 Vue 或 Vue 实例添加方法, 定义全局指令等

`plugins.js`

```js
export default {
	install(Vue,x,y,z){
		console.log(x,y,z)
		//全局过滤器
		Vue.filter('mySlice',function(value){
			return value.slice(0,4)
		})

		//定义全局指令
		Vue.directive('fbind',{
			//指令与元素成功绑定时（一上来）
			bind(element,binding){
				element.value = binding.value
			},
			//指令所在元素被插入页面时
			inserted(element,binding){
				element.focus()
			},
			//指令所在的模板被重新解析时
			update(element,binding){
				element.value = binding.value
			}
		})

		//定义混入
		Vue.mixin({
			data() {
				return {
					x:100,
					y:200
				}
			},
		})

		//给Vue原型上添加一个方法（vm和vc就都能用了）
		Vue.prototype.hello = ()=>{alert('你好啊')}
	}
}
```

`main.js`

```js
//应用（使用）插件 ,且允许传参
Vue.use(plugins,1,2,3)
```



## 3.5 scoped样式

在编译的过程中，组件的 `<style></style>`会合并到一起，这样就回引起一个最经典的问题，也就是 **重复名** 问题，再不做处理的情况下，我们会根据 App.vue 中的import顺序去覆盖同名样式。

为了解决这类问题，我们可以在每个组件的 `<style>` 标签中加入 `scoped` 即可。我们所有的仅在本组件适用，他在编译的时候会自动为我们加一个标识。

```css
<style scoped>
	/* 设置你的样式即可 */
</style>
```



## 3.5 Todo-list 案例

![](./media/image18.jpg){width="4.5072080052493435in"
height="2.1442082239720035in"}

#### 组件化编码流程（通用）

1. 实现静态组件：抽取组件，使用组件实现静态页面效果

2. 展示动态数据：
   1. 数据的类型、名称是什么？
   2. 数据保存在哪个组件？
3. 交互------从绑定事件监听开始



## 3.6 Vue 中的自定义事件

### 绑定事件监听

```html
<Header @addTodo="	addTodo/>
$on(	"/>	, this.addTodo)
或者
<Header ref="header"
this.$refs.header.'addTodo'	

```

### 触发事件

```js
this.$emit('addTodo', todo)
```





## 3.7 全局事件总线

### 3.7.1 理解

1.  Vue 原型对象上包含事件处理的方法

    1.  \$on(eventName, listener): 绑定自定义事件监听

    2.  \$emit(eventName, data): 分发自定义事件

    3.  \$off(eventName): 解绑自定义事件监听

    4.  \$once(eventName, listener): 绑定事件监听, 但只能处理一次

2.  所有组件实例对象的原型对象的原型对象就是 Vue 的原型对象

    1.  所有组件对象都能看到 Vue 原型对象上的属性和方法

    2.  Vue.prototype.\$bus = new Vue(), 所有的组件对象都能看到\$bus
        这个属性

> 对象

3.  全局事件总线

    1.  包含事件处理相关方法的对象(只有一个)

    2.  所有的组件都可以得到

### 3.7.2 指定事件总线对象

+-----------------------------------------------------------------------+
| **new** Vue({                                                         |
|                                                                       |
| > beforeCreate () { *//* 尽量早的执行挂载全局事件总线对象的操作       |
| >                                                                     |
| > Vue.**prototype**.**\$globalEventBus** = **this** },                |
|                                                                       |
| }).\$mount(**\'#root\'**)                                             |
+=======================================================================+
+-----------------------------------------------------------------------+

**3.7.3 绑定事件**

this.\$globalEventBus.\$==on==(\'deleteTodo\',this.deleteTodo)

**3.7.4 分发事件**

this.\$globalEventBus.\$==emit==(\'deleteTodo\',this.index)

**3.7.5 解绑事件**

this.\$globalEventBus.\$==off==(\'deleteTodo\')

## 3.8 消息订阅与发布

###  3.8.1 理解

1.  这种方式的思想与全局事件总线很相似

2.  它包含以下操作:

> \(1\) 订阅消息 \--对应绑定事件监听 (2) 发布消息 \--分发事件
>
> \(3\) 取消消息订阅 \--解绑事件监听

3.  需要引入一个消息订阅与发布的第三方实现库:
    [**PubSubJS**](https://github.com/mroderick/PubSubJS)

###  3.8.2 使用 PubSubJS

1.  在线文档:
    [[https://github.com/mroderick/PubSubJS]{.underline}](https://github.com/mroderick/PubSubJS)

2.  下载: npm install -S pubsub-js

3.  相关语法

    1.  import PubSub from \'pubsub-js\' // 引入

    2.  PubSub.subscribe('msgName', functon(msgName, data){ })

    3.  PubSub.publish('msgName', data): 发布消息,
        触发订阅的回调函数调用

    4.  PubSub.unsubscribe(token): 取消消息的订阅

## 3.9 过度与动画

###  3.9.1 效果

![](./media/image19.jpg){width="6.099694881889763in"
height="2.029555993000875in"}

###  3.9.2 vue 动画的理解

1.  操作 css 的 trasition 或 animation

2.  vue 会给目标元素添加/移除特定的 class

3.  过渡的相关类名：

    1.  xxx-enter-active: 指定显示的 transition

    2.  xxx-leave-active: 指定隐藏的 transition

    3.  xxx-enter/xxx-leave-to: 指定隐藏时的样式

> ![](./media/image20.jpg){width="4.885805993000875in"
> height="2.733028215223097in"}

###  3.9.3 基本过渡动画的编码

1.  在目标元素外包裹\<transition name=\"xxx\"\>

2.  定义 class 样式

    a.  指定过渡样式: transition

    b.  指定隐藏时的样式: opacity/其它

# 第 4 章：Vue 中的 ajax

## 4.1 解决开发环境 Ajax 跨域问题

> 使用代理服务器

## 4.2 github 用户搜索案例

### 4.2.1 效果

![](./media/image21.jpg){width="5.260805993000875in"
height="3.3684448818897637in"}

### 4.2.2 接口地址

[[https://api.github.com/search/users?q=xxx]{.underline}](https://api.github.com/search/users?q=xxx)

## 4.3 vue 项目中常用的 2 个 Ajax 库

**4.3.1 axios**

> 通用的 Ajax 请求库, 官方推荐，使用广泛

**4.3.2 vue-resource**

> vue 插件库, vue1.x 使用广泛，**官方已不维护。**

## 4.4 slot 插槽

### 4.4.1 效果

> 效果一（不使用插槽）：

![](./media/image22.jpg){width="4.112194881889764in"
height="1.9267782152230972in"}

> 效果二（默认插槽）：

![](./media/image23.jpg){width="4.2052504374453195in"
height="2.10663823272091in"}

> 效果三（具名插槽）：

![](./media/image24.jpg){width="4.439278215223097in"
height="2.25663823272091in"}

> 效果三（作用域插槽）：

![](./media/image25.jpg){width="4.59761154855643in"
height="2.196917104111986in"}

### 4.4.1 理解

父组件向子组件传递带数据的标签，当一个组件有不确定的结构时, 就需要使用
slot 技术，注意：插槽内容是在父组件中编译后, 再传递给子组件的。

### 4.4.2 分类

1.  默认插槽

2.  命名插槽

3.  作用域插槽

# 第 5 章：vuex

## 5.1 理解 vuex

### 5.1.1 vuex 是什么

1.  概念：专门在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 vue
    应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

2.  Github 地址:
    [[https://github.com/vuejs/vuex]{.underline}](https://github.com/vuejs/vuex)

### 5.1.2 什么时候使用 Vuex

1.  多个组件依赖于同一状态

2.  来自不同组件的行为需要变更同一状态

### 5.1.3 案例

> ![](./media/image26.jpg){width="3.283028215223097in"
> height="1.7955282152230971in"}

### 5.1.4 Vuex 工作原理图

![](./media/image27.jpg){width="3.712889326334208in"
height="3.0413615485564303in"}

## 5.2 vuex 核心概念和 API

### 5.2.1 state

1.  vuex 管理的状态对象

2.  它应该是唯一的

3.  示例代码：

> ![](./media/image28.jpg){width="1.48in" height="0.5916666666666667in"}

### 5.2.2 actions

1.  值为一个对象，包含多个响应用户动作的回调函数

2.  通过 commit( )来触发 mutation 中函数的调用, 间接更新 state

3.  如何触发 actions 中的回调？

  \$store.dispatch(\'对应的 action 回调名\')

-----------------------------------------------------------------------

> 在组件中使用:触发

4.  可以包含异步代码（定时器, ajax 等等）

5.  示例代码：

> ![](./media/image29.jpg){width="2.6416666666666666in"
> height="0.9733333333333334in"}

### 5.2.3 mutations

1.  值是一个对象，包含多个直接更新 state 的方法

2.  谁能调用 mutations 中的方法？如何调用？

> 在 action 中使用：**commit(\'对应的 mutations 方法名\')** 触发

3.  mutations 中方法的特点：不能写异步代码、只能单纯的操作 state

4.  示例代码：

> ![](./media/image30.jpg){width="2.0in" height="0.935in"}

### 5.2.4 getters

1.  值为一个对象，包含多个用于返回数据的函数

2.  如何使用？------ **\$store.getters.xxx**

3.  示例代码：

> ![](./media/image31.jpg){width="2.1566666666666667in"
> height="0.9633333333333334in"}

### 5.2.5 modules

1.  包含多个 module
2.  一个 module 是一个 store 的配置对象
3.  与一个组件（包含有共享数据）对应

# 第 6 章：vue-router

## 6.1 相关理解

### 6.1.1 vue-router 的理解

-----------------------------------------------------------------------
  SPA 应用

-----------------------------------------------------------------------

> vue 的一个插件库，专门用来实现

### 6.1.2 对 SPA 应用的理解

1.  单页 Web 应用（single page web application，SPA）。

2.  整个应用只有**一个完整的页面**。

3.  点击页面中的导航链接**不会刷新**页面，只会做页面的**局部更新。**

4.  数据需要通过 ajax 请求获取。

### 6.1.3 路由的理解

1. 什么是路由?
2. 一个路由就是一组映射关系（key - value）
3. key 为路径, value 可能是 function 或 component

##  2. 路由分类

1.  后端路由：

    1.  理解：value 是 function, 用于处理客户端提交的请求。

    2.  工作过程：服务器接收到一个请求时,
        根据**请求路径**找到匹配的**函数**来处理请求, 返回响应数据。

2.  前端路由：

    1.  理解：value 是 component，用于展示页面内容。

    2.  工作过程：当浏览器的路径改变时, 对应的组件就会显示。

## 6.2 基本路由

### 6.2.1 效果

![](./media/image32.jpg){width="4.755250437445319in"
height="2.9059448818897637in"}

### 6.2.2 总结: 编写使用路由的 3 步

1.  定义路由组件

2.  注册路由

3.  使用路由

## 6.3 嵌套（多级）路由

![](./media/image33.jpg){width="4.765667104111986in"
height="3.032333770778653in"}

## 6.4 路由传参

![](./media/image34.jpg){width="4.525389326334208in"
height="3.717055993000875in"}

## 6.5 编程式路由导航

![](./media/image35.jpg){width="4.0392782152230975in"
height="4.137194881889764in"}

**相关 API：**

1.  this.\$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)

2.  this.\$router.replace(path):
    用新路由替换当前路由(不可以返回到当前路由界面)

3.  this.\$router.back(): 请求(返回)上一个记录路由

4.  this.\$router.go(-1): 请求(返回)上一个记录路由

5.  this.\$router.go(1): 请求下一个记录路由

# 第 7 章：Vue UI 组件库

## 7.1 移动端常用 UI 组件库

1.  Vant
    [[https://youzan.github.io/vant]{.underline}](https://youzan.github.io/vant/)

2.  Cube UI
    [[https://didi.github.io/cube-ui]{.underline}](https://didi.github.io/cube-ui)

3.  Mint UI
    [[http://mint-ui.github.io]{.underline}](http://mint-ui.github.io/)

## 7.2 PC 端常用 UI 组件库

1.  Element UI
    [[https://element.eleme.cn]{.underline}](https://element.eleme.cn/)

2.  IView UI
    [[https://www.iviewui.com]{.underline}](https://www.iviewui.com/)
