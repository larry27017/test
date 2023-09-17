function deepClone(obj) {
  // 判断是否为object或者null
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // 判断Date、RegExp
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // 
  let cloneObj = new obj.constructor;
  for (const key in obj) {
    // 由于for-in循环会遍历对象的原型链，因此可能会迭代到不属于自身的属性，为了避免这种情况，可以使用hasOwnProperty检查属性。
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key])
    }
  }
  return cloneObj;
}

// const obj = [1,'ad']
// console.log(deepClone(obj));

/**
 * 柯里化
 */
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
// console.log(add(1)(2)(2));

const arr = [1, 3, 4, 56, 8, 2];
function twoSum(arr, target) {
  let box = new Map()
  // arr.forEach((item, i) => {
  //   map.set(i, item);
  // });
  // console.log(map);
  for (let i = 0; i < arr.length; i++) {
    if (box.get(target - arr[i]) >= 0) {
      return [box.get(target - arr[i]) ,i]
    }
    // box[arr[i]] = i;
    box.set(arr[i], i)
  }
}
// console.log(twoSum(arr, 12))

function formatStorageNumberToObj(size, decimal = 0) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  const roundedNumber = Number(size.toFixed(decimal));
  return {
    number: roundedNumber,
    unit: units[unitIndex],
  };
}

const result1 = formatStorageNumberToObj(1245, 2);
// console.log(result1);
console.log((1).toFixed(2));