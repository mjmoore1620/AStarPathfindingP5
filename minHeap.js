class MinHeap {
    constructor() {
        this.array = [];
    }

    /**
     * Compare item at given index to its parents and reorder if necessary.
     * @param {integer} index   Index of the item to bubble up.
     */
    bubbleUp(index) {
        let parentI = floor((index - 1 / 2));
        if (+this.array[index] < +this.array[parentI]) {
            [this.array[index], this.array[parentI]] = [this.array[parentI], this.array[index]];
            this.bubbleUp(parentI);
        }
    }

    /**
     * Compare item at given index to its children and reorder if necessary.
     * @param {integer} index Index of the item to bubble down.
     */
    bubbleDown(index) {
        let leftChildI = 2 * index + 1;
        let rightChildI = 2 * index + 2;
        let smallChildI;

        // get the index of the smaller child
        if (+this.array[leftChildI] < +this.array[rightChildI]) {
            smallChildI = leftChildI;
        }
        else {
            smallChildI = rightChildI;
        }

        if (+this.array[index] > +this.array[smallChildI]) {
            [this.array[index], this.array[smallChildI]] = [this.array[smallChildI], this.array[index]];
            // the larger item is now at the small child's index, so bubble down again
            this.bubbleDown(smallChildI);
        }
    }

    /**
     * Update only works when an item value is lowered as is.
     * @param {Any item in the list to update} item  The item to update.
     */
    update(item) {
        let index = this.array.indexOf(item);
        //this.bubbleDown(index);
        this.bubbleUp(index);
    }

    insert(input) {
        this.array.push(input);
        let index = this.array.length - 1;
        this.bubbleUp(index);
    }

    extract() {
        if (this.array.length === 1) {
            return this.array.pop();
        }
        
        let min = this.array[0];
        this.array[0] = this.array.pop();
        this.bubbleDown(0);
        return min;
    }

    peak() {
        return this.array[0];
    }
}