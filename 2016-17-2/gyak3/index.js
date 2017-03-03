//Segédfüggvények
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function delegate(parentSelector, type, selector, fn) {

  function delegatedFunction(e) {
    var target = e.target;

    while (target && !target.matches(selector)) {
      if (target === parent) {
        return;
      }
      target = target.parentNode;
    }
    e.delegatedTarget = target;
    return fn(e);
    // vagy
    return fn.call(target, e);
  }

  var parent = document.querySelector(parentSelector);
  parent.addEventListener(type, delegatedFunction, false);
}

// Feladatok

function esemenyObjektumKonzolra(e) {
  console.log(e);
  console.log(e.type);
  const pressedButton = e.button;
  if (pressedButton === 0) {
    console.log('bal gomb');
  } else if (pressedButton === 1) {
    console.log('középső gomb');
  } else if (pressedButton === 2) {
    console.log('jobb gomb');
  }
  console.log(e.screenX, e.screenY);
  console.log(e.target);
  if (e.target.matches('span')) {
    console.log(e.target.innerHTML);
  }
  e.preventDefault();
}

$('#szoveg').addEventListener('mousedown', esemenyObjektumKonzolra);

///////////////////////////////////
//4.feladat

//a)
function csakSzamEngedo(e) {
  console.log(e);
  if (e.keyCode < 48 || e.keyCode > 57) {
    e.preventDefault();
  }
}

$('#csakszam').addEventListener('keydown', csakSzamEngedo);

//b)

//naiv
/*
const szamMezok = $$('.szam');

for (let i = 0; i<szamMezok.length; ++i) {
  szamMezok[i].addEventListener('keydown', csakSzamEngedo);
}
*/

//jobb

function csakSzamGlobalis(e) {
  //console.log(e);
  if (e.target.matches('.szam')) {
    csakSzamEngedo(e);
  }
}

document.addEventListener('keydown', csakSzamGlobalis);

////////////////////////////////////////
//5.feladat

//hogyan keresünk stringben
function tartalmazEEltet(szoveg) {
  return szoveg.indexOf('elte') > -1;
}

//esemenykezelo
function preventIfNotELTE(e) {
  if (e.target.matches('a')) {
    if (!tartalmazEEltet(e.target.href)) {
      e.preventDefault();
    }
  }
}

document.addEventListener('click', preventIfNotELTE);
