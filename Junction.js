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

        //f(n) = g(n) + h(n)
        //estimate from this node to goal
        this.h;
        //cost of path from parent to start
        this.g;
        //g + h
        this.f;
    }

    setH(goal) {
        this.h = dist(this.position, goal.position);
    }
    
    setG(parent) {
        this.g = dist(this.position, parent.position) + parent.gCost;
    }

    setF() {
        this.f = this.g + this.h;
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
        else if (this.neighborDebug) {
            stroke('yellow');
            fill('yellow');
        }
        else {
            stroke('black')
            fill('black');
        }
        
        rect(this.position.x * this.scale + this.margin, this.position.y * this.scale + this.margin, this.size, this.size);
    }

    valueOf() {
        return this.f;
    }

}