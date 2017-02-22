//////////////////////////////
//Segédfüggvények

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

/////////////////////////////

const HWC = document.getElementById('helloWorldContainer');
const gomb = $('#gomb');
const inputMezo = $('#helloWorldForm > input');

///////////////////////////
// HTML generálók

function helloWorldGenerator(size) {
  return `<div style="font-size: ${size}px">Hello World!</div>`;
}

function helloWorldsGenerator(hwDarab) {
  let helloWorlds = '';
  for (let i = 0; i < hwDarab; ++i) {
    helloWorlds += helloWorldGenerator(i);
  }
  return helloWorlds;
}

///////////////////////////
//Eseménykezelők

function generateHelloWorlds() {
  //beolvasás
  const darabAsString = inputMezo.value;
  //feldolgozás
  const darab = parseInt(darabAsString);
  //kiírás
  HWC.innerHTML = helloWorldsGenerator(darab);
}

gomb.addEventListener('click', generateHelloWorlds, false);
