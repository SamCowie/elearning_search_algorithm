function astar(initial, goal, heuristic) {
	//==============================LOCAL VARIABLES====================================
	var heuristic = heuristic;
	found = false;
	openList = new PriorityQueue();
	closedList = new HashSet();
	//================================SEARCH LOOP======================================
	var startTime = new Date();
	var g = manhattanDistance(initial,goal)
	var node = new Node(initial, 0,"","",g);
	openList.enqueue(node, g);
	console.log("ASTAR SEARCH (" + heuristic + ")");
	do {
		if (openList.length < 1) {
			alert("Result not found")
			document.getElementById("solutionFound").innerHTML = "No";
			break;
		}
		const current = openList.dequeue().element;
		if (current.state.toString() === goal.toString()) {	
			solutionPath = current.path;
			solutionPathString = stringMax(solutionPath.toString());
			solutionDepth = solutionPath.length;
			console.log("solution path: " + solutionPath);
			path = current.path;
			console.log("solution depth: " + solutionDepth);
			found = true;
		} else {
			expandNodeInformed(current, heuristic, "astar");
			if (!closedList.contains(current.stringValue)) {
				closedList.add(current.stringValue);
			}
		}
	} while (found != true);
	if (found === true) {
		var endTime = new Date()
		timeTaken = endTime - startTime;
		openSize = parseInt(openList.items.length);
		alert("Solution Found");
		displayPlayBtn();
		closedSize = parseInt(closedList.size() + 1);
		solutionFound = "Yes";
		displayResults();
		pushTable()
		console.log("Time taken: " + timeTaken + " milliseconds");
		console.log("closed list:");	
		console.log(closedSize);
		console.log("open list:");
		console.log(openSize);
	} else {
		document.getElementById("solutionFound").innerHTML = "No";
		solutionFound = "false";
	}
}

