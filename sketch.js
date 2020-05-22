let cols;
let rows;
let junctionSize = 7;
let scale = junctionSize * 4;

let grid;

let openSet = [];
let closedSet = [];

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

	heap = new MinHeap();
	heap.insert(4);
	heap.insert(2);
	heap.insert(6);
	heap.insert(1);

	console.log(heap.extract());
	
}

function draw() {
	background(51);
	for (let x = 0; x < grid.length; x++) {
		for (let y = 0; y < grid[x].length; y++) {
			grid[x][y].show();
		}
	}
}