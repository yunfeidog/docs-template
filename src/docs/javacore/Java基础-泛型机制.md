---
# 当前页面内容标题
title: Java泛型机制
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

## 前言

Java泛型这个特性是从JDK 1.5才开始加入的，因此为了兼容之前的版本，Java泛型的实现采取了“**伪泛型**”的策略，即Java在语法上支持泛型，但是在编译阶段会进行所谓的“**类型擦除**”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。

## 为什么会引入泛型

> 泛型的本质是为了参数化类型，也就是说在泛型使用过程中，操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和方法中，分别被称为泛型类、泛型接口、泛型方法。

* 适用于多种数据类型执行相同的代码（代码复用）

```java
private static int add(int a, int b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}

private static float add(float a, float b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}

private static double add(double a, double b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}
```

如果没有泛型，要实现不同类型的加法，每种类型都需要重载一个add方法；通过泛型，我们可以复用为一个方法：

```java
// 泛型方法
private static <T extends Number> double add(T a, T b) {
    System.out.println(a + "+" + b + "=" + (a.doubleValue() + b.doubleValue()));
    return a.doubleValue() + b.doubleValue();
}
```

>重载和重写的区别：
>
>* 重写其实就是在子类中把父类本身有的方法重新写一遍。子类继承了父类原有的方法，但有时子类并不想原封不动的继承父类中的某个方法，所以在方法名，参数列表，返回类型都相同的情况下， 对方法体进行修改或重写。【子父类中多态性的表现】
>
>```java
>public class Father {
>
>    public static void main(String[] args) {
>        // 1、创建一个子类对象，使用子类对象接收
>        Son s1 = new Son();
>        s1.sayHello();// Son: sayHello!
>        // 2、创建一个子类对象，使用父类对象接收(多态机制)
>        Father s2 = new Son();
>        s2.sayHello();// Son: sayHello!
>        // 3、新建一个父类对象，使用父类对象接收
>        Father f1 = new Father();
>        f1.sayHello();// Father: sayHello!
>        // 3、新建一个父类对象，使用子类对象接收
>        // Son f2 = new Father();// 直接报错  可以说老虎是动物，但不能说动物是老虎
>        // f2.sayHello();
>    }
>
>    public void sayHello() {
>        System.out.println("Father: sayHello!");
>    }
>}
>
>class Son extends Father {
>  // IDEA快捷键 ctrl+o
>    @Override
>    public void sayHello() {
>        // 重写
>        System.out.println("Son: sayHello!");
>        // 如果想要执行父类的sayHello方法，可以直接调用super.sayHello();
>    }
>}
>// 方法名，参数列表，返回类型（除了子类中方法的返回类型是父类中返回类型的子类）必须相同
>// 访问修饰符的限制一定要大于被重写方法的访问修饰符（public>protected>default>private)
>// 重写方法一定不能抛出新的检查异常或者比被重写方法申明更加宽泛的检查型异常
>```
>
>* 在一个类中，同名的方法如果有不同的参数列表（参数类型不同、参数个数不同甚至是参数顺序不同）则视为重载。同时，重载对返回类型没有要求，可以相同也可以不同，但不能通过返回类型是否相同来判断重载。【一个类中多态性的表现】
>
>```java
>public class Father {
>
>    public static void main(String[] args) {
>        Father father = new Father();
>        father.sayHello();
>        father.sayHello("xiaotong");
>    }
>
>    public void sayHello() {
>        System.out.println("Father: sayHello!");
>    }
>
>    // 重载：满足一个类中，方法名相同且参数不同（个数、顺序、类型）
>    public String sayHello(String name) {
>        System.out.println("Father: sayHello!" + name);
>        return name;
>    }
>
>}
>```
>
>* 参考：https://blog.csdn.net/wintershii/article/details/80558739

* 泛型中的类型在使用时指定，不需要强制类型转换（类型安全，编译器会检查类型）

```java
// ArrayList有泛型机制，但是使用的时候没有指定
List list = new ArrayList();
list.add("xxString");
list.add(100d);
list.add(new Person());
```

我们在使用上述list中，list中的元素都是Object类型（无法约束其中的类型），所以在取出集合元素时需要人为的强制类型转化到具体的目标类型，且很容易出现`java.lang.ClassCastException`异常。

引入泛型，它将提供类型的约束，提供编译前的检查：

```java
List<String> list = new ArrayList<String>();
// list中只能放String, 不能放其它类型的元素
```



