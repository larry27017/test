/**
 * 冒泡排序：相邻两项比较，前面大于(升序)或小于(降序)后面就交换位置
 */
function bubbleSort(arr) {
  const array = [...arr];
  let isOk = true;
  for (let i = 0, len = array.length; i < len-1; i++){
    for (let j = i+1; j < len; j++) {
      if (array[i] > array[j]) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        isOk = false;
      }
      if (isOk) {
        break;
      }
    }
    
  }
  return array;
}
// function bubbleSort1(arr) {
//   let array = [...arr];
//   const len = array.length;
//   for (let i = 0; i < len - 1; i++){
//     for (let j = i + 1; j < len - i; j++) {
//       if (array[i] > array[j]) {
//         const temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//       }
//     }
//   }
// }
const arr1 = [1,82,33,2,3,10,11,12,4,5,6,7,21,22,9,17,18,31,323,24,25,26,27,28,2,34,19,20,9,30,35,36];
// console.log(bubbleSort1(arr1));

/**
 * 插入排序：将数组分为已排序和未排序两部分，然后从未排序部分依次选取元素插入到已排序部分的适当位置
 *  3、1、7、5、2、4、9、6
 */
function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let preIndex = i - 1;  // 已排序部分的最后一个索引
    let current = arr[i]; // 当前待插入元素
    while(preIndex >= 0 && arr[preIndex] > current) {
        arr[preIndex+1] = arr[preIndex];
        preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}
// console.log(insertionSort([1, 3, 7, 5, 2, 4, 9, 6]))

/**
 * 选择排序：无论什么数据进去都是 O(n²)的时间复杂度，所以用到它的时候，数据规模越小越好
 * 其基本思想是：首先在未排序的数列中找到最小(or最大)元素，然后将其存放到数列的起始位置
 * 然后再从剩余未排序的元素中继续寻找最小(or最大)元素，然后放到已排序序列的末尾
 */
function selectionSort(arr) {
  let len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
// console.log('选择排序：', selectionSort(arr1));

/**
 * 快速排序
 */
function quickSort(arr) {
  const rec = (arr) => {
    if (arr.length <= 1) { return arr; };
    const left = [];
    const right = [];
    const mid = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i])
      }
    }
    return [...rec(left), mid, ...rec(right)];
  }
  return rec(arr);
}
const array = [3, 1, 7, 5, 2, 4, 9, 6];
// console.log(quickSort(array));

/**
 * 二分查找
 * [1, 2, 3, 4, 5, 6, 7, 9], 6
 */
function binarySearch(arr, target) {
  if (arr.length <= 1) {
    return -1;
  }
  let lowIndex = 0;
  let highIndex = arr.length - 1; // 7
  while (lowIndex <= highIndex) {
    let midIndex = Math.floor((lowIndex + highIndex) / 2)
    if (target > arr[midIndex]) {
      lowIndex = midIndex + 1;
    } else if (target < arr[midIndex]) {
      highIndex = midIndex - 1;
    } else {
      return midIndex;
    }
  }
  return -1;
}
// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 9], 9));

/**
 * 算法：从长度为m的字符串S中查找长度为n的字符串T，并返回位置
 */
function findStr(S, T) {
  if (S.length < T.length) return -1;
  for (let index = 0; index < S.length; index++) {
    if (S.slice(i, i + T.length) === T) return i;
  }
  return -1;
}

/**
 * 找出1-10000中的对称数
 */
function symmetryNum() {
  let arr = [...Array(10000).keys()]
  return arr.filter((x) => {
    return x.toString().length > 1 &&
      x === Number(x.toString().split('').reverse().join(''));
  });
}
// console.log(symmetryNum());

/**
 * 平级转树形flatToTree
 */
function flatToTree(arr, id, treeArr) {
  arr.forEach(item => {
    if (item.pid === id) {
      treeArr.push(item);
    }
  })
  treeArr.forEach((item,i) => {
    item.children = [];
    flatToTree(arr, item.id, item.children)
  })
  return treeArr;
}
const flatCities = [
  { id: 10, pid: 3, name: '广州' },
  { id: 1, pid: 0, name: '四川' },
  { id: 4, pid: 1, name: '成都' },
  { id: 5, pid: 1, name: '德阳' },
  { id: 2, pid: 0, name: '湖北' },
  { id: 6, pid: 2, name: '武汉' },
  { id: 7, pid: 4, name: '武侯区' },
  { id: 3, pid: 0, name: '广东' },
  { id: 8, pid: 4, name: '青羊区' },
  { id: 9, pid: 6, name: '汉阳区' },
];
// console.log(flatToTree(flatCities, 0, []));
/**
 * 树形转平级
 */
const treeCities = [
  {
    id: 1, pid: 0, name: '四川',
    children: [
      {
        id: 4, pid: 1, name: '成都',
        children: [
          { id: 7, pid: 4, name: '武侯区' },
          { id: 8, pid: 4, name: '青羊区' },
        ]
      },
      { id: 5, pid: 1, name: '德阳' },
    ]
  },
  {
    id: 2, pid: 0, name: '湖北',
    children: [
      {
        id: 6, pid: 2, name: '武汉',
        children: [
          { id: 9, pid: 6, name: '汉阳区' }
        ]
      },
    ]
  },
  {
    id: 3, pid: 0, name: '广东',
    children: [
      { id: 10, pid: 3, name: '广州' },
    ]
  },
];
function treeToFlat(arr, result = []) {
  for (const node of arr) {
    const {children, ...obj} = node
    result.push(obj);
    if (node.children && node.children.length) {
      treeToFlat(node.children, result);
    }
  }
  return result;
}
// console.log(treeToFlat(treeCities));