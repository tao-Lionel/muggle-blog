在ES6之前，主要使用的是CommonJS和AMD两种方式实现模块加载。
那么CommonJs有什么缺点呢？
CommonJS和AMD模块都只能在运行时才确定模块的依赖关系，以及输入输出的变量，比如，CommonJS模块就是对象，输入必须查找对象属性，没法在编译时做静态优化。
```javascript
// CommonJs模块
let {stat,exists,readfile} = require('fs')

// 等同于
let _fs = require('fs')
let stat = _fs.stat
let exists = _fs.exists
let readfile = _fs.readfile
// 加载了整个fs模块
```
相反ES6的
```javascript
// 只从fs模块加载这三个方法，其他不加载（静态加载）
import {stat,exists,readfile} from 'fs'
```
模块的整体加载
```javascript
import * as xxx from './xxx.js'
```
### export default 命令
```javascript
// a.js
export default function fn(){}

// b.js
import xxx from 'a.js'

// 相当于
// a.js
function fn(){}
export {fn as default}

// b.js
import { default as xxx } from 'a.js'

```
### export 和 import 的复合写法
如果在一个模块中显输入后输出同一个模块，那么import 和 export 可以合在一起
```javascript
export {a,b} from './ab.js'

// 相当于(但是，a,b实际上并没有导入当前模块，只是做了转发，所以在当前模块是无法使用的)
import {a,b} from './ab.js'
export {a,b}
```
### Module模块和CommonJS模块的差异

1. CommonJS输出的是值的拷贝，ES6模块输出的是值的引用

CommonJS一旦输出一个值，模块内部的变化就影响不到这个值
```javascript
// lib.js
var count = 3
function sum(){
  return count++
}
module.exports = {
  count:count,
  sum:sum
}

// main.js
var lib = require('./lib.js')
console.log(lib.count) // 3
lib.sum()
console.log(lib.count) // 3  
// 模块内部的值没有发生变化（lib.count是一个原始类型的值）会被缓存，除非写成一个函数。
```

2. CommonJS是运行时加载(动态导入`require(`${xxx}/a.js`)`)，ES6模块是编译时输出接口（主要是因为CommonJS加载的是一个对象（module.exports），只有在运行时才会生成，而ES6模块不是对象）
3. CommonJS的`require()`是同步加载，ES6模块的`import`命令是异步加载。

