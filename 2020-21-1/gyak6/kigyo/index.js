const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const board = new Board(5, 5);
board.start();

drawBoard(board, ctx, canvas);

let newDirection;
// gomblenyomásra megváltoztatni a kígyó irányát
function handleKeyDown(e) {
  switch (e.key) {
    case 'ArrowDown': {
      newDirection = { x: 0, y: 1 };
      break;
    }
    case 'ArrowUp': {
      newDirection = { x: 0, y: -1 };
      break;
    }
    case 'ArrowLeft': {
      newDirection = { x: -1, y: 0 };
      break;
    }
    case 'ArrowRight': {
      newDirection = { x: 1, y: 0 };
      break;
    }
  }
}
document.addEventListener('keydown', handleKeyDown);

// léptetni a játékot adott időközönként
function start() {
  setTimeout(() => tick(), 500);
}

function tick() {
  if (newDirection) {
    board.changeSnakeDirection(newDirection);
    newDirection = null;
  }
  
  board.step();

  if (board.gameOver) {
    return;
  }

  drawBoard(board, ctx, canvas);

  setTimeout(() => tick(), 500);
}

start();
