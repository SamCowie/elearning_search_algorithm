//==================================GLOBAL VARIABLES===================================
var moves = [];
var movePosition = [];
var path = "";
//=====================================FUNCTIONS=======================================
function createPath(nodePath, move) {
	var path = nodePath;
	switch(move) {
			case 0 :
				path += "L";
				break;
			case 1:
				path += "R";
				break;
			case 2:
				path += "U";
				break;
			case 3:
				path += "D";
				break;
	}
	return path;
}

//function to check if current node state is equal to goal node;
function winCondition(arr, goal) {
	if (arr.toString() == goal.toString()) {
		found = true;
		return true;
	} else {
		found = false;
		return false;
	}
}

//function for expanding a node to see children. 
function expandNode(currentNode) {
	//creates an array for the available moves available to current node
	for(var i = 0; i < currentNode.adjacentTile.length; i++) {
		//if the array value contains "" it means the move is not avaiable
		if (currentNode.adjacentTile[i] !== "") {
			//creates some variables for swaping puzzle elements.
			const tempArray = currentNode.state.slice();
			const tempReplace = currentNode.adjacentTile[i];
			const tempEmpty = currentNode.blankSpace;
			tempArray[tempEmpty] = tempArray[tempReplace];
			tempArray[tempReplace] = 0;
			const tempArrayString = tempArray.toString();
			//if statement which checks the closed list to see if new node has already been created
			//if (!closedList.contains(tempArray.toString()) && !openList.includes(tempArray.toString())) {
			if (!closedList.contains(tempArray.toString())) {
				openList.push(new Node(tempArray,(parseInt(currentNode.depth) + 1), currentNode.state, createPath(currentNode.path, i)));
			}
		}
	}
}

//function for expanding a node to see children. 
function expandNodeAndCheck(currentNode) {
	//creates an array for the available moves available to current node
	for(var i = 0; i < currentNode.adjacentTile.length; i++) {
		//if the array value contains "" it means the move is not avaiable
		if (currentNode.adjacentTile[i] !== "") {
			//creates some variables for swaping puzzle elements.
			const tempArray = currentNode.state.slice();
			const tempReplace = currentNode.adjacentTile[i];
			const tempEmpty = currentNode.blankSpace;
			tempArray[tempEmpty] = tempArray[tempReplace];
			tempArray[tempReplace] = 0;
			const tempArrayString = tempArray.toString();
			//if statement which checks the closed list to see if new node has already been created
			//if (!closedList.contains(tempArray.toString()) && !openList.includes(tempArray.toString())) {
			if (tempArray.toString() === goalboard.toString()) {	
				var goalNode = new Node(tempArray,(parseInt(currentNode.depth) + 1), currentNode.state, createPath(currentNode.path, i));
				console.log("solution path: " + goalNode.path);
				path = goalNode.path;
				solutionPathString = stringMax(path.toString());
				solutionDepth = path.length;
				console.log("solution depth: " + solutionDepth);
				found = true;
				break ;
			} else if (!closedList.contains(tempArray.toString())) {
				openList.push(new Node(tempArray,(parseInt(currentNode.depth) + 1), currentNode.state, createPath(currentNode.path, i)));
			}
		}
	}
}

//function for expanding a node to see children for informed searches. 
function expandNodeInformed(currentNode, heuristic, algorithm) {
	//creates an array for the available moves available to current node
	for(var i = 0; i < currentNode.adjacentTile.length; i++) {
		//if the array value contains "" it means the move is not avaiable
		if (currentNode.adjacentTile[i] !== "") {
			//creates some variables for swaping puzzle elements.
			const tempArray = currentNode.state.slice();
			const tempReplace = currentNode.adjacentTile[i];
			const tempEmpty = currentNode.blankSpace;
			tempArray[tempEmpty] = tempArray[tempReplace];
			tempArray[tempReplace] = 0;
			const tempArrayString = tempArray.toString();
			var pathcost = parseInt(currentNode.depth) + 1;
			if (heuristic == "manhattan") {
				if (algorithm == "astar") {
					var gvalue = manhattanDistance(tempArray,goalBoard) + pathcost;
				} else if (algorithm == "greedy") {
					var gvalue = manhattanDistance(tempArray,goalBoard);	
				}
			} else {
				if (algorithm =="astar") {
					var gvalue = misplacedTile(tempArray,goalBoard) + pathcost;
				} else if (algorithm == "greedy") {
					var gvalue = misplacedTile(tempArray,goalBoard);	
				}
			}
			var newNode = new Node(tempArray, pathcost, currentNode.state, createPath(currentNode.path, i));
			//if statement which checks the closed list to see if new node has already been created
			//if (!closedList.contains(tempArray.toString()) && !openList.includes(tempArray.toString())) {
			if (!closedList.contains(tempArray.toString())) {
				openList.enqueue(newNode, gvalue);
			}
		}
	}
}
