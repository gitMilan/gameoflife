
function getMousePos(canvas, evt) {

  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('click', function(evt) {
  let mousePos = getMousePos(canvas, evt);
  placePlant(mousePos)

  // mouse = getMousePos(canvas, evt);
  // console.log(mousePos);
});


function placePlant(mousePos){
  let gridPosX = Math.floor(mousePos.x / size);
  let gridPosY = Math.floor(mousePos.y / size);

  if(!isLiveCell(grid, gridPosX, gridPosY)){
    grid[gridPosX][gridPosY] = new Plant();
  } else{
    setDeadCell(grid, gridPosX, gridPosY);
  };


}
