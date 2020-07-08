function problem1() {
  let arr = ['10', '11', '9', '7', '8'];
  return arr.sort((a, b) => b - a);
}

function problem2() {
  let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];
  return books.sort((a, b) => (a.published - b.published));
}

function problem3() {
  let arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]];
  let arr2 = [{ first: ['a', 'b', 'c'], second: ['d', 'e', 'f'] }, { third: ['g', 'h', 'i'] }];
  let arr3 = [['abc'], ['def'], { third: ['ghi'] }];
  let obj1 = { a: ['d', 'e'], b: ['f', 'g'], c: ['h', 'i'] };
  let obj2 = { first: { d: 3 }, second: { e: 2, f: 1 }, third: { g: 0 }};
  console.log("Array 1 : ");
  console.log(arr1[arr1.length - 1][1][3]);
  console.log("Array 2 : ");
  console.log(arr2[1].third[0]);
  console.log("Array 3 : ");
  console.log(arr3[2].third[0]);
  console.log("Object 1 : ");
  console.log(obj1.b[1]);
  console.log("Object 2 : ");
  console.log(Object.keys(obj2.third)[0]);
}

function problem4() {
  let arr1 = [1, [2, 3], 4];
  let arr2 = [{ a: 1 }, { b: 2, c: [7, 6, 5], d: 4 }, 3];
  let obj1 = { first: [1, 2, [3]] };
  let obj2 = { a: { a: ['1', 'two', 3], b: 4 }, b: 5 };
  arr1[1][1] = 4;
  arr2[2] = 4;
  obj1.first[2][0] = 4;
  obj2.a.a[2] = 4;
  console.log("Modified values : ");
  console.log(arr1);
  console.log(arr2);
  console.log(obj1);
  console.log(obj2);
}

function problem5() {
  let munsters = {
    Herman: { age: 32, gender: 'male' },
    Lily: { age: 30, gender: 'female' },
    Grandpa: { age: 402, gender: 'male' },
    Eddie: { age: 10, gender: 'male' },
    Marilyn: { age: 23, gender: 'female'}
  };
  return Object.values(munsters).reduce((acc, elem) => {
    if (elem.gender === 'male') {
      return (acc + elem.age);
    }
    return acc;
  }, 0);
}

function problem6() {
  let munsters = {
    herman: { age: 32, gender: 'male' },
    lily: { age: 30, gender: 'female' },
    grandpa: { age: 402, gender: 'male' },
    eddie: { age: 10, gender: 'male' },
    marilyn: { age: 23, gender: 'female'}
  };
  let funcTemplate = function(name, age, gender) {
    let nameMod = name[0].toUpperCase() + name.slice(1);
    return `${nameMod} is a ${age}-year-old ${gender}.`;
  }
  for (let person in munsters) {
    console.log(funcTemplate(person,
                             munsters[person].age,
                             munsters[person].gender));
  }
}

// Problem 7
// a is 2
// b is [3, 8]

function problem8() {
  let obj = {
    first: ['the', 'quick'],
    second: ['brown', 'fox'],
    third: ['jumped'],
    fourth: ['over', 'the', 'lazy', 'dog'],
  };
  Object.values(obj).forEach(elem => {
    elem.forEach(word => {
      word.split('').forEach(char => {
        if ('aeiou'.includes(char)) console.log(char);
      })
    })
  })
}

function problem9() {
  let arr = [['b', 'c', 'a'],
             [2, 1, 3],
             ['blue', 'black', 'green']];
  return arr.map(subArr => {
          return subArr.slice().sort((a, b) => {
            if (typeof a === 'number') {
              return a - b;
            }
            if (a < b) {
              return -1
            } else if (a > b) {
              return 1;
            } else {
              return 0;
            }
        });
    });
}

function problem10() {
  let arr = [['b', 'c', 'a'],
             [2, 1, 3],
             ['blue', 'black', 'green']];
  return arr.map(subArr => {
          return subArr.slice().sort((a, b) => {
            if (typeof a === 'number') {
              return b - a;
            }
            if (a < b) {
              return 1
            } else if (a > b) {
              return -1;
            } else {
              return 0;
            }
        });
    });
}

function problem11(arr) {
  return arr.map(elem => {
    let new_elem = Object.assign({}, elem);
    for (let key in new_elem) {
      new_elem[key] += 1;
    }
    return new_elem;
  })
}

function problem12(arr) {
  return arr.map(subArr => {
    return subArr.filter(elem => {
      return !(elem % 3);
    })
  })
}

function problem13(arr) {
  let new_arr = arr.slice();
  let oddSum = arr => arr.reduce((sumOdd, elem) => {
    if (elem % 2) return sumOdd + elem;
    return sumOdd;
  }, 0);
  new_arr.sort((a, b) => oddSum(a) - oddSum(b));
  return new_arr;
}

function problem14(obj) {
  // Assumes that object values contain colors, size
  return Object.values(obj).slice().map(elem => {
    if (elem.type === 'fruit') {
      return elem.colors.map(string => string[0].toUpperCase() + string.slice(1));
    }
    return elem.size.toUpperCase();
  })
}

function problem15(arr) {
  return arr.filter(subObj => {
    for (let key in subObj) {
      if (!subObj[key].every(num => num % 2 === 0))
        return false;
    }
    return true;
  })
}

function problem16(array) {
  let newObj = {};
  array.forEach(subArr => {
    newObj[subArr[0]] = subArr[1];
  });
  return newObj;
}

function problem17() {
  let availChar = 'abcdef0123456789';
  let uuid = '';
  for (let i = 0; i < 32; i++) {
    if ([8, 12, 16, 20].includes(uuid.length))
      uuid += '-';
    uuid += availChar[Math.floor(Math.random() * availChar.length)];
  }
  return uuid;
}
