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
 *  
 * @returns 
 */
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



/**
 * 
 * @param {*} ms 延迟时间（毫秒）
 * @description 用promise改写下面回调地域
 * setTimeout(() => {
    console.log(1);
    setTimeout(() => {
      console.log(2);
      setTimeout(() => {
        console.log(3);
      }, 1000);
    }, 1000);
  }, 1000);
 */

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
delay(1000).then(() => {
  console.log(1);
  return delay(1000)
}).then(() => {
  console.log(2);
  return delay(1000)
}).then(() => {
  console.log(3);
})