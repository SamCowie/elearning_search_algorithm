//==============================TESTING VALUES================================
//var s = [2,1,3,5,4,0,6,7,8];
//var s = [6,4,7,8,5,0,3,2,1];
//var s = [1,0,2,3,4,5,6,7,8];
//var s = [7,2,4,5,0,6,8,3,1];
var s = [1,2,3,6,4,5,7,0,8];
//var g = [0,1,2,3,4,5,6,7,8];
var g = [1,2,3,4,5,6,7,8,0];

//function for getting the manhattan distance of the current puzzle state
function manhattanDistance(current,goal) {
	var current_2D = arrayConvertor(current);
	var goal_2D = arrayConvertor(goal);
	var result = 0;
		for (var i = 0; i < current_2D.length; i++) {
			for (var j = 0; j < current_2D[i].length; j++) {
				var elem = current_2D[i][j];
				if (elem == 0) {
				} else {
					var found = false
					for (var h = 0; h < goal_2D.length; h++) {
						for (var k = 0; k < goal_2D.length; k++) {
							if (goal_2D[h][k] == elem) {
								result += Math.abs(h - i) + Math.abs(j - k)
								found = true
								break
							}
						}
						if (found) break
					}
				}
			}
		}
	return result
}

//function for converting a 1d array into a 2d array
function arrayConvertor(oldarray) {
	var cols = 3;
	var rows = 3;
	var array2d = new Array(3);
	for (var i = 0; i < 3; i++) {
		array2d[i] = new Array(3);
	}
	var l = 0;
	for (var j = 0; j < 3; j++) {
		for (var k = 0; k < 3; k++) {
			var temp = oldarray[l];
			array2d[j][k] = temp;
			l++;
		}
	}
	return array2d;
}

//function for working out the misplaced tile heuristic of state compared to the goal
function misplacedTile(current, goal) {
	var heuristic = 0;
	for (var i = 0; i < current.length; i++) {
		if (current[i] != goal[i]){
			heuristic++;
		}
	}
	return heuristic;
}