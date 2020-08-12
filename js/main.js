// DOM SETUP
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvBox = document.getElementById("canvBox");
var slider = document.getElementById("slider");
var exampleButtons = document.getElementsByClassName("dropdown-item");
var toggleButton = document.getElementById("switch");
var output = document.getElementById("output");


var windowWidth, windowHeight;
var canvWidth, canvHeight

const cellSize = 60;
var density = 2.65;

var grid = new Grid(cellSize, canvWidth, canvHeight);
var lastCell;
const fps = 10;
var control = false;


// BUTTON/INPUT HANDLING
canvas.addEventListener("mousemove", highlight);
canvas.addEventListener("mouseout", removeHighlight);
canvas.addEventListener("click", changeStatus);

window.addEventListener("resize", function () {
    reloadCanvas(grid);
});

toggleButton.addEventListener("click", function () {
    if (this.classList.contains("active")) {
        start();
    }
    else {
        stop();
    }
})

slider.oninput = function() {

    density = (slider.value / 100 + 1) * 1.5;
    reloadCanvas(grid);
}


// EXAMPLES HANDLER
exampleButtons[0].addEventListener("click", function () {
    grid.initializeFromJson(spaceship);
    draw();
})

exampleButtons[exampleButtons.length-1].addEventListener("click", function() {
    grid.initializeFromJson(backup);
    draw();
})


reloadCanvas(grid); // loads canvas for the first time

setInterval(step, 1000 / fps);

draw() // renders initial frame