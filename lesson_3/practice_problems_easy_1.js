// Question 1
/* Code does not generate an error.
   What happens is that elements 3 through 5 will be empty,
   and element 6 will be 5.
   By extension, a call to the 4th element will return undefined.
*/

// Question 2
let str1 = "Come over here!"; // true
let str2 = "What's up, Doc?"; // false
console.log("Question 2 solution : ");
console.log("String 1 ends with ! : " + str1.endsWith('!'));
console.log("String 2 ends with ! : " + str2.endsWith('!'));


// Question 3
let ages = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 };
console.log('\nQuestion 3 - ages contains Spot : ' + ages.hasOwnProperty('Spot'));

// Question 4
let munstersDescription = "the Munsters are CREEPY and Spooky.";
console.log('\nQuestion 4 - re-capitalization : ' + munstersDescription[0].toUpperCase() +
             munstersDescription.substring(1).toLowerCase());

// Question 5
/* First Line outputs true, due to implicit coercion.
Second Line outputs false */

// Question 6
ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
let additionalAges = { Marilyn: 22, Spot: 237 };
console.log("\nQuestion 6 result : ");
console.log(Object.assign(ages, additionalAges));

// Question 7
str1 = "Few things in life are as important as house training your pet dinosaur.";
str2 = "Fred and Wilma have a pet dinosaur named Dino.";
console.log("\nQuestion 7 : ");
console.log("String 1 contains Dino : " + str1.includes('Dino'));
console.log("String 2 contains Dino : " + str2.includes('Dino'));

// Question 8
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
console.log("\nQuestion 8 : Array with Dino added : ");
console.log(flintstones.concat('Dino'));

// Question 9
flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
console.log("\nQuestion 9 - Array modified to include 2 new elements : ");
console.log(flintstones.concat('Dino', 'Happy'));

// Question 10
let advice = "Few things in life are as important as house training your pet dinosaur.";
console.log("\nQuestion 10 result : ");
console.log(advice.slice(0, advice.indexOf('house')) + '\n');
