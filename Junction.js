/**
 * Class that represents a node in a A* pathfinding demo. Would have named it node, but it was trying to use node.js the server framework
 */
class Junction {
    constructor(x, y, size, scale) {
        this.position = createVector(x, y);
        this.parent;
        this.size = size;
        this.scale = scale;
        this.margin = size * 3;
        this.start;
        this.goal;
        this.neighborDebug;
        this.tipDebug;
        this.realPosition = createVector(this.position.x * this.scale + this.margin, this.position.y * this.scale + this.margin);
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

    setH(goal) {
        this.h = p5.Vector.dist(this.realPosition, goal.realPosition);
    }

    // // this is done in sketch.js
    // setG(parent) {
    //     this.g = p5.Vector.dist(this.realPosition, parent.realPosition) + parent.gCost;
    // }

    setF() {
        try {
            if (this.g == null) throw "g score is null";
            if (this.h == null) throw "h score is null";
            this.f = this.g + this.h;
        } catch (error) {
            console.log("setF of " + this.position.x + " " + this.position.y + ", " + error);
        }
    }

    show() {
        if (this.start) {
            stroke('green');
            fill('green');
        }
        else if (this.goal) {
            stroke('red')
            fill('red');
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
        else if (this.wall) {
            stroke('black')
            fill('black');
        }
        else {
            stroke('white')
            fill('white');
        }

        rect(this.realPosition.x, this.realPosition.y, this.size * 2, this.size * 2);
    }

    valueOf() {
        return this.f;
    }

}