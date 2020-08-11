// DOM SETUP
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvBox = document.getElementById("canvBox");


var windowWidth, windowHeight;
var canvWidth, canvHeight

const cellSize = 50;
const density = 2;

var grid = new Grid(cellSize);
var lastCell;
const fps = 10;

// initialization of grid and canvas size, based on 
// actual canvas parent's size
reloadCanvas(grid);
draw();


// HIGHHLIGHT AND CLICK ON CANVAS HANDLING
canvas.addEventListener("mousemove", highlight);
canvas.addEventListener("mouseout", removeHighlight);
canvas.addEventListener("click", changeStatus);

window.addEventListener("resize", function() {
    reloadCanvas(grid); });


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



setInterval(step, 1000 / fps);

draw() // renders initial frame