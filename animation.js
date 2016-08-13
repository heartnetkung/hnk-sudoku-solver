var solver = require('./index');
var out = process.stdout;
var rl = require('readline');
var fs = require('fs');

var str = fs.readFileSync(__dirname + '/input.txt', 'utf8');
var board = solver.sudokuToArray(str);


out.write(solver.arrayToSudoku(board));
solver.solveOneStep(board, true, 10, function(remark) {
	for (var i = 0; i < 9; i++) {
		rl.clearLine(out, 0);
		rl.moveCursor(out, -20, -1);
	}
	out.write(solver.arrayToSudoku(board));
});
