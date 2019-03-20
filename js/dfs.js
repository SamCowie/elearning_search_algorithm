function dfs(initial, goal, depth) {
	//==============================LOCAL VARIABLES====================================
	var DEPTHLIMIT = depth;
	found = false;
	openList = new Array();
	closedList = new HashSet();
	//================================SEARCH LOOP======================================
	var startTime = new Date()
	openList.push(new Node(initial, 0,"","",""));
	console.log("DLS SEARCH (max depth: " + DEPTHLIMIT + ")");
	do {
		if (openList.length < 1) {
			alert("Result not found")
			resetResults();
			document.getElementById("solutionFound").innerHTML = "No";
			break;
		}
		const current = openList.pop()
		if (current.state.toString() === goal.toString()) {	
			solutionPath = current.path;
			solutionPathString = stringMax(solutionPath.toString());
			solutionDepth = solutionPath.length;
			console.log("solution path" + solutionPathString);
			path = current.path;
			console.log("solution depth: " + solutionDepth);
			found = true;
		} else {
			if(current.depth >= DEPTHLIMIT) {
				closedList.add(current.stringValue);
			} else {
				expandNode(current);
				closedList.add(current.stringValue);
			}
			
		}
	} while (found != true)
	//================================END CONDITIONS=====================================
	if (found === true) {
		var endTime = new Date()
		timeTaken = endTime - startTime;
		openSize = parseInt(openList.length);
		closedSize = parseInt(closedList.size());
		alert("Solution Found");
		displayPlayBtn();
		solutionFound = "Yes";
		displayResults();
		pushTable()
		document.getElementById("dfs_textbox").innerHTML = depthlimit;
		console.log("Time taken: " + timeTaken + " milliseconds");
		console.log("closed list:");	
		console.log(closedSize);
		console.log("open list:");
		console.log(openSize);
	} else {
		document.getElementById("solutionFound").innerHTML = "No";
		solutionFound = "false";
		pushTable(false);
	}
}