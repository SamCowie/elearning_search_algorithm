'use strict';
//node object
function Node(state, depth, parent, path, heuristic){
	this.state = state;
	this.depth = depth ;
	this.parent = parent;
	this.path = path;
	this.heuristic = heuristic;
	this.blankSpace = findBlank();
	this.adjacentTile = findAdjacent();
	this.stringValue = state.toString();
	
	function findBlank() {
		for (var i = 0; i < state.length; i++) {
			if (state[i] === 0){
				return i;
			}
		}
	}

	function findAdjacent() {
		var moves;
		switch(findBlank()) {
			case 0 :
				// used to expand nodes [U,R,D,L] now expand nodes:[L,R,U,D]
				//moves = ["",1,3,""];
				moves = ["",1,"",3];
				break;
			case 1:
				//moves = ["",2,4,0];
				moves = [0,2,"",4];
				break;
			case 2:
				//moves = ["","",5,1];
				moves = [1,"","",5];
				break;
			case 3:
				//moves = [0,4,6,""];
				moves = ["",4,0,6];
				break;
			case 4:
				//moves = [1,5,7,3];
				moves = [3,5,1,7];
				break;
			case 5:
				//moves = [2,"",8,4];
				moves = [4,"",2,8];
				break;
			case 6:
				//moves = [3,7,"",""];
				moves = ["",7,3,""];
				break;
			case 7:
				//moves = [4,8,"",6];
				moves = [6,8,4,""];
				break;
			case 8:
				//moves = [5,"","",7];
				moves = [7,"",5,""];
				break;
		}
		return moves;
	}
}
