function getMousePos(e) {
    var mouseX, mouseY;
    var scaleX = canvWidth / document.getElementById("canvas").clientWidth;
    var scaleY = canvHeight / document.getElementById("canvas").clientHeight;


    if (e.offsetX) {
        mouseX = e.offsetX * scaleX;
        mouseY = e.offsetY * scaleY;
    }
    else if (e.layerX) {
        mouseX = e.layerX * scaleX;
        mouseY = e.layerY * scaleY;
    }

    return [mouseX, mouseY];
    // correctly determines position of mouse
};


// HIGHHLIGHT AND CLICK ON CANVAS HANDLING
function highlight(e) {
    let pos = getMousePos(e);
    let x = pos[0];
    let y = pos[1];


    let cell = grid.findCellByMousePos(x, y);
    let initStatus = cell.status;

    if (cell.status == "idle") {
        cell.status = "hover";
    }

    cell.updateColor();
    draw();
    cell.status = initStatus;
    grid.updateCells();
    lastCell = cell;

}

function removeHighlight(e) {
    if (lastCell.status == "hover") {
        lastCell.status = "idle";
        lastCell.updateColor();
    }
    //console.log(lastCell);
    draw();

}

function changeStatus(e) {
    let pos = getMousePos(e);
    let x = pos[0];
    let y = pos[1];

    let cell = grid.findCellByMousePos(x, y);

    cell.switch();

    cell.updateColor();
    draw();
    console.log(grid);
};


function reloadCanvas(grid) {
    windowWidth = canvBox.offsetWidth;
    windowHeight = canvBox.offsetHeight;

    canvWidth = Math.floor(windowWidth / cellSize) * density * cellSize;
    canvHeight = Math.floor(windowHeight / cellSize) * density * cellSize;

    ctx.canvas.width = canvWidth;
    ctx.canvas.height = canvHeight;

    grid.initialize(canvWidth, canvHeight);
    draw();
}