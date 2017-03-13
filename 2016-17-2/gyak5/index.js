function $(selector) {
  return document.querySelector(selector);
}

////////////////////////
//Elemek

const paragrafus = $('#paragrafus');
const gomb = $('#gomb');
const gomb2 = $('#gomb2');
const gomb3 = $('#gomb3');
const gomb4 = $('#gomb4');

///////////////////////
//Eseménykezelő

function setStyle() {
  paragrafus.style.backgroundColor = 'brown';
  paragrafus.style.border = '2px solid orange';
  paragrafus.style.color = 'white';
}

gomb.addEventListener('click', setStyle);

function setClass() {
  paragrafus.className = 'csunyaParagrafus';
}

gomb2.addEventListener('click', setClass);

function elrejt() {
  //console.log(paragrafus.classList);
  /*if (paragrafus.classList.contains('hidden')) {
    paragrafus.classList.remove('hidden')
  } else {
    paragrafus.classList.add('hidden');
  }*/
  paragrafus.classList.toggle('hidden');
}

gomb3.addEventListener('click', elrejt);

function elhalvanyit() {
  paragrafus.style.opacity = 0;
}

paragrafus.addEventListener('transitionend', elrejt);

gomb4.addEventListener('click', elhalvanyit);

///////////////////////////////////////////
// 4. feladat

//Elemek

const start = $('#start');
const ido = $('#ido');
const hatraCsik = $('#hatraCsik');

/*
  setTimeout - clearTimeout //Egyszer lefut adott idő múlva
  setInterval - clearInterval //Adott időnként lefut
  ---------------------------------------------------------
  requestAnimationFrame //Rajzoláskor
*/

function lejartIdo() {
  szinezdPirosra();
  stopVisszaszamlalas();
}

function szinezdPirosra() {
  $('body').style.backgroundColor = 'red';
}

function stopVisszaszamlalas() {
  clearInterval(visszaSzamlaloId);
}

let hatralevoIdo = 5;
let visszaSzamlaloId; 

function hatralevoIdoKiir() {
  if (hatralevoIdo !== 0) {
    hatralevoIdo--;
    ido.innerHTML = hatralevoIdo;
  } else {
    ido.innerHTML = '';
  }
}

function idozito() {
  var d = hatraCsik;
  var width = window.getComputedStyle(d).width;
  var w = parseInt(width.substring(0, width.length - 2));
  w = w - 100;
  d.style.width = `${w}px`;
  hatralevoIdoKiir();
}

function startIdozito() {
  visszaSzamlaloId = setInterval(idozito, 1000);
  const timeoutId = setTimeout(lejartIdo, 5000);
  hatraCsik.style.width = '500px';
  hatraCsik.style.backgroundColor = 'red';
  //clearTimeout(timeoutId);
}

start.addEventListener('click', startIdozito);
