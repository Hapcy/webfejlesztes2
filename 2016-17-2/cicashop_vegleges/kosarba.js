//segédfüggvények

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// Elemek

const vasarlasForm = $('#vasarlasForm');
const checkboxok = $$('input[name=vasaroltCicak]');
const kosarTartalom = $('#kosarTartalom');
const rendelesLink = $('#rendelesLink');
const hibalista = $('#hibalista');

// Logika

function vasarlasHandler(e) {
  e.preventDefault();
  const vasarlandoCicak = [];
  for (let i = 0; i < checkboxok.length; ++i) {
    if (checkboxok[i].checked) {
      vasarlandoCicak.push(checkboxok[i].value);
    }
  }
  //vasarlandoCicak[]=Hogolyo&vasarlandoCicak[]=Hercegno
  //const elofeldolgozottCicak = vasarlandoCicak.map(cicanev => `vasarlandoCicak[]=${cicanev}`);

  const elofeldolgozottCicak = [];
  for (let i = 0;i < vasarlandoCicak.length; ++i) {
    const cicanev = vasarlandoCicak[i];
    elofeldolgozottCicak.push(`vasaroltCicak[]=${cicanev}`);
  }

  const kuldendoUzenet = elofeldolgozottCicak.join('&');
  
  if (kuldendoUzenet.length !== 0) {
    hibalista.innerHTML = '';
    ajax({
      mod: 'POST',
      url: 'kosarba.php',
      postadat: kuldendoUzenet,
      siker: kosarFrissites
    });
  } else {
    hibalista.innerHTML = '<p>Nem választottál cicát!</p>';
  }

}

function kosarFrissites(xhr, valaszString) {
  const valasz = JSON.parse(valaszString);

  //lista kirajzolása

  const cicaLista = valasz.join('</li><li>');
  const html = '<ul><li>' + cicaLista + '</li></ul>'

  kosarTartalom.innerHTML = html;

  //link megjelenítése

  rendelesLink.style = "";

  //checkboxok ürítése

  vasarlasForm.reset();
}

// Eseménykezelő

vasarlasForm.addEventListener('submit', vasarlasHandler);

