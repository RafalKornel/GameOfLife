class Cell {
    constructor(x, y, w, h, status, i = 0, j = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.i = i; // x index
        this.j = j; // y index
        this.status = status; // [idle, hover, active]
        this.toSwitch = false;
        this.color = "rgb(237, 237, 237)";
        this.updateColor();
    }

    updateColor() {
        if      (this.status == "idle")     { this.color = "rgb(237, 237, 237)"; }
        else if (this.status == "hover")    { this.color = "grey"; }
        else if (this.status == "active")   { this.color = "black"; }
        else                                { this.color = "white"; }
        //this.color = this.status ?  : "black";
    }

    switch() {
        if      (this.status == "idle")     { this.status = "active"; }
        else if (this.status == "active")   { this.status = "idle"; }
    }

    die()   { this.status = "idle"; console.log("destroying"); }
    live()  { this.status = "active"; console.log("creating"); }
}