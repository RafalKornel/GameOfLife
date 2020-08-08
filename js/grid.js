class Grid {
    constructor() {
        this.cells = [];
        this.padding = 5;
    }

    initialize(w, h, size) 
    {   //  this method should initialize grid based on
        //  canvas size and diameter of single cell

        let xDiam = Math.floor(w / size);
        let yDiam = Math.floor(h / size);

        console.log(xDiam, yDiam);
        console.log(w, h);

        let res = [];

        for (let i = 0; i < yDiam; i++) {
            let tempRes = [];

            for (let j = 0; j < xDiam; j++) {
                tempRes.push(new Cell(j * size, i * size, size, size, true));
            }
            res.push(tempRes);
        }

        this.cells = res;
    }

    initializeFromMouse() {
        //  this method should set clicked cells, preparing 
        //  grid for using game logic on it
    }

}