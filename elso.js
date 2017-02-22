/*
console.log("Hello world!");

alert("Hello world!");

for(var i = 0; i < 10; ++i) {
  document.writeln("Hello world!");
}

var nev = prompt("Ird be a nevedet!");

console.log(`Hello ${nev}`);
*/
/*
var a = prompt('a oldal hossza:');
var b = prompt('b oldal hossza:');
var c = prompt('c oldal hossza:');

var szamA = parseInt(a);
var szamB = parseInt(b);
var szamC = parseInt(c);

if (
  szamA + szamB > szamC &&
  szamA + szamC > szamB &&
  szamB + szamC > szamA
  ) {
  console.log("Lehet háromszög");
} else {
  console.log("Nem lehet háromszög");
}
*/

/*
function melyikSiknegyed(x, y) {
  if (x > 0 && y > 0) {
    return 1;
  } else if (x < 0 && y > 0) {
    return 2;
  } else if (x < 0 && y < 0) {
    return 3;
  } else if (x > 0 && y < 0) {
    return 4;
  } else {
    return 0;
  }
}

function kiirMelyikSiknegyed(siknegyedSzam) {
  switch(siknegyedSzam) {
    case 1:
      console.log('elso siknegyed');
      break;
    case 2:
      console.log('masodik siknegyed');
      break;
    default:
      console.log('mas');
  }
}

kiirMelyikSiknegyed(melyikSiknegyed(1, 4));
*/

/*
function faktorialis(n) {
  var ertek = 1;
  for (var i = 2; i <= n; ++i) {
    ertek *= i;
  }
  return ertek;
}

console.log(faktorialis(5));

function faktorialisRek(n) {
  if (n > 2) {
    return faktorialisRek(n-1) * n;
  } else {
    return n;
  }
}

console.log(faktorialisRek(5));

function parosDarab(tomb) {
  var db = 0;
  for (var i = 0; i < tomb.length; ++i) {
    if (tomb[i] % 2 === 0) {
      ++db;
    }
  }
  return db;
}

console.log(parosDarab([4,3,7]));

function parosKivalogatas(tomb) {
  var parosok = [];
  for (var i = 0; i < tomb.length; ++i) {
    if (tomb[i] % 2 === 0) {
      parosok.push(tomb[i]);
    }
  }
  return parosok;
}

console.log(parosKivalogatas([4,3,7]));

function linearSearchNegative(tomb) {
  var van = false;
  var ind;
  var i = 0;
  while (i < tomb.length && !van) {
    van = tomb[i] < 0;
    ind = i;
    ++i;
  }
  if (van) {
    return i - 1;
  } else {
    return -1;
  }
}

function isNegative(x) {
  return x < 0;
}

var negatives = [-5, 0, 1, 100, -2].filter(isNegative);
console.log(negatives);
*/
//var negatives = [-5, 0, 1, -1].filter(x => x < 0);

function konyvCsinalo(author, title, YoP, publisher, ISBN) {
  return {
    author,
    title,
    yearOfPublish: YoP,
    publisher,
    ISBN,
  };
}

var eragon1 = konyvCsinalo("Christopher Paolini", "Eragon", 2002,
  "Paolini LLC", "0-375-82668-8");

var eragon2 = {
  author: "Christopher Paolini",
  title: "Eragon",
  yearOfPublish: 2002,
  publisher: "Paolini LLC",
  ISBN: "0-375-82668-8",
}

console.log(eragon1, eragon2);



//var konyvek = [eragon];

