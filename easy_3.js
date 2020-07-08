let rlsync = require('readline-sync');

// Daily Double
function crunch(string) {
  let new_str = '';
  let curr_char = '';
  for (let char in string) {
    if (string[char] === curr_char) {
      continue;
    } else {
      curr_char = string[char];
      new_str += curr_char;
    }
  }
  return new_str;
}

// Bannerizer
function logInBox(string) {
  let first_line = '+' + '-'.repeat(string.length + 2) + '+';
  let second_line = '|' + ' '.repeat(string.length + 2) + '|';
  let third_line = '| ' + string + ' |';
  console.log(first_line);
  console.log(second_line);
  console.log(third_line);
  console.log(second_line);
  console.log(first_line);
}

// Stringy strings
function stringy(num) {
  let string = '';
  for (let i = 0; i < num; i++) {
    string += (i % 2) ? 0 : 1;
  }
  return string;
}

function findFibonacciIndexByLength(num) {
  let fnPrev = 1;
  let fn = 1;
  let loop_count = 0;
  while (fn < 10 ** (num - 1)) {
    let tmp = fn + fnPrev;
    fnPrev = fn;
    fn = tmp;
    loop_count += 1;
  }
  return (loop_count > 0) ? loop_count + 2 : 1
}

// Right Triangles
function triangle(num) {
  for (let i = 1; i <= num; i++) {
    console.log(' '.repeat(num - i) + '*'.repeat(i));
  }
}

// Madlibs
function madlib() {
  let noun = rlsync.question('Enter a noun: ');
  let verb = rlsync.question('Enter a verb: ');
  let adj = rlsync.question('Enter an adjective: ');
  let adv = rlsync.question('Enter an adverb: ');
  console.log(`Do you ${verb} your ${noun} ${adv}? That's hilarious!`);
  console.log(`The ${adj} ${noun} ${verb}s ${adv} over the lazy ${noun}.`);
  console.log(`The ${noun} ${adv} ${verb}s up ${adj} Joe's turtle.`);
}

// Double Doubles
function twice(num) {
  let order = String(num).length;
  if (parseInt(num / 10 ** (order / 2)) === parseInt(num % 10 ** (order / 2))) {
    return num;
  }
  return 2 * num;
}

// Grade Book
function getGrade(sc1, sc2, sc3) {
  let mean_score = (sc1 + sc2 + sc3) / 3;
  switch (parseInt(mean_score / 10)) {
    case (9 || 10):
      return 'A';
      break;
    case (8):
      return 'B';
      break;
    case (7):
      return 'C';
      break;
    case (6):
      return 'D';
      break;
    default:
      return 'F';
  }
}

// Clean up the words
function cleanUp(string) {
  let new_str = '';
  for(let i = 0; i < string.length; i++) {
    if (string[i] < 'a') {
      new_str += ' ';
      continue;
    }
    new_str += string[i];
  }
  return new_str;
}

// What Century is That?
function century(year) {
  let multiple = parseInt(year / 100);
  let centYear = year % 100;
  let century = (centYear !== 0) ? multiple + 1 : multiple;
  let decade = parseInt((century % 100) / 10);
  const suffix = ['th', 'st', 'nd', 'rd', 'th']
  if (decade !== 1) {
    return century + suffix[Math.min(century % 10, 4)]
  }
  return century + 'th';
}
