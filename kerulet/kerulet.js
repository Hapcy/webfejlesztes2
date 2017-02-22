//////////////////////////////
//Segédfüggvények

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

/////////////////////////////
//Elemek

const gomb = $('#szamolas');
const input = $('#sugar');

const output = $('#eredmeny');

////////////////////////////
//Kerületszámítás

function kerulet(sugar) {
  return 2 * sugar * Math.PI;
}

///////////////////////////
//HTML-generálók

function writeKerulet(kerulet) {
  return `<span>A kerület: ${kerulet}</span>`;
}

////////////////////////////
//Eseménykezelő

function calculateKerulet() {
  //beolvasás
  const sugar = parseInt(input.value);
  //feldolgozás
  const szamitottKerulet = kerulet(sugar);
  //kiiras
  output.innerHTML = writeKerulet(szamitottKerulet);
}

gomb.addEventListener('click', calculateKerulet);
