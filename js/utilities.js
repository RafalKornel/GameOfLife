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

    //console.log(mouseX, mouseY);

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
    //console.log(grid);
};


function reloadCanvas(grid) {
    windowWidth = canvBox.offsetWidth;
    windowHeight = canvBox.offsetHeight;

    //console.log(windowWidth, windowHeight, windowHeight*windowWidth);

    if (windowWidth * windowHeight > 4e6) {
        windowWidth *= 0.75;    // very nasty hack to prevent
        windowHeight *= 0.75;   // from oversizing grid
    }

    canvWidth = Math.floor(windowWidth / cellSize) * density * cellSize;
    canvHeight = Math.floor(windowHeight / cellSize) * density * cellSize;

    ctx.canvas.width = canvWidth;
    ctx.canvas.height = canvHeight;

    //console.log(density);

    grid.w = canvWidth;
    grid.h = canvHeight;
    grid.initialize();
    draw();
}


var stop = function () {
    output.innerHTML = "paused";
    control = false;
    canvas.addEventListener("mousemove", highlight);
    canvas.addEventListener("mouseout", removeHighlight);
    canvas.addEventListener("click", changeStatus);
    if (window.matchMedia("(min-width: 768px)").matches) {
        rightBox.style.background = "rgba(250, 26, 13, 0.7)";
        textDiv.style.background = "rgba(250, 26, 13, 0.2)";
        textDiv.style.scrollbarColor = "rgba(250, 26, 13, 1) transparent";
    }
    else {
        rightBox.style.background = "transparent";
    }
}

var start = function () {
    control = true;
    output.innerHTML = "running";
    console.log("running");
    canvas.removeEventListener("mousemove", highlight);
    canvas.removeEventListener("mouseout", removeHighlight);
    canvas.removeEventListener("click", changeStatus);

    if (window.matchMedia("(min-width: 768px)").matches) {
        rightBox.style.background = "rgba(171, 206, 48, 0.7)";
        textDiv.style.background = "rgba(171, 206, 48, 0.2)";
        textDiv.style.scrollbarColor = "rgba(171, 206, 48, 1) transparent";
    }
    else {
        rightBox.style.background = "transparent";
    }

    examples["backup"] = grid.exportToJson();
    step();
}