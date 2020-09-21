const hellovilagok = document.querySelector('#hellovilagok');
const input = document.querySelector('input');
const hello = document.querySelector('button');

function handleHello() {
  // beolvasás
  const darab = parseInt(input.value);
  // feldolgozás
  let udvozlet = '';
  for (let i = 1; i <= darab; ++i) {
    udvozlet += `<div style="font-size: ${i * 12}px">Helló világ</div>`;
  }
  // kiiras
  hellovilagok.innerHTML = udvozlet;
}

hello.addEventListener('click', handleHello);
