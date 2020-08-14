// GAME UPDATE FUNCTION 
var update = function () {

    for (let j = 0; j < grid.yDiam; j++) {
        for (let i = 0; i < grid.xDiam; i++) {

            let current = grid.cells[j][i];
            let neighbours = grid.countNeighbours(current);
            //if (neighbours != 0) { console.log(neighbours); }

            if (current.status == "active") {
                if (neighbours <= 1) { current.toSwitch = true; }
                else if (neighbours >= 4) { current.toSwitch = true; }
            }

            else if (current.status == "idle") {
                if (neighbours == 3) { current.toSwitch = true; }
            }

        }
    }


    for (let j = 0; j < grid.yDiam; j++) {
        for (let i = 0; i < grid.xDiam; i++) {
            let current = grid.cells[j][i];
            if (current.toSwitch) {
                current.switch();
                current.toSwitch = false;
            }
            current.updateColor();
        }
    }

}


// DRAW FUNCTION
var draw = function () {

    ctx.clearRect(0, 0, canvWidth, canvHeight);

    for (let i in grid.cells) {
        for (let j in grid.cells[i]) {
            e = grid.cells[i][j];
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x + grid.padding, e.y + grid.padding, e.w - grid.padding * 2, e.h - grid.padding * 2);
        }
    }
}


// MAIN GAME LOOP
var step = function () {

    if (control) {
        update();
        draw();

        //window.requestAnimationFrame(step); // alternative version of 
        // implementing game loop in html5 canvas, but lacks control 
        // over framerate
    }
}