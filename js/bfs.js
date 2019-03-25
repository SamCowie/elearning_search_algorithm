function bfs(initial, goal) {
	document.getElementById("html").style.cursor = "wait !important";
	//==============================LOCAL VARIABLES====================================
	path = "";
	found = false;
	openList = new Queue;
	closedList = new HashSet();
	//================================SEARCH LOOP======================================

	var startTime = new Date()
	var init = initial;
	openList.push(new Node(initial, 0,"","",""));
	console.log("BFS SEARCH");
	do {
		if (openList.length < 1) {
			alert("Result not found");
			document.getElementById("solutionFound").innerHTML = "No";
			break;
		}
		const current = openList.shift()
		if (current.state.toString() === goal.toString()) {
			solutionPath = current.path;
			solutionPathString = stringMax(solutionPath.toString());
			solutionDepth = solutionPath.length;
			console.log("solution path: " + solutionPath);
			path = current.path;
			console.log("solution depth: " + solutionDepth);
			found = true;
		} else {
			expandNode(current);
			if (!closedList.contains(current.stringValue)) {
				closedList.add(current.stringValue);
			}
		}
	} while (found != true)
	//================================END CONDITIONS=====================================
	if (found === true) {
		var endTime = new Date()
		timeTaken = endTime - startTime;
		openSize = parseInt(openList.length);
		alert("Solution Found");
		displayPlayBtn();
		closedSize = parseInt(closedList.size());
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
	document.getElementById("html").style.cursor = "default";
}