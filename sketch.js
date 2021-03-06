let cols;
let rows;
let junctionSize = 3;
let scale = junctionSize * 4;

let grid;

let openSet;

let start;
let goal;

let wallChance = .3;

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
			if (random() < wallChance) {
				grid[x][y].wall = true;
			}
		}
	}

	// set starting and goal nodes, while they are the same, pick again
	do {
		goal = grid[floor(random(0, cols))][floor(random(0, rows))];
		start = grid[floor(random(0, cols))][floor(random(0, rows - 1))];
	} while (goal == start);

	// start and goal setup
	start.startSetup(goal);
	goal.isGoal = true;
	goal.wall = false;

	// initialize priority queue
	openSet = new MinHeap();
	openSet.insert(start);

	// heapTest();
}

function draw() {
	background(100);
	// draw the grid of junctions, if they are a wall or in openSet
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			if (grid[x][y].wall || grid[x][y].openSet) {
				grid[x][y].show();
			}
		}
	}

	// draw start and goal
	start.show();
	goal.show();

	// A* logic
	if (openSet.array.length > 0) {
		let current = openSet.peak();

		// current.tipDebug = true;
		// current.show();
		// current.tipDebug = false;

		drawRoute(current);

		// check for completion
		if (current == goal) {
			console.log("goal reached");
			noLoop();
		}

		openSet.extract();
		// if (!openSet.isHeap(0)) {
		// 	console.log('heap fail on extract');
		// }

		current.openSet = false;

		let neighbors = getNeighbors(current);

		neighbors.forEach(n => {
			// tentative g score of this neighbor with current as parent
			let tentativeG = current.g + p5.Vector.dist(current.realPosition, n.realPosition);
			if (tentativeG < n.g && !n.wall) {
				n.parent = current;
				n.g = tentativeG;
				n.setH(goal);
				n.setF();
				if (!openSet.array.includes(n)) {
					openSet.insert(n);
					n.openSet = true;
					// if (!openSet.isHeap(0)) {
					// 	console.log('heap fail on insert');
					// }
				}
				else {
					openSet.update(n);
					// if (!openSet.isHeap(0)) {
					// 	console.log('heap fail on update');
					// }
				}
			}
		});
	}
	else {
		console.log('failure');
	}
}

/**
 * Backtracks from the junction parent recursively to build a route
 * @param {Junction} junction	The endpoint of the route.
 */
function drawRoute(junction) {
	let path = [];
	path.push(junction);

	while (junction.parent != null) {
		path.push(junction.parent);
		junction = junction.parent;
	}

	noFill();
	strokeWeight(6);
	stroke('green');
	beginShape();
	for (var i = 0; i < path.length; i++) {
		vertex(path[i].realPosition.x, path[i].realPosition.y);
	}
	endShape();
}

/**
 * Returns an array of Junctions which are the neighbors of the input Junction.
 * @param {Junction} current The current Junction to look at the neighbors of. 
 */
function getNeighbors(current) {
	let neighbors = [];
	let x = current.position.x;
	let y = current.position.y;

	// left, top, right, bottom
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

	// diagonals
	if (x > 0 && y > 0) {
		// top left
		neighbors.push(grid[x - 1][y - 1])
	}
	if (x < cols - 1 && y > 0) {
		neighbors.push(grid[x + 1][y - 1])
	}
	if (x < cols - 1 && y < rows - 1) {
		neighbors.push(grid[x + 1][y + 1])
	}
	if (x > 0 && y < rows - 1) {
		neighbors.push(grid[x - 1][y + 1])
	}

	// // highlights the neighbors of the current junction
	// neighbors.forEach(element => {
	// 	element.neighborDebug = true;
	// 	element.show();
	// 	element.neighborDebug = false;
	// });

	return neighbors;
}

let heap;
function heapTest() {
	heap = new MinHeap();
	// for (let i = 0; i < 5; i++) {
	// 	heap.insert(floor(random(0, 100)));
	// 	console.log(heap.isHeap(0));

	// }
	heap.insert(82);
	heap.insert(80);
	heap.insert(60);
	heap.insert(95);
	heap.insert(92);

	console.log(heap);
	console.log(heap.isHeap(0));
}