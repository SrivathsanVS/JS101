// Question 1
function elemRemoval(array) {
  let tmp_arr = array.slice(0);
  console.log('Method 1 - using shift : ');
  while (tmp_arr.length) {
    tmp_arr.shift();
  }
  console.log('Array Length : ' + tmp_arr.length);
  tmp_arr = array.slice(0);
  console.log('Method 2 - using pop : ');
  while (tmp_arr.length) {
    tmp_arr.pop();
  }
  console.log('Array Length : ' + tmp_arr.length);
  tmp_arr = array.slice(0);
  console.log('Method 3 - using splice : ');
  tmp_arr.splice(0, tmp_arr.length);
  console.log('Array Length : ' + tmp_arr.length);
  console.log('Method 4 - using reduce : ');
  tmp_arr = array.reduce(elem => []);
  console.log('Array Length : ' + tmp_arr.length);
}

// Question 2
// String concatenation performed.

// Question 3
// Console logs 'hello there'

// Question 4
// Console logs [{first: 42}, {second: 'value2'}, 3, 4, 5]

// Question 5
// return (color === "blue" || color === "green") 
