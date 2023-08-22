/**
 * 重写instanceof
 */
function myInstanceof(left, right) {
  if (typeof left !== 'object' || right === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

/**
 * 判断数据类型
 */
function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

/**
 * 数组扁平化、去重、升序
 */
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
Array.from(new Set(arr.flat(Infinity))).sort((a, b) => { return a - b; });

function eventLoop() {
  console.log('start');
  setTimeout(() => {
    console.log('child2');
    Promise.resolve().then(() => {
      console.log('child2-1');
    });
  }, 0);
  setTimeout(() => {
    console.log('child3');
    Promise.resolve().then(() => {
      console.log('child3-1');
    });
  }, 0);
  Promise.resolve().then(() => {
    console.log('child1');
  });
  console.log('end');
}
// eventLoop()
// start end child1 child2 child2-1 child3 child3-1

/**
 * 实现(5).add(3).minus(2) 
 * 5+3-2 = 6
 */
Number.prototype.add = function(m) {
  return this.valueOf() + m;
};
Number.prototype.minus = function(n) {
  return this.valueOf() - n;
};
// console.log((5).add(3).minus(2));

/**
 * 冒泡排序
 */
// function bubbleSort(arr) {
//   const array = [...arr];
//   let isOk = true;
//   for (let i = 0, len = array.length; i < len-1; i++){
//     for (let j = i+1; j < len; j++) {
//       if (array[i] > array[j]) {
//         let temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//         isOk = false;
//       }
//     }
//     if (isOk) {
//       break;
//     }
//   }
//   return array;
// }
// const arr1 = [1,82,33,2,3,10,11,12,4,5,6,7,21,22,9,17,18,31,323,24,25,26,27,28,2,34,19,20,9,30,35,36];
// console.log(bubbleSort(arr1));

function Factory(career) {
  if (this instanceof Factory) {
      var a = new this[career]();
      return a;
  } else {
      return new Factory(career);
  }
}
Factory.prototype={
  'coder': function(){
    this.careerName = '程序员';
    this.work = ['写代码', '修Bug'];
  },
  'hr': function(){
    this.careerName = 'HR';
    this.work = ['招聘', '员工信息管理'];
  },
  'driver': function () {
    this.careerName = '司机';
    this.work = ['开车'];
  },
  'boss': function(){
    this.careerName = '老板';
    this.work = ['喝茶', '开会', '审批文件'];;
  }
}
let coder = new Factory('coder');
// console.log(coder);
// let hr = new Factory('hr');
// console.log(hr);

function bubbleSort1(arr) {
  let array = [...arr];
  const len = array.length;
  for (let i = 0; i < len - 1; i++){
    for (let j = i + 1; j < len - i; j++) {
      if (array[i] > array[j]) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
}
