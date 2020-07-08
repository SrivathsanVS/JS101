let rlsync = require('readline-sync');

// How old is Teddy
function dms(angle) {
  let string_mod = num => {
    if (num < 10)
      return '0' + num;
    return num;
  }
  let degree_symbol = String.fromCharCode(176);
  let degrees = parseInt(angle);
  let seconds = (angle - degrees) * 3600;
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds - minutes * 60);
  console.log(degrees + degree_symbol + string_mod(minutes) + "'" + string_mod(seconds));
}

// Combining arrays
function union(arr1, arr2) {
  for (let i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i]);
  }
  return arr1;
}

// Halvsies
function halvsies(array) {
  let new_arr = [];
  let halfPoint = Math.ceil(array.length / 2);
  let arr1 = array.slice(0, halfPoint);
  let arr2 = array.slice(halfPoint);
  new_arr.push(arr1);
  new_arr.push(arr2);
  return new_arr;
}

// Find the Duplicate
function findDup(array) {
  let arr_dict = {};
  for (let i in array) {
    let char = String(array[i]);
    if (char in arr_dict)
      return array[i];
    arr_dict[char] = 1;
  }
  return 'None found';
}

// Combine Two Lists
function interleave(arr1, arr2) {
  let arr = [];
  let index = 0;
  while (index < arr1.length) {
    arr.push(arr1[index]);
    arr.push(arr2[index]);
    index += 1;
  }
  return arr;
}

// Multiplicative Average
function multiplicativeAverage(array) {
  let index;
  let product = 1;
  for (index = 0; index < array.length; index++) {
    product *= array[index];
  }
  return (product / array.length).toFixed(3);
}

// Multiply Lists
function multiplyList(arr1, arr2) {
  let new_arr = [];
  for (let ind = 0; ind < arr1.length; ind++) {
    new_arr.push(arr1[ind] * arr2[ind]);
  }
  return new_arr;
}

// List of Digits
 function digitList(num) {
   let new_arr = [];
   while (num > 0) {
     new_arr.unshift(num % 10);
     num = parseInt(num / 10);
   }
   return new_arr;
 }

// How Many?
function countOccurrences(vehicles) {
  let vehicle_dict = {};
  for (let i in vehicles) {
    vehicle = vehicles[i];
    if (!(vehicle in vehicle_dict)) {
      vehicle_dict[vehicle] = 1;
      continue;
    }
    vehicle_dict[vehicle] = vehicle_dict[vehicle] + 1;
  }
  for (let vehicle in vehicle_dict) {
    console.log(`${vehicle} => ${vehicle_dict[vehicle]}`);
  }
}

// Array Average
function average(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return Math.floor(sum / array.length);
}

// After Midnight
function timeOfDay(int) {
  let intMod = num => {
    if (num < 10)
      return '0' + num;
    return num;
  }
  const SEC_PER_DAY = 24 * 60;
  int = int % SEC_PER_DAY;
  int = (int < 0) ? SEC_PER_DAY + int : int;
  let minutes = int % 60;
  let hours = parseInt((int - minutes) / 60);
  return `${intMod(hours)}:${intMod(minutes)}`;
}

// After Midnight Part 2
function afterMidnight(string) {
  const SEC_PER_DAY = 24 * 60;
  let hours = Number(string.split(':')[0]);
  let minutes = Number(string.split(':')[1]);
  return (hours * 60 + minutes) % SEC_PER_DAY;
}
function beforeMidnight(string) {
  const SEC_PER_DAY = 24 * 60;
  let hours = Number(string.split(':')[0]);
  let minutes = Number(string.split(':')[1]);
  return SEC_PER_DAY - ((hours * 60 + minutes) % SEC_PER_DAY);
}
