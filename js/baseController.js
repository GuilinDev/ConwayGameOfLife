/**
 * Created by Guilin on 10/12/2015.
 */

// Some global variables on canvas
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var interval = 10; // ms
var cellWidth = 10; //cellwidth * cell*Len = 500
var cellXLen = 50; //cellwidth * cell*Len = 500
var cellYLen = 50; //cellwidth * cell*Len = 500
var cells = [];
var running = 0;
var generation = 0;

function startConway () {
    //closure
    function runGame(){
        var nextGen = [];
        for(x = 0; x < cellXLen; x++) {
            for (y = 0; y < cellYLen; y++) {
                nextGen[[x, y]] = applyRules(x, y);
            }
        }
        for (x = 0; x < cellYLen; x++) {
            for (y = 0; y < cellYLen; y++) {
                cells[[x, y]] = nextGen[[x, y]];
            }
        }
        for (x = 0; x < cellXLen; x++) {
            for (y = 0; y < cellYLen; y++) {
                drawCell(x, y, cells[[x, y]]);
            }
        }
        generation++;
        console.log("Start Game1: " + spanGen.innerHTML);
        spanGen.innerHTML = generation;
        console.log("Start Game2: " + spanGen.innerHTML);
        if (running === 1) {
            setTimeout(runGame, interval);
        }
    }
    startGame.disabled = true;
    pauseGame.disabled = false;
    resetGame.disabled = true;
    randomGame.disabled = true;
    running = 1;
    runGame();
};

function pauseConway() {
    running = 0;
    startGame.disabled = false;
    pauseGame.disabled = true;
    resetGame.disabled = false;
    randomGame.disabled = false;
};

function resetConway() {
    for (x = 0; x < cellXLen; x++) {
        for (y = 0; y < cellYLen; y++) {
            cells[[x, y]] = 0;
            drawCell(x, y, 0); // draw from beginning
        }
    }
    drawPatterns();
    generation = 0;
    spanGen.innerHTML = generation;
};

function randomConway() {
    for(x = 0; x < cellXLen; y++) {
        for (y = 0; y < cellYLen; y++){
            randomState = (Math.random() >= 0.5) ? 1 : 0;
            console.log("Random State: " + randomState);
            cells[[x, y]] = randomState;
            drawCell(x, y, randomState);
        }
    }
    generation = 0;
    spanGen.innerHTML = generation;
};

function drawPatterns() {
    function setCells(x, y) {
        cells[[x, y]] = 1;
        drawCell(x, y, 1);
    };
    function drawGliderPatterns() {
        setCells(1, 0);
        setCells(2, 1);
        setCells(2, 2);
        setCells(1, 2);
        setCells(0, 2);
    };
    drawGliderPatterns();
};

function applyRules(x, y) {
    var neighbors = [];
    var neighborsCount = 0;
    var currentState = cells[[x, y]];
    var nextState = 0;

    // iterate the states of 8 neighbor cells of one cell
    neighbors[0] = cells[[(x - 1 + cellXLen) % cellXLen, (y - 1 + cellYLen) % cellYLen]]; // up left
    neighbors[1] = cells[[(x - 1 + cellXLen) % cellXLen, (y + 1 + cellYLen) % cellYLen]]; // down left
    neighbors[2] = cells[[(x + cellXLen) % cellXLen, (y - 1 + cellYLen) % cellYLen]]; // down
    neighbors[3] = cells[[(x + cellXLen) % cellXLen, (y + 1 + cellYLen) % cellYLen]]; // up
    neighbors[4] = cells[[(x + 1 + cellXLen) % cellXLen, (y - 1 + cellYLen) % cellYLen]]; // down right
    neighbors[5] = cells[[(x + 1 + cellXLen) % cellXLen, (y + 1 + cellYLen) % cellYLen]]; // up right
    neighbors[6] = cells[[(x - 1 + cellXLen) % cellXLen, (y + cellYLen) % cellYLen]]; // left
    neighbors[7] = cells[[(x + 1 + cellXLen) % cellXLen, (y + cellYLen) % cellYLen]]; // right

    // caculate how many live neighbors of one cell
    for (i = 0; i < 8; i++) {
        state = neighbors[i];
        neighborsCount++;
    }

    // determine the state of the cell for next generation
    if (state && state === 1) {
        if (neighborsCount < 2 || neighborsCount > 3) {
            return 1;
        } else {
            return 0;
        }
    } else {
        if (neighborsCount === 3){
            return 1;
        } else {
            return 0;
        }
    }
};

function drawCell(x, y, state) {
    var cx = x * cellWidth;
    var cy = y * cellWidth;
    if (state && state === 1) {
        context.fillStyle = "#00FF00";
        context.fillRect(cx, cy, cellWidth, cellWidth);
        context.strokeStyle = "#E9967A";
        context.strokeRect(cx + 1, cy + 1, cellWidth - 2, cellWidth - 2);
    } else {
        // dead
        context.clearRect(cx, cy, cellWidth, cellWidth);
    }
};

function wikiLink () {
    window.open("https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life");
};

function loadGame(){
    canvas.onmousedown = function(e){
        if(running==1) return;
        if(e.offsetX) {
            x = e.offsetX;
            y = e.offsetY;
        }
        else if(e.layerX) {
            x = e.layerX;
            y = e.layerY;
        }
        x = Math.floor(x / cellWidth);
        y = Math.floor(y / cellWidth);
        state = cells[[x,y]];
        if(state && state==1)
        {
            cells[[x,y]] = 0;
            drawCell(x, y, 0);
        }
        else
        {
            cells[[x,y]] = 1;
            drawCell(x, y, 1);
        }
    }
    drawPatterns();
};

window.addEventListener("load", loadGame, true);