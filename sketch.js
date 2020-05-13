let cols = 5;
let rows = 5;
let space = 20;
let nodeSize = 5;

let grid = new Array(cols);

function setup() {
	createCanvas(800, 600);
	background(51);


	cols = width / space;
	rows = height / space;

	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
	}

}

function draw() {
	background(51);
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			rect(i * space, j * space, nodeSize, nodeSize);
		}
	}

}