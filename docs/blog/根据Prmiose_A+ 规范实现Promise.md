## 定义MyPromise
首先`promise`是一个构造函数，它能够接受一个`executor`参数，该参数是一个函数，该函数又接受两个函数（`resolve`和`reject`）作为参数。
```javascript
class MyPromise {
  // 接受一个函数作为参数
  constructor(executor){
    const resolve = () =>{}
    const reject = () =>{}

    // 该函数接受两个函数
    executor(resolve,reject)
  }
}
```
`promise`有三种状态（进行中`pending`、解决`resolve`、拒绝`reject`），所以我们定义三个常量
```javascript
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
```
`promise`初始状态是`pending`，除非外界调用了`resolve`或者`reject`函数才会改变状态
```javascript
constructor(executor){
  // 初始状态是pending
  this.status = PENDING
}
```
我们还需要两个变量来分别让`reject()`和`reject()`回调使用，代表终值和拒因
```javascript
constructor(executor){
  this.value = undefined
  this.reason = undefined
}
```
`promise`的状态只能由`pending`变为`fulfilled`或者`rejected`
`resolve/reject`函数只能使用箭头函数来表示，为了保证`this`一定指向`MyPromise`(箭头函数中的`this`会使用函数定义时父函数中的`this`，在这里也就是`constructor`中的`this`)
```javascript
constructor(executor) {
  // 解决的回调
  const resolve = (value) => {
    // 状态只能由pending 变为 fulfilled 或者 rejected
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }

  // 拒绝的回调
  const reject = (reason) => {
    // 状态只能由pending 变为 fulfilled 或者 rejected
    if (this.status = PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }

  executor(resolve, reject)
}
```
## 实现then
接下来实现`then`方法，根据`Promise/A+`规范一个`promise`必须提供一个`then`方法用来访问当前值，终值和拒因，`then`方法接受两个参数，`then(onFulfilled, onRejected)`，这个两个参数都是可选的，而且都是函数，不是函数会被忽略
`onFulfilled`在promise执行结束后会被调用，其第一个参数是promise的终值。
`onRejected`在promise被拒绝执行后调用，其第一个参数是promise的拒因。
```javascript
// 接受两个参数onFulfilled和onRejected
then(onFulfilled, onRejected) {
  // onFulfilled 和 onRejected 都是可选参数,如果没传的时候就设置默认值
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected =
    typeof onRejected === "function"
    ? onRejected
    : reason => {
      throw reason;
    };

  // onFulfilled在执行结束后会被调用，第一个参数是promise的终值
  if (this.status === FULFILLED) {
    onFulfilled(this.value);
  }

  // onRejected在被拒绝后会被调用，第一个参数是promise的拒因
  if (this.status === REJECTED) {
    onRejected(this.reason);
  }
}
```
异常处理，如果执行过程中发生异常，我们希望`promise`状态变为拒绝，并抛出异常
```javascript
// 如果报错将调用reject改变状态，并抛出错误
try {
  // 该函数接受两个函数作为参数
  executor(resolve, reject);
} catch (e) {
  reject(e);
}
```
## 处理异步
现在在我们的`MyPromise`中遇到了异步调用会怎么样？比如在`executor`中延迟两秒再去调用`resolve`
```javascript
// 测试MyPromise
function foo() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("resolve value");
    }, 1000);
  });
}

foo().then(
  value => {
    console.log("resolve", value);
  },
  reason => {
    console.log("reject", reason);
  }
);
```
执行一下可以看到，什么都没有打印出来。根本原因就是在遇到`setTimeout`的时候，会把回调放到事件循环的宏任务队列中，然后就去执行`then()`方法了，但是此刻还没调用`resolve()`，状态还是`pending`，也就无法处理了。
之所以没有触发`onFulfilled()`方法，就是在同步代码中执行`then()`时，我们的异步代码还没调用`resolve()`，因此`MyPromise`的状态还是`pending`
那我们可以`then()`中处理`pending`状态，维护一个容器，专门存放`onFulfilled()`，然后在异步代码调用`resolve`的时候，从这个容器中依次取出`onFulfilled()`并执行
```javascript
// 接受两个参数onFulfilled和onRejected
then(onFulfilled, onRejected) {
  // ...
  
  // 状态是pending时,存放onFulfilled和onRejected
  if (this.status === PENDING) {
    this.onFulfilledCallbackList.push(() => onFulfilled(this.value));
    this.onRejectedCallbackList.push(() => onRejected(this.reason));
  }
}

// 解决的回调
const resolve = value => {
  // 状态只能由pending 变为 fulfilled 或者 rejected
  if (this.status === PENDING) {
    this.status = FULFILLED;
    this.value = value;

    // 从容器中取出onFulfilled并执行
    this.onFulfilledCallbackList.map(fn => fn());
  }
};

// 拒绝的回调
const reject = reason => {
  // 状态只能由pending 变为 fulfilled 或者 rejected
  if (this.status === PENDING) {
    this.status = REJECTED;
    this.reason = reason;

    // 从容器中取出onRejected并执行
    this.onRejectedCallbackList.map(fn => fn());
  }
};
```
## 链式调用
下面我们解决链式调用，根据promise/A+ 规范，then()返回的是一个promise对象
那么我们改造一下`then()`，用`MyPromise`包裹一下，再返回这个新的实例
```javascript
// 接受两个参数onFulfilled和onRejected
then(onFulfilled, onRejected) {
  ...

  let promise2 = new MyPromise((resolve, reject) => {

    // onFulfilled在执行结束后会被调用，第一个参数是promise的终值
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    // onRejected在被拒绝后会被调用，第一个参数是promise的拒因
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    // 状态是pending时,存放onFulfilled和onRejected
    if (this.status === PENDING) {
      this.onFulfilledCallbackList.push(() => onFulfilled(this.value));
      this.onRejectedCallbackList.push(() => onRejected(this.value));
    }
  });

  return promise2;
}
```
如果`onFulfilled`和`onRejected`抛出了异常，则`promise2`必须拒绝执行，并返回拒因 ，那我们就用`try/catch`捕获一下，遇到异常就调用`promise2`的`reject()`
```javascript
then(onFulfilled, onRejected) {
  ...
  
  let promise2 = new MyPromise((resolve, reject) => {
    // onFulfilled在执行结束后会被调用，第一个参数是promise的终值
    if (this.status === FULFILLED) {
      try {
        let x = onFulfilled(this.value);
      } catch (e) {
        reject(e);
      }
    }

    // onRejected在被拒绝后会被调用，第一个参数是promise的拒因
    if (this.status === REJECTED) {
      try {
        let x = onRejected(this.reason);
      } catch (e) {
        reject(e);
      }
    }

    // 状态是pending时,存放onFulfilled和onRejected
    if (this.status === PENDING) {
      this.onFulfilledCallbackList.push(() => {
        try {
          let x = onFulfilled(this.value);
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectedCallbackList.push(() => {
        try {
          let x = onRejected(this.value);
        } catch (e) {
          reject(e);
        }
      });
    }
  });

  return promise2;
}
```
## `[[Resolve]](promise2, x)`处理x
规范里还提到，如果`onFulfilled`或者`onRejected`返回了一个`x`，则运行Prmoise的解决过程（即: 
`[[Resolve]](promise2,x)`），那我们加上x
```javascript
then(onFulfilled, onRejected) {
  let promise2 = new MyPromise((resolve, reject) => {
    // onFulfilled在执行结束后会被调用，第一个参数是promise的终值
    if (this.status === FULFILLED) {
      try {
        let x = onFulfilled(this.value);
      } catch (e) {
        reject(e);
      }
    }

    // onRejected在被拒绝后会被调用，第一个参数是promise的拒因
    if (this.status === REJECTED) {
      try {
        let x = onRejected(this.reason);
      } catch (e) {
        reject(e);
      }
    }

    // 状态是pending时,存放onFulfilled和onRejected
    if (this.status === PENDING) {
      this.onFulfilledCallbackList.push(() => {
        try {
          let x = onFulfilled(this.value);
        } catch (e) {
          reject(e);
        }
      });
      this.onRejectedCallbackList.push(() => {
        try {
          let x = onRejected(this.value);
        } catch (e) {
          reject(e);
        }
      });
    }
  });

  return promise2;
}
```
规范中提到的运行 Promise 解决过程：`[[Resolve]](promise2, x)`，其实就是调用`[[Resolve]]`函数去处理`promise2`和`x`
我们把`[[Resolve]]`命名为`resolvePromiseX`，那么我们就要应该在拿到`x`后去调用一个这样的函数
```javascript
let promise2 = new MyPromise((resolve, reject) => {
  // onFulfilled在执行结束后会被调用，第一个参数是promise的终值
  if (this.status === FULFILLED) {
    try {
      let x = onFulfilled(this.value);
      resolvePromiseX(promise2, x);
    } catch (e) {
      reject(e);
    }
  }
  ...
})
```
异步执行`resolvePromise`保证参数都能获取到
```javascript
let promise2 = new MyPromise((resolve, reject) => {
  // onFulfilled在执行结束后会被调用，第一个参数是promise的终值
  if (this.status === FULFILLED) {
    // 以宏任务的方式执行resolvePromise,保证能拿到promise2的实例
    setTimeout(() => {
      try {
        let x = onFulfilled(this.value);
        resolvePromiseX(promise2, x);
      } catch (e) {
        reject(e);
      }
    }, 0);
  }

  ...
})
```
## 实现resolvePromiseX
根据规范，如果promise和x 指向同一对象，那么以TypeError为拒因拒绝执行promise
```javascript
/**
 * @description:
 * @param {*} promise MyPromise 实例
 * @param {*} x 前一个 MyPromise resolve 出来的值
 * @param {*} resolve promise 对象构造函数中的 resolve
 * @param {*} reject promise 对象构造函数中的 reject
 */
function resolvePromiseX(promise, x, resolve, reject) {
  // 如果promise和x指向同一对象，以TypeError为拒因，拒绝执行promise
  if (promise === x) {
    return reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
  }

  // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
  let isCalled = false;

  // 如果x是对象或者函数
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 如果x.then 的取值时抛出错误e,则以e为拒因拒绝promise
    try {
      // 把x.then赋值给then
      let then = x.then;

      // 如果then是函数
      if (typeof then === "function") {
        // 则将x作为函数的作用域this调用之, 并传递两个回调函数作为参数,第一个参数叫resolvePromise，第二个叫rejectPromise
        // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
        // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
        then.call(
          x,
          y => {
            if (isCalled) return;
            isCalled = true;
            resolvePromiseX(promise, y, resolve, reject);
          },
          r => {
            if (isCalled) return;
            isCalled = true;
            reject(r);
          }
        );
      } else {
        // 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x);
      }
    } catch (e) {
      if (isCalled) return;
      isCalled = true;
      reject(e);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}
```
## 实现catch
我们直接调用then，只传入onRejected
```javascript
catch(onRejected){
  this.then(null, onRejected)
}
```
## 完整代码
```javascript
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

/**
 * @description:
 * @param {*} promise MyPromise 实例
 * @param {*} x 前一个 MyPromise resolve 出来的值
 * @param {*} resolve promise 对象构造函数中的 resolve
 * @param {*} reject promise 对象构造函数中的 reject
 */
function resolvePromiseX(promise, x, resolve, reject) {
  // 如果promise和x指向同一对象，以TypeError为拒因，拒绝执行promise
  if (promise === x) {
    return reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
  }

  // 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
  let isCalled = false;

  // 如果x是对象或者函数
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 如果x.then 的取值时抛出错误e,则以e为拒因拒绝promise
    try {
      // 把x.then赋值给then
      let then = x.then;

      // 如果then是函数
      if (typeof then === "function") {
        // 则将x作为函数的作用域this调用之, 并传递两个回调函数作为参数,第一个参数叫resolvePromise，第二个叫rejectPromise
        // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
        // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
        then.call(
          x,
          y => {
            if (isCalled) return;
            isCalled = true;
            resolvePromiseX(promise, y, resolve, reject);
          },
          r => {
            if (isCalled) return;
            isCalled = true;
            reject(r);
          }
        );
      } else {
        // 如果 then 不是函数，以 x 为参数执行 promise
        resolve(x);
      }
    } catch (e) {
      if (isCalled) return;
      isCalled = true;
      reject(e);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

class MyPromise {
  // 接受一个函数作为参数
  constructor(executor) {
    this.status = PENDING; // 初始状态是pending
    this.value = undefined; // resolve出去的值
    this.reason = undefined; // reject出去的原因
    // 维护两个列表容器 存放对应的回调
    this.onFulfilledCallbackList = [];
    this.onRejectedCallbackList = [];

    // 解决的回调
    const resolve = value => {
      // // 当 value 是 MyPromise 实例的时候
      // if (value instanceof MyPromise) {
      //   value.then(resolve, reject);

      //   // 一定要 return 否则会无限递归下去
      //   return;
      // }

      // 状态只能由pending 变为 fulfilled 或者 rejected
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 从容器中取出onFulfilled并执行
        this.onFulfilledCallbackList.map(fn => fn());
      }
    };

    // 拒绝的回调
    const reject = reason => {
      // 状态只能由pending 变为 fulfilled 或者 rejected
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 从容器中取出onRejected并执行
        this.onRejectedCallbackList.map(fn => fn());
      }
    };

    // 错误一般都是发生在executor函数中，如果报错将调用reject改变状态，并抛出错误
    try {
      // 该函数接受两个函数作为参数
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  // 接受两个参数onFulfilled和onRejected
  then(onFulfilled, onRejected) {
    // onFulfilled 和 onRejected 都是可选参数,如果没传的时候就设置默认值
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : reason => {
          throw reason;
        };

    const promise2 = new MyPromise((resolve, reject) => {
      // onFulfilled在执行结束后会被调用，第一个参数是promise的终值
      if (this.status === FULFILLED) {
        // 以宏任务的方式执行resolvePromiseX,保证能拿到promise2的实例
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromiseX(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // onRejected在被拒绝后会被调用，第一个参数是promise的拒因
      if (this.status === REJECTED) {
        // 以宏任务的方式执行resolvePromiseX,保证能拿到promise2的实例
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromiseX(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      // 状态是pending时,存放onFulfilled和onRejected
      if (this.status === PENDING) {
        this.onFulfilledCallbackList.push(() => {
          // 以宏任务的方式执行resolvePromiseX,保证能拿到promise2的实例
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromiseX(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbackList.push(() => {
          // 以宏任务的方式执行resolvePromiseX,保证能拿到promise2的实例
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromiseX(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 用于测试 Promises/A+ 规范
MyPromise.defer = MyPromise.deferred = function () {
  let deferred = {};

  deferred.promise = new MyPromise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
};

module.exports = MyPromise;

```
## 参考
[【翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566)
[【手撕系列】手撕Promise -- 一文带你根据Promises/A+规范完美实现Promise！](https://juejin.cn/post/7091607602563874829#heading-18)
