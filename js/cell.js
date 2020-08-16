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
        if      (this.status == "idle")     { this.color = "rgba(6,97,54, 0.2)"; }
        else if (this.status == "hover")    { this.color = "rgba(6,97,54, 0.5)"; }
        else if (this.status == "active")   { this.color = "rgba(6,97,54, 1.0)"; }
        else                                { this.color = "white"; }
    }

    switch() {
        if      (this.status == "idle")     { this.status = "active"; }
        else if (this.status == "active")   { this.status = "idle"; }
    }

    die()   { this.status = "idle"; console.log("destroying"); }
    live()  { this.status = "active"; console.log("creating"); }
}