
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();



const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

// grid constants
const gridWidth = 20;
const gridHeight = 20;
const size = 100;
let paused = false;

// basic function to draw a line from point x to point y
function drawLine(x, y, lineToX, lineToY){
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(lineToX, lineToY);
  ctx.stroke();
}

// function which draws a grid onscreen(not this is not a grid object, contains no useful information except visual lines)
function drawGrid(gridWidth, gridHeight, size){

  for (let i = 0; i <= gridWidth; i++){
    drawLine(i * size, 0, i * size, size * gridHeight)
  }
  for (let i = 0; i <= gridHeight; i++){
    drawLine(0, i * size, size * gridWidth, i * size)
  }
}

// Plant object, seen as green in grid
function Plant(){
    const plantSize = size - 2;
    // plant method that draws a plant n postion x, y on grid
    this.drawPlant = function(x,y){
      ctx.beginPath();
      ctx.fillStyle="green";
      x = x * size + ((size - plantSize) / 2);
      y = y * size + ((size - plantSize) / 2);
      ctx.fillRect(x, y, plantSize,plantSize);
      ctx.stroke();
  }
}

// function which creates the innitial (empty) grid array
function gridInfo(gridWidth, gridHeight){
  const grid = new Array(gridWidth).fill(null);

  for(let i = 0; i < gridWidth; i++){
    grid[i] = new Array(gridHeight).fill(null);
  }

  return grid
}

// function that returns true if a cell at x,y is filled with live cell
function isLiveCell(grid, x,y){

  try {
    return grid[x][y] != null;
  } catch(error){
    return null;
  }
}

// function that sets a cell to null "dead"
function setDeadCell(grid, x, y){
  grid[x][y] = null;
}

// counts the number of life neighbors from perspective x,y
function numNeighbors(grid,x,y){
  var n = 0;
  var neighbors = [[-1,-1], [-1,0],
                  [-1, 1],  [0, -1],
                  [0, 1],   [1, -1],
                  [1, 0],   [1,1]];

  for (let i = 0; i < neighbors.length; i ++){
    if (isLiveCell(grid, x + neighbors[i][0], y + neighbors[i][1]) == true){
      n += 1
    }
  }
  return n;
}


let grid = gridInfo(gridWidth, gridHeight);

function drawPlants(){
  for(let x = 0; x< gridWidth; x ++){
    for(let y = 0; y < gridHeight; y++ ){
      if (grid[x][y] != null){

        grid[x][y].drawPlant(x, y)
    }
  }
}
}

// game of life rules
// any live cell with one or zero neighbors dies, as if by under population
// any live cell with two or or three neighbors lives on to the next generation
// any live cell with 4 or more live neighbors dies, as if by overpopulation
// any dead cell(empty cell) with exactly three live neighbors becomes a live cell, as if by reproduction

function evolve(grid){

  setNewPlants = [];
  setDeadPlants = [];

  for(let x = 0; x< gridWidth; x ++){
    for(let y = 0; y < gridHeight; y++ ){

        if(numNeighbors(grid, x, y) <= 1){
          deadPlant = [x, y];
          setDeadPlants.push(deadPlant);
        }

        if(numNeighbors(grid, x, y) == 2 || numNeighbors(grid, x, y) == 3){
          // nothing happends
        }

        if (numNeighbors(grid, x ,y) == 3){
          newPlant = [x,y]
          setNewPlants.push(newPlant)
        }

        if(numNeighbors(grid, x, y) >= 4){
          deadPlant = [x, y];
          setDeadPlants.push(deadPlant);
        }
    }
  }

  for(let i = 0; i < setNewPlants.length; i ++){
    grid[setNewPlants[i][0]] [setNewPlants[i][1]] = new Plant();
  }

  for(let i = 0; i < setDeadPlants.length; i++){
    setDeadCell(grid, setDeadPlants[i][0], setDeadPlants[i][1]);
  }
}

function togglePause()
{
    if (!paused)
    {
        paused = true;

    } else if (paused)
    {
       paused= false;
    }
}

window.addEventListener('keydown', function (e) {
  var key = e.keyCode;
  if (key === 80)// p key
  {
    togglePause();
  }
});

function update() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(gridWidth, gridHeight,size);
  drawPlants();

  if(!paused){
    evolve(grid);
  }

  ctx.closePath();


  requestAnimationFrame(update)
  // setTimeout(update, 400);

}

update();
