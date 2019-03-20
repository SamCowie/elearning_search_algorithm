function astar(initial, goal, heuristic) {
	//==============================LOCAL VARIABLES====================================
	found = false;
	openList = new Queue;
	closedList = new HashSet();
	//================================SEARCH LOOP======================================
	var startTime = new Date()
	openList.push(new Node(initial, 0,"","",""));
	console.log("BFS SEARCH");
	do {
		if (openList.length < 1) {
			alert("Result not found")
			break;
		}
		const current = openList.shift()
		if (current.state.toString() === goal.toString()) {	
			console.log("solution path: " + current.path);
			path = current.path;
			console.log("solution depth: " + path.length);
			found = true;
		} else {
			expandNode(current);
			if (!closedList.contains(current.stringValue)) {
				closedList.add(current.stringValue);
			}
		}
	} while (found != true)
	//================================END CONDITIONS=====================================
	var endTime = new Date()
	var timeComplete = endTime - startTime
	console.log("Time taken: " + timeComplete + " milliseconds");
	console.log("closed list:");	
	console.log(closedList.size());
	console.log("open list:");
	console.log(openList.length);
}
}