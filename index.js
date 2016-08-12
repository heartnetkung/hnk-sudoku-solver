var _ = require('lodash');


exports.sudokuToArray = function(string) {
	string = string.replace(/ /g, '');
	var lines = string.split(/\r?\n/);
	var ans = [];
	for (var i = 0, ii = lines.length; i < ii; i++) {
		var current = lines[i];
		if (!current)
			continue;
		var currentAns = [];
		for (var j = 0, jj = current.length; j < jj; j++)
			if (current[j] === '.')
				currentAns.push(null);
			else
				currentAns.push(parseInt(current[j]));
		ans.push(currentAns);
		if (currentAns.length !== 9)
			throw new Error('Incorrect input');
	}
	if (ans.length !== 9)
		throw new Error('Incorrect input');
	return ans;
};


exports.arrayToSudoku = function(array) {
	var ans = '';
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++)
			ans += array[i][j] || '.';
		ans += '\n';
	}
	return ans;
};


exports.solve = function(board, ascend) {
	var initialBoard = _.cloneDeep(board);
	var correct;
	while (true) {
		var correct = verify(board);
		if (correct && isBoardFull(board))
			return board;
		if (correct)
			advance(board, ascend);
		else
			nextRoute(board, initialBoard, ascend);
	}
	return board;
};


exports.doubleSolve = function(board) {
	var result = exports.solve(_.cloneDeep(board), true);
	var result2 = exports.solve(_.cloneDeep(board), false);
	var singleAnswer = _.isEqual(result, result2);
	return {
		result,
		result2: singleAnswer ? null : result2,
		singleAnswer
	};
};


var isBoardFull = exports.isBoardFull = function(board) {
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			if (board[i][j] === null)
				return false;
	return true;
};


var advance = function(board, ascend) {
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			if (board[i][j] === null)
				return board[i][j] = ascend ? 1 : 9;
};


var nextRoute = function(board, initialBoard, ascend) {
	var getLatestPos = function() {
		var ans;
		for (var i = 0; i < 9; i++)
			for (var j = 0; j < 9; j++) {
				if (board[i][j] === null && initialBoard[i][j] === null)
					return ans;
				if (initialBoard[i][j] === null)
					ans = [i, j]
			}
		return ans;
	};
	var latestPos = getLatestPos();
	if (ascend && board[latestPos[0]][latestPos[1]] !== 9)
		return board[latestPos[0]][latestPos[1]]++;
	if (!ascend && board[latestPos[0]][latestPos[1]] !== 1)
		return board[latestPos[0]][latestPos[1]]--;
	board[latestPos[0]][latestPos[1]] = null;
	nextRoute(board, initialBoard, ascend);
};


var verify = exports.verify = function(board) {
	var current;
	for (var i = 0; i < 9; i++) {
		var memory = {};
		for (var j = 0; j < 9; j++) {
			current = board[i][j];
			if (current === null)
				continue;
			if (memory[current])
				return false;
			memory[current] = true;
		}
	}
	for (var i = 0; i < 9; i++) {
		var memory = {};
		for (var j = 0; j < 9; j++) {
			current = board[j][i];
			if (current === null)
				continue;
			if (memory[current])
				return false;
			memory[current] = true;
		}
	}
	for (var i = 0; i < 9; i++) {
		var memory = {};
		for (var j = 0; j < 9; j++) {
			current = board[3 * Math.floor(i / 3) + (j % 3)][3 * (i % 3) + Math.floor(j / 3)];
			if (current === null)
				continue;
			if (memory[current])
				return false;
			memory[current] = true;
		}
	}
	return true;
};


(function Main() {
	if (require.main !== module)
		return;
	var fs = require('fs');
	var str = fs.readFileSync(__dirname + '/input.txt', 'utf8');
	var given = exports.sudokuToArray(str);
	console.log(exports.doubleSolve(given));
})()
