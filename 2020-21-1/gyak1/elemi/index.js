// 1. feladat

console.log('Helló világ');
console.error('Hiba');
// alert('Helló világ');

// const a = prompt('Írj be egy számot');
// console.log(a);

// 9. feladat

function faktorialis(n) {
  // const fakt = 1;
  let fakt = 1;
  for (let i = 1; i <= n; ++i) {
    fakt *= i;
  }
  return fakt;
}

console.log(faktorialis(5));

function faktorialisRekurziv(n) {
  if (n === 1) {
    return 1;
  }
  return n * faktorialisRekurziv(n - 1);
}

console.log(faktorialisRekurziv(1));
