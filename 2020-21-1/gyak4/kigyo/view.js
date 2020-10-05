function drawBoard(board, gameDiv) {
  // létrehozunk egy table dom objektumot
  const table = document.createElement('table');

  // összerakjuk táblázatot stringkéntű
  let tableBodyString = '';
  for (let i = 0; i < board.height; ++i) {
    tableBodyString += '<tr>';

    for (let j = 0; j < board.width; ++j) {
      tableBodyString += '<td></td>';
    }

    tableBodyString += '</tr>';
  }

  // beállítjuk a table objektum innerhtml-jéne a stringet
  table.innerHTML = tableBodyString;

  // kígyót illetve az ételt a table rows/cells-én keresztül classokkal beállítjuk
  togglePositionClass(table, board.food.position, 'food');
  togglePositionClass(table, board.snake.head, 'snake__head');
  board.snake.tail.forEach(tailPosition => {
    togglePositionClass(table, tailPosition, 'snake__body');
  });

  // belerajzoljuk a gameDiv-be a táblázatot
  gameDiv.innerHTML = '';
  gameDiv.insertAdjacentElement('afterbegin', table);
}

function togglePositionClass(table, position, klass) {
  const row = table.rows[position.y];
  const cell = row.cells[position.x];
  cell.classList.toggle(klass, true);
}
