const latogatottMezo = {
    nev: false,
    erd: false,
    kor: false,
}
/*
const latogatottMezo = new Map();
latogatottMezo.set('nev', false);
*/

function ellenorzes(event) {
    const nevValid = nevEllenorzes();
    const erdeklodesiTeruletValid = erdeklodesiTeruletEllenorzes();
    const korValid = eletkorEllenorzes();

    if (nevValid && erdeklodesiTeruletValid && korValid) {
    } else {
        if (event) {
            event.preventDefault();
        }
        hibakKiirasa({
            nevUres: !nevValid,
            nincsErdeklodesiTerulet: !erdeklodesiTeruletValid,
            korNemSzamokbolAll: !korValid,
        });
    }
}

function nevEllenorzes() {
    const nevInput = document.querySelector('#nev');
    const nev = nevInput.value;
    return nev.length > 0;
}

function erdeklodesiTeruletEllenorzes() {
    const erdeklodesiTeruletSelect = document.querySelector('#erd');
    const erdeklodesiTerulet = erdeklodesiTeruletSelect.value;
    return erdeklodesiTerulet.length > 0;
}

function eletkorEllenorzes() {
    const eletkorInput = document.querySelector('#kor');
    const eletkor = eletkorInput.value;
    return /^\d*$/.test(eletkor);
}

function hibakKiirasa(hibak) {
    let hibakHtml = '';
    if (hibak.nevUres && latogatottMezo.nev) {
    //                   latogatottMezo.get('nev')
        hibakHtml += '<li>Add meg a neved!</li>'
    }
    if (hibak.nincsErdeklodesiTerulet && latogatottMezo.erd) {
        hibakHtml += '<li>Add meg az érdeklődési területed!</li>'
    }
    if (hibak.korNemSzamokbolAll && latogatottMezo.kor) {
        hibakHtml += '<li>A kor csak számokból állhat!</li>'
    }
    document.querySelector('#hibak').innerHTML = hibakHtml;
}

function submit(event) {
    latogatottMezo.erd = true;
    latogatottMezo.kor = true;
    latogatottMezo.nev = true;
    ellenorzes(event);
}

function mezoElhagyas(event) {
    const elhagyottMezoId = event.target.id;
    latogatottMezo[elhagyottMezoId] = true;
    // latogatottMezo.set(elhagyottMezoId, true);
    ellenorzes();
}

document.querySelector('#kuldes')
    .addEventListener('click', submit);

const inputok = document.querySelectorAll('input');
for (let i = 0; i < inputok.length; ++i) {
    inputok[i].addEventListener('blur', mezoElhagyas);
}
document.querySelector('select').addEventListener('blur', mezoElhagyas);

