class Grid {
    constructor() {
        this.cells = [];
        this.padding = 5;
        this.cellSize = 50;
        this.xDiam = 0;
        this.yDiam = 0;
    }

    initialize(w, h) 
    {   //  this method should initialize grid based on
        //  canvas size and diameter of single cell

        let size = this.cellSize;

        this.xDiam = Math.floor(w / size);
        this.yDiam = Math.floor(h / size);

        console.log(this.xDiam, this.yDiam);
        console.log(w, h);

        let res = [];

        for (let i = 0; i < this.yDiam; i++) {
            let tempRes = [];

            for (let j = 0; j < this.xDiam; j++) {
                tempRes.push(new Cell(j * size, i * size, size, size, "idle", i, j));
            }
            res.push(tempRes);
        }

        this.cells = res;
    }

    initializeFromMouse() {
        //  this method should set clicked cells, preparing 
        //  grid for using game logic on it
    }

    findCellByMousePos(x, y) {
        let i = Math.floor(x/this.cellSize);
        let j = Math.floor(y/this.cellSize);
        
        //console.log(calcX, calcY);

        return this.cells[j][i];
    }

    removeHoverFromCells() {
        for (let j = 0; j < this.yDiam; j++) {
            for (let i = 0; i < this.xDiam; i++) {
                let e = this.cells[j][i];
                console.log(e);
                if (e.status == "hover") {
                    e.status == "idle";
                }
            }
        }

    }

}