let rlsync = require('readline-sync');

// Double char
function repeater(string) {
  let new_str = '';
  for (let i in string) {
    new_str += string[i].repeat(2);
  }
  return new_str;
}

// Double char (Part 2)
function doubleConsonants(string) {
  let new_str = '';
  for (let i in string) {
    let ascii = string[i].toLowerCase().charCodeAt(0);
    let boolean_check1 = ['a', 'e', 'i', 'o', 'u'].includes(string[i]);
    let boolean_check2 = !((ascii > 96) && (ascii < 123));
    if (boolean_check1 || boolean_check2) {
      new_str += string[i];
      continue;
    }
    new_str += string[i].repeat(2);
  }
  return new_str;
}

// Reverse Number
function reverseNumber(num) {
  let new_num = 0;
  while (num > 0) {
    new_num = new_num * 10 + (num % 10);
    num = parseInt(num / 10);
  }
  return new_num;
}

// Get the middle character
function centerOf(string) {
  let length = string.length;
  let num = Math.floor(length / 2);
  if (length % 2)
    return string[num];
  return string.slice(num - 1, num + 1);
}

// Negative
function negative(num) {
  return num * (1 - 2 * (num > 0));
}

// Counting Up
function sequence(num) {
  let arr = [];
  for (let i = 0; i < num; i++)
    arr.push(i + 1);
  return arr;
}

// Name Swapping
function swapName(name) {
  let fName = name.split(' ')[0];
  let lName = name.split(' ')[1];
  return lName + ", " + fName;
}

// Sequence
function sequence(num1, num2) {
  let arr = [];
  for (let i = 0; i < num1; i++)
    arr.push(num2 * (i + 1));
  return arr;
}

// Reverse It
function reverseSentence(string) {
  let split_str = string.split(' ');
  let new_str = '';
  for (let i = split_str.length - 1; i >= 0; i--) {
    new_str += split_str[i] + ' ';
  }
  return new_str.slice(0, -1);
}

// Reverse It (Part 2)
function reverseWords(string) {
  let split_str = string.split(' ');
  let new_str = '';
  for (let i in split_str) {
    if (split_str[i].length < 5) {
      new_str += split_str[i] + ' ';
      continue;
    }
    new_str += split_str[i].split('').reverse().join('') + ' ';
  }
  return new_str.slice(0, -1);
}

// Reversed Arrays
function reverse(array) {
  let new_arr = array.slice(0)
  let fInd = 0;
  let lInd = array.length - 1;
  let tmp;
  while (fInd <= lInd) {
    tmp = new_arr[fInd];
    new_arr[fInd] = new_arr[lInd];
    new_arr[lInd] = tmp;
    fInd += 1;
    lInd -= 1;
  }
  return new_arr;
}

function isBalanced(string) {
  const encodeBrackets = {'(': 1, ')': -1};
  let count = 0;
  for (let i in string) {
    if (!(string[i] in encodeBrackets))
      continue;
    count += encodeBrackets[string[i]];
    if (count < 0)
      return false;
  }
  return (count === 0);
}
