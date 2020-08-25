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
};


function reloadCanvas(grid) {
    windowWidth = canvBox.offsetWidth;
    windowHeight = canvBox.offsetHeight;


    if (windowWidth * windowHeight > 4e6) {
        windowWidth *= 0.75;    // very nasty hack to prevent
        windowHeight *= 0.75;   // from oversizing grid
    }

    canvWidth = Math.floor(windowWidth / cellSize) * density * cellSize;
    canvHeight = Math.floor(windowHeight / cellSize) * density * cellSize;

    ctx.canvas.width = canvWidth;
    ctx.canvas.height = canvHeight;

    grid.w = canvWidth;
    grid.h = canvHeight;
    grid.initialize();
    draw();
}

function toggleMobileMenu() {

    if (infoHidden) {
        rightBox.children["lower"].style.display = "flex";
        rightBox.style.background = "rgba(65, 65, 65, 0.5)";
        rightBox.style.display = "flex";
        rightBox.style.height  = "100%";
        dropdown.style.display = "flex";
        sliderContainer.style.display = "block";
        tutorial.style.display = "block";
        dropdown.classList.remove("dropleft")

    }
    else {
        rightBox.children["lower"].style.display = "none";
        rightBox.style.background = "transparent";
        rightBox.style.display = "block";
        rightBox.style.height  = "auto";
        dropdown.style.display = "none";
        sliderContainer.style.display = "none";
        tutorial.style.display = "none"
        dropdown.classList.add("dropleft")

    }

    infoHidden = infoHidden == true ? false : true; // switches state
}


var stop = function () {
    output.innerHTML = "paused";
    control = false;
    canvas.addEventListener("mousemove", highlight);
    canvas.addEventListener("mouseout", removeHighlight);
    canvas.addEventListener("click", changeStatus);
    if (window.matchMedia("(min-width: 768px)").matches) {
        rightBox.style.background = "rgba(250, 26, 13, 0.7)";
    }
}

var start = function () {
    control = true;
    output.innerHTML = "running";
    canvas.removeEventListener("mousemove", highlight);
    canvas.removeEventListener("mouseout", removeHighlight);
    canvas.removeEventListener("click", changeStatus);

    if (window.matchMedia("(min-width: 768px)").matches) {
        rightBox.style.background = "rgba(171, 206, 48, 0.7)";
    }
    else if (window.matchMedia("(max-width: 768px)").matches && 
             !infoHidden ) {
            toggleMobileMenu();
        }

    examples["backup"] = grid.exportToJson();
    step();
}