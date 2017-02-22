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

const gomb = $('#mutasd');
const input = $('#url');

const output = $('#eredmeny');

////////////////////////////
//Eseménykezelő

function showImage() {
  //beolvasás
  const url = input.value;
  //kiiras
  output.src = url;
}

gomb.addEventListener('click', showImage);
