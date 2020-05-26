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
	
	grid  = new Array(cols);

	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			grid[x][y] = new Junction(x, y, junctionSize, scale);
		}
	}

	start = grid[0][0];
	goal = grid[cols - 1][rows - 1];
	start.start = true;
	goal.goal = true;

	openSet = new MinHeap();
	openSet.insert(start);
	
	

	while (openSet.array.length > 0) {
		let current = openSet.peak();
		if (current == goal) {
			console.log("goal reached");
		}

		openSet.extract();

		let neighbors = getNeighbors(current);
		for (let i = 0; i < neighbors.length; i++) {
			neighbors[i].neighborDebug = true;
		}
		
	}
	
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
	if (x < rows - 1) {
		neighbors.push(grid[x + 1][y])
	}
	if (y < cols - 1) {
		neighbors.push(grid[x][y + 1])
	}

	return neighbors;
}

function draw() {
	background(51);
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			grid[x][y].show();
		}
	}
}