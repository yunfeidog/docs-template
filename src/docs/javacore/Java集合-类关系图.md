---
# 当前页面内容标题
title: 集合类关系图
# 当前页面图标
icon: write
# 分类
category:
  - Java
# 标签
tag:
  - Java
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 类关系图



## 简单介绍

* 容器就是可以容纳其他`Java`对象的对象。`Java Collections Framework(JCF)`为`Java`开发者提供了通用的容器，其始于`JDK 1.2`。
* `Java`容器里只能放对象，对于基本类型(`int`, `long`, `float`, `double`等)，需要将其包装成对象类型后(`Integer`, `Long`, `Float`, `Double`等)才能放到容器里。很多时候拆包装和解包装能够自动完成。这虽然会导致额外的性能和空间开销，但简化了设计和编程。
* 容器主要包括 `Collection` 和 `Map` 两种，`Collection` 存储着对象的集合，而 `Map` 存储着键值对（两个对象）的映射表。

## Collection

### 如何学习



### 如何遍历

* 遍历操作是集合最基本的操作，顶层的`Collection`接口提供一个通用高级的遍历方式：迭代器。
* `Collection`顶层接口负责定义获得迭代器的方法，底层的数据结构负责实现自己的迭代器，迭代器的工作原理如下图所示：



### Set

* `TreeSet`【无序集合】

基于红黑树实现，支持**有序性操作**，但是**无序集合**。其查找效率不如 `HashSet`，`HashSet` 查找的时间复杂度为 `O(1)`，`TreeSet` 则为 `O(logN)`。

> `TreeSet`支持有序性操作的理解：https://blog.csdn.net/qq_36437446/article/details/80089609

* `HashSet`【无序集合】

基于哈希表实现，支持快速查找，但**不支持有序性操作**。并且失去了元素的插入顺序信息，也就是说使用 `Iterator` 遍历 `HashSet` 得到的结果是不确定的，即是一个**无序集合**。

>`HashSet`不支持有序性操作的理解：https://blog.csdn.net/qq_43541242/article/details/108013680

* `LinkedHashSet`【有序集合】

具有 `HashSet` 的查找效率，且内部使用**双向链表**维护元素的插入顺序。

>`TreeSet`和`HashSet`都是属于**无序的集合**，而`LinkedHashSet`是属于**有序的集合**，就是说对于`TreeSet`和`HashSet`，存储和取出元素的顺序有可能不一致，但是对于`LinkedHashSet`，其存储和取出元素的顺序是一致的。
>
>```java
>public class Main {
>    public static void main(String[] args) {
>        TreeSet<Integer> integers = new TreeSet<>();
>        integers.add(3);
>        integers.add(4);
>        integers.add(1);
>        integers.add(2);
>        Iterator<Integer> iterator = integers.iterator();
>        while (iterator.hasNext()) {
>            System.out.print(iterator.next() + " ");
>        }
>        // 1 2 3 4
>        System.out.println();
>        HashSet<Integer> set = new HashSet<>();
>        set.add(5);
>        set.add(6);
>        set.add(1);
>        set.add(2);
>        set.add(8);
>        Iterator<Integer> iterator1 = set.iterator();
>        while (iterator1.hasNext()) {
>            System.out.print(iterator1.next() + " ");
>        }
>        // 1 2 5 6 8
>        System.out.println();
>        HashSet<Integer> set1 = new LinkedHashSet<>();
>        set1.add(5);
>        set1.add(6);
>        set1.add(1);
>        set1.add(2);
>        set1.add(8);
>        Iterator<Integer> iterator2 = set1.iterator();
>        while (iterator2.hasNext()) {
>            System.out.print(iterator2.next() + " ");
>        }
>        // 5 6 1 2 8 
>    }
>}
>
>```
>
>`TreeSet`支持**有序性操作（可以使其有序）**，而`HashSet`**不支持有序性操作（不能使其有序）**的意思是说对存储进集合的元素是否会自动排序或者按照我们自定义的方式进行排序（是否能使其有序），最后取出的元素又是否有序（按照自动排序的方式或者我们自定义的方式）。对于**有序性操作**具体可以看两者的构造函数，`TreeSet`的构造函数有一个含有`Comparator`参数，而`HashSet`是没有的，也就是说`HashSet`不会对存储的元素进行排序，输出的结果不保证有序，如果有序，那也是凑巧。
>
>```java
>// TreeSet构造函数
>public TreeSet(Comparator<? super E> comparator) {
>    this(new TreeMap<>(comparator));
>}
>```
>
>```java
>// TreeSet使其有序性操作（在插入的时候就使其按照我们自定义排序的方式存储）
>public class Main {
>    public static void main(String[] args) {
>        TreeSet<Student> students = new TreeSet<>(new Comparator<Student>() {
>            @Override
>            public int compare(Student o1, Student o2) {
>                // 先按年龄进行升序，年龄相同的按照学号降序
>                int i = o1.getAge() - o2.getAge();
>                if (i == 0) {// 年龄相等
>                    return o2.getIdNumber() - o1.getIdNumber();
>                }
>                return i;
>            }
>        });
>        students.add(new Student(2, 3));
>        students.add(new Student(3, 3));
>        students.add(new Student(4, 3));
>        students.add(new Student(6, 5));
>        students.add(new Student(1, 2));
>        students.add(new Student(5, 4));
>        Iterator<Student> iterator = students.iterator();
>        while (iterator.hasNext()) {
>            System.out.println(iterator.next());
>        }
>    }
>}
>
>@NoArgsConstructor
>@AllArgsConstructor
>@ToString
>@Getter
>@Setter
>class Student {
>    private int idNumber;
>    private int age;
>}
>// 对于Comparator接口的使用总结：
>// 1、jdk官方默认是升序
>// 2、a negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.
>// 3、总结：升序就是第一个减去第二个，降序就是第二个减去第一个
>```
>
>**总结一下（区别无序集合、有序集合、有序操作三者的区别很重要）：**
>
>1、`TreeSet`：是**无序集合，但是支持有序操作（使其有序）**
>
>2、`HashSet`：是**无序集合，也不支持有序操作（查找效率高）**
>
>3、`LinkedHashSet`：是**有序集合（是不是支持有序操作已没有意义）**

### List

* `ArrayList`

基于**动态数组**实现，支持**随机访问**，可以很快的根据下标查找元素。

* `Vector`

和 `ArrayList` 类似，但它是**线程安全**的。

* `LinkedList`

基于**双向链表**实现，只能**顺序访问**，但是可以快速地在链表中间插入和删除元素。不仅如此，**`LinkedList` 还可以用作栈、队列和双向队列。**

> **`ArrayList`与`LinkedList`的区别：**
>
> * `ArrayList`的实现是基于**数组**，`LinkedList`的实现是基于**双向链表**。
> * **对于随机访问，`ArrayList`优于`LinkedList`**，`ArrayList`可以根据下标以`O(1)`时间复杂度对元素进行随机访问。而`LinkedList`的每一个元素都依靠地址指针和它后一个元素连接在一起，在这种情况下，查找某个元素的时间复杂度是`O(n)`。
> * `ArrayList`与`LinkedList`在`API`层面都可以通过`index`获取，但是底层一个是随机访问，一个是顺序访问。
> * **对于插入和删除操作，`LinkedList`优于`ArrayList`**，因为当元素被添加到`LinkedList`任意位置的时候，不需要像`ArrayList`那样重新计算大小或者是更新索引。
> * **`LinkedList`比`ArrayList`更占内存**，因为`LinkedList`的节点除了存储数据，还存储了两个引用，一个指向前一个元素，一个指向后一个元素。
> * **业务中如果想要快速的进行插入和删除，就用`LinkedList`，如果想快速获取元素或者降低空间消耗，就使用`ArrayList`。**

### Queue

* `LinkedList`

可以用它来实现**双向队列**。

* `PriorityQueue`

基于**堆结构**实现，可以用它来实现优先队列。

## Map

### 如何学习

* `Map`的键是唯一的，值可以重复。

* 学习`Map`顶层接口，注意顶层接口中还定义了一个内部的接口`Entry`，这代表的是一个键值对，源码中对其解释：`A map entry (key-value pair)`。
* `Map`顶层接口中定义了一个方法可以获取键值对的集合，其方法声明：`Set<Map.Entry<K, V>> entrySet()`。

### 如何遍历

* 通过`KeySet`集合遍历



* 通过`EntrySet`集合遍历



* 代码演示

```java
// Map遍历的两种方式
public class Main {
    public static void main(String[] args) {
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "2");
        map.put(2, "2");
        map.put(3, "2");
        map.put(4, "2");
        // 1、通过EntrySet集合遍历
        Iterator<Map.Entry<Integer, String>> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            // 打印键值对
            Map.Entry<Integer, String> next = iterator.next();
            System.out.println("键：" + next.getKey() + " 值：" + next.getValue());
        }
        System.out.println("=======");
        // 2、通过KeySet集合遍历（forEach、增强for循环、迭代器都可以实现）
        map.keySet().forEach((item) -> {
            System.out.println("键：" + item + " 值：" + map.get(item));
        });
    }
}
```

### TreeMap

基于**红黑树**实现。

### HashMap

基于**哈希表**实现。

### HashTable

和 `HashMap` 类似，但它是线程安全的，这意味着同一时刻多个线程可以同时写入 `HashTable` 并且不会导致数据不一致。它是遗留类，不应该去使用它。现在可以使用 `ConcurrentHashMap` 来支持线程安全，并且 `ConcurrentHashMap` 的效率会更高，因为 `ConcurrentHashMap` 引入了分段锁。

### LinkedHashMap

使用**双向链表**来维护元素的顺序，顺序为插入顺序或者最近最少使用(`LRU`)顺序。

>深入理解`HashMap`和`TreeMap`的区别：
>
>* 两者都是无序`Map`，就是说存储的顺序和读取的顺序有可能不一致。
>* 排序的区别：从类的定义来看，`HashMap`和`TreeMap`都继承自`AbstractMap`，不同的是`HashMap`实现的是`Map`接口，而`TreeMap`实现的是`NavigableMap`接口。`NavigableMap`是`SortedMap`的一种，实现了对`Map`中`key`的排序。所以`TreeMap`是排序的而`HashMap`不是。
>* `null`值的区别：`HashMap`可以允许一个`null key`和多个`null value`。而`TreeMap`不允许`null key`，但是可以允许多个`null value`。
>* 两者都不允许`duplicate key`,两者都不是线程安全的。
>
>```java
>@Test
>public void testMap() {
>    // 1、HashMap是无序Map
>    HashMap<String, String> map = new HashMap<>();
>    map.put("3", "3");
>    map.put("4", "4");
>    map.put("1", "1");
>    map.put("2", "2");
>    map.keySet().forEach(s -> System.out.print("键：" + s + " 值：" + map.get(s) + " | "));
>    // 键：1 值：1 | 键：2 值：2 | 键：3 值：3 | 键：4 值：4 |
>    System.out.println();
>    // 2、TreeMap是无序Map
>    TreeMap<String, String> treeMap = new TreeMap<>();
>    treeMap.put("3", "3");
>    treeMap.put("4", "4");
>    treeMap.put("1", "1");
>    treeMap.put("2", "2");
>    treeMap.keySet().forEach(s -> System.out.print("键：" + s + " 值：" + map.get(s) + " | "));
>    // 键：1 值：1 | 键：2 值：2 | 键：3 值：3 | 键：4 值：4 |
>    System.out.println();
>    // 3、LinkedHashMap是有序Map
>    LinkedHashMap<String, String> linkedHashMap = new LinkedHashMap<>();
>    linkedHashMap.put("3", "3");
>    linkedHashMap.put("4", "4");
>    linkedHashMap.put("1", "1");
>    linkedHashMap.put("2", "2");
>    linkedHashMap.keySet().forEach(s -> System.out.print("键：" + s + " 值：" + map.get(s) + " | "));
>    // 键：3 值：3 | 键：4 值：4 | 键：1 值：1 | 键：2 值：2 |
>    System.out.println();
>    // 4、TreeMap使其有序
>    TreeMap<String, String> linkedTreeMap = new TreeMap<>((o1, o2) -> Integer.parseInt(o2) - Integer.parseInt(o1));
>    linkedTreeMap.put("3", "3");
>    linkedTreeMap.put("4", "4");
>    linkedTreeMap.put("1", "1");
>    linkedTreeMap.put("2", "2");
>    linkedTreeMap.keySet().forEach(s -> System.out.print("键：" + s + " 值：" + map.get(s) + " | "));
>    // 键：4 值：4 | 键：3 值：3 | 键：2 值：2 | 键：1 值：1 |
>}
>```

## 参考

* https://www.pdai.tech/md/java/collection/java-collection-all.html
* https://zhuanlan.zhihu.com/p/33141246
* https://www.cnblogs.com/flydean/p/hashmap-vs-treemap.html