:::info
async函数就是Generator函数的语法糖
:::
```javascript
// 这里有一个Generator函数，依次读取两个文件
const fs = require('fs')
const readFile = function(fileName){
  return new Promise(function(resolve,reject){
    fs.readFile(fileName,fucntion(error,data){
      if(error){
        return reject(error)
      }
      resolve(data)
    })
  })
}

const gen = function*(){
  const f1 = yield readFile('/etc/fstab')
  const f2 = yield readFile('/etc/shels')
  console.log(f1.toString())
  console.log(f2.toString())
}

```
把上面的函数`gen`可以改写成`async`函数，就是下面这样
```javascript
const asyncReadFile = async function(){
const f1 = await readFile('/etc/fstab')
const f2 = await readFile('/etc/shels')
  
console.log(f1.toString())
console.log(f2.toString())
}
```
可以看到，`async`函数就是将 Generator 函数的星号（*）替换成`async`，将`yield`替换成`await`而已。
`async`函数对Generator函数的改进，主要体现在下面四点

1. 内置执行器

Generator函数的执行必须依靠执行器，而`async`函数自带执行器

2. 更好的语义
3. 更广的适用性
4. 返回值是Promise

---

`async`函数返回一个Promise 对象，可以使用then方法添加回调函数，当函数执行时，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体后面的语句。

`async`函数内部`return`语句返回的值，会成为`then`方法回调函数的参数
```javascript
// 函数f内部return返回的值，会被then方法回调函数接收到
async function f(){
  return 'hello world'
}
f().then(v=>console.log(v)) // hello world
```
`async`函数内部抛出错误，会导致返回的Promise对象变为`reject`状态。抛出的错误对象会被`catch`方法回调函数接收到。
##### Promise对象的状态变化
`async`函数返回的Promise 对象，必须等到内部所有的`await`命令后面的Promise 对象执行完，才会发生转态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。
##### await命令
一般情况下，await命令后面是一个Promise 对象，返回该对象的结果，如果不是Promise对象，则直接返回对应的值
```javascript
async function f(
  // 等同于 return 123
  return await 123
)
```
另一种情况是，`await`命令后面是一个`thenable`对象（既定义了`then`方法的对象），那么`await`会将其等同于Promise 对象
```javascript
class Sleep {
  constructor(timeout){
    this.timeout = timeout
  }
  then(resolve,reject){
    const startTime = Date.now()
    setTimeout(()=>resolve(Date.now() - startTime),this.timeout)
  }
}

// await命令后面是Sleep对象的实例，不是Promise对象
// 但是定义了then方法，await会将其视为Promise处理
(async()=>{
  const sleepTime = await new Sleep(1000)
  console.log(sleepTime)
})
```
`await`命令后面的Promise 对象如果变为`reject`状态，则`reject`的参数会被`catch`方法的回调函数接收到
```javascript
async function f(){
  // 注意 awiat 命令前没有return 但是reject方法的参数依然传入了catch方法的回调函数，
  // 加上return，效果是一样的
  await Promise.reject('出错了')
}

f().then(v=>console.log(v)).catch(e=>console.log(e)) // 出错了
```
任何一个`await`语句后面的Promise 对象变为`reject`状态，那么整个`async`函数都会中断执行
```javascript
async function f(){
  await Promise.reject('出错了')
  await Promise.resolve('hello world') // 不会执行
}
```
如果希望即使前一个异步操作失败，也不要中断后面的异步操作。这是可以将第一个`await`放在`try...catch`结构里面，这样不管这个异步操作是否成功，后面的语句都会执行。
还有一种办法就是`await`后面的Promise 对象再跟一个`catch`方法，处理前面可能出现的错误。
##### 使用注意点

- `await`命令后面的Promise 对象，运行结果可能是`rejected`，所以最好把`await`命令放在`try...catch`中
- 多个`await`命令后面的的异步操作，如果不存在激发关系，可以让他们同时触发
```javascript
let foo = awiat getFoo()
let bar = await getBar()
// 上面是两个独立的异步操作，被写成继发关系，这样比较耗时，可以让他们同时触发 列如
// 写法一
let [foo,bar] = await Promise.all([getFoo(), getBar()])

// 写法二
let fooPromise = getFoo()
let barPromise = getBar()
let foo = await fooPromise
let bat = await barPromise
```

- await命令只能用在async函数中，如果在普通函数，会报错
- async函数可以保留运行堆栈
```javascript
const a = () => {
  b().then(() => c());
};
```
上面代码中，函数a内部运行了一个异步任务b()，当b运行时，a不会中断运行而是继续执行后面的语句，等b运行结束时，a可能早都运行结束了，b所在的上下文环境已经消失，所以b或者c报错时，错误堆栈将不包含a
如果是用async则不会出现这个问题
```javascript
const a = async () => {
  await b();
  c();
};
```
因为当b运行时，a会暂停执行，上下文环境都保存着，所以当b或c报错时，错误堆栈中包含a
#### async的实现原理
async的实现原理就是将Generator函数和自动执行器，包装在一个函数中。

