---
title: 设计模式
date: 2022-4-21
categories: 
  - 设计模式
tags:
  - 设计模式
---


valine:
  placeholder: "1. 提问前请先仔细阅读本文档⚡\n2. 页面显示问题💥，请提供控制台截图📸或者您的测试网址\n3. 其他任何报错💣，请提供详细描述和截图📸，祝食用愉快💪"

# 谈谈你对设计模式的理解

1.首先谈设计模式的作用：经验的传承，提高了软件复用的水平，最终达到提高软件开发效率

**五大原则**

| 设计原则                    | 简单说明                                                     |
| --------------------------- | :----------------------------------------------------------- |
| 单一职责                    | 一个类只负责一项职责                                         |
| 里氏替换原则                | 子类可以扩展父类的功能，但不能改变父类原有的功能             |
| 依赖倒置原则                | 要依赖于抽象，不要依赖于具体，核心思想是**面向接口编程**     |
| 接口隔离原则                | 建立单一接口，不要建立庞大臃肿的接口，尽量细化接口，接口中的方法尽量少 |
| 迪米特法则 （最少知道原则） | 一个对象应该对其他对象保持最少的了解                         |
| 开闭原则                    | 对扩展开放，对修改关闭                                       |

2.设计模式的分类

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/2014caaf469649d1a3c84a582ef7319b.png)

3.创建型模式：都是用来帮助我们创建对象的！

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/c6b87746e9884c22b56ca99bc265c496.png)

4.结构性模式:关注对象和类的组织

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/6b8dffa88b924af6ba3664386d6a9f0a.png)

5.行为型模式:关注系统中对象之间的相互交换，研究系统在运行时对象之间的相互通信和协作，进一步明确对象的职责，共有11中模式

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/9bfe35ab4a494cc4ae84a20ee9e30a5c.png)



# 一、创建型模式



## 1.单例模式

作用：单例模式的核心是**保证一个类只有一个实例，并且提供一个访问实例的全局访问点。**

| 实现方式     | 优缺点                                  |
| ------------ | :-------------------------------------- |
| 饿汉式       | 线程安全，调用效率高 ，但是不能延迟加载 |
| 懒汉式       | 线程安全，调用效率不高，能延迟加载      |
| 双重检测锁式 | 在懒汉式的基础上解决并发问题            |
| 静态内部类式 | 线程安全，资源利用率高，可以延时加载    |
| 枚举单例     | 线程安全，调用效率高，但是不能延迟加载  |

### 饿汉式

也就是类加载的时候立即实例化对象，实现的步骤是先私有化构造方法，对外提供唯一的静态入口方法，实现如下

```java
/**
 * 单例模式：饿汉式
 *
 */
public class SingletonInstance1 {
	// 声明此类型的变量，并实例化，当该类被加载的时候就完成了实例化并保存在了内存中
	private final static SingletonInstance1 instance = new SingletonInstance1();

	// 私有化所有的构造方法,防止直接通过new关键字实例化
	private SingletonInstance1(){}
	// 对外提供一个获取实例的静态方法
	public static SingletonInstance1 getInstance(){
		return instance;
	}
}

```

饿汉式单例模式代码中，static变量会在类装载时初始化，此时也不会涉及多个线程对象访问该对象的问题。虚拟机保证只会装载一次该类，肯定不会发生并发访问的问题。因此，可以省略synchronized关键字

问题：如果只是加载本类，而不是要调用getInstance()，甚至永远没有调用，则会造成资源浪费！

```java
/**
 * 单例模式：饿汉式
 *
 */
public class SingletonInstance1 {
    private byte[] b1 = new byte[1024*1024];
    private byte[] b2 = new byte[1024*1024];
    private byte[] b3 = new byte[1024*1024];
	// 声明此类型的变量，并实例化，当该类被加载的时候就完成了实例化并保存在了内存中
	private final static SingletonInstance1 instance = new SingletonInstance1();

	// 私有化所有的构造方法,防止直接通过new关键字实例化
	private SingletonInstance1(){}
	// 对外提供一个获取实例的静态方法
	public static SingletonInstance1 getInstance(){
		return instance;
	}
}
```

### 懒汉式

```java
/**
 * 单例模式：懒汉式
 *
 */
public class SingletonInstance2 {
	// 声明此类型的变量,但没有实例化
	private static SingletonInstance2 instance = null;

	// 私有化所有的构造方法,防止直接通过new关键字实例化
	private SingletonInstance2(){}
	// 对外提供一个获取实例的静态方法，为了数据安全添加synchronized关键字
	public static synchronized SingletonInstance2 getInstance(){
		if(instance == null){
			// 当instance不为空的时候才实例化
			instance = new SingletonInstance2();
		}
		return instance;
	}
}

```

&emsp;&emsp;此种方式在类加载后如果我们一直没有调用getInstance方法，那么就不会实例化对象。实现了延迟加载，但是因为在方法上添加了synchronized关键字，每次调用getInstance方法都会同步，所以对性能的影响比较大。

### 双重检测锁

```java
/**
 * 单例模式：懒汉式
 * 双重检测机制
 *
 */
public class SingletonInstance3 {
	// 声明此类型的变量,但没有实例化
	private static volatile  SingletonInstance3 instance = null;

	// 私有化所有的构造方法,防止直接通过new关键字实例化
	private SingletonInstance3(){}
	// 对外提供一个获取实例的静态方法，
	public static  SingletonInstance3 getInstance(){
		if(instance == null){
			synchronized(SingletonInstance3.class){
				if(instance == null){
                    // 1.分配内存空间  2. 执行构造方法，实例化对象 3.把这个对象赋值给这个空间
                    // 如果不加volatile 会执行重排序 1 3 2 
					instance = new SingletonInstance3();
				}
			}
		}
		return instance;
	}
}

```

不加volatile有指令重排序的问题。添加后可以解决。

### 静态内部类

```java
/**
 * 静态内部类实现方式
 *
 */
public class SingletonInstance4 {
	// 静态内部类
	public static class SingletonClassInstance{
		// 声明外部类型的静态常量
		public static final SingletonInstance4 instance = new SingletonInstance4();
	}
	// 私有化构造方法
	private SingletonInstance4(){}

	// 对外提供的唯一获取实例的方法
	public static SingletonInstance4 getInstance(){
		return SingletonClassInstance.instance;
	}
}

```

### 枚举单例

```java
/**
 * 单例模式：枚举方式实现
 *
 */
public enum SingletonInstance5 {

	// 定义一个枚举元素，则这个元素就代表了SingletonInstance5的实例
	INSTANCE;

	public void singletonOperation(){
		// 功能处理
	}
}

```

## 2.怎么解决反射爆破单例

&emsp;&emsp;在单例中我们定义的私有的构造器，但是我们知道反射是可以操作私有的属性和方法的，这时我们应该怎么处理？

```java
public static void main(String[] args) throws Exception, IllegalAccessException {
	SingletonInstance1 s1 = SingletonInstance1.getInstance();
	// 反射方式获取实例
	Class c1 = SingletonInstance1.class;
	Constructor constructor = c1.getDeclaredConstructor(null);
	constructor.setAccessible(true);
	SingletonInstance1 s2 = (SingletonInstance1)constructor.newInstance(null);
	System.out.println(s1);
	System.out.println(s2);
}

```

输出结果

```txt
com.dpb.single.SingletonInstance1@15db9742
com.dpb.single.SingletonInstance1@6d06d69c

```

产生了两个对象，和单例的设计初衷违背了。
解决的方式是在无参构造方法中手动抛出异常控制,或者声明一个全局变量来控制。

```java
// 私有化所有的构造方法,防止直接通过new关键字实例化
private SingletonInstance2(){
	if(instance != null){
		// 只能有一个实例存在，如果再次调用该构造方法就抛出异常，防止反射方式实例化
		throw new RuntimeException("单例模式只能创建一个对象");
	}
}

```

上面这种方式我们还可以通过反序列化的方式来破解

```java
public static void main(String[] args) throws Exception, IllegalAccessException {
	SingletonInstance2 s1 = SingletonInstance2.getInstance();
	// 将实例对象序列化到文件中
	ObjectOutputStream oos = new ObjectOutputStream(
			new FileOutputStream("c:/tools/a.txt"));
	oos.writeObject(s1);
	oos.flush();
	oos.close();
	// 将实例从文件中反序列化出来
	ObjectInputStream ois = new ObjectInputStream(
			new FileInputStream("c:/tools/a.txt"));
	SingletonInstance2 s2 = (SingletonInstance2) ois.readObject();
	ois.close();
	System.out.println(s1);
	System.out.println(s2);
}

```

我们只需要在单例类中重写readResolve方法并在该方法中返回单例对象即可，如下:

```java
package com.dpb.single;

import java.io.ObjectStreamException;
import java.io.Serializable;

/**
 * 单例模式：懒汉式
 *
 */
public class SingletonInstance2 implements Serializable{

	// 声明此类型的变量,但没有实例化
	private static SingletonInstance2 instance = null;

	// 私有化所有的构造方法,防止直接通过new关键字实例化
	private SingletonInstance2(){
		if(instance != null){
			// 只能有一个实例存在，如果再次调用该构造方法就抛出异常，防止反射方式实例化
			throw new RuntimeException("单例模式只能创建一个对象");
		}
	}
	// 对外提供一个获取实例的静态方法，为了数据安全添加synchronized关键字
	public static synchronized SingletonInstance2 getInstance(){
		if(instance == null){
			// 当instance不为空的时候才实例化
			instance = new SingletonInstance2();
		}
		return instance;
	}
	// 重写该方法，防止序列化和反序列化获取实例
	private Object readResolve() throws ObjectStreamException{
		return instance;
	}
}

```

说明:readResolve方法是基于回调的，反序列化时，如果定义了readResolve()则直接返回此方法指定的对象，而不需要在创建新的对象！

## 3.说说你在哪些框架中看到了单例的设计

1.Spring中的Bean对象，默认是单例模式

2.相关的工厂对象都是单例，比如：MyBatis中的SqlSessionFactory，Spring中的BeanFactory

3.保存相关配置信息的都是单例，比如：MyBatis中的Configuration对象，SpringBoot中的各个XXXAutoConfiguration对象等

4.应用程序的日志应用，一般都会通过单例来实现

5.数据库连接池的设计也是单例模式

## 4.工厂模式

&emsp;&emsp;工厂模式的作用是帮助我们创建对象，我们不用自己来创建，根据需要创建的对象的复杂度我们可以把工厂模式分为简单工厂，工厂方法和抽象工厂。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/95f501de57d3451faf9228414dc6f75f.png)

### 4.1 简单工厂

&emsp;&emsp;简单工厂模式又称为静态工厂方法，他可以根据不同的参数而返回不同的实例，简单工厂模式专门定义一个类来负责创建其他类的实例，被创建的实例通常都具有共同的父类。

JDK中的简单工厂应用：DataFormat

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/4fdddcfbf8784080a3706158f6945e9a.png)

自己写一个简单工厂的案例

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/de2237eb14fe491fbd38c5a815fa7c27.png)

```java
/**
 * 简单工厂
 */
public class SimpleFactory {

    public static void main(String[] args) {
        // 根据对应的类型返回相关产品
        CarFactory.createCar("奥迪").run();
        CarFactory.createCar("Byd").run();
    }
}

// 定义公共的接口
interface Car{
    void run();
}

class Audi implements Car{
    @Override
    public void run() {
        System.out.println("奥迪在跑...");
    }
}

class Byd implements Car{
    @Override
    public void run() {
        System.out.println("Byd在跑...");
    }
}

// 创建对应的简单工厂类
class CarFactory{
    public static Car createCar(String type){
        if("奥迪".equals(type)){
            return new Audi();
        }else if("Byd".equals(type)){
            return new Byd();
        }else{
            throw new RuntimeException("该产品不能生产");
        }
    }
}
```

我们可以发现简单工厂对于新增产品是无能为力的！不修改原有代码根本就没办法扩展!!!

### 4.2 工厂方法

&emsp;&emsp;针对于简单工厂的短板，引出了工厂方法模式，定义一个用户创建对象的接口，让子类决定实例化哪个类，工厂方法使一个类的实例化延迟到了其子类中。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/cedbded5fc4543eb80dd3663bbe814c7.png)

代码实现：

```java
/**
 * 工厂方法模式
 */
public class FactoryMethod {

    public static void main(String[] args) {
        new AudiCarFactory().createCar().run();
        new BydCarFactory().createCar().run();
    }


    public static interface  Car{
        public void run();
    }

    public static class Byd implements Car{
        @Override
        public void run() {
            System.out.println("比亚迪...");
        }
    }

    public static class Audi implements Car{
        @Override
        public void run() {
            System.out.println("奥迪...");
        }
    }

    public static interface CarFactory{
        public Car createCar();
    }

    // 扩展的工厂
    public static class AudiCarFactory implements CarFactory{
        @Override
        public Car createCar() {
            return new Audi();
        }
    }

    public static class BydCarFactory implements CarFactory{
        @Override
        public Car createCar() {
            return new Byd();
        }
    }
}
```

简单工厂和工厂方法模式的对比

1. 简单工厂只有一个工厂，而工厂方法有多个工厂
2. 简单工厂不支持扩展，而工厂方法支持扩展，扩展的方式就是添加对应的工厂类即可
3. 简单工厂代码复杂度低，工厂方法代码复杂度高
4. ...

### 4.3 抽象工厂

&emsp;&emsp;上面的两种方式实现的工厂都是生产同一大类的产品，如果要实现生产不同类型的产品这时我们就可以用抽象工厂模式来实现。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/185ba2bc37394c47ae8f62390d019829.png)

代码实现：

```java
/**
 * 抽象工厂：多个产品族
 */
public class AbstractFactory {

    public static void main(String[] args) {
        Car car = new LuxuryEngineCarFacory().createCar();
        Engine engine = new LuxuryEngineCarFacory().createEngine();
        car.run();
        engine.run();
    }

    // 抽象工厂
    public static interface AbstarctComponentFactory{
        Car createCar();
        Engine createEngine();
    }

    public static class LuxuryEngineCarFacory implements AbstarctComponentFactory{
        @Override
        public Engine createEngine() {
            return new LuxuryEngineFactory().createEngine();
        }

        @Override
        public Car createCar() {
            return new BydCarFactory().createCar();
        }
    }

    public static class LowEngineCarFacory implements AbstarctComponentFactory{
        @Override
        public Car createCar() {
            return new AudiCarFactory().createCar();
        }

        @Override
        public Engine createEngine() {
            return new LowEngineFactory().createEngine();
        }
    }

    // 汽车产品族
    public static interface  Car{
        public void run();
    }

    public static class Byd implements Car {
        @Override
        public void run() {
            System.out.println("比亚迪...");
        }
    }

    public static class Audi implements Car {
        @Override
        public void run() {
            System.out.println("奥迪...");
        }
    }

    public static interface CarFactory{
        public Car createCar();
    }

    // 扩展的工厂
    public static class AudiCarFactory implements CarFactory {
        @Override
        public Car createCar() {
            return new Audi();
        }
    }

    public static class BydCarFactory implements  CarFactory{
        @Override
        public Car createCar() {
            return new Byd();
        }
    }

    // 发动机产品族
    public static interface Engine{
        public void run();
    }

    public static class LuxuryEngine implements Engine{
        @Override
        public void run() {
            System.out.println("豪华版发动机...");
        }
    }

    public static class LowEngine implements Engine{
        @Override
        public void run() {
            System.out.println("低配版发动机...");
        }
    }

    public static interface EngineFactory{
        public Engine createEngine();
    }

    public static class LuxuryEngineFactory implements EngineFactory{
        @Override
        public Engine createEngine() {
            return new LuxuryEngine();
        }
    }

    public static class LowEngineFactory implements EngineFactory{
        @Override
        public Engine createEngine() {
            return new LowEngine();
        }
    }
}

```

三者的对比：

1. 简单工厂模式(静态工厂模式) ：虽然某种程度不符合设计原则，但实际使用最多。
2. 工厂方法模式：不修改已有类的前提下，通过增加新的工厂类实现扩展。
3. 抽象工厂模式：不可以增加产品，可以增加产品族！

## 5.建造者模式

&emsp;&emsp;实际开发中，我们所需要的对象构建时非常复杂，且有很多步骤需要处理时，这时建造者模式就很适合。比如MyBatis中的SqlSessionFactory对象的创建，我们不光要创建SqlSessionFactory本身的对象，还有完成MyBatis的全局配置文件和映射文件的加载解析操作，之后把解析出来的信息绑定在SqlSessionFactory对象中，

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/21221aa599f9428083bc92d81ac151d2.png)

直接参考MyBatis的代码即可

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/6d7aec1477204d9397cf5b59a1f2ad65.png)

所以建造者模式的作用就是帮助我们解决了复杂对象的创建



建造者模式和工厂模式的区别：

* 关注的维度是不一样的
* 工厂模式创建对象 new 出来
* 建造者模式关注的是对象创建的本身



## 6.原型模式

&emsp;&emsp;在java中我们知道通过new关键字创建的对象是非常繁琐的(类加载判断，内存分配，初始化等)，在我们需要大量对象的情况下，原型模式就是我们可以考虑实现的方式。
&emsp;&emsp;原型模式我们也称为克隆模式，即一个某个对象为原型克隆出来一个一模一样的对象，该对象的属性和原型对象一模一样。而且对于原型对象没有任何影响。原型模式的克隆方式有两种：浅克隆和深度克隆.

| 原型模式 | 说明                                                         |
| -------- | :----------------------------------------------------------- |
| 浅克隆   | 只是拷贝本对象,其对象内部的数组、引用对象等都不拷贝，``还是指向原生对象的内部元素地址 |
| 深度克隆 | 深复制把要复制的对象所引用的对象都复制了一遍                 |

### 6.1 浅克隆

&emsp;&emsp;被复制对象的所有变量都含有与原来的对象相同的值，而所有的对其他对象的引用仍然指向原来的对象。换言之，浅复制仅仅复制所考虑的对象，而不复制它所引用的对象。 Object类提供的方法clone=只是拷贝本对象= ， =其对象内部的数组、引用对象等都不拷贝= ，还是指向原生对象的内部元素地址.

&emsp;&emsp;被克隆的对象必须Cloneable,Serializable这两个接口;

```java
package com.bobo.prototype;

import java.io.Serializable;
import java.util.Date;

public class User implements Cloneable, Serializable {

    private String name;

    private Date birth;

    private int age;

    /**
     * 实现克隆的方法
     * @return
     * @throws CloneNotSupportedException
     */
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public static void main(String[] args) throws Exception {
        // 创建一个普通对象
        Date date =  new Date(666666);
        User user = new User();
        user.setName("波波烤鸭");
        user.setAge(18);
        user.setBirth(date);
        System.out.println("原型对象的属性：" + user);
        // 克隆对象
        User cloneUser = (User) user.clone();
        System.out.println("克隆的对象的属性：" + cloneUser);
        // 修改原型对象的属性
        date.setTime(12345677);
        // 修改克隆对象的属性
        cloneUser.setName("波哥");
        System.out.println("原型对象的属性：" + user);
        System.out.println("克隆的对象的属性：" + cloneUser);
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", birth=" + birth +
                ", age=" + age +
                '}';
    }
}

```

输出结果

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/6443e2d851514225a9253ca8d26de73f.png)

浅克隆的问题:虽然产生了两个完全不同的对象，但是被复制的对象的所有变量都含有与原来的对象相同的值，而所有的对其他对象的引用都仍然指向原来的对象。![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/05ad80babac04b43956010b8244cd85b.png)

### 6.2 深度克隆

&emsp;&emsp;被复制对象的所有变量都含有与原来的对象相同的值，除去那些引用其他对象的变量。那些引用其他对象的变量将指向被复制过的新对象，而不再是原有的那些被引用的对象。换言之，深复制把要复制的对象所引用的对象都复制了一遍。
实现的效果是:

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/6fdf967a6fc74e8690b75e3bb3640b7c.png)

深度克隆(deep clone)有两种实现方式，第一种是在浅克隆的基础上实现，第二种是通过序列化和反序列化实现，我们分别来介绍

方式一：在浅克隆的基础上实现

```java
    /**
     * 实现克隆的方法
     * @return
     * @throws CloneNotSupportedException
     */
    @Override
    protected Object clone() throws CloneNotSupportedException {
        User user = (User) super.clone();
        // 实现深度克隆
        user.birth = (Date) this.birth.clone();
        return user;
    }
```

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/1462/1648123011000/1ba148deb0244a4dbfef33a8f1b3bcbd.png)

方式二：序列化和反序列化

| 名称     | 说明                         |
| -------- | :--------------------------- |
| 序列化   | 把对象转换为字节序列的过程。 |
| 反序列化 | 把字节序列恢复为对象的过程。 |

```java
public static void main(String[] args) throws CloneNotSupportedException, Exception {
	Date date =  new Date(1231231231231l);
	User user = new User();
	user.setName("波波烤鸭");
	user.setAge(18);
	user.setBirth(date);
	System.out.println("-----原型对象的属性------");
	System.out.println(user);

	//使用序列化和反序列化实现深复制
	ByteArrayOutputStream bos = new ByteArrayOutputStream();
	ObjectOutputStream    oos = new ObjectOutputStream(bos);
	oos.writeObject(user);
	byte[] bytes = bos.toByteArray();

	ByteArrayInputStream  bis = new ByteArrayInputStream(bytes);
	ObjectInputStream	  ois = new ObjectInputStream(bis);

	//克隆好的对象！
	User user1 = (User) ois.readObject();   

	// 修改原型对象的值
	date.setTime(221321321321321l);
	System.out.println(user.getBirth());

	System.out.println("------克隆对象的属性-------");
	System.out.println(user1);
}

```





## 7.谈谈你对创建型模式的理解

&emsp;&emsp;Java的23种设计模式分为3类，分别是

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/e7bfebaff043483eae41837038342d60.png)

而创建型模式中有包含的如下的相关模式：

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/370c67f33136431c8c3b4ab9f9e46445.png)

而每个设计模式的作用如下：

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/19e2c33ad56e4b2cb22b3447fcf0e6a5.png)



# 二、结构性模式





## 1.代理模式

### 1.1 代理模式的作用

&emsp;&emsp;代理模式的作用是通过代理对象来增强目标对象的功能。利用的是AOP横切的思想。

### 1.2 代理模式的实现方式

&emsp;&emsp;代理模式的实现方式有三种：静态代理，动态代理(JDK动态代理和CGLIB动态代理)

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/ff3031b921b948338282ee57ee510c84.png)

#### 1.2.1 静态代理

我们先声明接口和目标实现类

```java
/**
 * 定义公共接口
 */
public interface SomeService {
    String doSome();
}
```

目标类

```java
/**
 * 目标对象 target
 */
public class SomeServiceImpl implements SomeService {
    @Override
    public String doSome() {
        System.out.println("目标对象：doSome()" );
        return "hello ...";
    }
}
```

然后创建对应的代理类

```java
/**
 * 代理类
 *     增强实现类
 *     和实现类实现同一个接口
 */
public class SomeProxy implements SomeService{

    private SomeService target;

    public SomeProxy(SomeService target){
        this.target = target;
    }

    /**
     * 增强的方法
     * @return
     */
    @Override
    public String doSome() {
        System.out.println("目标方法执行之前...");
        String s = target.doSome();
        System.out.println("目标方法执行之后...");
        return s.toUpperCase();
    }
}
```

然后测试实现

```java
public class MainTest {
    public static void main(String[] args) {
        SomeService some = new SomeServiceImpl();
        SomeProxy proxy = new SomeProxy(some);
        System.out.println(proxy.doSome());
    }
}
```

对应的输出结果

```java
目标方法执行之前...
目标对象：doSome()
目标方法执行之后...
HELLO ...
```

可以看到代理对象实现了目标对象的调用，同时增强了目标对象的功能。

#### 1.2.2 JDK动态代理

&emsp;&emsp;上面的静态代理我们需要手动的创建一个对应的代理来实现，不是太灵活，针对目标对象有实现相关接口的情况，我们可以使用JDK动态代理。

```java
public class JdkDynamicProxy {

    /**
     * JDK动态代理：目标对象必须实现相关的接口
     * @param args
     */
    public static void main(String[] args) {
        SomeService target = new SomeServiceImpl();
        SomeService proxy = (SomeService) Proxy.newProxyInstance(JdkDynamicProxy.class.getClassLoader(), // 类加载器
                target.getClass().getInterfaces() // 目标对象实现的相关接口
                , new InvocationHandler() { // 代理对象的回调方法
                    @Override
                    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        System.out.println("before...");
                        Object invoke = method.invoke(target, args);
                        System.out.println("end...");
                        if (invoke != null) {
                            return invoke.toString().toUpperCase();
                        }
                        return null;
                    }
                });
        // 通过代理对象来执行
        System.out.println("proxy.doSome() = " + proxy.doSome());

    }
}
```

输出结构

```
before...
目标对象：doSome()
end...
proxy.doSome() = HELLO ...
```

#### 1.2.3 CGLIB动态代理

&emsp;&emsp;如果目标对象实现了对应的接口我们可以通过JDK动态代理的方式来实现，但如果目标对象没有实现任何的接口，这时我们只能通过CGLIB动态代理来实现了，这时我们需要单独引入cglib的依赖

```java
public class CGLIBDynamicProxy {

    /**
     * CGLIB动态代理
     * @param args
     */
    public static void main(String[] args) {
        SomeService target = new SomeServiceImpl();
        SomeServiceImpl proxy = new MethodInterceptor() {

            /**
             * 创建 CGLIB 代理对象的方法
             * @return
             */
            public SomeServiceImpl createProxy() {
                // 创建增强器
                Enhancer e = new Enhancer();
                // 指定父类
                e.setSuperclass(target.getClass());
                // 指定回调接口对象
                e.setCallback(this);
                // 创建CGLIB代理对象
                return (SomeServiceImpl) e.create();
            }

            /**
             * 拦截回调的方法
             */
            @Override
            public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
                System.out.println("cglib -- befor" );
                Object res = method.invoke(target, args);
                System.out.println("cglib -- end");
                return res.toString().toUpperCase();
            }
        }.createProxy();
        System.out.println("proxy.doSome() = " + proxy.doSome());
    }
}
```

输出的结果

```
cglib -- befor
目标对象：doSome()
cglib -- end
proxy.doSome() = HELLO ...
```

## 2.适配器模式

### 2.1 适配器的作用

&emsp;&emsp;适配器模式的作用是把两个不兼容的对象通过适配器能够连接起来工作。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/4f1b8160dfaf4de6816c2d7bc7c79ed3.png)

### 2.2 具体案例分析

&emsp;&emsp;以MyBatis中的日志模块为例来介绍。常见的日志框架有log4j,log4j2,slf4j,logbak等，但是每种日志框架中的日志级别都有差异。

log4j2的接口：

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/97882ce34e7c45b38a242335fee35136.png)

slf4j的接口

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/2e0b96e4f72b4d4cb1da9ef190e06f7e.png)

也就是可以看到不同的日志框架里面所定义的日志级别和对应的方法都有区别，那么我们的框架怎么来统一使用这些日志框架呢？在MyBatis中通过定义了一个日志接口，定义了日志具有的级别和方法。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/13b885d6a2e742c8902a41cca65a77f3.png)

那这时候我们就发现具体的日志框架和这个接口其实是没有办法直接来使用的。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/5394d7aab0b9407bb44e7a43b5a46c35.png)

这时我们就需要通过对应的适配器来处理这种情况，以Slf4J为例。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/cc1a1999be144995bbdfd0d52af15aa1.png)

## 3.装饰者模式

### 3.1 装饰者模式的作用

&emsp;&emsp;装饰者模式又称为包装模式([Wrapper](https://so.csdn.net/so/search?q=Wrapper&spm=1001.2101.3001.7020)),作用是用来动态的为一个对象增加新的功能。装饰模式是一种用于代替继承的技术， 无须通过继承增加子类就能扩展对象的新功能 。使用对象的关联关系代替继承关系，更加灵活，同时避免类型体系的快速膨胀。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/3d6542b45adc4fc1954b5a32e0cefe0b.png)

### 3.2 装饰者模式的应用

&emsp;&emsp;装饰者模式的应用场景还是非常多的，比如

* IO流中的FileInputStream，FileOutputStream等
* Spring中的各种Wrapper
* MyBatis中的缓存设计

我们以MyBatis中的缓存实例为例来看看其具体的实现。

首先是Cache接口

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/4fd123c411d44b9b9be4b6fc042cd1a0.png)

然后是PerpetualCache实现：仅仅实现了数据基于内存的读写操作。功能单一。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/64a1d022065f46d5ad8f05fa0a884130.png)

装饰类：然后在MyBatis中给我们提供了很多的装饰类。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/b6a6d87b24bb40d08c86267957622a18.png)

每个装饰类都有自己的作用

* BlockingCache：阻塞的
* LruCache:根据Lru规则来淘汰缓存数据
* FifoCache：根据FIFO规则来淘汰缓存数据
* ....

源码中的装饰：

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/15cfb22ba61c4fc9a3c0ee7db595d8b7.png)

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/7379277ae49d422cbfe571f0852af446.png)

| 比较 | 说明                                                         |
| ---- | :----------------------------------------------------------- |
| 优点 | 1. 扩展对象功能，比继承灵活，不会导致类个数急剧增加&#x3c;br />2. 可以对一个对象进行多次装饰,创造出不同行为的组合,得到功能更加强大的对象&#x3c;br />3. 具体构建类和具体装饰类可以独立变化,&#x3c;br />用户可以根据需要自己增加新的具体构件子类和具体装饰子类。 |
| 缺点 | 1.  产生很多小对象。大量小对象占据内存，一定程度上影响性能。&#x3c;br />2. 装饰模式易于出错，调试排查比较麻烦。 |

## 4.组合模式

### 4.1 组合模式的作用

&emsp;&emsp;其实解决的是对象与对象之间的包含关系。也就是 部分-整体 的层次结构。

### 4.2 组合模式的应用

&emsp;&emsp;组合模式在配置文件的加载解析中其实会用的相对比较多。以SpringSecurity的配置文件为例

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/451caf5510724dbdb8781edc504a3108.png)

上面是具体的定义

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/225305de9e79499b9858fdf0954bee43.png)

应用

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/f27879a6ed534ecda344e3c8033e8b66.png)

## 5.门面模式

&emsp;&emsp;门面模式也称为外观模式，他隐藏了系统的复杂性，并向客户端提供了一个可以访问系统的接口。这种类型的设计模式属于结构性模式。为子系统中的一组接口提供了一个统一的访问接口，这个接口使得子系统更容易被访问或者使用。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/d7cbb356c586445cbae588a9c6944c48.png)

&emsp;&emsp;具体的例子比如：MyBatis中的SqlSession接口，对外提供了数据库操作的相关功能，具体的实现细节对调用者是隐藏的，这种模式在实际项目和框架中很频繁

## 6.桥接模式

&emsp;&emsp;桥接模式的出现是替代掉多层继承的问题。提高了系统的扩展性。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/689902586ed3400e808b3cdaf88a93de.png)

具体的应用比如JDBC中的DriverManager其实有用到桥接模式，不同的数据库厂商对应不同的驱动和连接

## 7.享元模式

&emsp;&emsp;这个问题相对来说比较冷门，用到的也比较少，主要是针对内存这块的节省处理，如果有很多个完全相同或相似的对象，我们可以通过享元模式，节省内存.

享元模式以共享的方式高效地支持大量细粒度对象的重用。

享元对象能做到共享的关键是区分了内部状态和外部状态。
•  **内部状态** ：可以共享，不会随环境变化而改变
•  **外部状态** ：不可以共享，会随环境变化而改变

比如以围棋为例:

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/ed27059ad63b4d408568033cd3d18998.png)

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651200196055/d2cd6a9f545e4f09af78a4e4f3c09677.png)



# 三、行为型模式

&emsp;&emsp;行为型模式关注的是对象之间的通信，也就是描述多个类或者对象之间，通过协作共同完成一个任务。主要涉及的是 **对象** 和 **算法**之间职责的分配。

行为型模式分为两类：

* 类行为模式： 通过继承机制来在类间分派行为。 主要是通过多态来分配父类和子类的职责
* 对象行为模式： 通过组合或聚合，在对象间分派行为。通过对象关联等方式来分配类的职责。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/44e5adf5c4a2487584f3b072b4a19d8a.png)

## 1.解释器模式

### 1.1 解释器模式的作用

&emsp;&emsp;解释器模式在业务开发面是很少接触到的。主要的作用是定义的解释器来解析各种表达式，比如SQL语句，SPEL表达式，权限注解中的表达式 hasAnyRole('ROLE_ADMIN')等。

### 1.2 解释器的应用

&emsp;&emsp;比较常见的应用比如Spring中的针对SPEL表达式做的解析处理

```java
    public static void main(String[] args) {
        SpelExpressionParser parser = new SpelExpressionParser();
        Expression expression = parser.parseExpression("500-100*2+60");
        Object value = expression.getValue();
        System.out.println("value = " + value);
    }
```



## 2.模板模式

### 2.1 模板模式的作用

&emsp;&emsp;模板模式是一种相对简单的设计模式。作用是在父类中固定程序的执行顺序，具体的实现在子类中实现。比如银行定义每个人去银行开户的流程，

1. 取号
2. 填写单子
3. 等待
4. 办理业务
5. 结束

然后每个人来开户都会走这个流程，只是每个人的具体操作内容会有区别


### 2.2 模板模式的应用

&emsp;&emsp;模板模式的应用就比较多如下：

1. Servlet中的doGet和doPost方法
2. Spring中的JdbcTemplate
3. MyBatis中的Executor处理
4. .....



## 3.责任链模式

### 3.1 责任链模式的作用

&emsp;&emsp;将能够处理同一类请求的对象连成一条链，所提交的请求沿着链传递，链上的对象逐个判断是否有能力处理该请求，如果能则处理，如果不能则传递给链上的下一个对象处理。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/4c895e3c35f0466b8832bfaf6d4aa9f2.png)


### 3.2 责任链模式的应用

&emsp;&emsp;责任链模式的应用场景比较多，对大家来说印象比较深刻的应该是SpringSecurity中的处理请求的过滤器链了。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/627ec42ef657483289810bcd60d202d4.png)

&emsp;&emsp;可以和面试官具体聊下SpringSecurity中的这块设计。当然还有一些其他的也可聊比如：

1. Java中，异常机制就是一种责任链模式。一个try可以对应多个catch，当第一个catch不匹配类型，则自动跳到第二个catch.
2. Javascript语言中，事件的冒泡和捕获机制。Java语言中，事件的处理采用观察者模式。
3. SpringMVC中，拦截器的调用也是典型的责任链模式
4. 同样的Servlet中的过滤器链同样是责任链模式的实现。


## 4.观察者模式

### 4.1 观察者模式的作用

&emsp;&emsp;建立对象与对象之间的依赖关系，一个对象发生改变时，会自动通知其他对象。这个场景中，发生改变的对象被称为观察目标，被通知的对象称为观察者。一个观察目标可以有多个观察者，而这些观察者之间可以没有联系，可以根据需要增加或删除观察者。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/28ad3ed5e28f41a69a490ee02fa0bb25.png)


### 4.2 观察者模式的应用

&emsp;&emsp;观察者模式在Java编程中用到最多的可能就是事件模块的处理，可以和面试官详细的聊下Spring的事件管理机制或者SpringBoot的事件处理机制。我们以SpringBoot的事件机制为例来说明

https://blog.csdn.net/qq_38526573/article/details/122143258 单独通过一篇文章来说明事件的本质。



## 5.策略模式

### 5.1 策略模式的作用

&emsp;&emsp;策略模式的作用就是我们想要实现某个目的，实现的方式可以有很多种，那么这里的每一种实现方式都可以称为一种策略。比如：

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/22ad4a07e93c4074ac60ae1c7924452a.png)


&emsp;&emsp;我们可以将每一种交通方式都封装为一个独立的类，这就是一种策略。为了保证策略的一致性，还可以用一个抽象的交通方式类 来 做交通方式的定义。


### 5.2 策略模式的应用

&emsp;&emsp;策略模式在实际开发中用到的同样会比较多。

1. AOP 中根据不同的策略可以通过JDK动态代理或者CGLIB代理来创建代理对象
2. Spring框架中的Resources接口，资源访问的策略
3. Servlet中的service方法，会根据客户端的不同提交方式来调用对应的doGet或者doPost方法来处理请求
4. Shiro中的多Realm认证中，根据我们不同的配置可以使用所有Realm认证通过或者其中一个认证通过等
5. SpringSecurity中的Authentication对象的存储方式
6. .......


## 6.迭代器模式

### 6.1 迭代器模式的作用

场景：访问聚合对象中的各个元素的时候，比如链表的遍历。我们一般是将遍历的方法也放在链表类中。但是如果需要修改遍历方法，就需要修改链表类的代码，违背了开闭原则。

迭代器模式就是在客户访问和聚合类之间插入一个迭代器，这样就将**聚合对象** 和 **遍历方法**解耦了，并且对外隐藏其实现细节。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/8a9095d4fbe04245b476ca16250ab2eb.png)


### 6.2 迭代器模式的应用

1. JDK中的List/Set集合中的迭代器
2. ......



## 7.中介者模式

### 7.1 中介则模式的作用

&emsp;&emsp;对象之间具有很强的关联性，而且有大量的相互调用，这种情况下，如果一个对象发生了变化，就需要追踪该对象关联的其他对象，并进行相应的处理，这就变得很复杂。而中介者模式，就是用一个中介者对象来封装一系列的对象交互，中介者使各对象不需要显式的相互引用，这就使得系统变得低耦合。比如：

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/bfe0f0f3fbff44e7ad83bc64c9637758.png)

假如没有总经理。下面三个部门：财务部、市场部、研发部。财务部要发工资，让大家核对公司需要跟市场部和研发部都通气；市场部要接个新项目，需要研发部处理技术、需要财务部出资金。市场部跟各个部门打交道。 虽然只有三个部门，但是关系非常乱。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/1462/1651992608037/af819fcb665d4aacacc4af386c9b3f8e.png)


实际上，公司都有总经理。各个部门有什么事情都通报到总经理这里，总经理再通知各个相关部门。


### 7.2 中介则模式的应用

1. MVC模式中的C，控制器就是一个中介者对象，M和V都和C打交道
2. 代理对象中的invoke方法，客户端和目标对象都是通过invoke来打交到的。
3. .....


## 8.状态模式

场景： 如果一个对象的行为会根据 其某个属性的变化而不同，那这个属性就可以被称为该对象的状态。这样的对象也被称为有状态对象（stateful）。如果这样的对象因为某些事件，其内部状态发生了改变，那么系统的行为也要随之发生变化的话，就可以使用状态模式。


## 9.命令模式

场景：请求的发送者和接收者之间解耦，让对象之间的调用关系更加灵活。发送者和接收者之间没有直接的引用关系，发送请求的对象只需要知道如何发送，而不必关心如何完成请求。


## 10.备忘录模式

场景：记录一个对象的内部状态，当用户后悔时能撤销当前的操作，是数据恢复到它原来的状态。比如我们编程的时候，ctrl+z 就是撤销当前操作，恢复到修改前的状态。又叫快照模式。



## 11.访问者模式

场景：有些集合对象中会有多种不同的元素，每种元素都有不同的访问者 和 处理方式。这种被处理的数据元素相对稳定，但是处理方式比较多样的情况，可以用访问者模式来处理。

访问者模式将数据结构中的各元素的操作分离出来，封装成独立的类，使其在不改变数据结构的前提下，可以添加作用于这些元素的新操作。为数据结构中的每个元素提供多种访问方式。



