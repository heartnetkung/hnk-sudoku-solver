## Scripts
1. `npm test` 
2. edit input.txt and `npm start`
3. edit input.txt and `node animation`

## API
```js
var sudoku=require('hnk-sudoku-solver');

//Throw error for incorrect input.
//You can have empty lines and space characters. We'll ignore them.
//The string can contain 1-9, dot, new line, and space.
//Return array
sudoku.sudokuToArray(string);

//For prettyprint
sudoku.arrayToSudoku(array);

//Ascend determines if we start guessing from 1 to 9 or 9 to 1. If we yield the same result in both cases, there is strictly one possible answer for the given input.
//Return array
sudoku.solve(array,ascend/*boolean*/);

//Return {result1:array, result2:array, singleAnswer:boolean}
sudoku.doubleSolve(array);

//Check if there is no duplicate in row/col/box
//Return true/false
sudoku.verify(array);

//Return true/false
sudoku.isBoardFull(array);
```