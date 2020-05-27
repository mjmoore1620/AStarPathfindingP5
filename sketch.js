let cols;
let rows;
let junctionSize = 7;
let scale = junctionSize * 4;

let grid;

let openSet;
let closedSet = [];

let start;
let goal;

let heap;

function setup() {
	createCanvas(800, 600);
	background(51);
	rectMode(CENTER);

	cols = floor(width / scale);
	rows = floor(height / scale);
	console.log("columns: " + cols);
	console.log("rows: " + rows);

	// create the 2d grid
	grid = new Array(cols);
	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	// add junctions to the grid array
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			grid[x][y] = new Junction(x, y, junctionSize, scale);
		}
	}

	// set starting and goal nodes
	start = grid[0][0];
	goal = grid[cols - 1][0];
	start.start = true;
	goal.goal = true;

	start.g = 0;
	start.f = start.setH(goal);
	
	openSet = new MinHeap();
	openSet.insert(start);
}

function draw() {
	background(100);
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			grid[x][y].show();
		}
	}

	if (openSet.array.length > 0) {
		let current = openSet.peak();

		current.tipDebug = true;
		current.show();
		current.tipDebug = false;

		drawRoute(current);

		if (current == goal) {
			console.log("goal reached");
			noLoop();
		}

		openSet.extract();

		let neighbors = getNeighbors(current);
		neighbors.forEach(n => {
			// tentative g score of this neighbor with current as parent
			let tentativeG = current.g + p5.Vector.dist(current.realPosition, n.realPosition);
			if (tentativeG < n.g) {
				n.parent = current;
				n.g = tentativeG;
				n.setH(goal);
				n.setF();
				if (!openSet.array.includes(n)) {
					openSet.insert(n);
				}
			}

			// neighbors[i].neighborDebug = true; // for debugging which node is detected as neighboring
		});

	}
	else {
		console.log('failure');
		
	}

}

function drawRoute(junction) {
	let path = [];
	path.push(junction);

	while (junction.parent != null) {
		path.push(junction.parent);
		junction = junction.parent;
	}

	noFill();
	stroke('blue');
	beginShape();
	for (var i = 0; i < path.length; i++) {
		vertex(path[i].realPosition.x, path[i].realPosition.y);
	}
	endShape();	
}

function getNeighbors(current) {
	let neighbors = [];
	let x = current.position.x;
	let y = current.position.y;

	if (x > 0) {
		neighbors.push(grid[x - 1][y])
	}
	if (y > 0) {
		neighbors.push(grid[x][y - 1])
	}
	if (x < cols - 1) {
		neighbors.push(grid[x + 1][y])
	}
	if (y < rows - 1) {
		neighbors.push(grid[x][y + 1])
	}

	neighbors.forEach(element => {
		element.neighborDebug = true;
		element.show();
		element.neighborDebug = false;
	});

	return neighbors;
}
