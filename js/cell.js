class Cell {
    constructor(x, y, w, h, status) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.status = status;
        this.color = this.status ? "rgb(237, 237, 237)" : "black";
    }

}