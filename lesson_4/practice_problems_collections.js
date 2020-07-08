// Practice Problem 1
// Output is [1, 2, 3] as the return value in the callback is always truthy

// Practice Problem 2
// Undefined is returned

// Practice Problem 3
// Return value is the square of num

// Practice Problem 4
// 11, as caterpillar is popped

// Practice Problem 5
// Output is true as return from callback is always truthy

// Practice Problem 6
// Array.prototype.fill mutates the array

// Practice Problem 7
// Output will be [undefined, bear]

// Practice Problem 8
function objectify(array) {
  let new_obj = {};
  array.forEach((element, index) => {
    new_obj[element] = index;
  })
  return new_obj;
}

// Practice problem 9
function ageSum(object) {
  return Object.values(object).reduce((acc, elem) => acc + elem, 0);
}

// Practice problem 10
function ageMin(object) {
  return Object.values(object)
               .reduce((acc, elem) => (acc < elem) ? acc : elem,
                        Object.values(object)[0]);
}

// Practice Problem 11
function frequencyCounter(string) {
  let new_arr = string.split('');
  let new_obj = {};
  new_arr.forEach(elem => {
    if (elem !== ' ') new_obj[elem] = string.split(elem).length - 1;
  })
  return new_obj;
}
