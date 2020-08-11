// DOM SETUP
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvBox = document.getElementById("canvBox");
var slider = document.getElementById("slider");


var windowWidth, windowHeight;
var canvWidth, canvHeight

const cellSize = 50;
var density = 2.5;

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

window.addEventListener("resize", function () {
    reloadCanvas(grid);
});

slider.oninput = function() {

    density = (slider.value / 100 + 1) * 1.5;
    reloadCanvas(grid);
}

/*
slider.addEventListener("mousemove", function () {
    reloadCanvas(grid);
    //alert(density);

})
*/


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

//var startButton = document.getElementById("startButton");
//var stopButton = document.getElementById("stopButton");
var output = document.getElementById("output");


var toggleButton = document.getElementById("switch");
toggleButton.addEventListener("click", function () {
    if (this.classList.contains("active")) {
        start();
    }
    else {
        stop();
    }
})



//startButton.addEventListener("click", start);
//stopButton.addEventListener("click", stop);



setInterval(step, 1000 / fps);

draw() // renders initial frame