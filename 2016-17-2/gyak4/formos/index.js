//Segédfüggvények

function $(selector) {
  return document.querySelector(selector);
}

//////////////////////////////
//Elemek

//form
const form = $('#form');
//mezok
const nev = $('#nev');
const kor = $('#kor');
const erdeklodes = $('#erd');
//hibak
const hibaListaElem = $('#hibak');

//////////////////////////////
//Feldolgozó

function csakSzamokE(input) {
  return !isNaN(parseInt(input));
}

function uresE(input) {
  return input === '';
}

//////////////////////////////
//HTML-generálók

function hibaGenerator(hibaUzenet) {
  return `<li>${hibaUzenet}</li>`
}

function hibaListaGenerator(hibaUzenetek) {
  let hibaLista = '';
  for(let i = 0; i < hibaUzenetek.length; ++i) {
    hibaLista += hibaGenerator(hibaUzenetek[i]);
  }
  return hibaLista;
}

//////////////////////////////
//Eseménykezelő

function validator(e) {

  let hibak = [];
  if (uresE(nev.value)) {
    hibak.push('Hiányzik a név!');
  }
  if (!csakSzamokE(kor.value)) {
    hibak.push('Be vagy tépve!');
  }
  if (uresE(erdeklodes.value)) {
    hibak.push('Adj meg egy érdeklődést!');
  }

  if (hibak.length === 0) {
    hibaListaElem.innerHTML = '';
    console.log('jo');
  } else {
    const hibaLista = hibaListaGenerator(hibak);
    hibaListaElem.innerHTML = hibaLista;
    //console.log(hibaLista);
    console.log('nem jo');
  }
  e.preventDefault();
}

form.addEventListener('submit', validator);
