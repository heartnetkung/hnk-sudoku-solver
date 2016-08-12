var solver = require('javascript-lp-solver');


//input: '118,513' meaning board(1,1)=8 board(5,1)=3
module.export = function(input) {
	var inputArray = inputToArray(input);
	var model = {
		optimize: 'var000',
		opType: 'max',
		constraints: createConstraints(inputArray),
		variables: createVar(inputArray)//,
		//ints: createIntConstraints()
	};
	var result = solver.Solve(model);
	return transformOutput(result);

};


var inputToArray = function(input) {
	var ans = [];
	var inputs = input.split(',');
	for (var i = 0, ii = inputs.length; i < ii; i++) {
		var current = inputs[i];
		ans.push({
			x: parseInt(current[1]) - 1,
			y: parseInt(current[0]) - 1,
			value: parseInt(current[2]) - 1
		});
	}
	return ans;
};


var transformOutput = function(result) {
	var ans = '\n';
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			for (var k = 0; k < 9; k++) {
				ans += result['var' + i + j + k] ? (k + 1) : '';
			}
			if (j % 3 === 2)
				ans += ' ';
		}
		ans += '\n';
		if (i % 3 === 2)
			ans += '\n';
	}
	return ans;
};


var createConstraints = function(inputArray) {
	var ans = {};
	// for (var i = 0; i < 9; i++)
	// 	for (var j = 0; j < 9; j++)
	// 		for (var k = 0; k < 9; k++)
	// 			ans['boolean' + i + j + k] = { min: 0, max: 1 };
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			for (var k = 0; k < 9; k++)
				ans['oneAnswer' + i + j] = { equal: 1 };
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			ans['row' + i + j] = { equal: 1 };
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			ans['col' + i + j] = { equal: 1 };
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			ans['box' + i + j] = { equal: 1 };
	for (var i = 0, ii = inputArray.length; i < ii; i++) {
		var current = inputArray[i];
		ans['given' + current.x + current.y + current.value] = { equal: 1 };
	}
	return ans;
};


var createIntConstraints = function() {
	var ans = {};
	var constraints = 1;
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			for (var k = 0; k < 9; k++)
				ans['var' + i + j + k] = constraints;
	return ans;
};


var createVar = function(inputArray) {
	var ans = {};
	var fl = Math.floor;
	for (var i = 0; i < 9; i++)
		for (var j = 0; j < 9; j++)
			for (var k = 0; k < 9; k++)
				ans['var' + i + j + k] = {
					['row' + i + k]: 1,
					['col' + j + k]: 1,
					['box' + ((3 * fl(i / 3)) + fl(j / 3)) + k]: 1,
					['oneAnswer' + i + j]: 1,
					//['var' + i + j]: 1,
					//['boolean' + i + j + k]: 1
				};
	for (var i = 0, ii = inputArray.length; i < ii; i++) {
		var c = inputArray[i];
		ans['var' + c.x + c.y + c.value]['given' + c.x + c.y + c.value] = 1;
	}
	return ans;
};


(function Main() {
	if (require.main !== module)
		return;
	if (!process.argv[2])
		return console.log('forget argument');
	console.log(module.export(process.argv[2]));
})();
