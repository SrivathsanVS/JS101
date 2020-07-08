// Question 1
let advice = "Few things in life are as important as house training your pet dinosaur.";
console.log('Question 1 : ' + advice.replace('important', 'urgent'));

// Question 2
let numbers = [1, 2, 3, 4, 5];
console.log("\nQuestion 2 : Solution using reverse - " + numbers.slice(0).reverse());
console.log("Question 2 : Solution using sort - " + numbers.slice(0).sort((num1, num2) => num2 - num1));
let new_arr = [];
numbers.forEach(num => {
  let i = new_arr.length;
  if (!i) {
    new_arr.push(num);
  } else {
    for (let loop_ind = 0; loop_ind < i; loop_ind++) {
      if (num < new_arr[loop_ind])
        continue;
      new_arr.splice(loop_ind, 0, num);
      break;
    }
  }
});
console.log("Question 2 : Solution using forEach - " + new_arr);
let reduceSolution = numbers.reduce((accum, num) => {
  for (let i = 0; i <= accum.length; i++) {
    if (num < accum[i])
      continue;
    accum.splice(i, 0, num);
    break;
  }
  return accum;
}, []);
console.log("Question 2 : Solution using reduce - " + reduceSolution);

// Question 3
numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];
let number1 = 8;  // false
let number2 = 95; // true
console.log("\nQuestion 3 : ");
console.log("Numbers contains number1 : " + numbers.includes(number1));
console.log("Numbers contains number2 : " + numbers.includes(number2));

// Question 4
let famousWords = "seven years ago...";
console.log("\nQuestion 4 : ");
console.log("Method 1 - string addition : " + 'Four score and ' + famousWords);
console.log('Method 2 - string concatenation : ' + 'Four score and ' + famousWords);

// Question 5
let arr = [1, 2, 3, 4, 5];
arr.splice(2, 1);
console.log("\nQuestion 5 : " + arr);

// Question 6
let flintstones = ["Fred", "Wilma"];
flintstones.push(["Barney", "Betty"]);
flintstones.push(["Bambam", "Pebbles"]);
flintstones = flintstones.reduce((acc, elem) => {
  if (Array.isArray(elem))
    return [...acc, ...elem];
  return [...acc, elem];
}, []);

// Question 7
flintstones = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3,
                Bambam: 4, Pebbles: 5 };
console.log('\nQuestion 7 : ');
console.log(['Barney', flintstones.Barney]);

// Question 8
numbers = [1, 2, 3, 4];
let table = {field1: 1, field2: 2, field3: 3, field4: 4};
console.log('\nQuestion 8 : ');
console.log('numbers is an array : ' + Array.isArray(numbers));
console.log('table is an array : ' + Array.isArray(table));

// Question 9
let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";
console.log('\nQuestion 9 : ');
console.log((statement1.match(/t/g) || []).length);
console.log((statement2.match(/t/g) || []).length);

// Question 10
let title = 'Flintstones Family Members';
console.log('\nQuestion 10 : ');
console.log('Number of spaces : ' + (40 / 2 - title.length / 2));
