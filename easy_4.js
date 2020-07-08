let rlsync = require('readline-sync');

// How old is Teddy
function randAgeGen() {
  let age = 20 + Math.floor((120 - 20) * Math.random());
  console.log(`Teddy is ${age} years old!`)
}

// Searching 101
function search() {
  let num1 = rlsync.question('Enter the 1st number : ');
  let num2 = rlsync.question('Enter the 2nd number : ');
  let num3 = rlsync.question('Enter the 3rd number : ');
  let num4 = rlsync.question('Enter the 4th number : ');
  let num5 = rlsync.question('Enter the 5th number : ');
  let num6 = rlsync.question('Enter the last number : ');
  let string = ([num1, num2, num3, num4, num5].includes(num6)) ? 'appears' : 'does not appear';
  console.log(`The number ${num6} ${string} in ${num1}, ${num2}, ${num3}, ${num4}, ${num5}.`);
}

// When Will I Retire?
function retire() {
  let age = Number(rlsync.question('What is your age? '));
  let retirementAge = Number(rlsync.question('At what age would you like to retire? '));
  console.log(`It's 2017. You will retire in ${2017 + retirementAge - age}.`);
  console.log(`You have only ${retirementAge - age} years of work to go!`);
}

// Palindromic string
function isPalindrome(string) {
  let fwdInd = parseInt(string.length / 2) - 1; // 6, 2; 5, 1
  let backInd = fwdInd + 1 + (string.length % 2);
  while ((fwdInd >= 0) && (backInd < string.length)) {
    if (!(string[fwdInd] === string[backInd])) {
      return false;
    }
    fwdInd -= 1;
    backInd += 1;
  }
  return true;
}

// Real Palindromes
function isRealPalindrome(string) {
  string = string.toLowerCase();
  let fwdInd = 0;
  let backInd = string.length - 1;
  let isalpha = char => {
    let ascii_char = char.charCodeAt(0);
    let numeric = (ascii_char > 47) && (ascii_char < 58);
    let alpha = (ascii_char > 96) && (ascii_char < 123);
    return (numeric || alpha);
  }
  while(fwdInd < backInd) {
    if (!isalpha(string[fwdInd])) {
      fwdInd += 1;
    } else if (!isalpha(string[backInd])) {
      backInd -= 1;
    } else if (string[fwdInd] === string[backInd]) {
      fwdInd += 1;
      backInd -= 1;
    } else {
      return false;
    }
  }
  return true;
}

function isPalindromicNumber(num) {
  return isPalindrome(String(num));
}

// Running Total
function runningTotal(arr) {
  let new_arr = [];
  let sum = 0;
  for (let i in arr) {
    sum += arr[i];
    new_arr.push(sum);
  }
  return new_arr;
}

// Letter Counter
function wordSizes(string) {
  let arr = string.split(' ');
  let obj = {};
  let word = 'hy';
  for (let i in arr) {
    word = arr[i];
    word_ln = word.length;
    if (String(word_ln) in obj) {
      obj[String(word_ln)] += 1;
      continue;
    }
    if (word_ln === 0) {
      continue;
    }
    obj[String(word_ln)] = 1;
  }
  return obj;
}

// Letter Counter Part 2
function wordSizesTwo(string) {
  let arr = string.toLowerCase().split(' ');
  let obj = {};
  let word = 'hy';
  let word_length = string => {
    let length = 0;
    for (let char in string) {
      if (string[char] < 'a') {
        continue;
      }
      length += 1;
    }
    return length;
  }
  for (let i in arr) {
    word = arr[i];
    word_ln = word_length(word);
    if (String(word_ln) in obj) {
      obj[String(word_ln)] += 1;
      continue;
    }
    if (word_ln === 0) {
      continue;
    }
    obj[String(word_ln)] = 1;
  }
  return obj;
}

// Letter Swap
function swap(string) {
  let arr = string.split(' ');
  for (let i in arr) {
    arr[i] = arr[i].slice(-1) + arr[i].slice(1, -1) + arr[i][0];
  }
  return arr.join(' ');
}
