// DOM SETUP
var canvas          = document.getElementById("canvas");
var ctx             = canvas.getContext("2d");
var canvBox         = document.getElementById("canvBox");
var slider          = document.getElementById("slider");
var sliderContainer = document.getElementsByClassName("slidecontainer")[0];
var dropdownButton  = document.getElementById("dropdown-btn");
var exampleButtons  = document.getElementsByClassName("dropdown-item");
var toggleButton    = document.getElementById("switch");
var output          = document.getElementById("output");
var rightBox        = document.getElementById("column");
var textDiv         = document.getElementById("text-div");
var infoButton      = document.getElementById("info");
var dropdown        = document.getElementById("dropdown");
var tutorial        = document.getElementById("tutorial");


var windowWidth, windowHeight;
var canvWidth, canvHeight

const cellSize = 60;
var density = 2;

var grid = new Grid(cellSize, canvWidth, canvHeight);
var lastCell;
const fps = 10;
var control = false;
var infoHidden = false;


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

infoButton.addEventListener("click", toggleMobileMenu);


// EXAMPLES HANDLER

var buttons = document.getElementsByClassName("dropdown-item");
for (let i = 1; i < buttons.length - 1; i++ ) {
    let strValue = exampleButtons[i].textContent;

    exampleButtons[i].addEventListener("click", function () {
        if (strValue == "methuselah1") {
            density = 3; 
            slider.value = 99.99;
        }
        else {
            density = 2; 
            slider.value = 33.34;
        }
        reloadCanvas(grid);
        dropdownButton.textContent = strValue;
        grid.initializeFromJson(strValue);
        grid.updateCells();
        draw();
    })
}

exampleButtons[0].addEventListener("click", function () {
    dropdownButton.textContent = "presets";
    grid.initialize();
    grid.updateCells();
    draw();
})

exampleButtons[exampleButtons.length-1].addEventListener("click", function() {
    dropdownButton.textContent = "backup";
    grid.initializeFromJson("backup");
    grid.updateCells();
    draw();
})


reloadCanvas(grid); // loads canvas for the first time

setInterval(step, 1000 / fps);

stop();
draw() // renders initial frame