class Junction {
    constructor(x, y, size, scale) {
        this.position = createVector(x, y);
        this.parent;
        this.size = size;
        this.scale = scale;
        this.margin = size * 3;
    }

    show() {
        rect(this.position.x * this.scale + this.margin, this.position.y * this.scale + this.margin, this.size, this.size);
    }

}