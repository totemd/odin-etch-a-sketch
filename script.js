const container = document.querySelector("#container");

const TOTAL_WIDTH = 800;
const INITIAL_SQUARES_PER_SIZE = 16;
const BORDER_WIDTH = 1;

const resetButton = document.querySelector("button");
resetButton.addEventListener("click", () => {
    removeGrid();
    initializeGrid(askSize());
});

initializeGrid(INITIAL_SQUARES_PER_SIZE)

function askSize() {
    let input = 0;
    while (input <= 0 || input >= 100) {
        input = +prompt("How many squares per side?");
    }
    return input;
}

function initializeGrid(squaresPerSide) {
    const squareSize = `${TOTAL_WIDTH / squaresPerSide - 2 * BORDER_WIDTH}px`;
    for (let i = 0; i < squaresPerSide; i++) {
        const newRow = document.createElement("div");
        newRow.setAttribute("id", `row${i}`);
        newRow.classList.toggle("row");
        newRow.style.clear = "left";
        for (let j = 0; j < squaresPerSide; j++) {
            const newSquare = document.createElement("div");
            newSquare.classList.toggle("square");
            newSquare.setAttribute("id", `row${i}col${j}`);
            newSquare.style.width = squareSize;
            newSquare.style.height = squareSize;
            newSquare.style.border = `${BORDER_WIDTH}px solid black`;
            newSquare.style.float = "left";
            newSquare.addEventListener("mouseover", (e) => {
                updateColors();
                e.target.classList.add("colored");
                addColor(e);
            });
            newRow.appendChild(newSquare);
        }
        container.appendChild(newRow);
    }
}

function removeGrid() {
    const rows = container.querySelectorAll(".row");
    rows.forEach(row => container.removeChild(row));
}

function addColor(e) {
    h = Math.floor(Math.random() * 360);
    s = Math.floor(Math.random() * 51 + 50);
    l = Math.floor(Math.random() * 51 + 50);
    e.target.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
}

function updateColors() {
    const STEP = 25;
    const coloredSquares = container.querySelectorAll(".colored");
    coloredSquares.forEach(square => {
        let [r, g, b] = square.style.backgroundColor.match(/\d+/g);    
        r = (r <= STEP) ? 0 : r - STEP;
        g = (g <= STEP) ? 0 : g - STEP;
        b = (b <= STEP) ? 0 : b - STEP;
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    });
}

