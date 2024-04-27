---
# 当前页面内容标题
title: ArrayList
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

## 概述

`ArrayList`实现了`List`接口，是顺序容器，即元素存放的数据与放进去的顺序相同，允许放入`null`元素，底层通过**数组实现**。除该类未实现同步外，其余跟`Vector`大致相同。每个`ArrayList`都有一个容量`(capacity)`，表示底层数组的实际大小，容器内存储元素的个数不能多于当前容量。当向容器中添加元素时，如果容量不足，容器会自动增大底层数组的大小。前面已经提过，`Java`泛型只是编译器提供的语法糖，所以这里的数组是一个`Object`数组，以便能够容纳任何类型的对象。



`size(), isEmpty(), get(), set()`方法均能在常数时间内完成，`add()`方法的时间开销跟插入位置有关，`addAll()`方法的时间开销跟添加元素的个数成正比。其余方法大都是线性时间。

为追求效率，`ArrayList`没有实现同步`(synchronized)`，如果需要多个线程并发访问，用户可以手动同步，也可使用`Vector`替代。

## ArrayList的实现

### 底层数据结构

```java
// 底层维护的数据结构
transient Object[] elementData; // non-private to simplify nested class access
// size维护了数组中元素的数量，不同于数组的长度elementData.length=capacity
private int size;
```

底层数据结构就是`Object`类型的数组，这样可以放置任何类型的对象，因为所有的对象都继承了`Obejct`。

### 构造函数

```java
// 默认的初始容量
private static final int DEFAULT_CAPACITY = 10;
// 空elementData
private static final Object[] EMPTY_ELEMENTDATA = {};
// 默认容量（10）的elementData
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
// 构造函数1
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+
                                           initialCapacity);
    }
}
// 构造函数2
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
// 构造函数3
public ArrayList(Collection<? extends E> c) {
    Object[] a = c.toArray();
    if ((size = a.length) != 0) {
        if (c.getClass() == ArrayList.class) {
            elementData = a;
        } else {
            elementData = Arrays.copyOf(a, size, Object[].class);
        }
    } else {
        // replace with empty array.
        elementData = EMPTY_ELEMENTDATA;
    }
}
```

* 构造函数1：给定`initialCapacity`，判断该值的合法性必须是大于等于0，如果大于0，就创建一个长度为`initialCapacity`的`Object`数组；如果等于0，就会把一个空数组给`elementData`。
* 构造函数2：不给定`initialCapacity`，就会给一个默认容量（后面会用到这个默认容量）的空数组，注意此时的`elementData`还是空数组，还没有实际分配默认容量长度的数组，在`add`元素的时候会修正默认容量（10）。

### 两个常用数组拷贝方法

```java
// Arrays类中的静态方法
// 参数说明
// @param original the array to be copied
// @param newLength the length of the copy to be returned
public static <T> T[] copyOf(T[] original, int newLength) {
  // 调用更加通用的copyOf方法
    return (T[]) copyOf(original, newLength, original.getClass());
}
public static <T,U> T[] copyOf(U[] original, int newLength, Class<? extends T[]> newType) {
    @SuppressWarnings("unchecked")
    T[] copy = ((Object)newType == (Object)Object[].class)
        ? (T[]) new Object[newLength]
        : (T[]) Array.newInstance(newType.getComponentType(), newLength);
  // 底层的数组拷贝，是一个native方法，速度快
    System.arraycopy(original, 0, copy, 0,
                     Math.min(original.length, newLength));
    return copy;
}

```

```java
// System类中的静态本地方法
// 参数说明
// @param      src      the source array.
// @param      srcPos   starting position in the source array.
// @param      dest     the destination array.
// @param      destPos  starting position in the destination data.
// @param      length   the number of array elements to be copied.
public static native void arraycopy(Object src,  int  srcPos,
                                    Object dest, int destPos,
                                    int length);
```

### 自动扩容

* 每当向数组中**添加**元素时，都要去检查添加后元素的个数`（size+1）`是否会超出当前数组的长度`（elementData.length）`，如果超出，数组将会进行扩容，以满足添加数据的需求。
* 数组扩容通过一个公开`（public）`的方法`ensureCapacity(int minCapacity)`来实现，在实际添加大量元素前，也可以使用`ensureCapacity`来手动增加`ArrayList`实例的容量，以减少递增式再分配的数量。
* 数组进行扩容时，会将老数组中的元素重新拷贝一份到新的数组中，每次数组容量的增长大约是其原容量的1.5倍。这种操作的代价是很高的，因此在实际使用时，我们应该尽量避免数组容量的扩张。当我们可预知要保存的元素的多少时，要在构造`ArrayList`实例时，就指定其容量，以避免数组扩容的发生。或者根据实际需求，通过调用`ensureCapacity`方法来手动增加`ArrayList`实例的容量。

```java
// 注意这是一个公开的自动扩容方法（保证容量），保证最小容量minCapacity
public void ensureCapacity(int minCapacity) {
    int minExpand = (elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
        // any size if not default element table
        ? 0
        // larger than default for default empty table. It's already
        // supposed to be at default size.
        : DEFAULT_CAPACITY;

    if (minCapacity > minExpand) {
        ensureExplicitCapacity(minCapacity);
    }
}
// 重新修正一下添加元素的时候应该保证的最小的容量minCapacity
private static int calculateCapacity(Object[] elementData, int minCapacity) {
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        return Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    return minCapacity;
}
// add添加元素的时候会首先进入该方法，保证有minCapacity的容量
private void ensureCapacityInternal(int minCapacity) {
  // 修正应该保证的最小容量：calculateCapacity(elementData, minCapacity)
    ensureExplicitCapacity(calculateCapacity(elementData, minCapacity));
}
// 显示的进行扩容操作-保证minCapacity的容量
private void ensureExplicitCapacity(int minCapacity) {
  // elementData的修改次数+1，无论是否需要扩容
    modCount++;

    // overflow-conscious code
    if (minCapacity - elementData.length > 0)// 需要扩容
      // 真正在做扩容的是grow
        grow(minCapacity);
}

// 数组扩容的最大长度限制
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

// 真正在做扩容的方法
private void grow(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);// 新数组的长度是旧数组的1.5倍
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;// 扩容1.5倍之后，新数组的长度有可能还是无法满足minCapacity，此时要保证新数组的长度最低也要和minCapacity相等。
    if (newCapacity - MAX_ARRAY_SIZE > 0)// 新数组的长度如果超过了限制MAX_ARRAY_SIZE
        newCapacity = hugeCapacity(minCapacity);// 保证newCapacity不会超出最大限制Integer.MAX_VALUE
    elementData = Arrays.copyOf(elementData, newCapacity);// https://www.cnblogs.com/lzh-csust-code/p/14840194.html
  // Arrays.copyOf方法返回的是一个新的数组，与原来的数组不同，并不是在原来的数组上面增大length
  // 第一个参数是被拷贝的数组
  // 第二个参数是拷贝之后返回的新数组的长度（创建了新数组，即在此过程进行new Obejct[newCapacity]）
}
// 分配新数组的最大容量（minCapacity如果超过了MAX_ARRAY_SIZE，最大容量就是Integer.MAX_VALUE，没有超过最大容量就是MAX_ARRAY_SIZE）
private static int hugeCapacity(int minCapacity) {
    if (minCapacity < 0) // overflow
        throw new OutOfMemoryError();
    return (minCapacity > MAX_ARRAY_SIZE) ?
        Integer.MAX_VALUE :
        MAX_ARRAY_SIZE;
}
```



### add()-addAll()

跟`C++`的`vector`不同，`ArrayList`没有`push_back()`方法，对应的方法是`add(E e)`，`ArrayList`也没有`insert()`方法，对应的方法是`add(int index, E e)`。这两个方法都是向容器中添加新元素，这可能会导致`capacity`不足，因此在添加元素之前，都需要进行剩余空间检查，如果需要则自动扩容。扩容操作最终是通过`grow()`方法完成的。

```java
public boolean add(E e) {
  // 保证size + 1的容量
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}
public void add(int index, E element) {
    rangeCheckForAdd(index);

    ensureCapacityInternal(size + 1);  // Increments modCount!!
  // 数组的拷贝-使用的是更加底层（native）的数组拷贝方法，效率比较高
  // 自动扩容1.5倍的底层也是用的这个数组方法
    System.arraycopy(elementData, index, elementData, index + 1,
                     size - index);
  // 添加元素到index位置
    elementData[index] = element;
  // 元素个数增加
    size++;
}
```





`add(int index, E e)`需要先对元素进行移动，然后完成插入操作，也就意味着该方法有着线性的时间复杂度。

`addAll()`方法能够一次添加多个元素，根据位置不同也有两个版本，一个是在末尾添加的`addAll(Collection<? extends E> c)`方法，一个是从指定位置开始插入的`addAll(int index, Collection<? extends E> c)`方法。跟`add()`方法类似，在插入之前也需要进行空间检查，如果需要则自动扩容；如果从指定位置插入，也会存在移动元素的情况。 `addAll()`的时间复杂度不仅跟插入元素的多少有关，也跟插入的位置相关。

```java
// 在列表末尾一次性添加多个元素
public boolean addAll(Collection<? extends E> c) {
    Object[] a = c.toArray();
    int numNew = a.length;
    ensureCapacityInternal(size + numNew);  // Increments modCount
    System.arraycopy(a, 0, elementData, size, numNew);
    size += numNew;
    return numNew != 0;
}
// 在指定index位置一次性添加多个元素
public boolean addAll(int index, Collection<? extends E> c) {
    rangeCheckForAdd(index);

    Object[] a = c.toArray();
    int numNew = a.length;
    ensureCapacityInternal(size + numNew);  // Increments modCount

    int numMoved = size - index;
    if (numMoved > 0)
      // 移动元素
        System.arraycopy(elementData, index, elementData, index + numNew,
                         numMoved);
  // 在指定元素赋值
    System.arraycopy(a, 0, elementData, index, numNew);
    size += numNew;
    return numNew != 0;
}
```

>关于`modCount`：
>
>* 在`ArrayList`中有个成员变量`modCount`，继承于`AbstractList`。
>
>* 记录着集合的修改次数，也就每次`add`或者`remove`它的值都会加1。
>
>```java
>@Test
>public void testArrayList() {
>    List<String> list = new ArrayList<String>();
>    list.add("a");
>    Iterator iterator = list.iterator();
>    while (iterator.hasNext()) {
>        String str = (String) iterator.next();
>        list.remove(str);
>    }
>    // java.util.ConcurrentModificationException
>}
>```
>
>* 在使用迭代器遍历集合的时候同时修改集合元素。因为`ArrayList`被设计成非同步的，所以理所当然会抛异常。但是该抛什么异常才能说明该问题呢？答案是：`java.util.ConcurrentModificationException`，即并发修改异常，也就是说有一个线程在读数据，现在还有另一个线程在修改数据，但是`ArrayList`不是线程安全的，所以这样做会很危险，就会直接报异常。
>* 首先得了解`ArrayList`的迭代器
>
>```java
>// 获取ArrayList的迭代器
>public Iterator<E> iterator() {
>    return new Itr();
>}
>// 在调用list.iterator()的时候返回的是一个Itr对象，它是ArrayList中的一个内部类。
>private class Itr implements Iterator<E> {
>    int cursor;       // index of next element to return 默认值为0
>    int lastRet = -1; // index of last element returned; -1 if no such
>    int expectedModCount = modCount;
>
>    Itr() {}
>
>    public boolean hasNext() {
>        return cursor != size;
>    }
>
>    @SuppressWarnings("unchecked")
>    public E next() {
>        checkForComodification();
>        int i = cursor;
>        if (i >= size)
>            throw new NoSuchElementException();
>        Object[] elementData = ArrayList.this.elementData;
>        if (i >= elementData.length)
>            throw new ConcurrentModificationException();
>        cursor = i + 1;
>        return (E) elementData[lastRet = i];
>    }
>
>    public void remove() {
>        if (lastRet < 0)
>            throw new IllegalStateException();
>        checkForComodification();
>
>        try {
>            ArrayList.this.remove(lastRet);
>            cursor = lastRet;
>            lastRet = -1;
>            expectedModCount = modCount;
>        } catch (IndexOutOfBoundsException ex) {
>            throw new ConcurrentModificationException();
>        }
>    }
>
>    @Override
>    @SuppressWarnings("unchecked")
>    public void forEachRemaining(Consumer<? super E> consumer) {
>        Objects.requireNonNull(consumer);
>        final int size = ArrayList.this.size;
>        int i = cursor;
>        if (i >= size) {
>            return;
>        }
>        final Object[] elementData = ArrayList.this.elementData;
>        if (i >= elementData.length) {
>            throw new ConcurrentModificationException();
>        }
>        while (i != size && modCount == expectedModCount) {
>            consumer.accept((E) elementData[i++]);
>        }
>        // update once at end of iteration to reduce heap write traffic
>        cursor = i;
>        lastRet = i - 1;
>        checkForComodification();
>    }
>
>    final void checkForComodification() {
>        if (modCount != expectedModCount)
>            throw new ConcurrentModificationException();
>    }
>}
>```
>
>* 主要关注3个点：
>
>  1、`expectedModCount`的初值为`modCount`
>
>  2、`hasNext`的判断条件为`cursor!=size`，就是当前迭代的位置不是数组的最大容量值就返回`true`
>
>  3、`next`和`remove`操作之前都会先调用`checkForComodification`来检查`expectedModCount`和`modCount`是否相等
>
>* 分析原因：`add`操作之后，`modCount`的值为1，通过`iterator`方法获得迭代器之后，`expectedModCount`的值就是1，第一次`cursor`的值为0，并不等于`size=1`，所以`hasNext`为`true`，此时`next`方法会通过`checkForComodification`进行检查，发现是正常的，会继续向下走，将`cursor`的值执行++操作，此时`cursor`的值为1。当执行到`remove`方法，将`modCount`的值变为2，`size`的值变为0，此时执行到`hasNext`方法，发现`cursor`的值为1，并不等于`size`的值为0，所以还是`true`，会继续向下走，此时执行`next`方法的时候，再次通过`checkForComodification`进行检查，发现`expectedModCount`的值为1，但是`modCount`的值已经变为了2，两者不相等，所以就直接报出并发修改异常了。
>
>* 参考：https://www.cnblogs.com/zuochengsi-9/p/7050351.html

### set()

既然底层是一个数组`ArrayList`的`set()`方法也就变得非常简单，直接对数组的指定位置赋值即可。

```java
public E set(int index, E element) {
    rangeCheck(index);

    E oldValue = elementData(index);
    elementData[index] = element;
    return oldValue;
}
```

### get()

`get()`方法同样很简单，唯一要注意的是由于底层数组是`Object[]`，得到元素后需要进行类型转换。

```java
public E get(int index) {
    rangeCheck(index);

    return elementData(index);
}
```

### remove()-removeAll()-retainAll()

`remove()`方法也有两个版本，一个是`remove(int index)`删除指定位置的元素，另一个是`remove(Object o)`删除第一个满足`o.equals(elementData[index])`的元素。删除操作是`add()`操作的逆过程，需要将删除点之后的元素向前移动一个位置。需要注意的是为了让`GC`起作用，必须显式的为最后一个位置赋`null`值，那么在最后一个位置的元素没有引用就会被`GC`回收掉。

```java
// 删除指定位置的元素
public E remove(int index) {
    rangeCheck(index);

    modCount++;
    E oldValue = elementData(index);

    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,
                         numMoved);
    elementData[--size] = null; // clear to let GC do its work

    return oldValue;
}
// 删除第一个满足条件o.equals(elementData[index])的元素
public boolean remove(Object o) {
    if (o == null) {
        for (int index = 0; index < size; index++)
            if (elementData[index] == null) {
                fastRemove(index);
                return true;
            }
    } else {
        for (int index = 0; index < size; index++)
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}
// Removes from this list all of its elements that are contained in the specified collection.
public boolean removeAll(Collection<?> c) {
    Objects.requireNonNull(c);
    return batchRemove(c, false);
}
// Retains only the elements in this list that are contained in the specified collection.  In other words, removes from this list all of its elements that are not contained in the specified collection.
// retain：保留
public boolean retainAll(Collection<?> c) {
    Objects.requireNonNull(c);
    return batchRemove(c, true);
}
// 私有方法-批量删除
private boolean batchRemove(Collection<?> c, boolean complement) {
    final Object[] elementData = this.elementData;
    int r = 0, w = 0;
    boolean modified = false;
    try {
        for (; r < size; r++)
            if (c.contains(elementData[r]) == complement)
                elementData[w++] = elementData[r];
    } finally {
        // Preserve behavioral compatibility with AbstractCollection,
        // even if c.contains() throws.
        if (r != size) {
            System.arraycopy(elementData, r,
                             elementData, w,
                             size - r);
            w += size - r;
        }
        if (w != size) {
            // clear to let GC do its work
            for (int i = w; i < size; i++)
                elementData[i] = null;
            modCount += size - w;
            size = w;
            modified = true;
        }
    }
    return modified;
}
```

关于`Java GC`这里需要特别说明一下，对象能否被`GC`的依据是是否还有引用指向它，上面代码中如果不手动赋`null`值，除非对应的位置被其他元素覆盖，否则原来的对象就一直不会被回收。

### size()

```java
// 返回元素的个数，注意并不是底层数组的长度，而是数组中有效数据的个数
public int size() {
    return size;
}
```

### isEmpty()

```java
// 列表是否为空
public boolean isEmpty() {
    return size == 0;
}
```

### contains()

```java
// 调用了indexof方法
public boolean contains(Object o) {
  // 元素第一次出现的index
    return indexOf(o) >= 0;
}
```

### toArray()

```java
// 转成数组
public Object[] toArray() {
  // 底层用的就是数组，所以只要将elementData的数据拷贝出来即可
    return Arrays.copyOf(elementData, size);
}
// 转成数组并且将其拷贝到数组a中
public <T> T[] toArray(T[] a) {
    if (a.length < size)
        // Make a new array of a's runtime type, but my contents:
        return (T[]) Arrays.copyOf(elementData, size, a.getClass());
    System.arraycopy(elementData, 0, a, 0, size);
    if (a.length > size)
        a[size] = null;
    return a;
}
```

### clear()

```java
// 有效元素清空
public void clear() {
    modCount++;

    // clear to let GC do its work
    for (int i = 0; i < size; i++)
        elementData[i] = null;

    size = 0;
}
```

### subList()

```java
// 截取一段成为子List
public List<E> subList(int fromIndex, int toIndex) {
    subListRangeCheck(fromIndex, toIndex, size);
    return new SubList(this, 0, fromIndex, toIndex);
}
```

### trimToSize()

`ArrayList`还给我们提供了将底层数组的容量调整为当前列表保存的实际元素的大小的功能，它可以通过`trimToSize`方法来实现。代码如下:

```java
public void trimToSize() {
    modCount++;
    if (size < elementData.length) {
        elementData = (size == 0)
          ? EMPTY_ELEMENTDATA
          : Arrays.copyOf(elementData, size);
    }
}
```

### indexOf()-lastIndexOf()

获取元素的第一次出现的`index`：

```java
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i < size; i++)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```

获取元素的最后一次出现的`index`：

```java
public int lastIndexOf(Object o) {
    if (o == null) {
        for (int i = size-1; i >= 0; i--)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = size-1; i >= 0; i--)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```

### forEach()-removeIf()-replaceAll()-sort()

```java
// 如何使用？
// 声明：public void forEach(Consumer<? super E> action)
// 声明：public boolean removeIf(Predicate<? super E> filter)
// 声明：public void replaceAll(UnaryOperator<E> operator)
// 声明：public void sort(Comparator<? super E> c)
// Consumer、Predicate、UnaryOperator、Comparator都是函数式接口，都可以使用lambda表达式优化代码的书写
public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("a");
    list.add("bb");
    list.add("ccc");
    list.add("dddd");
    // 1、forEach的使用
    list.forEach(new Consumer<String>() {
        @Override
        public void accept(String s) {
            System.out.print(s + "测试 ");
        }
    });// a测试 bb测试 ccc测试 dddd测试
    System.out.println();
    // 2、removeIf的使用
    list.removeIf(new Predicate<String>() {
        @Override
        public boolean test(String s) {
            return s == "a";
        }
    });
    System.out.println(list);// [bb, ccc, dddd]
    // 3、replaceAll的使用
    list.replaceAll(new UnaryOperator<String>() {
        @Override
        public String apply(String s) {
            return "测试" + s;
        }
    });
    System.out.println(list);// [测试bb, 测试ccc, 测试dddd]
    // 4、sort的使用
    list.sort(new Comparator<String>() {
        @Override
        public int compare(String o1, String o2) {
            return o2.length() - o1.length();
        }
    });
    System.out.println(list);// [测试dddd, 测试ccc, 测试bb]
}
```

### Fail-Fast机制

`ArrayList`也采用了快速失败的机制，通过记录`modCount`参数来实现，在面对并发的修改时，迭代器很快就会完全失败，而不是冒着在将来某个不确定时间发生任意不确定行为的风险。

## 参考

* https://www.cnblogs.com/zuochengsi-9/p/7050351.html

* https://www.pdai.tech/md/java/collection/java-collection-ArrayList.html

* https://www.cnblogs.com/lzh-csust-code/p/14840194.html

* https://blog.csdn.net/u012926924/article/details/50452411

* https://www.cnblogs.com/ccgjava/p/6347425.html

  





