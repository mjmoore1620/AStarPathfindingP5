class MinHeap {
    constructor() {
        this.array = [];
    }

    /**
     * Compare the added element with its parent; if they are out of order, swap and and bubble up until top of heap or parent is less. 
     * @param {*} index 
     */
    bubbleUp(index) {
        let parentI = floor((index - 1 / 2));
        if (+this.array[index] < +this.array[parentI]) {
            [this.array[index], this.array[parentI]] = [this.array[parentI], this.array[index]];
            this.bubbleUp(parentI);
        }
    }

    /**
     * On removal of lowest value, bubble down last element to ensure heap integrity.
     * @param {*} index 
     */
    bubbleDown(index) {
        let leftChildI = 2 * index + 1;
        let rightChildI = 2 * index + 2;
        let newIndex;

        if (+this.array[index] > +this.array[leftChildI] || +this.array[index] > +this.array[rightChildI]) {
            //if the new thing is greater than left child, swap
            if (+this.array[index] > +this.array[leftChildI]) {
                [this.array[index], this.array[leftChildI]] = [this.array[leftChildI], this.array[index]];

                //capture new index for recursive bubble-down
                newIndex = leftChildI;
            }

            //if the new thing is greater than right child, swap
            if (+this.array[index] > +this.array[rightChildI]) {
                [this.array[index], this.array[rightChildI]] = [this.array[rightChildI], this.array[index]];

                //capture new index for recursive bubble-down
                newIndex = rightChildI;
            }

            this.bubbleDown(newIndex);
        }
    }

    insert(input) {
        this.array.push(input);
        let index = this.array.length - 1;
        this.bubbleUp(index);
    }

    extract() {
        let min = this.array[0];
        this.array[0] = this.array.pop();
        this.bubbleDown(0);
        return min;
    }

    peak() {
        return this.array[0];
    }
}