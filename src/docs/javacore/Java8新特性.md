---
# 当前页面内容标题
title: Java8新特性
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

## Optional类

### 引入

`NPE`问题就是在开发中经常碰到的`NullPointerException`，即空指针问题，`Optional`类就是用来优雅解决该问题的方案。

比如大家可能都有这样的经历：调用一个方法得到了返回值却不能直接将返回值作为参数去调用别的方法。我们首先要判断这个返回值是否为`null`，只有在非空的前提下才能将其作为其他方法的参数。

以用户类和地址类举例说明其用法：

```java
public class User {
    private String userName;
    private String phoneNumber;
    private Address address;
  //无参、部分参数、全参数构造器方法...
  //setter、getter方法...
}
```

```java
public class Address {
    private String province;
    private String city;
    private String area;
  //无参、部分参数、全参数构造器方法...
  //setter、getter方法...
}
```

```java
//这行代码可能会出问题
String province = user.getAddress().getProvince();
System.out.println(province);
```

这种代码可能会出现空指针问题，在实际开发中，如果不使用`Optional`类，极其不优雅的处理方式如下：

```java{3,5,7}
//极其不优雅的处理方式
if (user != null) {//对user对象的null值判断
    Address address = user.getAddress();
    if (address != null) {//对address对象的null值判断
        String province = address.getProvince();
        if (province != null) {//对province对象的null值判断
            System.out.println(province);
        } else {
            System.out.println("province==null");
        }
    }
}
```

上面的代码保证了代码的第三行、第五行、第七行肯定不会出现空指针，但是这个代码真的是非常的冗长和丑陋。

**`java.util`包下面的`Optional`类提供了一套API来处理一个对象是否为`null`值的问题。**

### 源码解读及各API的使用

部分源码：

```java
public final class Optional<T> {
  //value为null的Optinal对象，类加载的时候就已经初始化完成该Optional对象
    private static final Optional<?> EMPTY = new Optional<>();
  //存储需要判断null的对象
    private final T value;
  //无参构造函数
    private Optional() {
        this.value = null;
    }
  //有参构造函数
    private Optional(T value) {
        this.value = Objects.requireNonNull(value);
    }
}
```

其本质是内部有一个泛型容器存储外部需要判断`null`值的对象，同时提供了两个私有的构造函数，不能被外部所调用，只能由类内部的函数调用

* 无参数的构造函数提供一个`value=null`的`Optional`对象
* 有参数的构造函数提供一个`value`一定不能为`null`的`Optional`对象，因为它调用了`Objects`类的`requireNonNull`方法。

```java
//源码
public final class Objects {
    public static <T> T requireNonNull(T obj) {
        if (obj == null)
            throw new NullPointerException();
        return obj;
    }
}
```



#### of

```java
//源码
public static <T> Optional<T> of(T value) {
    return new Optional<>(value);
}
```

这是一个静态方法，调用有参数的构造函数，返回的是`value`值一定不为`null`的`Optional`对象，因为有参数的构造方法底层调用了`Objects`的`requireNonNull`方法，如果传入的`value`为`null`值，那么一定会报空指针异常。不允许`value`为`null`，实际开发中不常用。

#### empty

```java
//源码
public static<T> Optional<T> empty() {
    @SuppressWarnings("unchecked")
    Optional<T> t = (Optional<T>) EMPTY;
    return t;
}
```

这是一个静态方法，直接将类初始化时加载的`value`为`null`的`Optional`对象给用户。

#### ofNullable

```java
//源码
public static <T> Optional<T> ofNullable(T value) {
    return value == null ? empty() : of(value);
}
```

这是一个静态方法，代表`value`值是可为空的。如果为`null`值，那么返回一个`value`为`null`的`Optional`对象；如果不为`null`值，那么返回一个`value`不为`null`的`Option`对象。允许`value`为`null`，实际开发中常用。

**与`of`的区别：当`value`值为`null`时，`of`会报`NullPointerException`异常；`ofNullable`不会`throw Exception`，`ofNullable`直接返回一个`EMPTY`对象（`value`为`null`的`Optional`对象）。**

::: tip 那是不是意味着，我们在项目中只用ofNullable函数而不用of函数呢?

* 不是的，一个东西存在那么自然有存在的价值。
* 当我们在运行过程中，不想隐藏`NullPointerException`，而是要立即报告，这种情况下就用`of`函数。
* 但是不得不承认，这样的场景真的很少。

:::

#### orElse

```java
//源码
public T orElse(T other) {
    return value != null ? value : other;
}
```

这是一个实例方法，会首先判断调用它的`Optional`对象中的`value`值，如果为不为`null`，那么就返回该`value`值，如果为`null`，就返回传入的`other`对象。

```java
@Test
public void orElseTest() {
    //1 user不为null
    User user1 = new User();
    user1.setUserName("1");
    //2 user为null
    User user2 = null;
    //测试第一种
    User user3 = Optional.ofNullable(user1).orElse(new User("2"));
    System.out.println(user3.getUserName());
    //测试第二种
    User user4 = Optional.ofNullable(user2).orElse(new User("3"));
    System.out.println(user4.getUserName());
}
//运行结果
1
3
```

#### orElseGet

```java
//源码
public T orElseGet(Supplier<? extends T> other) {
    return value != null ? value : other.get();
}
```

```java
@Test
public void orElseGetTest() {
    //1 user不为null
    User user1 = new User();
    user1.setUserName("1");
    //2 user为null
    User user2 = null;
    //测试第一种
    User user3 = Optional.ofNullable(user1).orElseGet(new Supplier<User>() {
        @Override
        public User get() {
            return new User("2");
        }
    });
    System.out.println(user3.getUserName());
    //测试第二种
    User user4 = Optional.ofNullable(user2).orElseGet(new Supplier<User>() {
        @Override
        public User get() {
            return new User("3");
        }
    });
    System.out.println(user4.getUserName());
}
//运行结果
1
3
```

该方法与`orElse`方法类似，只不过传入的`other`对象可以通过一个**提供者函数式接口**提供，这里可以改成`lambda`表达式的形式。为了方便对代码的理解，所以上面写的测试代码稍显复杂，实际开发中可以使用`lambda`表达式简化。

#### orElseThrow

```java
//源码    
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X {
    if (value != null) {
        return value;
    } else {
        throw exceptionSupplier.get();
    }
}
```

如果`value`值不为`null`，那么直接返回，如果`value`值为`null`，可以自定义业务逻辑功能说明语句抛出异常，不影响后续代码执行。

```java
@Test
public void orElseThrowTest() {
    //1 user不为null
    User user1 = new User();
    user1.setUserName("1");
    //2 user为null
    User user2 = null;
    //测试第一种
    User user3 = null;
    try {
        user3 = Optional.ofNullable(user1).orElseThrow(new Supplier<Throwable>() {
            @Override
            public Throwable get() {
                return new Throwable("user1为null的业务逻辑功能说明");
            }
        });
    } catch (Throwable throwable) {
        throwable.printStackTrace();
    }
    System.out.println(user3.getUserName());
    //测试第二种
    User user4 = null;
    try {
        user4 = Optional.ofNullable(user2).orElseThrow(new Supplier<Throwable>() {
            @Override
            public Throwable get() {
                return new Throwable("user2为null的业务逻辑功能说明");
            }
        });
    } catch (Throwable throwable) {
        throwable.printStackTrace();
    }
    System.out.println("不影响后续业务逻辑的执行...");
}
//执行结果
1
java.lang.Throwable: user2为null的业务逻辑功能说明
	at com.ouc.ystong.test.TestMain$4.get(TestMain.java:82)
	at com.ouc.ystong.test.TestMain$4.get(TestMain.java:79)
  ...
不影响后续业务逻辑的执行...
```

#### map

```java
//源码
public<U> Optional<U> map(Function<? super T, ? extends U> mapper) {
    Objects.requireNonNull(mapper);
    if (!isPresent())
        return empty();
    else {
        return Optional.ofNullable(mapper.apply(value));
    }
}
```

如果有值，则对其执行调用`mapper`函数得到返回值，将创建包含`mapper`返回值的`Optional`对象作为`map`方法返回值，否则返回空`Optional`对象。

```java
@Test
public void mapTest() {
    //1 user不为null
    User user1 = new User();
    user1.setUserName("1");
    //2 user为null
    User user2 = null;
    //测试第一种
    Optional<String> stringOptional1 = Optional.ofNullable(user1).map(new Function<User, String>() {
        @Override
        public String apply(User user) {
            return user.getUserName() + "xiaotongtong";
        }
    });
    System.out.println(stringOptional1);
    //测试第二种
    Optional<String> stringOptional2 = Optional.ofNullable(user2).map(new Function<User, String>() {
        @Override
        public String apply(User user) {
            return user.getUserName() + "xiaotongtong";
        }
    });
    System.out.println(stringOptional2);
}
//执行结果
Optional[1xiaotongtong]
Optional.empty
```

`map`方法用来对`Optional`实例的值执行一系列操作。通过一组实现了`Function`接口的`lambda`表达式传入操作。

#### flatMap

```java
//源码
public<U> Optional<U> flatMap(Function<? super T, Optional<U>> mapper) {
    Objects.requireNonNull(mapper);
    if (!isPresent())
        return empty();
    else {
        return Objects.requireNonNull(mapper.apply(value));
    }
}
```

如果有值，为其执行`mapper`函数返回`Optional`对象类型返回值，否则返回空`Optional`对象。`flatMap`与`map`方法类似，区别在于`flatMap`中的`mapper`返回值必须是`Optional`对象。调用结束时，`flatMap`不会对结果用`Optional`封装。

```java
@Test
public void flatMapTest() {
    //1 user不为null
    User user1 = new User();
    user1.setUserName("1");
    //2 user为null
    User user2 = null;
    //测试第一种
    Optional<String> stringOptional1 = Optional.ofNullable(user1).flatMap(new Function<User, Optional<String>>() {
        @Override
        public Optional<String> apply(User user) {
            return Optional.ofNullable(user.getUserName() + "xiaotongtong");
        }
    });
    System.out.println(stringOptional1);
    //测试第二种
    Optional<String> stringOptional2 = Optional.ofNullable(user2).flatMap(new Function<User, Optional<String>>() {
        @Override
        public Optional<String> apply(User user) {
            return Optional.ofNullable(user.getUserName() + "xiaotongtong");
        }
    });
    System.out.println(stringOptional2);
}
//执行结果
Optional[1xiaotongtong]
Optional.empty
```

`flatMap`方法与`map`方法类似，区别在于`mapper`函数的返回值不同。`map`方法的`mapper`函数返回值可以是任何类型`T`，而`flatMap`方法的`mapper`函数必须是`Optional`对象。

#### filter

```java
//源码
public Optional<T> filter(Predicate<? super T> predicate) {
    Objects.requireNonNull(predicate);
    if (!isPresent())
        return this;
    else
        return predicate.test(value) ? this : empty();
}
```

如果有值并且满足断言条件返回包含该值的`Optional`对象，否则返回空`Optional`对象。

```java
@Test
public void filterTest() {

    Optional<String> stringOptional1 = Optional.of("xiaotongtong").filter(new Predicate<String>() {
        @Override
        public boolean test(String s) {
            return s.toCharArray().length > 8;
        }
    });
    //满足条件，返回包含该值的Option对象
    System.out.println(stringOptional1);
    Optional<String> stringOptional2 = Optional.of("xiaotongtong").filter(new Predicate<String>() {
        @Override
        public boolean test(String s) {
            return s.toCharArray().length > 15;
        }
    });
    //不满足条件，返回值为空的Optional对象
    System.out.println(stringOptional2);
}
//执行结果
Optional[xiaotongtong]
Optional.empty
```

#### isPresent

```java
//源码
public boolean isPresent() {
    return value != null;
}
```

#### ifPresent

```java
//源码
public void ifPresent(Consumer<? super T> consumer) {
    if (value != null)
        consumer.accept(value);
}
```

#### get

```java
//源码
public T get() {
    if (value == null) {
        throw new NoSuchElementException("No value present");
    }
    return value;
}
```

#### equals

```java
//源码
@Override
public boolean equals(Object obj) {
  //两者指向的内存地址相同，那么Optional对象肯定相同
    if (this == obj) {
        return true;
    }
  //如果obj不是Optional类型的，那肯定是不相同的
    if (!(obj instanceof Optional)) {
        return false;
    }
  //已经确定是Optional类型的，所以可以强转
    Optional<?> other = (Optional<?>) obj;
  //比较两个Optional的value值是不是相同
    return Objects.equals(value, other.value);
}
```

#### hashCode

```java
//源码
@Override
public int hashCode() {
    return Objects.hashCode(value);
}
```

#### toString

```java
//源码
@Override
public String toString() {
    return value != null
        ? String.format("Optional[%s]", value)
        : "Optional.empty";
}
```

### 使用例子

* 基本使用

```java
public class OptionalDemo {

  public static void main(String[] args) {
    //创建Optional实例，也可以通过方法返回值得到。
    Optional<String> name = Optional.of("Sanaulla");

    //创建没有值的Optional实例，例如值为'null'
    Optional empty = Optional.ofNullable(null);

    //isPresent方法用来检查Optional实例是否有值。
    if (name.isPresent()) {
      //调用get()返回Optional值。
      System.out.println(name.get());
    }

    try {
      //在Optional实例上调用get()抛出NoSuchElementException。
      System.out.println(empty.get());
    } catch (NoSuchElementException ex) {
      System.out.println(ex.getMessage());
    }

    //ifPresent方法接受lambda表达式参数。
    //如果Optional值不为空，lambda表达式会处理并在其上执行操作。
    name.ifPresent((value) -> {
      System.out.println("The length of the value is: " + value.length());
    });

    //如果有值orElse方法会返回Optional实例，否则返回传入的错误信息。
    System.out.println(empty.orElse("There is no value present!"));
    System.out.println(name.orElse("There is some value!"));

    //orElseGet与orElse类似，区别在于传入的默认值。
    //orElseGet接受lambda表达式生成默认值。
    System.out.println(empty.orElseGet(() -> "Default Value"));
    System.out.println(name.orElseGet(() -> "Default Value"));

    try {
      //orElseThrow与orElse方法类似，区别在于返回值。
      //orElseThrow抛出由传入的lambda表达式/方法生成异常。
      empty.orElseThrow(ValueAbsentException::new);
    } catch (Throwable ex) {
      System.out.println(ex.getMessage());
    }

    //map方法通过传入的lambda表达式修改Optonal实例默认值。 
    //lambda表达式返回值会包装为Optional实例。
    Optional<String> upperName = name.map((value) -> value.toUpperCase());
    System.out.println(upperName.orElse("No value found"));

    //flatMap与map(Funtion)非常相似，区别在于lambda表达式的返回值。
    //map方法的lambda表达式返回值可以是任何类型，但是返回值会包装成Optional实例。
    //但是flatMap方法的lambda返回值总是Optional类型。
    upperName = name.flatMap((value) -> Optional.of(value.toUpperCase()));
    System.out.println(upperName.orElse("No value found"));

    //filter方法检查Optiona值是否满足给定条件。
    //如果满足返回Optional实例值，否则返回空Optional。
    Optional<String> longName = name.filter((value) -> value.length() > 6);
    System.out.println(longName.orElse("The name is less than 6 characters"));

    //另一个示例，Optional值不满足给定条件。
    Optional<String> anotherName = Optional.of("Sana");
    Optional<String> shortName = anotherName.filter((value) -> value.length() > 6);
    System.out.println(shortName.orElse("The name is less than 6 characters"));

  }
}

```

运行结果：

```java
Sanaulla
No value present
The length of the value is: 8
There is no value present!
Sanaulla
Default Value
Sanaulla
No value present in the Optional instance
SANAULLA
SANAULLA
Sanaulla
The name is less than 6 characters
```

* 在`Java8`中提高对象的`null`值安全性

假设有如下的类层次结构：

```java
class Outer {
    Nested nested;
    Nested getNested() {
        return nested;
    }
}
class Nested {
    Inner inner;
    Inner getInner() {
        return inner;
    }
}
class Inner {
    String foo;
    String getFoo() {
        return foo;
    }
}
```

解决这种结构的深层嵌套路径是有点麻烦的，我们必须编写一堆`null`检查来确保不会导致一个 `NullPointerException`。

我们可以通过利用`Optional`类型来摆脱所有这些`null`检查。`map`方法接收一个`Function`类型的`lambda`表达式，并自动将每个`function`的结果包装成一个`Optional`对象，这使我们能够在一行中进行多个 `map` 操作。

```
Optional.of(new Outer())
    .map(Outer::getNested)
    .map(Nested::getInner)
    .map(Inner::getFoo)
    .ifPresent(System.out::println);
```

### 使用总结

使用`Optional`工具类判断一个对象的`NPE`问题，一定要先通过其静态方法`（of、empty、ofNullable）`获得`Optional`对象，进而通过一些实例方法进行一系列的操作获得最后的对象。

| API方法名称   | 用处                                                         |
| ------------- | ------------------------------------------------------------ |
| `of`          | 为非`null`的值创建一个`Optional`对象。                       |
| `empty`       | 为`null`的值创建一个`Optional`对象。                         |
| `ofNullable`  | 为指定的值创建一个`Optional`对象，如果指定的值为`null`，则返回一个空的`Optional`对象。 |
| `isPresent`   | 如果值不为`null`，则返回`true`，否则返回`false`。            |
| `get`         | 如果`Optional`对象的值并不为空则将其返回，否则抛出`NoSuchElementException`。 |
| `ifPresent`   | 如果`Optional`对象有值（不为空）则为其调用`Consumer`，否则不做处理 |
| `orElse`      | 如果有值则将其返回，否则返回指定的其它值。                   |
| `orElseGet`   | `orElseGet`方法可以接受`Supplier`接口的实现用来生成默认值。  |
| `orElseThrow` | 如果有值则将其返回，否则抛出`Supplier`接口创建的异常。       |
| `map`         | 如果有值，则对其执行调用`mapper`函数得到返回值，并且将创建包含`mapper`返回值的`Optional`对象作为`map`方法返回值，否则返回空`Optional`对象。 |
| `flatMap`     | 如果有值，为其执行`mapper`函数返回`Optional`类型返回值，否则返回空`Optional`对象。`flatMap`与`map`方法类似，区别在于`flatMap`中的`mapper`返回值必须是`Optional`对象。调用结束时，`flatMap`不会对结果用`Optional`封装。 |
| `filter`      | 如果有值并且满足断言条件返回包含该值的`Optional`对象，否则返回空`Optional`对象。 |













