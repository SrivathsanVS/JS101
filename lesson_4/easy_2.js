let rlsync = require('readline-sync');

// Welcome Stranger
function welcomeStranger(name_arr, occ_obj) {
  let hello_str = `Hello, ${name_arr.join(' ')}! `;
  let title_str = `Nice to have a ${occ_obj.title} ${occ_obj.occupation} around.`;
  return hello_str + title_str;
}

// Greeting user
function greetUser() {
  let name = rlsync.question('What is your name? ');
  if (name.endsWith('!')) {
    return `HELLO ${name.slice(0, -1).toUpperCase()}. WHY ARE WE SCREAMING?`;
  }
  return `Hello ${name}.`
}

// Multiplying Two Numbers
function multiply(num1, num2) {
  return num1 * num2;
}

// Squaring Argument
function square(num) {
  return Math.pow(num, 2);
}

// Artithmetic Integer
function arithmeticOps() {
  let num1 = Number(rlsync.question('Enter the first number:\n'));
  let num2 = Number(rlsync.question('Enter the second number:\n'));
  const arith_ops = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '*': (num1, num2) => num1 * num2,
    '/': (num1, num2) => parseInt(num1 / num2),
    '%': (num1, num2) => num1 % num2,
    '**': (num1, num2) => num1 ** num2
  }
  for (let key in arith_ops) {
    console.log(`${num1} ${key} ${num2} = ${arith_ops[key](num1, num2)}`);
  }
}

//The End is Near But Not Here
function penultimate(string) {
  return string.split(' ').slice(-1)[0];
}

// Exclusive Or
function xor(num1, num2) {
  return !(Boolean(num1) && Boolean(num2));
}

// Odd Lists
function oddities(arr) {
  let new_arr = [];
  for (let ind = 0; ind < arr.length; ind += 2) {
    new_arr.push(arr[ind]);
  }
  return new_arr;

// Convert String to Number
function stringToInteger(string) {
  let num = 0;
  let tmp_num = 0;
  for (let ind in string) {
    tmp_num = string[ind].charCodeAt(0) - 48;
    num = num * 10 + tmp_num;
  }
  return num;
}

// Convert String to Signed Number
function stringToSignedInteger(string) {
  let num = 0;
  if (string[0] === '-') {
    return -1 * stringToInteger(string.slice(1));
  }
  if (string[0] === '+') {
    return stringToInteger(string.slice(1));
  }
  return stringToInteger(string);
}

// Convert a Number to a string
function integerToString(num) {
  let str = '';
  while (num > 0) {
    let digit = num % 10;
    str = String.fromCharCode(digit + 48) + str;
    num = parseInt(num / 10);
  }
  return (str !== '') ? str : '0';
}

// Convert a Signed Number to a String
function signedIntegerToString(num) {
  let sign_char = '+';
  if (Math.sign(num) < 0) {
    sign_char = '-';
  } else if (Math.sign(num) === 0){
    sign_char = '';
  } else {
    sign_char = '+';
  }
  return sign_char + integerToString(Math.abs(num));
}
