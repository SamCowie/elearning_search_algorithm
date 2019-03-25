//==================================GLOBAL VARIABLES===================================
var startBoard = [4,1,5,3,0,6,7,2,8];
var goalBoard = [1,2,3,4,5,6,7,8,0];
var count = 0;
var currentBoard = [];
var savedBoard = [];
var solutionPath = [];
var solutionPathString;
var solutionDepth;
var timeTaken;
var openSize;
var closedSize;
var solutionFound;
var depthlimit;
var solutionCount = 0;
var run;
var tableCount = 1;
//=================================TESTING CONDITIONS=================================
	currentBoard = startBoard;
	setup();
//=====================================FUNCTIONS=======================================
function saveState(current) {
	savedBoard = current.slice();
}

function getSaveState() {
	currentBoard = savedBoard.slice();
	availableMove(currentBoard);
	return savedBoard;
	count = 0;
	path = "";
}

function setup() {
	saveState(currentBoard);
	availableMove(currentBoard);
	updatePuzzleBoard("int", currentBoard);
	updatePuzzleBoard("goal", goalBoard);
}

function btnReset() {
	location.reload();
}

function updatePuzzleBoard(text, puzzleboard) {
	var i, j;
	for (i = 0; i < puzzleboard.length; i++) {
		document.getElementById(combineString(text, i)).style.backgroundColor = '';
		document.getElementById(combineString(text, i)).innerHTML = puzzleboard[i];
		if (document.getElementById(combineString(text, i)).innerHTML == 0) {
			document.getElementById(combineString(text, i)).style.backgroundColor = 'white';
			document.getElementById(combineString(text, i)).innerHTML = "";
		} 
	}
	if (text === "int") {
		for (j = 0; j < movePosition.length; j++) {
			if (movePosition[j] == "") {
			} else {
				var temp = movePosition[j] - 1;
				document.getElementById(combineString(text, temp)).style.backgroundColor = '#a1a3a8';
			}
		}  
	}
}

//function for combining string and I value in for loop to find innerhtml of puzzleboard table
function combineString(text, i) {
	return(text + "td" + i)
}

function selectbox(val) {
	var selectValue = val.value;
	if (selectValue == "unselected") {
		document.getElementById("search_dropdown2").style.display = "none";
		document.getElementById("dfs_textbox").style.display = "none";
	}
	if (selectValue == 'BFS'||selectValue=='UCS') {
		document.getElementById("search_dropdown2").style.display = "none";
		document.getElementById("dfs_textbox").style.display = "none";
	}
	if (selectValue == 'DFS') {
		document.getElementById("search_dropdown2").style.display = "none";
		document.getElementById("dfs_textbox").style.display = "inline-block";
	}
	if (selectValue == 'A*'||selectValue=='GS') {
		document.getElementById("search_dropdown2").style.display = "inline-block";
		document.getElementById("dfs_textbox").style.display = "none";
	}
	document.getElementById("stepBtn").style.display = "none";
	document.getElementById("runBtn").style.display = "none";
}


//function for finding the 0 position in the array
function findBlank(puzzleboard) {
	var text = "";
	var blankPosition;
	var LENGTH = puzzleboard.length;
	var i;
	for (i = 0; i < LENGTH; i++) {
		if (puzzleboard[i] == 0) {
			blankPosition = i + 1;
			break;
		}
	}
	//text += "The position of 0 is " + blankPosition + "<br>";
	//document.getElementById("test").innerHTML += text ;
	return blankPosition;
}
/*
//fuction that returns a string of available moves depending on position of 0 
switch case positions on gameboard:
|1|2|3|
|4|5|6|
|7|8|9|
array values go clockwise: UP,RIGHT,DOWN,LEFT NOW GO LEFT,RIGHT,UP,DOWN
*/
function availableMove(board) {
	var text = "";
	switch (findBlank(board)) {
		case 1 :
			moves = [0,"R","D",0];
			movePosition = ["",2,4,""];
			break;
		case 2:
			moves = [0,"R","D","L"];
			movePosition = ["",3,5,1];
			break;
		case 3:
			moves = [0,0,"D","L"];
			movePosition = ["","",6,2];
			break;
		case 4:
			moves = ["U","R","D",0];
			movePosition = [1,5,7,""];
			break;
		case 5:
			moves = ["U","R","D","L"];
			movePosition = [2,6,8,4];
			break;
		case 6:
			moves = ["U",0,"D","L"];
			movePosition = [3,"",9,5];
			break;
		case 7:
			moves = ["U","R",0,0];
			movePosition = [4,8,"",""];
			break;
		case 8:
			moves = ["U","R",0,"L"];
			movePosition = [5,9,"",7];
			break;
		case 9:
			moves = ["U",0,0,"L"];
			movePosition = [6,"","",8];
			break;
	}
}
function displayInput(val) {
	var selectValue = val;
	if (selectValue == 'customInputBtn') {
		document.getElementById("puzzle_textbox").style.display = "inline-block";
		document.getElementById("puzzle_dropdown").style.display = "none";
	}
	if (selectValue == 'dropdownInputBtn') {
		document.getElementById("puzzle_dropdown").style.display = "inline-block";
		document.getElementById("puzzle_textbox").style.display = "none";
	}
	document.getElementById("stepBtn").style.display = "none";
	document.getElementById("runBtn").style.display = "none";
}

function changeBoard() {
	var dropval = document.getElementById("puzzle_dropdown").value
	var textval = document.getElementById("puzzle_textbox").value
	const STRINGLENGTH = 9;
	var possible = "";
	var arr = [];
	var count;
	if (dropval === "unselected" && textval ==="") {
		document.getElementById('board_change').style.display='none';
		return;
	}
	if (textval === "") {
		for (var i = 0; i< dropval.length; i++) {
			arr.push(parseInt(dropval.charAt(i)))
		}
		currentBoard = arr;	
		setup();
		document.getElementById('board_change').style.display='none';
		return;
	} else {
		if (textval.length < STRINGLENGTH) {
			alert("value not long enough")
			return;
		} 
		else if (textval.length > STRINGLENGTH) {
			alert("value too long")
			return;
		} else {
				for (var j = 0; i < STRINGLENGTH; i++) {
				count = 0;
					for (var k = 0; j < STRINGLENGTH; i++) {
						if(textval[j] === textval[k]) {
							count ++;
						}
						if (count > 1) {
							alert("value has repeated integer please input correct format");
							possible = "no";
							break;
						}
					}
				return;
			}
			if (possible == "") {
				for (var h = 0; h < STRINGLENGTH; h++) {
					var arrayChar = textval.charAt(h);
					arr.push(parseInt(arrayChar));
				}
				currentBoard = arr;
				setup();
				document.getElementById('board_change').style.display='none'
			}
		}
	}
}
function chooseAlgorithm() {
	var val = document.getElementById("search_dropdown1");
	var selectValue = val.options[val.selectedIndex].value;
	var heuristic = document.getElementById("search_dropdown2").value;
	depthlimit = document.getElementById("dfs_textbox").value;
	switch(selectValue) {
    case "BFS":
		bfs(currentBoard,goalBoard)
        break;
    case "DFS":
		if (depthlimit === "") {
			dfs(currentBoard,goalBoard)
		} else {
			dfs(currentBoard,goalBoard,depthlimit)
		}
        break;
	case "UCS":
		ucs(currentBoard,goalBoard)
        break;
	case "A*":
		if (heuristic == "MD") {
			astar(currentBoard,goalBoard,"manhattan");
		} else if (heuristic == "MT") {
			astar(currentBoard,goalBoard,"misplaced");
		} else {
			alert("Please select a heuristic")
		}
		break;
	case "GS":
		if (heuristic == "MD") {
			greedy(currentBoard,goalBoard,"manhattan");
		} else if (heuristic == "MT") {
			greedy(currentBoard,goalBoard,"misplaced");
		} else {
			alert("Please select a heuristic")
		}
        break;
    default:
        alert("Please select an algorithm!");
		
	}
}
//function for going to learnmore page for corresponding selection from
function learnMore() {
	var val = document.getElementById("search_dropdown1");
	var selectValue = val.options[val.selectedIndex].value;
	switch(selectValue) {
    case "BFS":
		document.location.href = "bfs.html";
        break;
    case "DFS":
		document.location.href = "dfs.html";
        break;
    case "UCS":
		document.location.href = "ucs.html";
        break;
	case "A*":
		document.location.href = "astar.html";
        break;
	case "GS":
		document.location.href = "gs.html";
        break;
    default:
        alert("Please select an algorithm to learn more!");
	}
}

function displayResults() {
	document.getElementById("initialState").innerHTML = "[" + currentBoard + "]";
	document.getElementById("solutionFound").innerHTML = solutionFound;
	document.getElementById("timeTaken").innerHTML = timeTaken + " Milliseconds";
	document.getElementById("path").innerHTML = solutionPathString;
	document.getElementById("solutionDepth").innerHTML = solutionDepth + " Moves";
	document.getElementById("openList").innerHTML = openSize;
	document.getElementById("closedList").innerHTML = closedSize;
	
}
function resetResults() {
	document.getElementById("initialState").innerHTML = "-";
	document.getElementById("solutionFound").innerHTML = "-";
	document.getElementById("timeTaken").innerHTML = "-";
	document.getElementById("path").innerHTML = "-";
	document.getElementById("solutionDepth").innerHTML = "-";
	document.getElementById("openList").innerHTML = "-";
	document.getElementById("closedList").innerHTML = "-";
}

function playSolution() {
	//for (let i = 0; i < path.length; i++) {
			var move = path.charAt(count);
			if (move == "L") {
				btnPress("leftBtn");
			} 
			if (move == "R") {
				btnPress("rightBtn");
			}
			if (move == "U") {
				btnPress("upBtn");
			}
			if (move == "D") {
				btnPress("downBtn");
			}
	//}
}

//function to run the solution recursively until solution is displayed
function runSolution() {
	if (!run) {
        run = setInterval(playSolution,800);
		document.getElementById("runBtn").innerHTML = "Stop";
		document.getElementById("resetBtn").disabled = true;
		document.getElementById("stepBtn").disabled = true;
		document.getElementById("learnBtn").disabled = true;
    } else {
        clearInterval(run);
		document.getElementById("runBtn").innerHTML = "Run";
		document.getElementById("resetBtn").disabled = false;
		document.getElementById("stepBtn").disabled = false;
		document.getElementById("learnBtn").disabled = false;
        run = null;
    }
}

function btnPress(btn_id) {
	count = count + 1
	
	if (btn_id == "upBtn") {
		changeArray(0);
	}
	else if (btn_id == "rightBtn") {
		changeArray(1);
	}
	else if (btn_id == "downBtn") {
		changeArray(2);
	}
	else if (btn_id == "leftBtn") {
		changeArray(3);
	}
	checkWin(currentBoard, goalBoard);
}

function checkWin(currentBoard, goalBoard) {
	var j;
	var current = currentBoard.toString();
	var goal = goalBoard.toString();
	
	if (current === goal) {
		/* $( "#leftBtn" ).hide("slow");
		$( "#rightBtn" ).hide("slow");
		$( "#upBtn" ).hide("slow");
		$( "#downBtn" ).hide("slow");
		$( "#resetBtn" ).show("slow"); */
		for (j = 0; j < movePosition.length; j++) {
			if (movePosition[j] == "") {
			} else {
				var temp = movePosition[j] - 1;
				document.getElementById(combineString("int",temp)).style.backgroundColor = '#c9cacc';
				document.getElementById("runBtn").disabled = true;
				document.getElementById("stepBtn").disabled = true;
				document.getElementById("runBtn").innerHTML = "Run";
				document.getElementById("resetBtn").disabled = false;
				document.getElementById("stepBtn").disabled = true;
				document.getElementById("learnBtn").disabled = false;
				clearInterval(run);
			}
		} 
	}
}

function changeArray(swap) {
	tempBoard = currentBoard; 
	freeSpace = findBlank(currentBoard)- 1
	swapPosition = movePosition[swap] - 1;
	swapValue = tempBoard[swapPosition]
	tempBoard[freeSpace] = swapValue;
	tempBoard[swapPosition] = 0;
	currentBoard = tempBoard;
	availableMove(currentBoard);
	//disableButtons();	
	updatePuzzleBoard("int",currentBoard);
}

function stringMax(string) {
	var tempString = string;
	if (tempString.length > 16) {
		tempString = tempString.substring(0,16);
		tempString += "..."
	}
	return tempString;
}
function displayPlayBtn() {
	document.getElementById("calcBtn").disabled = true;
	document.getElementById("btnChange").style = "display:none";
	document.getElementById("resetBtn").style = "display:inline-block";
	document.getElementById("stepBtn").style = "display:inline-block";
	document.getElementById("runBtn").style = "display:inline-block";
	document.getElementById("search_dropdown1").disabled = true;
	document.getElementById("search_dropdown2").disabled = true;
	document.getElementById("dfs_textbox").disabled = true;
	document.getElementById("runBtn").disabled = false;
	document.getElementById("stepBtn").disabled = false;
}

function resetBtns() {
	document.getElementById("calcBtn").disabled = false;
	document.getElementById("btnChange").style = "display:inline-block";
	document.getElementById("resetBtn").style = "display:none";
	document.getElementById("stepBtn").style = "display:none";
	document.getElementById("runBtn").style = "display:none";
	document.getElementById("search_dropdown1").disabled = false;
	document.getElementById("search_dropdown2").disabled = false;
	document.getElementById("dfs_textbox").disabled = false;
	updatePuzzleBoard("int", getSaveState());
	count = 0;
}
function popUp(value) {
	
	popnum = "myPopup" + value;
	var popup = document.getElementById(popnum);
	popup.classList.toggle("show");	
}
function popDown(value) {
	popnum = "myPopup" + value;
	var popup = document.getElementById(popnum);
	popup.classList.toggle("show")
}

function deleteRow() {
	var el = this.id;
    var element = document.getElementById(el)
	var tr = element.parentElement.parentElement;
    tr.parentElement.removeChild(tr);
}

function pushTable(found) {
	var table = document.getElementById("comparisonTable");
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);
	var cell7 = row.insertCell(6);
	var cell8 = row.insertCell(7);
	var cell9 = row.insertCell(8);
	var dropval = document.getElementById("search_dropdown1").value;
	
	var button = document.createElement("button");
	button.setAttribute("class", "delete");
	button.innerHTML = "&#x2715";
	button.id = "deleteBtn" + tableCount;
	button.onclick = deleteRow;
	cell1.appendChild(button);
	
	if (dropval == "BFS") {
		cell3.innerHTML = "BFS";
	} else if (dropval == "DFS") {
		var textval = document.getElementById("dfs_textbox").value;
		if (textval == "") {
			cell3.innerHTML = "DFS";
		} else {
			cell3.innerHTML = "DLS (Limit: " + textval + ")";
		}
	} else if (dropval == "UCS") {
		cell3.innerHTML = "UCS";
	} else if(dropval == "A*") {
		var dropval2 = document.getElementById("search_dropdown2").value;
		if (dropval2 == "MD") {
			dropval2 = "Manhattan Distance";
		} else {
			dropval2 = "Misplaced Tile";
		}
		cell3.innerHTML = "A* (" + dropval2 + ")";
	} else {
		var dropval2 = document.getElementById("search_dropdown2").value;
		if (dropval2 == "MD") {
			dropval2 = "Manhattan Distance";
		} else {
			dropval2 = "Misplaced Tile";
		}
		cell3.innerHTML = "Greedy (" + dropval2 + ")";
	}
	if (found == false) {
		cell2.innerHTML = "["+ currentBoard + "]";
		cell4.innerHTML = "No";
		cell5.innerHTML = "-";
		cell6.innerHTML = "-";
		cell7.innerHTML = "-";
		cell8.innerHTML = "-";
		cell9.innerHTML = "-";
	} else {
		cell2.innerHTML = "["+ currentBoard + "]";
		cell4.innerHTML = solutionFound;
		cell5.innerHTML = timeTaken;
		cell6.innerHTML = solutionPathString;
		cell7.innerHTML = solutionDepth;
		cell8.innerHTML = openSize;
		cell9.innerHTML = closedSize;
	}
	tableCount++
}