//Segédfüggvény

function $(selector) {
  return document.querySelector(selector);
}

function xyKoord(td) {
  var x =  td.cellIndex;
  var tr = td.parentNode;
  var y =  tr.sectionRowIndex;
  return {
    x: x,
    y: y
  };
}

function randomSzam(min, max) {
  const random = Math.random();
  const egesz = Math.round((max - min) * random);
  return min + egesz;
}

////////////////////////
//Üzleti logika

let jatekTer;
let lepesSzam;

function init(tablaMeret) {
  jatekTer = generateTableModel(tablaMeret);
  lepesSzam = 0;
  elhelyezKincs(tablaMeret);
  kincsMezo.innerHTML = generateTable(tablaMeret);
}

function generateTableModel(tablaMeret) {
  let tabla = [];
  for (let i = 0; i< tablaMeret; ++i) {
    const sor = [];
    for (let j =0; j < tablaMeret; ++j) {
      sor.push(0);
    }
    tabla.push(sor);
  }
  return tabla;
}

function elhelyezKincs(tablaMeret) {
  const x = randomSzam(0, tablaMeret - 1);
  const y = randomSzam(0, tablaMeret - 1);
  jatekTer[x][y] = 1;
}

function kincsE(x, y) {
  return jatekTer[x][y] === 1;
}

/////////////////////////
//Elemek

const kincsMezo = $('#kincsMezo');

////////////////////////
//Eseménykezelő

function kincsMezoKatt(e) {
  const cella = e.target;
  if (e.target.matches('td')) {
    if (e.target.innerHTML === '') {
      lepesSzam++;
    }
    const koordinatak = xyKoord(cella);
    const talalat = kincsE(koordinatak.y, koordinatak.x);
    if (talalat) {
      e.target.innerHTML = 'K';
    } else {
      e.target.innerHTML = 'O';
    }
  }
}

kincsMezo.addEventListener('click', kincsMezoKatt);

////////////////////////
//HTML generáló

function generateTable(tablaMeret) {
  let tabla = '';
  for (let i = 0; i< tablaMeret; ++i) {
    let sor = '';
    for (let j =0; j < tablaMeret; ++j) {
      sor += '<td></td>';
    }
    tabla += '<tr>' + sor + '</tr>';
  }
  return tabla;
}