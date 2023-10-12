### 类的由来
js中，生成实例对象的传统方法是通过构造函数
```javascript
function Point(x,y){
  this.x = x
  this.y = y
}

Point.prototype.toString = function(){
  return '(' + this.x + ',' + this.y + ')'
}

vat p = new Point(1,2)
```
ES6的class基本上就是一个语法糖，绝大部分功能，ES5也能做到
```javascript
class Point{
  constructor(x,y){
    this.x = x
    this.y = y
  }

  toString(){
    return '(' + this.x + ',' + this.y + ')'
  }
}
```
上面代码定义了一个类，constructor()方法就是构造方法，而`this`关键字就代表实例对象。
ES6的类，完全可以看做构造函数的另一种写法，
```javascript
class Point{
  // ....
}

typeof Point // 'function'
Point === Point.prototype.constructor // true
```
上面代码就表明了，类的数据类型就是构造函数，类本身就指向构造函数

构造函数的`prototype`属性，在ES6的类上继续存在，事实上，类的所有方法都定义在类的`prototype`属性上面。
```javascript
class Point {
  constructor(){
    // ....
  }

  toString(){
    // ...
  }

  toValue(){
    // ....
  }
}

// 等同于
Point.prototype = {
  constructor(){},
  toString(){}
	toValue(){}
}
```
所以 在类的实例上调用方法，其实就是调用原型上的方法
```javascript
class B{}
const b = new B()

b.constructor === B.prototype.constructor // true
```
b是B的实例，他的constructor()方法就是B类原型的constructor()方法

由于类的方法都是定义在prototype对象上，所以类的新方法可以添加在prototype对象上，`Object.assign()`方法可以一次向类添加多个方法。
```javascript
class Point{
  constructor(){}
}

Object.assign(Point.prototype,{
  toString(),
  toValue()
})
```
prototype对象的constructor属性，直接指向类的本身
```javascript
Point.prototype.constructor === Point // true
```
类的内部的所有方法都是不可枚举的
```javascript
class Point{
  constructor(){}
  toString(){}
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
下面这种写法是可枚举的
```javascript
var Point = function(x,y){
  
}

Point.prototype.toString = function(){}
Object.keys(Point.prototype)
// ["toString"]
Objcet.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
### contructor()方法
`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法，一个类必须有constructor方法，如果没有显示的定义，一个空的constructor方法会被默认添加

constructor()方法默认返回实例对象(this)，也可以指定返回另一个对象
```javascript
class Point{
  constructor(){
    reutrn Object.create(null)
  }
}

new Point instanceof Point // false
```
类必须使用`new`调用，这也是和普通构造函数的主要区别，构造函数不用new也能调用
### 类的实例
生成类的实例，就用new调用类
类的属性和方法，除非显示的定义在本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）
```javascript
class Point{
  constructor(x,y){
    this.x = x
    this.y = y
  }

  toString(){}
}

var point = new Point(2,3)

// x和y都定义在this对象上
point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
// toString是原型对象的属性（因为定义在Point类上）
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true

```
所有的实例共享一个原型对象
```javascript
var p1 = new Point(1,2)
var p2 = new Point(2,3)
p1.__proto__ === p2.__proto__  // true
```
可以通过实例的`__proto__`属性为‘类添加方法’（注意：__proto__不是语言本身的特性，谨慎使用）
```javascript
var p1 = new Point(1,2)
var p2 = new Point(2,3)
p1.__proto__.printName = function (){return 'abc'}

// p1的原型就是p2的原型，所以p2也能调用这个方法
p1.printName() // 'abc'
p2.printName() // 'abc'
```
### 实例属性的新写法
ES2022规定了一种实例属性的新写法，就是 实例属性也可以定义在类内部的最顶层。
### 取值函数（getter）和存值函数（setter）
类的内部也可以使用get和set关键字，对某个属性的存取进行拦截
```javascript
class Point{
  get prop(){
    return 'getter'
  }
  set prop(value){
    console.log('setter:' + value)
  }
}

let inst = new Point()
inst.prop = 123
// setter: 123

inst.prop // getter
```
存值函数和取值函数都是设置在属性的Descriptor对象上的
### 属性表达式
类的属性名可以采用表达式
```javascript
let methodName = 'getArea'

class S = {
  constructor(){}

  // 方法名是从表达式得到的
  [methodName](){}
}
```
### Class表达式
和函数一样，类也可以用表达式的形式定义
```javascript
const  MyClass = class Me {
  getClassName(){
    return Me.name
  }
}

let m  = new MyClass()
m.getClassName() // Me
Me.name // 报错
```
### 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承，如果在一个方法前，添加static关键字，就表示这个方法不会被实例继承，而是直接通过类本身来调用，这就是静态方法
```javascript
class Foo{
  static classMethod(){
    return 'hello'
  }
}

Foo.classMethod() // hello

let foo = new Foo()
foo.classMethod() // 报错
```
如果静态方法包含this关键字，那么这个this指向类（类本身），而不是实例
```javascript
class Foo{
  static bar(){
    this.baz() // 这里的this指向Foo类，而不是Foo的实例 等同于调用了Foo.baz()
  }
  static baz(){
    console.log('a')
  }
  baz(){
    console.log('b')
  }
}

Foo.bar() // a
```
父类的静态方法可以被子类继承
### 静态属性
静态属性是指Class本身的属性，即Class.propName,而不是定义在实例对象（this）上的属性
### 私有方法和私有属性
ES2022为Class添加了私有属性和私有方法，就是在属性或方法名之前加`#`
```javascript
class Foo{
  #count = 1 // 私有属性，只能在类的内部使用（this.#count）
  
  // 私有方法 只能在类的内部使用
  #sum(){
    
  } 
}
```
### in运算符
直接访问类不存在的私有属性会报错，但是访问类的公开属性不会报错
ES2022改进了 in 运算符，可以用来判断私有属性
```javascript
class C{
  #a

  static isC(obj){
    if(#a in obj){
      // 私有属性#a存在
      return true
    } else {
      // 私有属性#a不存在
      return false
    }
    
  }
}
```
⚠️注意，in 运算符对于`Object.create()`、`Object.setPrototypeOf`形成的继承，是无效的，因为这种是修改了原型链的继承，子类取不到父类的私有属性
### new.target属性
用来确定构造函数是怎么调用的

