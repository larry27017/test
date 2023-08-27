/**
 * 原生promise
 */
let promise = new Promise((resolve, reject) => {
  // throw new Error('执行错误');
  resolve('return resolve');
  reject('return reject')
});
promise.then(
  res => { console.log(res); },
  err => {console.log(err.message);}
)

/**
 * 实现一个promise
 */
class MyPromise {
  static PENDING = '待定'; FULFILLED = '成功'; REJECTED = '拒绝';
  constructor(func) {
    this.status = this.PENDING;
    this.result = null;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error)
    }
    
  }
  resolve(result) {
    setTimeout(() => {
      if (this.status === this.PENDING) {
        this.status = this.FULFILLED;
        this.result = result;
        this.resolveCallbacks.forEach(callback => {
          callback(result);
        })
      }
    })
  } 
  reject(result) {
    setTimeout(() => {
      if (this.status === this.PENDING) {
        this.status = this.REJECTED;
        this.result = result;
        this.rejectCallbacks.forEach(callback => {
          callback(result);
        })
      }
    })
  }
  then(onFulfilled, onRejected) {
    // return new MyPromise((resolve, reject) => {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {};
      onRejected = typeof onRejected === 'function' ? onRejected : () => { };
      if (this.status === this.PENDING) {
        this.resolveCallbacks.push(onFulfilled)
        this.rejectCallbacks.push(onRejected)
      }
      // 只执行一个状态
      if (this.status === this.FULFILLED) {
        setTimeout(() => {
          onFulfilled(this.result);
        })
      }
      if (this.status === this.REJECTED) {
        setTimeout(() => { 
          onRejected(this.result);
        })
      }
    // })
    // return this;
  }
}
let promise2 = new MyPromise((resolve, reject) => {
  // throw new Error('执行错误');
  
  resolve(a + 'return resolve');
  // reject('return reject');
});
promise2.then(
  res => {console.log(res);},
  err => { console.log(err.message) }
)


/**
 * 模拟实现一个 Promise.finally
 * 注：Promise.finally()方法返回一个Promise。
 *    在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。
 *    这个方法可以用于在Promise是否成功完成后执行一些清理工作或者重置操作。
 */
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) => P.resolve(callback()).then(() => { throw reason; })
  )
};

/**
 * 模拟实现一个 Promise.all
 * 注：Promise.all() 静态方法接受一个 Promise 可迭代对象作为输入，并返回一个 Promise。
 *    当所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的数组。
 *    如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。
 */
Promise.prototype.all = function(promises) {
  return new Promise(function(resolve, reject) {
    let resolveCount = 0;
    let promiseLen = promise.length;
    var resolveValues = new Array(promiseNum)
    for (var i = 0; i < promiseLen; i++){
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolveCount++;
          resolveValues[i] = value;
          if (resolveCount === promiseLen) {
            return resolve(resolveValues);
          }
        }, function(reason) {
          return reject(reason);
        })
      })(i)
    }
  })
};