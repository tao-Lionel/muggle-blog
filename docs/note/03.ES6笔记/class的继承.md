class可以通过`extends`关键字实现继承
```javascript
class A {}

class B extends A {}
```
子类必须在`constructor()`方法中调用`super()`，否则就会报错。因为子类的this对象，必须先通过父类的构造函数完成塑造，得到父类同样的实例属性和方法。

### 私有属性和私有方法的继承
子类无法继承父类的私有属性和私有方法（PS：其实从‘私有’的这个名字也大概知道这个意思）
但是如果父类定义了一个读取私有属性的公有方法，那么子类可以通过这个方法获取到私有属性
```javascript
class A {
  #a = 1
  getA(){
    return this.#a
  }
}

class B extends A {
  constructor(){
    super()
    console.log(this.getA()) /// 1
  } 
}
```
### 静态属性和静态方法的继承
父类的静态属性和静态方法也会被继承。
❗但是需要注意的是：静态属性的继承是浅拷贝的
```javascript
class A {
  static foo = {
    n:100
  }
}

class B extends A {
  constructor(){
    super()
    B.foo.n--
  }
}
let b = new B()
B.foo.n // 99
A.foo.n // 99
// 因为是浅拷贝，继承的是对象的内存地址，指向的是同一个对象
```
### Object.getPrototypeOf()
`Object.getPrototypeOf()`方法可以从子类上获取父类，也就是说可以用来判断一个类是否继承了另一个类。
### super关键字
`super`关键字，既能当函数使用，又能当对象使用。

- super作为函数调用时，代表父类的构造函数

ES6规定，子类的构造函数必须执行一次`super()`函数。
为什么必须要调用一次`super()`函数呢，因为`super()`函数是为了形成子类的this对象，把父类的属性和方法放在这个this对象上，子类在调用`super()`之前是没有this对象的，所有对this对象的操作必须都放在super()之后
```javascript
class A {
  constructor(){
    console.log(new.target.name)
  }
}

class B extends A {
  constructor(){
    super() // super()内部的this指向B
    
  }
}

new A() // A
new B() // B
```
上面的代码，虽然这里的`super()`代表了父类的构造函数，但是因为返回的是子类的`this`（子类的实例对象），所以`super()`内部的`this`代表了子类的实例，而不是父类的实例，这里的`super()`相当于`A.prototype.constructor.call(this)`（在子类的this上运行父类的构造函数）

由于`super()`在子类的构造函数中运行，所以子类的属性和方法还没绑定到this上（这个很好理解，上面刚提到调用super()就是为了形成子类的this对象，还没调用super(),当然不会绑定到this上），所以如果有同名的属性，此时获取的还是父类的属性

`super()`只能用在子类的构造函数中，用在其他函数中会报错。

- super作为对象时
1. 在普通方法中指定父类的原型对象
```javascript
class A {
  getP(){
    return 1
  }
}

class B extends A {
  constructor(){
    super()
    // 在普通方法中，指向父类的原型对象，相当于A.prototype.getP()
    console.log(super.getP()) 
  }
}

new B() // 1
```
❗因为指向原型对象，所以在父类实例上定义的属性或者方法，无法通过super对象获取到。
ES6规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前子类的实例。
```javascript
class A {
  constructor(){
    this.x = 1
  }
  print(){
    console.log(this.x)
  }
}

class B extends A{
  constructor(){
    super()
    this.x = 2
  }
  m(){
    super.print()
  }
}

const b = new B()
b.m() // 2
```
上面的代码中的super.print()相当于`A.prototype.print()`，内部的this指向B的实例。也就是说相当于`super.print.call(this)`

2. 在静态方法中指向父类

`super`在静态方法之中指向父类，在普通方法之中指向父类的原型对象
(个人理解：因为静态方法不能被实例继承，只能通过类的本身去调用)
```javascript
class A {
  static myA(msg){
    console.log('static',msg)
  }

  myA(msg){
    console.log('intance',msg)
  }
}

class B extends A {
  static myB(msg){
    super.myA(msg) // super指向父类，this指向当前的子类
  }

  myB(msg){
    super.myA(msg) // super指向父类的原型对象，this指向当前的子类的实例
  }
}

B.myB(1) // static 1

const b  = new B()
b.myB(2) // intance 2

```
### 类的prototype属性和__proto__属性

1. 子类的`__proto__`属性，表示构造函数的继承，总是指向父类。
2. 子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。
```javascript
class A{}
class B extends A {}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
这样是因为 类的继承是通过`Object.setPrototypeOf()`方法实现的
```javascript
// Object.setPrototypeOf的实现
Object.setPrototypeOf = function(obj,proto){
  obj.__proto__ = proto
  return obj
}

// B的实例继承A的实例
Object.setPrototypeOf(B.prototype, A.prototype)

// B继承A的静态属性
Object.setPrototypeOf(B, A)
```
作为一个对象，子类B的原型（__proto__属性）是父类A。
作为一个构造函数，子类（B）的原型对象（prototype）是父类（A）的原型对象（prototype属性）。
### 实例的__proto__属性
子类实例的__proto__的__proto__属性指向，父类实例的__proto__属性，也就是说子类原型的原型指向父类的原型
```javascript
class A{}
class B extends A{}
const b = new B()
const a  = new A()
b.__proto__.__proto__ === a.__proto__ // true
```
### 原生构造函数的继承
原生构造函数有：
String()、Number()、Boolean()、Array()、Date()、Function()、Error()、Object()、RegExp()
ES6允许继承原生构造函数定义子类


