class Grid {
    constructor(s = 50) {
        this.cells = [];
        this.padding = 2;
        this.cellSize = s;
        this.xDiam = 0;
        this.yDiam = 0;
    }

    initialize(w, h) {   //  this method should initialize grid based on
        //  canvas size and diameter of single cell

        let size = this.cellSize;

        this.xDiam = Math.floor(w / size);
        this.yDiam = Math.floor(h / size);

        console.log(this.xDiam, this.yDiam);
        console.log(w, h);

        let res = [];

        for (let j = 0; j < this.yDiam; j++) {
            let tempRes = [];

            for (let i = 0; i < this.xDiam; i++) {
                tempRes.push(new Cell(i * size, j * size, size, size, "idle", i, j));
            }
            res.push(tempRes);
        }

        this.cells = res;
    }

    initializeFromMouse() {
        //  this method should set clicked cells, preparing 
        //  grid for using game logic on it
    }

    countNeighbours(cell) {
        let i = cell.i;
        let j = cell.j;
        let count = 0;

        for (let y = -1; y < 2; y++) {
            for (let x = -1; x < 2; x++) {

                if (this.cells[j + y] == undefined ||           // checks if inspecting cell 
                    this.cells[j + y][i + x] == undefined ||    // is either outside of box
                    (x == 0 && y == 0) ) { continue; }          // of current cell

                let current = this.cells[j + y][i + x];
                if (current.status == "active") { count++; }
            }
        }

        return count;

    }


    findCellByMousePos(x, y) {
        let i = Math.floor(x / this.cellSize);
        let j = Math.floor(y / this.cellSize);

        //console.log(calcX, calcY);

        //console.log(this.cells[j][i])
        return this.cells[j][i];
    }

    updateCells() {
        for (let j = 0; j < this.yDiam; j++) {
            for (let i = 0; i < this.xDiam; i++) {
                let e = this.cells[j][i];
                e.updateColor();
            }
        }
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