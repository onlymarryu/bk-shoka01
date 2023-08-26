---
title: 集合
date: 2023-1-12
categories: 
  - 面试
tags:
  - 集合
  - 面试
---


 **基础**

### **ArrayList集合的add过程**

**1.7和1.8的区别**

在1.7的时候创建不传参直接初始化为10,

在1.8的时候，只是空参构造初始化为{}，元素个数为0，什么时候为10呢？——》在第一次add时候



默认初始化一个数组长度 **1.7：10**    ；**1.8：0（在第一次add时候变为10）**，最大长度为Integer.MAX_VALUE=2147483647=(2^31)-1 ;





当`size`>10 时，list要变，也就是说数组要扩容，扩容为原来的1.5倍



```
    /**
    * minCapacity =size+1
    */
    private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        //新的数组长度
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        // 扩容后还小于 size+1
        if (newCapacity - minCapacity < 0)
            newCapacity = minCapacity;
        // 扩容后大于 Integer.MAX_VALUE - 8
        if (newCapacity - MAX_ARRAY_SIZE > 0)
            newCapacity = hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData = Arrays.copyOf(elementData, newCapacity);
    }
```



当到达极端情况下此时arr为最大时 2^31-8

```
        int a = Integer.MAX_VALUE;
        //MAX_ARRAY_SIZE(2^31-8)
        int b = a - 8;
        // newCapacity
        int c = b + b >> 1;

        //MAX_ARRAY_SIZE(2^31-8)
        System.out.println("MAX_ARRAY_SIZE:"+b);
        // newCapacity
        System.out.println("newCapacity:"+c);
        // newCapacity - minCapacity( size + 1 )
        System.out.println("newCapacity - minCapacity:"+(c-(b+1)));
        // newCapacity - MAX_ARRAY_SIZE(2^31-8)
        System.out.println("newCapacity - MAX_ARRAY_SIZE:"+(c - (a-8)));
```

结果：

```
MAX_ARRAY_SIZE: 2147483639
newCapacity: -1073741838
ewCapacity - minCapacity: 1073741818
newCapacity - MAX_ARRAY_SIZE: 1073741819
```



### **1.8为什么改变成1.7的头插法成尾插法？**

剖析：

一个链表想要用**尾插**的形式插入数据，我们首先得知道他的*next*是否为*null*,

```
class node<T>{
    T data;
    node next;
}
```

一个链表想要用**头插**的形式插入数据，我们首先得知道他的*pre*是否为*null*,其次找到之后还要将新元素的*next*指向原来的头结点

```
class node<T> {
    T data;
    node pre;
    node next;
}
```

***总结：\***

​	从创建开始他的头插的结构体 > 尾插的结构体，其次最主要的是**头插容易形成环形结构**，造成CPU的损耗，尾插法可以避免

![image-20220709101908776](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220709101908776.png?lastModify=1673361991)





### **Victor 和 ArrayList区别**

【1】底层Object数组，int类型属性表示数组中有效长度：

![image-20220629231051908](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220629231051908.png?lastModify=1673361991)

【2】Vector v=new Vector();调用构造器：

![image-20220629231123796](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220629231123796.png?lastModify=1673361991)

【3】add方法：

![image-20220629231602106](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220629231602106.png?lastModify=1673361991)



![image-20220629231137216](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220629231137216.png?lastModify=1673361991)

**总结：**

|        |              Vector              |                          ArrayList                           |
| :----: | :------------------------------: | :----------------------------------------------------------: |
|  底层  |               数组               |                             数组                             |
| 初始化 |       直接为长度为10的数组       | 1.7：直接为长度为10的数组<br/>1.8只初始化为{}元素个数为0的数组，在第一次add的时候扩大到10 |
|  扩容  |               2倍                |                             1.5                              |
| 安全性 | 安全<br/>add方法加了synchronized |                         不安全<br/>                          |
|  效率  |                低                |                              高                              |



### **iterator(),Iterator,Iterable关系**

![image-20220629233802397](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220629233802397.png?lastModify=1673361991)

**增强for循环  底层也是通过迭代器实现的：**

**总结：**

`iterator()` 是`Iterable` 接口 中的一个抽象方法，`ArrayList`内部类`Itr`实现了`Iterator`接口，`iterator()`是Arraylist内部的一个方法



### **ListIterator迭代器**

迭代器不可以和 list 同时操作一个对象，可以用迭代器对象直接操作

不仅有`正向迭代`还有`逆向迭代`

```
 ArrayList<String> list = new ArrayList<>();
        list.add("aa");
        list.add("bb");
        list.add("cc");
        list.add("dd");
        list.add("ee");
        //在"cc"之后添加一个字符串"kk"
        ListIterator<String> it = list.listIterator();
while(it.hasNext()){
            if("cc".equals(it.next())){
                it.add("kk");
            }
        }
```



### **LinkedList底层**

​	链表，双向链表

输入和输出结构顺序一致



### **HashSet底层是什么**

[HashMap](#hashMap_base_code)，所有的值都存在了 **key**中

![image-20220630002635848](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220630002635848.png?lastModify=1673361991)

**基本原理：**

​	在存放数据时，首先要对数据进行`hash`计算然后根据hash值存放到对应的数组地址上，地址重复时，再在该位置上引申上一个链表，在每个值插入之前我们都先要对存储过的值进行比较，用的是`equals` ,如果存在就不存了。

引申

1、要放入HashSet的元素 要具备 `Hash` 、`equals` 两大方法且适合自己，即在自己的类要重写

2、哈希表 = 数组 +链表



### **LinkedSet底层**

​	哈希表+链表

 唯一，输出顺序和输入顺序一致



### **TreeSet底层**

TreeMap 底层数据结构为 二叉树 ,

他与输入结果 无序，输出结果，有序

一般情况下，随意输入，但是存储的时候，会经过比较器（内部比较强/外部比较器[多用]），经过计算将结果放到合适的位置上，输出的时候，利用中序遍历输出得到一个升序的结果。



引申

**1、外部比较器**

要实现 `Comparator` 接口 ，重写 `camparr` 方法，自定义比较方式，**多用**

![image-20220630115643791](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220630115643791.png?lastModify=1673361991)



**2、二叉树的遍历方式**

​	3种：先序遍历、中序遍历、后序遍历

**先、中、后说的是根节点**，例如

先：12 3 7 9

中：3 7 9 12 16

后：3 7 9 16 12

![image-20220630115853278](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220630115853278.png?lastModify=1673361991)





### **HashMap底层**

#### **1.7底层遵照** ***\*<font color=red >\**\**哈希表结构\** \**</font>\******(头插法)**

1.7的源码

```
    //哈希表默认的数组长度
    static final int DEFAULT_INITIAL_CAPACITY = 16;
    // 最大长度
    static final int MAXIMUM_CAPACITY = 1 << 30;
        //定义了一个float类型的变量，以后作为：默认的装填因子，加载因子是表示Hsah表中元素的填满的程度
        //太大容易引起哈西冲突，太小容易浪费  0.75是经过大量运算后得到的最好值
        //这个值其实可以自己改，但是不建议改，因为这个0.75是大量运算得到的
        static final float DEFAULT_LOAD_FACTOR = 0.75f;
        transient Entry<K,V>[] table;//主数组,每个元素为Entry类型，1.8改名为Node内部一样
        transient int size;
        int threshold;//数组扩容的界限值,门槛值   16*0.75=12 
        final float loadFactor;//用来接收装填因子的变量


        
        //【4】查看构造器：内部相当于：this(16,0.75f);调用了当前类中的带参构造器
        public HashMap() {
        this(DEFAULT_INITIAL_CAPACITY, DEFAULT_LOAD_FACTOR);
    }
        //【5】本类中带参数构造器：--》作用给一些数值进行初始化的！
        public HashMap(int initialCapacity, float loadFactor) {
        //【6】给capacity赋值，capacity的值一定是 大于你传进来的initialCapacity 的 最小的 2的倍数
        int capacity = 1;
        while (capacity < initialCapacity)
            capacity <<= 1;
                //【7】给loadFactor赋值，将装填因子0.75赋值给loadFactor
        this.loadFactor = loadFactor;
                //【8】数组扩容的界限值,门槛值
        threshold = (int)Math.min(capacity * loadFactor, MAXIMUM_CAPACITY + 1);
                
                //【9】给table数组赋值，初始化数组长度为16
        table = new Entry[capacity];
                   
    }
        //【10】调用put方法：
        public V put(K key, V value) {
                //【11】对空值的判断
            if (key == null)
                return putForNullKey(value);
                    //【12】调用hash方法，获取哈希码
            int hash = hash(key);
                    //【14】得到key对应在数组中的位置
            int i = indexFor(hash, table.length);
                    //【16】如果你放入的元素，在主数组那个位置上没有值，e==null  那么下面这个循环不走
                    //当在同一个位置上放入元素的时候
            for (Entry<K,V> e = table[i]; e != null; e = e.next) {
                Object k;
                            //哈希值一样  并且  equals相比一样   
                            //(k = e.key) == key  如果是一个对象就不用比较equals了
                if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
                    V oldValue = e.value;
                    e.value = value;
                    e.recordAccess(this);
                    return oldValue;
                }
            }
            modCount++;
                    //【17】走addEntry添加这个节点的方法：
            addEntry(hash, key, value, i);
            return null;
          }
        
        //【13】hash方法返回这个key对应的哈希值，内部进行二次散列，为了尽量保证不同的key得到不同的哈希码！
        final int hash(Object k) {
        int h = 0;
        if (useAltHashing) {
            if (k instanceof String) {
                return sun.misc.Hashing.stringHash32((String) k);
            }
            h = hashSeed;
        }
                //k.hashCode()函数调用的是key键值类型自带的哈希函数，
                //由于不同的对象其hashCode()有可能相同，所以需对hashCode()再次哈希，以降低相同率。
        h ^= k.hashCode();
        // This function ensures that hashCodes that differ only by
        // constant multiples at each bit position have a bounded
        // number of collisions (approximately 8 at default load factor).
                /*
                接下来的一串与运算和异或运算，称之为“扰动函数”，
                扰动的核心思想在于使计算出来的值在保留原有相关特性的基础上，
                增加其值的不确定性，从而降低冲突的概率。
                不同的版本实现的方式不一样，但其根本思想是一致的。
                往右移动的目的，就是为了将h的高位利用起来，减少哈西冲突
                */
        h ^= (h >>> 20) ^ (h >>> 12);
        return h ^ (h >>> 7) ^ (h >>> 4);
    }
        //【15】返回int类型数组的坐标
        static int indexFor(int h, int length) {
                //其实这个算法就是取模运算：h%length，取模效率不如位运算
        return h & (length-1);
    }
        //【18】调用addEntry
        void addEntry(int hash, K key, V value, int bucketIndex) {
                //【25】size的大小  大于 16*0.75=12的时候，比如你放入的是第13个，这第13个你打算放在没有元素的位置上的时候
        if ((size >= threshold) && (null != table[bucketIndex])) {
                        //【26】主数组扩容为2倍
            resize(2 * table.length);
                        //【30】重新调整当前元素的hash码
            hash = (null != key) ? hash(key) : 0;
                        //【31】重新计算元素位置
            bucketIndex = indexFor(hash, table.length);
        }
                //【19】将hash,key,value,bucketIndex位置  封装为一个Entry对象：
        createEntry(hash, key, value, bucketIndex);
    }
        //【20】
        void createEntry(int hash, K key, V value, int bucketIndex) {
                //【21】获取bucketIndex位置上的元素给e
        Entry<K,V> e = table[bucketIndex];
                //【22】然后将hash, key, value封装为一个对象，然后将下一个元素的指向为e （链表的头插法）
                //【23】将新的Entry放在table[bucketIndex]的位置上
        table[bucketIndex] = new Entry<>(hash, key, value, e);
                //【24】集合中加入一个元素 size+1
        size++;
    }
    //【27】
        void resize(int newCapacity) {
        Entry[] oldTable = table;
        int oldCapacity = oldTable.length;
        if (oldCapacity == MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return;
        }
                //【28】创建长度为newCapacity的数组
        Entry[] newTable = new Entry[newCapacity];
        boolean oldAltHashing = useAltHashing;
        useAltHashing |= sun.misc.VM.isBooted() &&
                (newCapacity >= Holder.ALTERNATIVE_HASHING_THRESHOLD);
        boolean rehash = oldAltHashing ^ useAltHashing;
                //【28.5】转让方法：将老数组中的东西都重新放入新数组中
        transfer(newTable, rehash);
                //【29】老数组替换为新数组
        table = newTable;
                //【29.5】重新计算
        threshold = (int)Math.min(newCapacity * loadFactor, MAXIMUM_CAPACITY + 1);
    }
        //【28.6】
        void transfer(Entry[] newTable, boolean rehash) {
        int newCapacity = newTable.length;
        for (Entry<K,V> e : table) {
            while(null != e) {
                Entry<K,V> next = e.next;
                if (rehash) {
                    e.hash = null == e.key ? 0 : hash(e.key);
                }
                                //【28.7】将哈希值，和新的数组容量传进去，重新计算key在新数组中的位置
                int i = indexFor(e.hash, newCapacity);
                                //【28.8】头插法
                e.next = newTable[i];//获取链表上元素给e.next
                newTable[i] = e;//然后将e放在i位置 
                e = next;//e再指向下一个节点继续遍历
            }
        }
    }
```

1.7的头插可能会产生什么问题，为什么？

问题： 可能会产生环链

解析：

通过他的扩容过程中，正常状态下会，他原位置不会变化，只是因为他的结点插入方式为头插法导致我们在每一次的扩容过程之后都会导致我们的链表顺序要翻转一次，这就有一个问题，在单线程的情况下，这么设计是没有问题的，但是在多线程且没有锁的情况下可能会导致产生环。

**扩容前**

![image-20220819102531781](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220819102531781.png?lastModify=1673361991)

正常resize()后

![image-20220819102607885](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220819102607885.png?lastModify=1673361991)

![image-20220819101051964](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220819101051964.png?lastModify=1673361991)

简单解释一下：

假设现在两个线程都已经进入到了trasfer()方法并且同时到达 rehash的地方，线程Thread 2落后于 Thread 1

这时候Thread 1已经扩容结束，但是在线程 Thread 2中的 oldTable 并不是我们修改后的还是原来的，这就有问题了

Thread1结果

![image-20220819110029605](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220819110029605.png?lastModify=1673361991)

Thread2结果

![image-20220819113951593](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220819113951593.png?lastModify=1673361991)

|       Thread  1       |       Thread  2       |
| :-------------------: | :-------------------: |
|     进入transfer      |                       |
|                       |     进入transfer      |
|    e->3, next-> 2     |                       |
|                       |    e->3, next-> 2     |
|     开始rehash()      |                       |
|                       |     开始rehash()      |
|         扩容          |                       |
| 扩容结束(Thread1结果) |                       |
|                       |         扩容          |
|                       | 扩容结束(Thread2结果) |

总结：因为两个线程同时记录的了原链表最初的 结点e地址和 next地址，在一个线程修改完成后顺序由321变成了123，另一个线程再去修改 ，由于头插的缘故 最开始3->2在修改完成后的 2->3之间就回形成环路

#### **1.8底层遵照** ***\*<font color=red >\**\**哈希表结构 + 红黑树\**\**</font>\******（尾插法）**

```
// HashMap<String,Integer> map = new HashMap<>(); -->JDK 1.7开始类型推断，后面用钻石运算符即可。
public class HashMap<K,V> extends AbstractMap<K,V>      //【1】继承的AbstractMap中，已经实现了Map接口
    implements Map<K,V>, Cloneable, Serializable { //【2】又实现了这个接口，多余，但是集合的设计者觉得没有必要删除，就这么地了

    //------------------属性部分：
    final float loadFactor;//【3-2】用来接收装填因子的变量
    /*
        【3-3】
        定义了一个float类型的变量，以后作为：默认的装填因子，加载因子是表示Hsah表中元素的填满的程度
        太大容易引起哈西冲突，太小容易浪费  0.75是经过大量运算后得到的最好值
        这个值其实可以自己改，但是不建议改，因为这个0.75是大量运算得到的
    */
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    int threshold;//【6-3】数组扩容的界限值,门槛值
    transient Node<K,V>[] table;//【7-5】底层主数组
    //------------------构造器：
    //【3】调用空构造器
    public HashMap() {
        //【3-1】给装填因子loadFactor赋值
        this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
    }
    
    //【4】调用有参构造器：
    public HashMap(int initialCapacity) {
        //【5】调用两个参数构造器
        this(initialCapacity, DEFAULT_LOAD_FACTOR);
    }
    //【6】
    public HashMap(int initialCapacity, float loadFactor) {
        //【6-1】健壮性考虑，传入的数据过小不行，过大不行
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);
        //【6-2】给装填因子loadFactor赋值，赋值为0.75，这个值可以单独传入改变，但是不建议改变，一般都用默认的0.75
        this.loadFactor = loadFactor;
        //【6-3】给threshold赋值 
        this.threshold = tableSizeFor(initialCapacity);
    }
    //【6-4】返回的是大于initialCapacity的最接近的2的整数倍  ，比如initialCapacity传入10，这个方法返回16
    static final int tableSizeFor(int cap) {//（内部内容讲源码时候不用管，面试题中详讲）
        int n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }
    
    //------------------方法：
    //【7】调用put方法
    public V put(K key, V value) {
        //【7-1】首先调用hash方法计算哈希值：
        //【7-3】调用putVal方法传入五个参数：
        return putVal(hash(key), key, value, false, true);
    }
    //【7-2】计算hash值
    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
    //【7-4】调用
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab;
        Node<K,V> p; 
        int n, i;
        //【7-6】将底层主数组table给tab，判断是否为null，第一次放数据一定是null
        if ((tab = table) == null || (n = tab.length) == 0)
            //【7-7】走入if分支：table是null，就对table进行扩容，走进resize方法
            n = (tab = resize()).length;//【7-21】table的length为16 ，n为16
        /*
        【7-22】
        i = (n - 1) & hash 根据哈希值和n计算放入数组的位置
        取出这个位置上的元素，看是否为空，如果是第一个元素，一定是null
        */
        if ((p = tab[i = (n - 1) & hash]) == null)
            //【7-23】在这个位置上将元素封装为Node对象，放入对应位置
            tab[i] = newNode(hash, key, value, null);//封装Node节点new Node<>(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1)  
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) {  
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;
        //【7-25】size指的是放入集合的键值总数，size++操作，不大于threshold，resize方法不走
        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }
    //【7-8】resize方法：---》假设最开始走的是HashMap的空构造器：
    final Node<K,V>[] resize() {
        Node<K,V>[] oldTab = table;//【7-9】table 是null
        int oldCap = (oldTab == null) ? 0 : oldTab.length; //【7-10】oldCap:0
        int oldThr = threshold;//【7-11】threshold为16，oldThr：16
        int newCap, newThr = 0;
        if (oldCap > 0) {//【7-12】不走
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1;
        }
        else if (oldThr > 0)  //【7-13】走
            newCap = oldThr;//newCap=16
        else {               //【7-14】不走
             
            newCap = DEFAULT_INITIAL_CAPACITY;
             
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        if (newThr == 0) {//【7-15】走
            float ft = (float)newCap * loadFactor;//【7-16】ft: 16*0.75=12
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                      (int)ft : Integer.MAX_VALUE); //【7-17】newThr = 12
        }
        //【7-18】threshold赋值为newThr为12， ---》所以走空构造器这里threshold赋值为12，走有参构造器里面threshold赋值为12？？？？
        threshold = newThr;
        @SuppressWarnings({"rawtypes","unchecked"})
        //【7-19】创建Node数组，长度为newCap16
            Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        //【7-20】table赋值为newTab
        table = newTab;
        if (oldTab != null) {
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { 
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            if ((e.hash & oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }
}
```





```
public class HashMap<K,V> extends AbstractMap<K,V> 
    implements Map<K,V>, Cloneable, Serializable { 
    final float loadFactor;
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    int threshold;
    transient Node<K,V>[] table;
    public HashMap() {
        this.loadFactor = DEFAULT_LOAD_FACTOR; 
    }
    
    public HashMap(int initialCapacity) {
        this(initialCapacity, DEFAULT_LOAD_FACTOR);
    }
    public HashMap(int initialCapacity, float loadFactor) {
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);
        this.loadFactor = loadFactor;
        this.threshold = tableSizeFor(initialCapacity);
    }
    static final int tableSizeFor(int cap) {
        int n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }
    
    //【8-1】put方法
    public V put(K key, V value) {
        //计算hash值
        return putVal(hash(key), key, value, false, true);
    }

    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
    //【8-2】调用putVal方法
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab;
        Node<K,V> p; 
        int n, i;
        
        //【8-3】table不空了，不走if        
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        //【8-4】tab[i]不null，不走if
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            /*
                【8-5】
                判断p.hash == hash哈希值是否相等，即使hash相等也要做&&后续的判断，因为两个对象哈希值相等是有可能的
                (k = p.key) == key   == 比较地址值，String的话一样，不是字符串地址也不一样，
                Animal a1 = new Animal(19);     和   Animal a2 = new Animal(19); 地址一定不同，就需要用后面的equals进行比较
            */
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))   //----》哈希值相等，出现哈西碰撞
                //【8-6】将该数组位置的数据给e
                e = p;
            else if (p instanceof TreeNode)
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                for (int binCount = 0; ; ++binCount) {
                    if ((e = p.next) == null) {
                        p.next = newNode(hash, key, value, null);
                        if (binCount >= TREEIFY_THRESHOLD - 1)  
                            treeifyBin(tab, hash);
                        break;
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) {  
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;//【8-7】新value替换老value
                afterNodeAccess(e);
                return oldValue;//【8-8】返回老value
            }
        }
        ++modCount;

        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }

    final Node<K,V>[] resize() {
        Node<K,V>[] oldTab = table;
        int oldCap = (oldTab == null) ? 0 : oldTab.length; 
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap > 0) {
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1;
        }
        else if (oldThr > 0) 
            newCap = oldThr;
        else {    
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        if (newThr == 0) {
            float ft = (float)newCap * loadFactor;
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                      (int)ft : Integer.MAX_VALUE);
        }
        threshold = newThr;
        @SuppressWarnings({"rawtypes","unchecked"})
            Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        table = newTab;
        if (oldTab != null) {
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { 
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            if ((e.hash & oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }
}
```



```
public class HashMap<K,V> extends AbstractMap<K,V> 
    implements Map<K,V>, Cloneable, Serializable { 
    final float loadFactor;
    static final float DEFAULT_LOAD_FACTOR = 0.75f;
    int threshold;
    transient Node<K,V>[] table;
    public HashMap() {
        this.loadFactor = DEFAULT_LOAD_FACTOR; 
    }
    
    public HashMap(int initialCapacity) {
        this(initialCapacity, DEFAULT_LOAD_FACTOR);
    }
    public HashMap(int initialCapacity, float loadFactor) {
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal initial capacity: " +
                                               initialCapacity);
        if (initialCapacity > MAXIMUM_CAPACITY)
            initialCapacity = MAXIMUM_CAPACITY;
        if (loadFactor <= 0 || Float.isNaN(loadFactor))
            throw new IllegalArgumentException("Illegal load factor: " +
                                               loadFactor);
        this.loadFactor = loadFactor;
        this.threshold = tableSizeFor(initialCapacity);
    }
    static final int tableSizeFor(int cap) {
        int n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }
    
    //【9-1】put方法
    public V put(K key, V value) {
        //计算hash值
        return putVal(hash(key), key, value, false, true);
    }

    static final int hash(Object key) {
        int h;
        return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
    }
    //【9-2】调用putVal方法
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab;
        Node<K,V> p; 
        int n, i;
        
        //【9-3】table不空了，不走if        
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        //【9-4】tab[i]不null，不走if
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;
            /*
                【9-5】
                判断p.hash == hash哈希值是否相等，即使hash相等也要做&&后续的判断，因为两个对象哈希值相等是有可能的
                此时“通话”和“重地”的哈希值一致，但是key不一致，if不走
            */
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                e = p;
            else if (p instanceof TreeNode)//【9-6】p也不是红黑树，不走if
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                //【9-7】走到这里，证明数组的这个位置是个链表了
                for (int binCount = 0; ; ++binCount) {//【9-8】无条件的死循环   binCount 链表上节点的个数
                    //随着循环  p.next就是一路找链上元素
                    //p.next要是没有元素，就要开始追加了呗
                    if ((e = p.next) == null) {//【9-10】一路next比较都没有key相同的数据
                    
                        p.next = newNode(hash, key, value, null);//【9-11】追加在链表尾部 ---》 前七后八
                        //【9-12】如果节点个数大于8，进行树化：要从链表转为红黑树
                        if (binCount >= TREEIFY_THRESHOLD - 1)  
                            treeifyBin(tab, hash);//【9-13】这里还涉及 剪枝 问题，树节点在6个以下，就又变成链表了
                        break;
                    }
                    //【9-9】比较过程中：如果比较链表某个key相同，就break结束了，不用继续走了
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break;
                    p = e;
                }
            }
            if (e != null) {  
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;//【8-7】新value替换老value
                afterNodeAccess(e);
                return oldValue;//【8-8】返回老value
            }
        }
        ++modCount;

        if (++size > threshold)
            resize();
        afterNodeInsertion(evict);
        return null;
    }

    final Node<K,V>[] resize() {
        Node<K,V>[] oldTab = table;
        int oldCap = (oldTab == null) ? 0 : oldTab.length; 
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap > 0) {
            if (oldCap >= MAXIMUM_CAPACITY) {
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                newThr = oldThr << 1;
        }
        else if (oldThr > 0) 
            newCap = oldThr;
        else {    
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        if (newThr == 0) {
            float ft = (float)newCap * loadFactor;
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                      (int)ft : Integer.MAX_VALUE);
        }
        threshold = newThr;
        @SuppressWarnings({"rawtypes","unchecked"})
            Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        table = newTab;
        if (oldTab != null) {
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {
                    oldTab[j] = null;
                    if (e.next == null)
                        newTab[e.hash & (newCap - 1)] = e;
                    else if (e instanceof TreeNode)
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { 
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;
                            if ((e.hash & oldCap) == 0) {
                                if (loTail == null)
                                    loHead = e;
                                else
                                    loTail.next = e;
                                loTail = e;
                            }
                            else {
                                if (hiTail == null)
                                    hiHead = e;
                                else
                                    hiTail.next = e;
                                hiTail = e;
                            }
                        } while ((e = next) != null);
                        if (loTail != null) {
                            loTail.next = null;
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            hiTail.next = null;
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }
}
```





**总结：**

默认（创建时只是初始化负载因子，数组长度是在第一次put的时候初始化的）**数组长度为16**，**最大程度**,**负载因子为0.75**，扩容时**扩大2倍**，最大不超过 (一旦到达最开始的域值就变大)

1.8相对于1.7只是改变了数据结构



### **Hashmap为什么要使用红黑树？**

​	在jdk1.8版本后，java对HashMap做了改进，在**链表长度大于8**的时候，将后面的数据存在红黑树中，以加快检索速度 

​	红黑树虽然本质上是一棵二叉查找树，但它在二叉查找树的基础上增加了着色和相关的性质使得红黑树相对平衡，从而保证了红黑树的查找、插入、删除的时间复杂度最坏为O(log n)。加快检索速率。

引申

在**链表长度小于6**的时候,红黑树又会变回二叉树



### **主数组的长度为什么是*****\*$\**\**$\******？**

**原因1：**

因为这个length的长度，会影响 key的位置：

![image-20220630132734570](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220630132734570.png?lastModify=1673361991)

实际上这个算法就是：  h%length   ,但是取模的话  效率太低，所以用位运算效率会很高。

**原因2：**

如果不是2的整数倍，那么 哈西碰撞 哈西冲突的概率就高了很多



### **装填因子0.75的原因**

**如果装填因子是1， 那么数组满了再扩容，可以做到  最大的空间利用率**  但是这是一个理想状态，元素不可能完全的均匀分布，很可能就哈西碰撞产生链表了。产生链表的话 查询时间就长了。 

- **空间好，时间不好**



**如果是0.5的话，就浪费空间，但是可以做到到0.5就扩容 ，然后哈西碰撞就少，不产生链表的话，那么查询效率很高**   

- **时间好，空间不好**



**总结：**

1 	空间利用率高，但是容易造成**hash冲突**，产生链表，降低查询效率；

0.5   不易造成Hash冲突，但是空间利用率低；

综上所述JDK官方折中处理取了一个中间值 0.75



### **HashMap 的时间复杂度**

在数组中结点没有产生链表的情况下O(1)

在产生链表但长度小于8的时候O(n)

链表长度大于等于8的时候O(logn)



### **HashTable底层**

底层遵照 哈希表结构 



### **LinkedMap底层**

底层遵照 哈希表 + 链表





### **HashMap和Hashtable有什么区别？**

|          |     HashMap      |     Hashtable      |
| :------- | :--------------: | :----------------: |
| 存储     | 允许`Key` 为null | 不允许`Key` 为null |
| 线程安全 |    线程不安全    |      线程安全      |

**推荐使用**：

​	在**Hashtable**的类注释可以看到，**Hashtable**是保留类**不建议使用**，推荐在**单线程环境**下使**用HashMap替代**，如果需要**多线程**使用则**用ConcurrentHashMap替代**。





### **TreeMap底层**

红黑树

```
public class TreeMap<K,V>{
        //重要属性：
        //外部比较器：
        private final Comparator<? super K> comparator;
        //树的根节点：
        private transient Entry<K,V> root = null;
        //集合中元素的数量：
        private transient int size = 0;
        //空构造器:
        public TreeMap() {
        comparator = null;//如果使用空构造器，那么底层就不使用外部比较器
    }
        //有参构造器：
        public TreeMap(Comparator<? super K> comparator) {
        this.comparator = comparator;//如果使用有参构造器，那么就相当于指定了外部比较器
    }
        
        public V put(K key, V value) {//k,V的类型在创建对象的时候确定了
        //如果放入的是第一对元素，那么t的值为null
        Entry<K,V> t = root;//在放入第二个节点的时候，root已经是根节点了
                //如果放入的是第一个元素的话，走入这个if中：
        if (t == null) {
                        //自己跟自己比
            compare(key, key); // type (and possibly null) check
                        //根节点确定为root
            root = new Entry<>(key, value, null);
                        //size值变为1
            size = 1;
            modCount++;
            return null;
        }
                
        int cmp;
        Entry<K,V> parent;
        // split comparator and comparable paths
                //将外部比较器赋给cpr:
        Comparator<? super K> cpr = comparator;
                //cpr不等于null，意味着你刚才创建对象的时候调用了有参构造器，指定了外部比较器
        if (cpr != null) {
            do {
                parent = t;
                cmp = cpr.compare(key, t.key);//将元素的key值做比较
                                //cmp返回的值就是int类型的数据：
                                //要是这个值《0 =0  》0
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else//cpm==0
                                //如果key的值一样，那么新的value替换老的value  但是key不变 因为key是唯一的
                    return t.setValue(value);
            } while (t != null);
        }
                //cpr等于null，意味着你刚才创建对象的时候调用了空构造器，没有指定外部比较器，使用内部比较器
        else {
            if (key == null)
                throw new NullPointerException();
            Comparable<? super K> k = (Comparable<? super K>) key;
            do {
                parent = t;
                cmp = k.compareTo(t.key);//将元素的key值做比较
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else
                    return t.setValue(value);
            } while (t != null);
        }
        Entry<K,V> e = new Entry<>(key, value, parent);
        if (cmp < 0)
            parent.left = e;
        else
            parent.right = e;
        fixAfterInsertion(e);
        size++;//size加1 操作
        modCount++;
        return null;
    }
        
        
}
 static final class Entry<K,V> implements Map.Entry<K,V> {
        K key;
        V value;
        Entry<K,V> left = null;
        Entry<K,V> right = null;
        Entry<K,V> parent;
        boolean color = BLACK;
 }

```















### **Collection 和 Collections 区别**

Collection，提供了对集合对象进行基本操作的通用**接口方法**，所有集合都是它的子类，比如 List、Set 等。

Collections，是一个**工具类**，它包含了很多静态方法，不能被实例化，比如排序方法： Collections. sort(list)等。



### **Arrays.asList()方法之后的集合可以调用什么方法**

​	`size()` 只有 size 方法可用，通过查看源码我们知道，将传递过去的数组变成了一个ArrayList集合，但是不是 java.util.ArrayList 而是 java.util.Arrays.ArrayList ,也就是Arrays中的一个内部类，他的方法只定义了`size`、`toArray`、`get`、`set`和 `indexOf`



![image-20220628202337546](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220628202337546.png?lastModify=1673361991)

![image-20220628202651719](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220628202651719.png?lastModify=1673361991)



### **Map、Set、List的区别**

![image-20220629181141368](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/image-20220629181141368.png?lastModify=1673361991)

**List**

> List 中存储的元素有序，指的是读出的顺序与存入的顺序是一致的。

①可以允许重复的对象； ②可以插入多个 null 元素； ③是一个有序容器，保持了每个元素的插入顺序，输出的顺序就是插入的顺序； ④常用的实现类有 ArrayList、LinkedList 和 Vector；ArrayList 最为流行，它提供了使用索引的随意访问，而 LinkedList 则对于经常需要从 List 中添加或删除元素的场合更为合适。



**Set**

> Set 存储的元素是无序的，这里的无序指的是存入的顺序与输出的顺序可能是不一致的。

①不允许重复对象； ②无序容器，你无法保证每个元素的存储顺序，TreeSet 通过 Comparator 或者 Comparable 维护了一个排序顺序； ③只允许一个 null 元素； ④Set 接口最流行的几个实现类是 HashSet、LinkedHashSet 以及 TreeSet； 最流行的是**基于 HashMap** 实现的 HashSet； TreeSet 还实现了 SortedSet 接口，因此 TreeSet 是一个根据其 compare() 和 compareTo() 的定义进行排序的有序容器。



**Map**

> Map 存储的元素是键值对（key-value），键和值都是无序的，即存入顺序与输出顺序可能都不一样。

①Map 不是 Collection 的子接口或者实现类，Map 是一个接口； ②Map 的 每个 Entry 都持有两个对象，也就是一个键一个值，Map 可能会持有相同的值对象但键对象必须是唯一的； ③TreeMap 也通过 Comparator 或者 Comparable 维护了一个排序顺序； ④Map 里你可以拥有随意个 null 值，但最多只能有一个 null 键； ⑤Map 接口最流行的几个实现类是 HashMap、LinkedHashMap、Hashtable 和 TreeMap。（HashMap、TreeMap 最常用）









### ***\*[\**[\**HashSet与TreeSet 区别\**](https://www.cnblogs.com/williamjie/p/9099038.html)\**](\**\**https://www.cnblogs.com/williamjie/p/9099038.html\**\**)\****

**HashSet** HashSet有以下特点

- 不能保证元素的排列顺序，顺序有可能发生变化
- 不是同步的
- 集合元素可以是null,但只能放入一个null

​    当向HashSet集合中存入一个元素时，HashSet会调用该对象的hashCode()方法来得到该对象的hashCode值，然后根据 hashCode值来决定该对象在HashSet中存储位置。 简单的说，HashSet集合判断两个元素相等的标准是两个对象通过equals方法比较相等，并且两个对象的hashCode()方法返回值相等

​    注意，如果要把一个对象放入HashSet中，重写该对象对应类的equals方法，也应该重写其hashCode()方法。其规则是如果两个对 象通过equals方法比较返回true时，其hashCode也应该相同。另外，对象中用作equals比较标准的属性，都应该用来计算 hashCode的值。

**TreeSet类** TreeSet是SortedSet接口的唯一实现类，TreeSet可以确保集合元素处于排序状态。TreeSet支持两种排序方式，自然排序 和定制排序，其中自然排序为默认的排序方式。向TreeSet中加入的应该是同一个类的对象。 TreeSet判断两个对象不相等的方式是两个对象通过equals方法返回false，或者通过CompareTo方法比较没有返回0 **自然排序** 自然排序使用要排序元素的CompareTo（Object obj）方法来比较元素之间大小关系，然后将元素按照升序排列。 Java提供了一个Comparable接口，该接口里定义了一个compareTo(Object obj)方法，该方法返回一个整数值，实现了该接口的对象就可以比较大小。 obj1.compareTo(obj2)方法如果返回0，则说明被比较的两个对象相等，如果返回一个正数，则表明obj1大于obj2，如果是 负数，则表明obj1小于obj2。 如果我们将两个对象的equals方法总是返回true，则这两个对象的compareTo方法返回应该返回0 **定制排序** 自然排序是根据集合元素的大小，以升序排列，如果要定制排序，应该使用Comparator接口，实现 int compare(T o1,T o2)方法。

**最重要：**

1、TreeSet 是二差树实现的,Treeset中的数据是自动排好序的，不允许放入null值。 

2、HashSet 是哈希表实现的,HashSet中的数据是无序的，可以放入null，但只能放入一个null，两者中的值都不能重复，就如数据库中唯一约束。 

3、HashSet要求放入的对象必须实现HashCode()方法，放入的对象，是以hashcode码作为标识的，而具有相同内容的 String对象，hashcode是一样，所以放入的内容不能重复。但是同一个类的对象可以放入不同的实例 。

 

**HashSet与TreeSet的使用场景** 

HashSet：哈希表是通过使用称为散列法的机制来存储信息的，元素并没有以某种特定顺序来存放 TreeSet：提供一个使用树结构存储Set接口的实现(红黑树算法)，对象以升序顺序存储，访问和遍历的时间很快。  使用场景:HashSet是基于Hash算法实现的，其性能通常都优于TreeSet。我们通常都应该使用HashSet，在我们需要排序的功能时，我们才使用TreeSet。 

**HashSet与TreeSet的底层运行方式:**  TreeSet集合对象的加入过程：  TreeSet的底层是通过二叉树来完成存储的，无序的集合  当我们将一个对象加入treeset中，treeset会将第一个对象作为根对象，然后调用对象的compareTo方法拿第二个对象和第一个比较，当返回至=0时，说明2个对象内容相等，treeset就不把第二个对象加入集合。返回>1时，说明第二个对象大于第一个对象，将第二个对象放在右边，返回-1时，则将第二个对象放在左边，依次类推 

HashSet集合对象的加入过程：  hashset底层是hash值的地址，它里面存的对象是无序的。  第一个对象进入集合时，hashset会调用object类的hashcode根据对象在堆内存里的地址调用对象重写的hashcode计算出一个hash值，然后第一个对象就进入hashset集合中的任意一个位置。  第二个对象开始进入集合，hashset先根据第二个对象在堆内存的地址调用对象的计算出一个hash值，如果第二个对象和第一个对象在堆内存里的地址是相同的，那么得到的hash值也是相同的，直接返回true，hash得到true后就不把第二个元素加入集合（这段是hash源码程序中的操作）。如果第二个对象和第一个对象在堆内存里地址是不同的，这时hashset类会先调用自己的方法遍历集合中的元素，当遍历到某个元素时，调用对象的equals方法，如果相等，返回true，则说明这两个对象的内容是相同的，hashset得到true后不会把第二个对象加入集合。



### **hashtabl、hashMap treeMap的区别**

**实现方面** HashMap是继承自AbstractMap类，而HashTable是继承自Dictionary类。它们都同时实现了map、Cloneable（可复制）、Serializable（可序列化）这三个接口。存储的内容是基于key-value的键值对映射，不能有重复的key，而且一个key只能映射一个value。HashSet底层就是基于HashMap实现的。

**为空方面** Hashtable的key、value都不能为null；HashMap的key、value可以为null，不过只能有一个key为null，但可以有多个null的value；TreeMap键、值都不能为null。

**排序方面** Hashtable、HashMap具有无序特性。TreeMap是利用红黑树实现的（树中的每个节点的值都会大于或等于它的左子树中的所有节点的值，并且小于或等于它的右子树中的所有节点的值），实现了SortMap接口，能够对保存的记录根据键进行排序。所以一般需求排序的情况下首选TreeMap，默认按键的升序排序（深度优先搜索），也可以自定义实现Comparator接口实现排序方式。



**注：**HashTable是一个线程安全的类，它使用**synchronized**来锁住整张[Hash](https://so.csdn.net/so/search?q=Hash&spm=1001.2101.3001.7020)表来实现线程安全，即每次锁住整张表让线程独占，相当于所有线程进行读写时都去竞争一把锁，导致效率非常低下

Hashtable现在很少出现了，大家更多的会使用`ConcurrentHashMap`，引导面试官提问**ConcurrentHashMap**。



### **ConcurrentHashMap原理与实现**

分析问题：原理与实现主要是锁的原理与实现!我们可以从JDK1.7开始聊起: JDK1.7版本,ConcurrentHashMap内部使用段(Segment),ConcurrentLevel有16个分段，这16个分段有独立的锁机制，每个独立的机制都是一张表，表的下面是链表，这样就可以支持并发的同时保证每张表的线程安全，大大的题高了效率。

​	JDK1.8版本,ConcurrentHashMap内部使用sychronized + volatile + CAS的实现降低锁的粒度，大家可以认为粒度就是HashEntry (首节点)。

让我们看看具体是如何实现的:

- 插入、删除、扩容的时候都对数组中相应位置的元素加锁了，加锁用的是synchronized.
- table数组、Node中的val和next、以及一些控制字段都加了volatile
- 在更新一些关键变量的时候用到了sun.misc.Unsafe中的一些方法

![204fe5e5d4314bf99acbaa07df844ef5~tplv-k3u1fbpfcp-watermark](file://D:/_Myself/%E9%9D%A2%E8%AF%95/%E9%9D%A2%E8%AF%95%E9%A2%98/img/204fe5e5d4314bf99acbaa07df844ef5tplv-k3u1fbpfcp-watermark.jpg?lastModify=1673361991)



**反思&扩展** **ConcurrentHashMap有什么缺陷吗?** ConcurrentHashMap是设计为非阻塞的。在更新时会局部锁住某部分数据，但不会把整个表都锁住。同步读取操作则是完全非阻塞的。好处是在保证合理的同步前提下，效率很高。坏处是严格来说读取操作不能保证反映最近的更新。例如线程A调用putAll写入大量数据，期间线程B调用get，则只能get到目前为止已经顺利插入的部分数据。

**ConcurrentHashMap在JDK7和8之间的区别** JDK1.8的实现降低锁的粒度，JDK1.7版本锁的粒度是基于Segment的，包含多个HashEntry，而JDK1.8锁的粒度就是 HashEntry (首节 点) JDK1.8版本的数据结构变得更加简单，使得操作也更加清晰流畅，因为已经使用synchronized来进行同步，所以不需要分段锁的概念，也就不需要Segment这种数据结构了，由于粒度的降低，实现的复杂度也增加了 JDK1.8使用红黑树来优化链表，基于长度很长的链表的遍历是一个很漫长的过程，而红黑树的遍历效率是很快的，代替一定阈值的链表，这样形成一个最佳拍档