const mezoEnum = {
  X: 0,
  Y: 1,
  Ures: 2,
};

let model = {
  tabla: [
    [mezoEnum.Ures, mezoEnum.Ures, mezoEnum.Ures],
    [mezoEnum.Ures, mezoEnum.Ures, mezoEnum.Ures],
    [mezoEnum.Ures, mezoEnum.Ures, mezoEnum.Ures],
  ],
  kovetkezo: mezoEnum.X,
};

function lepes(x, y) {
  if (model.tabla[x][y] === mezoEnum.Ures) {
    model.tabla[x][y] = model.kovetkezo;
    model.kovetkezo = model.kovetkezo === mezoEnum.X
      ? mezoEnum.Y
      : mezoEnum.X;
  }
}

function tabla(model) {
  const tabla = model.tabla;
  let tablaTorzs = '';
  for (let sor of tabla) {
    tablaTorzs += '<tr>';

    for (let oszlop of sor) {
      tablaTorzs += '<td>'

      if (oszlop === mezoEnum.X) {
        tablaTorzs += 'X';
      } else if (oszlop === mezoEnum.Y) {
        tablaTorzs += 'O';
      }

      tablaTorzs += '</td>';
    }

    tablaTorzs += '</tr>';
  }
  return `
    <table>
      <tbody>
        ${tablaTorzs}
      </tbody>
    </table>
  `;
}

const amoba = document.querySelector('#amoba');

function ujJatek() {
  // Modell kezdeti állapotba állítása
  model = {
    tabla: [
      [mezoEnum.Ures, mezoEnum.Ures, mezoEnum.Ures],
      [mezoEnum.Ures, mezoEnum.Ures, mezoEnum.Ures],
      [mezoEnum.Ures, mezoEnum.Ures, mezoEnum.Ures],
    ],
    kovetkezo: mezoEnum.X,
  };

  // renderelés
  amoba.innerHTML = tabla(model);
}

document.querySelector('#uj')
  .addEventListener('click', ujJatek);

delegate(
  document.querySelector('#amoba'),
  'click',
  'td',
  lepesHandler
);

function lepesHandler(event) {
  const koordinatak = xyCoord(event);
  lepes(koordinatak.x, koordinatak.y);
  amoba.innerHTML = tabla(model);
}

function xyCoord(event) {
  const cella = event.target;
  const oszlopok = event.target.parentElement.children;
  let y;
  for (let i = 0; i < oszlopok.length; ++i) {
    if (oszlopok[i] === cella) {
      y = i;
    }
  }
  const sor = event.target.parentElement;
  const sorok = sor.parentElement.children;
  let x;
  for (let i = 0; i < sorok.length; ++i) {
    if (sorok[i] === sor) {
      x = i;
    }
  }
  return { x: x, y: y };
}