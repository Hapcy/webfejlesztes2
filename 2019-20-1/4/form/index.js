function ellenorzes(event) {
    const nevValid = nevEllenorzes();
    const erdeklodesiTeruletValid = erdeklodesiTeruletEllenorzes();
    const korValid = eletkorEllenorzes();

    if (nevValid && erdeklodesiTeruletValid && korValid) {
    } else {
        event.preventDefault();
        // TODO: hibak kiirasa
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


document.querySelector('#kuldes')
    .addEventListener('click', ellenorzes);