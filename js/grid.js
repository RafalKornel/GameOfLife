class Grid {
    constructor(s = 50, w, h) {
        this.cells = [];
        this.padding = 2;
        this.cellSize = s;
        this.xDiam = 0;
        this.yDiam = 0;
        this.w = w;
        this.h = h;
    }

    initialize() {   //  this method should initialize grid based on
        //  canvas size and diameter of single cell

        let size = this.cellSize;

        this.xDiam = Math.floor(this.w / size);
        this.yDiam = Math.floor(this.h / size);

        //console.log(this.xDiam, this.yDiam);
        //  console.log(w, h);

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


    initializeFromJson(str) {
        this.initialize();
        let obj = JSON.parse(str);
        console.log(obj);
        for (let j = 0; j < this.yDiam; j++) {

            for (let i = 0; i < this.xDiam; i++) {
                let status = obj[j][i] == 1 ? "active" : "idle";
                this.cells[j][i].status = status;
                //new Cell(i * size, j * size, size, size, "idle", i, j));
            }
        }
    }

    exportToJson() {
        var res = [];
        for (let j in this.cells) {
            let subRes = [];
            for (let i in this.cells[j]){
                subRes.push(this.cells[j][i].status == "active" ? 1 : 0 );
            }
            res.push(subRes);
        }
        return JSON.stringify(res);
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