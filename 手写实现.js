/*
* 手写new
* 首先创建了一个新的空对象
* 设置原型，将对象的原型设置为函数的prototype对象。
* 让函数的this指向这个对象，执行构造函数的代码（为这个新对象添加属性）
* 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象
*/
function myNew(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  let value = constructor.apply(obj, args);
  return (value instanceof Object) ? value : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = myNew(Person, 'Larry', 30);
// console.log(person1);

/**
* 手写instanceof
*/
function myInstanceof(left, right) {
  // 先判断基础类型
  if (typeof left !== Object || right === null) return false;
  // 使用Object自带获取原型的api getPrototypeOf
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

/**
* 通用数据类型检测方法
* Object.prototype.toString.call
*/
function getType(obj) {
  let type = typeof obj
  // 先判断基础类型直接返回
  if (type !== 'object') {
    return type;
  }
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1');
}
// console.log(getType([]))

/**
* @desc 手写call、apply、bind
*/
Function.prototype.myCall = function(context, ...args) {
  // 如果没有传入 context，默认为全局对象
  context = context || window;
  // 使用 Symbol 避免属性名冲突
  const key = Symbol();
  // 将函数添加到 context 对象上
  context[key] = this;
  // 在 context 上调用函数
  const res = context[key](...args);
  // 删除临时属性
  delete context[key];
  return res;
};
Function.prototype.myApply = function(context, argsArr) {
  context = context || window;
  const key = Symbol();
  context[key] = this;
  const res = context[key](...argsArr);
  delete context[key];
  return res;
};
// Function.prototype.myBind = function(ctx, ...args) {
//   const fn = this;
//   return function(...newArgs) {
//     return fn.apply(ctx, [...args, ...newArgs]);
//   };
// }
Function.prototype.myBind = function(ctx, ...args) {
  const fn = this;
  return function newFn(...newArgs) {
    // 若通过 new 关键字调用，有几种方式可以判断：
    // 1. this instanceof newFn
    // 2. this.__proto__.constructor === newFn
    // 3. new.target 不为 undefined    
    if (new.target) {
      return new newFn(...args, ...newArgs);
    }
    return fn.apply(ctx, [...args, ...newArgs]);
  };
}
// 示例
function greet(name) {
  console.log(`Hello, ${name}! I'm ${this.name}.`);
}
const person = { name: 'John' };
// greet.myCall(person, 'Alice'); 
// greet.myApply(person, ['Alice', 'Andy']); 
// greet.myBind(person, 'Alice'); 

/**
 * 实现防抖函数
 */
function debounce(fn) {
  let timer;
  return function(value) {
    
  }
}

/**
 * 深克隆
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  let cloneObj = new obj.constructor;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key])
    }
  }
  return cloneObj;
}
const originalObj = {
  name: 'John',
  age: 30,
  nested: {
    city: 'New York',
    country: 'USA'
  },
  hobbies: ['Reading', 'Cooking']
};
const clonedObj = deepClone(originalObj);


/**
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得 到一个升序且不重复的数组
 * flat(infinity)扁平化
 * Set去重
 * sort排序
 */
// let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// const newArr = Array.from(new Set(arr.flat(Infinity))).sort((a, b) => { return a - b; });
// console.log(newArr);

// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   resolve();
//   console.log(2);
// });
// promise.then(() => { console.log(3); });
// console.log(4);
// // 执行结果是：1243，promise 构造函数是同步执行的，then 方法是异步执行的

/**
 * 事件循环
 */
// function eventLoop() {
//   console.log('start');
//   setTimeout(() => {
//     console.log('child2');
//     Promise.resolve().then(() => {
//       console.log('child2-1');
//     });
//   }, 0);
//   setTimeout(() => {
//     console.log('child3');
//     Promise.resolve().then(() => {
//       console.log('child3-1');
//     });
//   }, 0);
//   Promise.resolve().then(() => {
//     console.log('child1');
//   });
//   console.log('end');
// }

/**
 * 改造示例代码输出0-9
 * 
 */
// for (var i = 0; i < 10; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// }

// 使用迭代的方式实现flatten函数
// function flatten(arr) {
//   let newArr = [];
// }

/**
 * if (a == 1 && a == 2 & a == 3) {
 *   console.log(1);
 * }
 */
// var a = {
//   i: 1,
//   toString: () => {
//     return a.i++;
//   }
// };

// let arr = [3, 15, 8, 29, 102, 22];
// console.log(arr.sort()); // [ 102, 15, 22, 29, 3, 8 ]
// console.log(arr.sort((a, b) => { return a - b; })); // [ 3, 8, 15, 22, 29, 102 ]

// var obj = {
//   '2': 3,
//   '3': 4,
//   'length': 2,
//   'splice': Array.prototype.splice,
//   'push': Array.prototype.push
// }
// obj.push(1);
// obj.push(2);
// console.log(obj);

/**
 * 1.赋值从右向左
 * 2.点的优先级高于赋值
 */
// var a = {n: 1};
// var b = a;
// a.x = a = { n: 2 };
// console.log(a) // { n: 2 }
// console.log(b) // { n: 1, x: { n: 2 } }

/**
 * 将数据{1:222, 2:123, 5:888}处理为：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
 */
// let obj = {1:222, 2:123, 5:888};
// const arr = Array.from({ length: 12 }).map((_, index) => obj[index+1] || null);
// console.log(arr);

/**
 * class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`Hi I am ${name}`);
    setTimeout(() => { this.next(); },0)
  }
  sleepFirst(time) {
    const firstFn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time*1000)
    }
    this.queue.unshift(firstFn)
    return this;
  };
  sleep(time) {
    const sleepFn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time*1000)
    }
    this.queue.push(sleepFn)
    return this;
  };
  eat(food) {
    const eatFn = () => {
      console.log(`I am eating ${food}`)
      this.next()
    }
    this.queue.push(eatFn)
    return this;
  };
  next() {
    const fn = this.queue.shift();
    fn && fn();
  };
}
function LazyMan(name) {
  return new LazyManClass(name);
}
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
*/

/**
 * 给定两个数组计算交集 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
 */
// function getIntersections(arr1, arr2) {
//   let arr = arr1.filter((item) => {
//     return arr2.includes(item);
//   });
//   return arr;
// }
// console.log(getIntersections([1,2,3,3,4,5,6], [3,5,5,6,3]))

/**
 * 代码输出结果
 * 注：1.对象的键名只能是字符串和 Symbol 类型。
 *    2.其他类型的键名会被转换成字符串类型。
 *    3.对象转字符串默认会调用 toString 方法。
 */
// var a = {}, b = '123', c = 123;
// a[b] = 'b';
// a[c] = 'c';
// console.log(a[b]); // c

// var a = {}, b = Symbol('123'), c = Symbol('123');
// a[b] = 'b';
// a[c] = 'c';
// console.log(a[b]); // b

// var a = {}, b = { key: '123' }, c = { key: '456' };
// a[b] = 'b';
// a[c] = 'c';
// console.log(a[b]); // c

// let arr = [1, 2, 3, 4, 5, 6, 7];
// function rotateArr(arr, k) {
//   const Index = arr.length - k
//   const arr2 = arr.splice(Index, k)
//   return arr2.concat(arr);
// }
// console.log(rotateArr(arr, 9));


/**
 * 移动数组中的0到最后
 */
// function moveZero(array) {
//   const len = array.length;
//   let j = 0;
//   for (let i = 0; i < len-j; i++) {
//     if (array[i] === 0) {
//       array.splice(i, 1);
//       array.push(0);
//       i--;
//       j++;
//     }
//     console.log(array)
//   }
//   return array;
// }
// console.log(moveZero([2, 0, 1, 0, 3, 0]));

/**
 * 从数组nums中找出和为target的两个数字的索引
 */
// function sum(arr, target) {
//   for (let i = 0; i < arr.length; i++){
//     for (let j = 1; j > i; j++){
//       if (arr[i] < target && arr[i] + arr[j] === target) {
//         return [i, j]
//       }
//       if (j == arr.length) {
//         return new Error('not found')
//       }
//     }
//   }
// }
// console.log(sum([2, 7, 11, 15], 17));

/**
 * 
 */
// const list = [
//   { id: 1, name: '部门 A', parentId: 0 },
//   { id: 2, name: '部门 B', parentId: 0 },
//   { id: 3, name: '部门 C', parentId: 1 },
//   { id: 4, name: '部门 D', parentId: 1 },
//   { id: 5, name: '部门 E', parentId: 2 },
//   { id: 6, name: '部门 F', parentId: 3 },
//   { id: 7, name: '部门 G', parentId: 2 },
//   { id: 8, name: '部门 H', parentId: 4 }
// ];
// function convert(list) {
//   const res = []
//   const map = list.reduce((res, v) => (res[v.id] = v, res), {});
//   console.log(map);
//   for (const item of list) {
//     if (item.parentId === 0) {
//       res.push(item);
//       continue;
//     }
//     if (item.parentId in map) {
//       const parent = map[item.parentId];
//       parent.children = parent.children || [];
//       parent.children.push(item);
//     }
//   }
//   return res;
// };
// console.log(convert(list));