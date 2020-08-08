var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const initWidth = ctx.canvas.width;
const initHeight = ctx.canvas.height;

const canvRatio = initWidth / initHeight;
const screenRatio = window.innerWidth / window.innerHeight;
column.style.flex = Math.abs(screenRatio / canvRatio - 1);

const padding = 5;

var grid = new Grid();
grid.initialize(initWidth, initHeight, 50);
console.log(grid.cells);

canvas.addEventListener("click", function mouseMove(e) {
    var mouseX, mouseY;
    var scale = initWidth / document.getElementById("canvBox").clientWidth;


    if (e.offsetX) {
        mouseX = e.offsetX * scale;
        mouseY = e.offsetY * scale;
    }
    else if (e.layerX) {
        mouseX = e.layerX * scale;
        mouseY = e.layerY * scale;
    }

    ctx.fillStyle = 'blue';
    ctx.fillRect(mouseX-20, mouseY-20, 40, 40);

    // correctly determines position of mouse
}
);


var draw = function () {
    for (i in grid.cells) {
        for (j in grid.cells[i]) {
            e = grid.cells[i][j];
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x + grid.padding, e.y + grid.padding, e.w - grid.padding * 2, e.h - grid.padding * 2);
        }
    }
}


ctx.clearRect(0, 0, initWidth, initHeight);

draw()