const szavak = ['tavern', 'school', 'man', 'dog', 'cucumber'];
const betuLista = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];
const maxTippekSzama = 9;

// MODEL

let model = {
    szo: [],
    tippek: 0,
    betuk: [],
    vege: false,
};

function ujJatek() {
    const randomSzoIndex = Math.floor(Math.random() * szavak.length);
    model = {
        szo: szavak[randomSzoIndex]
            .split('')
            .map(betu => ({ betu: betu, kitalalt: false })),
        tippek: 0,
        betuk: betuLista.map(betu => betu),
        vege: false,
        get nyert() {
            return this.vege && this.tippek !== maxTippekSzama;
        }
    };
}

function tipp(tippBetu) {
    const betuIndex = model.betuk.indexOf(tippBetu);
    if (betuIndex > -1 && !model.vege) {
        model.betuk.splice(betuIndex, 1);
        const talaltBetuk = model.szo
            .filter(betu => betu.betu === tippBetu);
        if (talaltBetuk.length > 0) {
            talaltBetuk
                .forEach(talaltBetu => talaltBetu.kitalalt = true);
        } else {
            model.tippek += 1;
        }
        model.vege = model.szo.every(betu => betu.kitalalt) || model.tippek === maxTippekSzama;
    }
}

// MEGJELENITES

const svgSorok = [
    '<line x1="0" y1="99%" x2="100%" y2="99%" stroke="black" />',
    '<line x1="20%" y1="99%" x2="20%" y2="5%" stroke="black" />',
    '<line x1="20%" y1="5%" x2="60%" y2="5%" stroke="black" />',
    '<line x1="60%" y1="5%" x2="60%" y2="20%" stroke="black" />',
    '<circle cx="60%" cy="30%" r="10%" />',
    '<line x1="60%" y1="30%" x2="60%" y2="70%" stroke="black" />',
    '<line x1="40%" y1="50%" x2="80%" y2="50%" stroke="black" />',
    '<line x1="60%" y1="70%" x2="50%" y2="90%" stroke="black" />',
    '<line x1="60%" y1="70%" x2="70%" y2="90%" stroke="black" />',
]

function draw() {
    // Betuk kirajzolasa
    const betuDiv = document.querySelector('#betuk');
    betuDiv.innerHTML = `<button>${model.betuk.join('</button><button>')}</button>`;

    // Szo kirajzolasa
    const szoDiv = document.querySelector('#szo');
    szoDiv.innerHTML = model.szo.map(
        betu => `<div class="betu">${ betu.kitalalt ? betu.betu : '' }</div>`
    ).join('');

    // Tippek szamanak kiirasa
    const tippekSzamaSpan = document.querySelector('#tippekSzama');
    tippekSzamaSpan.innerHTML = `${model.tippek} / ${maxTippekSzama}`

    // Akasztofa megrajzolasa
    const akasztofaDiv = document.querySelector('#akasztofa');
    akasztofaDiv.innerHTML = `
        <svg width="200px" height="200px">
            ${svgSorok.slice(0, model.tippek).join('')}
        </svg>
    `


    // Jatek vege uzenet
    if (model.vege) {
        const jatekVegeDiv = document.querySelector('#jatekVege');
        jatekVegeDiv.innerHTML = 'Vége a játéknak!' + (model.nyert ? 'Gratulálok!' : 'Vesztettél');
    }
}

// EVENTEK KEZELESE

function ujJatekHandler() {
    ujJatek();
    draw();
}

document.querySelector('#newGame').addEventListener('click', ujJatekHandler);

function handleTippClick(event) {
    const tippBetu = event.target.innerText;
    tipp(tippBetu);
    draw();
}

delegate(document.querySelector('#betuk'), 'click', 'button', handleTippClick);

function handleTippKeypress(event) {
    if (betuLista.includes(event.key)) {
        tipp(event.key);
        draw();
    }
}

document.addEventListener('keypress', handleTippKeypress);

