function ucs(initial, goal) {
	//==============================LOCAL VARIABLES====================================
	goalboard = goal;
	found = false;
	openList = new Queue;
	closedList = new HashSet();
	//================================SEARCH LOOP======================================
	var startTime = new Date()
	openList.push(new Node(initial, 0,"","",""));
	console.log("UCS SEARCH");
	do  {
		if (openList.length < 1) {
			alert("Result not found")
			document.getElementById("solutionFound").innerHTML = "No";
			break;
		}
		const current = openList.shift()
		expandNodeAndCheck(current);
		if (!closedList.contains(current.stringValue)) {
			closedList.add(current.stringValue);
		}
	} while (found != true)
	//================================END CONDITIONS====================================
	if (found === true) {
		var endTime = new Date()
		timeTaken = endTime - startTime
		closedSize = parseInt(closedList.size());
		openSize = parseInt(openList.length);
		alert("Solution Found");
		displayPlayBtn();
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