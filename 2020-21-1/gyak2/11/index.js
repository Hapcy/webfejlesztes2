const miInput = document.querySelector('#mi');
const mikorInput = document.querySelector('#mikor');
const holInput = document.querySelector('#hol');
const beszur = document.querySelector('button');

const esemenyekTable = document.querySelector('#esemenyek');

const esemenyek = [];
// {
//   mi: 'valami',
//   mikor: 'valamikor',
//   hol: 'valahol',
// }

function handleBeszur() {
  // 1. beolvasás
  const ujEsemeny = {
    mi: miInput.value,
    mikor: mikorInput.value,
    hol: holInput.value,
  };

  // 2. feldolgozás
  esemenyek.push(ujEsemeny);

  // 3. kiírás
  // append/modify stratégia
  esemenyekTable.insertAdjacentHTML('beforeend', generateEsemenyRow(ujEsemeny));


  // csere stratégia
  // esemenyekTable.innerHTML = esemenyek
  //   .map((esemeny) => generateEsemenyRow(esemeny))
  //   .join('');

  miInput.value = '';
  mikorInput.value = '';
  holInput.value = '';
}

beszur.addEventListener('click', handleBeszur);

function generateEsemenyRow(esemeny) {
  return `
    <tr>
      <td>${esemeny.mi}</td>
      <td>${esemeny.mikor}</td>
      <td>${esemeny.hol}</td>
    </tr>
  `;
}
