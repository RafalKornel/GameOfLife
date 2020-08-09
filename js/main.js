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


// HIGHHLIGHT AND CLICK ON CANVAS HANDLING
canvas.addEventListener("mousemove", highlight);
canvas.addEventListener("mouseout", removeHighlight);
canvas.addEventListener("click", changeStatus);


// BUTTON HANDLING -> REMOVING ALL EVENTS FROM CANVAS
var button = document.getElementById("startButton");
var control = false;

button.addEventListener("click", function start(e) {

    control = true;
    canvas.removeEventListener("mousemove", highlight);
    canvas.removeEventListener("mouseout", removeHighlight);
    canvas.removeEventListener("click", changeStatus);
    update();
})



// GAME UPDATE LOOP
var update = function () {

    if (control) {
        console.log("running");
        //alert("starting");
    }

    for (i in grid.cells) {
        for (j in grid.cells[i]) {
            e = grid.cells[i][j];
            e.updateColor();
        }
    }
}


// DRAW LOOP
var draw = function () {

    ctx.clearRect(0, 0, initWidth, initHeight);

    for (i in grid.cells) {
        for (j in grid.cells[i]) {
            e = grid.cells[i][j];
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x + grid.padding, e.y + grid.padding, e.w - grid.padding * 2, e.h - grid.padding * 2);
        }
    }
}


// MAIN GAME LOOP
var step = function () {

    update();
    draw();

    window.requestAnimationFrame(step);
}


draw() // renders initial frame