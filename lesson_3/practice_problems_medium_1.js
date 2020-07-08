// Question 1
function asciiArt(string, repetition=10) {
  for (let i = 0; i < repetition; i++) {
    console.log(' '.repeat(i) + string);
  }
}

// Question 2
function swapCase(string) {
  let new_str = '';
  for (let i in string) {
    new_str += (string[i] < 'a') ? string[i].toLowerCase() : string[i].toUpperCase();
  }
  return new_str;
}

// Question 3
function factors(number) {
  let divisor = number;
  let factors = [];
  while (divisor > 0) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  }
  return factors;
}

// Question 4
// Method 1 modifies buffer

// Question 5
// Line 1 logs 0.9
// Line 2 logs True

// Question 6
// Returns false. NaNs cannot be compared using logical operator
// NaN value test is accomplished using isNaN method.

// Question 7
// Returns 34

// Question 8
// Yes data gets ransacked, Object.values returns a shallow copy of values.

// Question 9
// Logs paper

// Question 10
// Returns no
