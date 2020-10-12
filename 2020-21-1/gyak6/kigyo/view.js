function drawBoard(board, ctx, canvas) {
  const width = canvas.width;
  const cellWidth = canvas.width / board.width;
  const height = canvas.height;
  const cellHeight = canvas.height / board.height;

  // letöröljük a canvast
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);


  // rajzoljuk fel az objektumokat
  drawCell(board.food.position, ctx, 'red', cellWidth, cellHeight);
  drawCell(board.snake.head, ctx, 'green', cellWidth, cellHeight);
  board.snake.tail.forEach(tailPosition => {
    drawCell(tailPosition, ctx, 'lightgreen', cellWidth, cellHeight);
  });
}

function drawCell(position, ctx, color, cellWidth, cellHeight) {
  ctx.fillStyle = color;
  ctx.fillRect(position.x * cellWidth, position.y * cellHeight, cellWidth, cellHeight);
}

// function drawBoard(board, ctx) {
//   // létrehozunk egy table dom objektumot
//   const table = document.createElement('table');

//   // összerakjuk táblázatot stringkéntű
//   let tableBodyString = '';
//   for (let i = 0; i < board.height; ++i) {
//     tableBodyString += '<tr>';

//     for (let j = 0; j < board.width; ++j) {
//       tableBodyString += '<td></td>';
//     }

//     tableBodyString += '</tr>';
//   }

//   // beállítjuk a table objektum innerhtml-jéne a stringet
//   table.innerHTML = tableBodyString;

//   // kígyót illetve az ételt a table rows/cells-én keresztül classokkal beállítjuk
//   togglePositionClass(table, board.food.position, 'food');
//   togglePositionClass(table, board.snake.head, 'snake__head');
//   board.snake.tail.forEach(tailPosition => {
//     togglePositionClass(table, tailPosition, 'snake__body');
//   });

//   // belerajzoljuk a gameDiv-be a táblázatot
//   gameDiv.innerHTML = '';
//   gameDiv.insertAdjacentElement('afterbegin', table);
// }

// function togglePositionClass(table, position, klass) {
//   const row = table.rows[position.y];
//   const cell = row.cells[position.x];
//   cell.classList.toggle(klass, true);
// }
