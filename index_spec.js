var sudoku = require('./index');
var _ = require('lodash');

describe('sudoku.doubleSolve(array)', function() {
	it('should handle single answer case', function() {
		var input =
			'..2 ..6 ..3\n.4. .8. .9.\n5..7..1..\n....9..8.\n..3..26..\n7.......5\n..8..1..4\n.9..3....\n...5.....';
		var array = sudoku.sudokuToArray(input);
		var result = sudoku.doubleSolve(array);
		expect(result.singleAnswer).toBe(true);
		expect(sudoku.isBoardFull(result.result)).toBe(true);
		expect(sudoku.verify(result.result)).toBe(true);
		expect(result.result2).toBe(null);
	});
	it('should handle multiple answer case', function() {
		var input =
			'..2 ..6 ..3\n.4. .8. .9.\n5..7..1..\n....9..8.\n..3..26..\n7.......5\n..8..1..4\n.9..3....\n.........';
		var array = sudoku.sudokuToArray(input);
		var result = sudoku.doubleSolve(array);
		expect(result.singleAnswer).toBe(false);

		expect(sudoku.isBoardFull(result.result)).toBe(true);
		expect(sudoku.verify(result.result)).toBe(true);

		expect(sudoku.isBoardFull(result.result2)).toBe(true);
		expect(sudoku.verify(result.result2)).toBe(true);

		expect(_.isEqual(result.result, result.result2)).toBe(false);
	});
});
