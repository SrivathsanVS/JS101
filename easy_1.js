let rlsync = require('readline-sync');

// Isn't it Odd
function isOdd(num) {
  return !(num % 2 == 0)
}

// Odd Numbers
function oddNumbers() {
  for (let i = 1; i < 100; i += 2) {
    console.log(i);
  }
}

// Even Numbers
function evenNumbers() {
  for (let i = 2; i < 100; i += 2) {
    console.log(i);
  }
}

// How big is the room?
function roomArea() {
  const SQFT_PER_METER = 10.7639;
  let length = Number(rlsync.question('Enter the length of the room in meters:\n'));
  let width = Number(rlsync.question('Enter the width of the room in meters:\n'));
  let round = num => num.toFixed(2);
  console.log(`The area of the room is ${round(length * width)} square meters (${round(length * width * SQFT_PER_METER)} square feet).`)
}

// Tip Calculator
function tipCalculator() {
  let bill = Number(rlsync.question('What is the bill? '));
  let tipPercent = Number(rlsync.question('What is the tip percentage? '));
  console.log(`The tip is $${(bill * tipPercent / 100).toFixed(2)}`);
  console.log(`The total is $${(bill * (1 + tipPercent / 100)).toFixed(2)}`);
}

// Sum or Product of Consecutive Integers
function sumProductConsecInt() {
  const opObj = {
    's': {
          func : (num1, num2) => num1 + num2,
          init : 0,
          desc : 'sum'
        },
    'p': {
          func : (num1, num2) => num1 * num2,
          init : 1,
          desc : 'product'
        }
  }
  let int = Number(rlsync.question('Please enter an integer greater than 0: '));
  let op = rlsync.question('Enter "s" to compute the sum, or "p" to compute the product.');
  let res = opObj[op].init;
  let loopVar = int;
  while (loopVar >= 1) {
    res = opObj[op].func(res, loopVar);
    loopVar -= 1;
  }
  console.log(`The ${opObj[op].desc} between 1 and ${int} is ${res}.`);
}

// Short Long Short
function shortLongShort(string1, string2) {
  if (string1.length < string2.length) {
    return string1 + string2 + string1;
  }
  return string2 + string1 + string2;
}

// Leap Year (Part 1)
function isLeapYear(year) {
  if (year % 4) {
    return false;
  }
  if (!(year % 400)) {
    return true;
  }
  if (!(year % 100)) {
    return false;
  }
  return true;
}

// Leap Year (Part 2)
function isLeapYearAdv(year) {
  if (year >= 1752) {
    return isLeapYear(year);
  }
  return !(year % 4)
}

//Multiples of 3 and 5
function multisum(num) {
  let sum = 0;
  for (let i = 3; i <= num; i++) {
    if (!(i % 3) || !(i % 5)) {
      sum += i;
    }
  }
  return sum;
}

// ASCII String Value
function asciiValue(string) {
  let asc_sum = 0;
  for (let char in string) {
    asc_sum += string[char].charCodeAt();
  }
  return asc_sum;
}
