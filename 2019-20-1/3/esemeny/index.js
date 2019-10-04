// const $ = document.querySelector;
// const $$ = document.querySelectorAll;

const paragraph = document.querySelector('p');
// console.log(paragraph);

paragraph.addEventListener('click', clickListener);

function clickListener(event) {
    // az eseményt jelző objektum
    console.log(this);
    // az esemény típusa
    console.log(event.type);
    // lenyomott egérgomb
    console.log(event.button);
    // egér pozíciója
    console.log(event.clientX, event.clientY);
    // eseményt eredetileg jelző objektum
    console.log(event.target);
    if (event.target.innerText === 'libero') { 
        // megakadályozza a default működést
        // (pl.: navigáció linkeknél)
        event.preventDefault();
    }
}
