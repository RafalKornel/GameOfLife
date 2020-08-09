function getMousePos(e) {
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