// 12. feladat

// számlálás
const szamok = [0, 1, 2, 3, 4, 5, 11];
let parosSzamokSzama = 0;
for (let i = 0; i < szamok.length; ++i) {
  if (szamok[i] % 2 === 0) {
    parosSzamokSzama++;
  }
}
console.log(parosSzamokSzama);

// kiválogatás
let parosSzamok = [];
for (let i = 0; i < szamok.length; ++i) {
  if (szamok[i] % 2 === 0) {
    parosSzamok.push(szamok[i]);
  }
}
console.log(parosSzamok.length);

let paratlanSzamok = [];
for (let i = 0; i < szamok.length; ++i) {
  if (szamok[i] % 2 !== 0) {
    paratlanSzamok.push(szamok[i]);
  }
}
console.log(paratlanSzamok.length);

function kivalogatas(tomb, T) {
  let joElemek = [];
  for (let i = 0; i < tomb.length; ++i) {
    if (T(tomb[i])) {
      joElemek.push(tomb[i]);
    }
  }
  return joElemek;
}

function isParos(x) {
  return x % 2 === 0;
}

const parosSzamok2 = kivalogatas(szamok, isParos);
console.log(parosSzamok2);

const parosSzamok3 = szamok.filter(isParos);
console.log(parosSzamok3);

// kiválogatás - filter
// linker - find / findIndex
// másolás - map
// optimista eldöntés - every
// pesszimista eldöntés - some
// összegzés - reduce

const pozitivSzamok = szamok.filter(szam => szam > 0);
console.log(pozitivSzamok);

const szamokOsszege = szamok.reduce((osszeg, szam) => osszeg + szam, 0);
console.log(szamokOsszege);
