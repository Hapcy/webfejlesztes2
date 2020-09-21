const boardElement = document.querySelector('#board');

const model = {
  board: [
    [1, 2, 3, 4],
    [1, 2, 3, 4],
    [5, 6, 1, 8],
    [5, 6, 1, 8],
  ],
  foundFields: [],
  // 0: nincs aktuálisan kiválasztott elem
  // 1: 1 aktuálisan kiválasztott elem van
  // 2: 2 aktuálisan kiválasztott elem van
  state: 0,
  firstTurned: null,
  secondTurned: null,
};

boardElement.addEventListener('click', handleBoardClick);

function handleBoardClick(e) {
  // 1. hova kattintottunk
  if (!e.target.matches('td')) {
    return;
  }
  const clickedCoord = getXY(e.target);

  // 2. megmozdítjuk a modelt (állapotátmenet, ha kell)
  if (!validateMove(clickedCoord)) {
    return;
  }
  move(clickedCoord);

  // 3. kirajzolás
  drawBoard();
}

function validateMove(coord) {
  if (model.state === 2) {
    return true;
  }
  if (model.foundFields.some(field => field.x === coord.x && field.y === coord.y)) {
    return false;
  }
  if (model.firstTurned && model.firstTurned.x === coord.x && model.firstTurned.y === coord.y) {
    return false;
  }
  if (model.secondTurned && model.secondTurned.x === coord.x && model.secondTurned.y === coord.y) {
    return false;
  }
  return true;
}

function move(coord) {
  if (model.state === 2) {
    model.state = 0;
    const isPair = model.board[model.firstTurned.x][model.firstTurned.y] === model.board[model.secondTurned.x][model.secondTurned.y];
    if (isPair) {
      model.foundFields.push(model.firstTurned);
      model.foundFields.push(model.secondTurned);
    }
    model.firstTurned = null;
    model.secondTurned = null;
  } else if (model.state === 0) {
    model.state = 1;
    model.firstTurned = coord;
  } else if (model.state === 1) {
    model.state = 2;
    model.secondTurned = coord;
  }
}


function drawBoard() {
  const board = model.board;
  const foundFields = model.foundFields;
  const firstTurned = model.firstTurned;
  const secondTurned = model.secondTurned;
  let boardHtml = '';
  for (let i = 0; i < board.length; ++i) {
    // kinyitjuk az elemet
    boardHtml += '<tr>';
    // az elem tartalmát belerakjuk
    for (let j = 0; j < board[i].length; ++j) {
      boardHtml += '<td>';

      // Megtaláltuk-e
      const isCurrentFieldFound = foundFields.some(field => field.x === i && field.y === j);
      // Aktuálisan felfordítottuk-e elsőként
      const isFirstTurned = firstTurned !== null && firstTurned.x === i && firstTurned.y === j;
      // Aktuálisan felfordítottuk-e másodikként
      const isSecondTurned = secondTurned && secondTurned.x === i && secondTurned.y === j;
      if (isCurrentFieldFound || isFirstTurned || isSecondTurned) {
        // Ha fel van fordítva valamiért, akkor megjelenítjük a számot
        boardHtml += board[i][j];
      }

      boardHtml += '</td>';
    }
    // bezárjuk az elemet
    boardHtml += '</tr>';
  }
  boardElement.innerHTML = boardHtml;
}

drawBoard();

function getXY(td) {
  return {
    x: td.parentElement.rowIndex,
    y: td.cellIndex,
  };
}


