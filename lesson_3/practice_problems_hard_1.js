// Question 1
// Blank space after return for second, will return undefined

// Question 2
// Logs [1, 2]


// Question 3
// Code A logs ['one'], ['two'], ['three'] for each variable
// Code B logs ['one'], ['two'], ['three']
// Code C logs ['two'], ['three'], ['one']

// Question 4
function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  let count = 0;
  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    count += 1;
    if (!isAnIpNumber(word)) {
      return false;
    }
  }
  return (count !== 4) ? false : true;
}
