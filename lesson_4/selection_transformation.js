function doubleNumbers(array) {
  for (let i in array) {
    array[i] *= 2;
  }
  return array;
}

function selectFruit(object) {
  let newObject = {};
  for (let key in object) {
    if (object[key] === 'Fruit') {
      newObject[key] = 'Fruit';
    }
  }
  return newObject;
  }

function doubleNumbersOddIndices(array) {
  let new_arr = array.slice();
  for (let i = 1; i < new_arr.length; i += 2) {
    new_arr[i] *= 2;
  }
  return new_arr;
}

function multiply(array, multiplicator) {
  return array.slice().map(element => element * multiplicator);
}
