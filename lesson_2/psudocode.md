**Pseudo-code practice for JS101.**

# _1. Function to return sum of two numbers._

## Casual:

Create a function that takes two numbers as inputs.
Return the sum of the two.

## Formal:

START

DEFINE FUNCTION (NUM_1, NUM_2):
  RETURN NUM_1 + NUM_2

END

# _2. Function to concatenate array of strings._

## Casual:
Define function taking array as input.
Declare a variable to hold the final concatenation, initialise to an empty string.
Loop through the array, adding each string element to the initialised string.
Return string.

## Formal:
START

define function(array):
  SET new_str = ''
  WHILE iterator < length of array:
    SET new_str = new_str + array[iterator]
  RETURN new_str
END

# _3. Function to return an array containing every other element._

## Casual:
Define function taking array as input.
Initialise variable 'final_arr' as an empty array.
Loop through array with a stride of 2. Push each element to the final_arr.
Return final_arr.

## Formal:
START

define function(array):
  SET new_arr = []
  WHILE iterator < length of array:
    SET new_arr = < add array[iterator] to new_arr >
    SET iterator = iterator + 2
  RETURN new_arr
END
