// DOM SETUP
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const initWidth = ctx.canvas.width;
const initHeight = ctx.canvas.height;

const canvRatio = initWidth / initHeight;
const screenRatio = window.innerWidth / window.innerHeight;
column.style.flex = Math.abs(screenRatio / canvRatio - 1);


// OBJECTS CONSTRUCTION
var grid = new Grid();
grid.initialize(initWidth, initHeight);
var lastCell;
const fps = 10;


// HIGHHLIGHT AND CLICK ON CANVAS HANDLING
canvas.addEventListener("mousemove", highlight);
canvas.addEventListener("mouseout", removeHighlight);
canvas.addEventListener("click", changeStatus);


// BUTTON HANDLING
var control = false;

var stop = function () {
    output.innerHTML = "paused";
    control = false;
    canvas.addEventListener("mousemove", highlight);
    canvas.addEventListener("mouseout", removeHighlight);
    canvas.addEventListener("click", changeStatus);
}
var start = function () {
    control = true;
    output.innerHTML = "running";
    console.log("running");
    canvas.removeEventListener("mousemove", highlight);
    canvas.removeEventListener("mouseout", removeHighlight);
    canvas.removeEventListener("click", changeStatus);
    step();
}

var startButton = document.getElementById("startButton");
var stopButton = document.getElementById("stopButton");
var output = document.getElementById("output");

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);



// GAME UPDATE LOOP
var update = function () {

    for (let j = 0; j < grid.yDiam; j++) {
        for (let i = 0; i < grid.xDiam; i++) {

            let current = grid.cells[j][i];
            let neighbours = grid.countNeighbours(current);
            if (neighbours != 0) { console.log(neighbours); }

            if (current.status == "active") {
                if      (neighbours <= 1)       { current.toSwitch = true; }
                else if (neighbours >= 4)       { current.toSwitch = true; }
            }

            else if (current.status == "idle") {
                if      (neighbours == 3)       { current.toSwitch = true; }
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


// DRAW LOOP
var draw = function () {

    ctx.clearRect(0, 0, initWidth, initHeight);

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

        //window.requestAnimationFrame(step);
    }
}

setInterval(step, 1000 / fps);

draw() // renders initial frame