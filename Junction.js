/**
 * Class that represents a node in a A* pathfinding demo. Would have named it node, but it was trying to use node.js the server framework
 */
class Junction {
    constructor(x, y, size, scale) {
        // the x,y position in the grid
        this.position = createVector(x, y);

        this.size = size;
        this.scale = scale;
        this.margin = size * 3;

        // the x,y position in pixels
        this.realPosition = createVector(this.position.x * this.scale + this.margin, this.position.y * this.scale + this.margin);

        this.parent;

        this.isStart;
        this.isGoal;
        this.neighborDebug;
        this.tipDebug;
        this.openSet = false;
        this.wall = false;

        //f(n) = g(n) + h(n)
        //estimate from this node to goal
        this.h;
        //cost of path from parent to start
        this.g = Infinity;
        //g + h
        this.f = Infinity;
    }

    startSetup(goal) {
        this.isStart = true;
        this.wall = false;
        this.g = 0;
        this.setH(goal);
        this.f = this.h;
    }

    /**
     * Sets the heuristic estimate of the cost of current junction to goal.
     * @param {Junction} goal   The junction that is goal of the the A* algorithm.
     */
    setH(goal) {
        this.h = p5.Vector.dist(this.realPosition, goal.realPosition);
    }

    // // this is done in sketch.js
    // setG(parent) {
    //     this.g = p5.Vector.dist(this.realPosition, parent.realPosition) + parent.gCost;
    // }

    /**
     * Sets best case cost estimate for a junction. f(n) = g(n) + h(n)
     */
    setF() {
        try {
            if (this.g == null) throw "g score is null";
            if (this.h == null) throw "h score is null";
            this.f = this.g + this.h;
        } catch (error) {
            console.log("setF of " + this.position.x + " " + this.position.y + ", " + error);
        }
    }

    /**
     * Draws a rectangle to represent a junction. Color is based on internal flags.
     */
    show() {
        if (this.wall) {
            stroke('black')
            fill('black');
        }
        // else if (this.neighborDebug) {
        //     stroke('yellow');
        //     fill('yellow');
        // }
        // else if (this.tipDebug) {
        //     stroke('pink');
        //     fill('pink');
        // }
        else if (this.openSet) {
            stroke('purple');
            fill('purple');
        }
        else if (this.isStart) {
            stroke('green');
            fill('green');
        }
        else if (this.isGoal) {
            stroke('red')
            fill('red');
        }
        else {
            stroke('white')
            fill('white');
        }

        strokeWeight(1);
        rect(this.realPosition.x, this.realPosition.y, this.size * 2, this.size * 2);
    }

    /**
     * Returns the value of the best case cost estimate for a junction. f(n) = g(n) + h(n)
     */
    valueOf() {
        return this.f;
    }

    toString() {
        let str = '';
        str += this.position.x + ', ' + this.position.y + ': ' + this.f;

        return str;
    }

}