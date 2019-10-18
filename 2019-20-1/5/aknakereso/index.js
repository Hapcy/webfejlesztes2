import { delegate } from './seged.js';
import { Field } from './field.js';
import { render } from './render.js';

const aknakereso = document
    .querySelector('#aknakereso');
let actualField;

function newGame() {
    actualField = new Field(8, 15);
    const html = render(actualField);
    aknakereso.innerHTML = html;
}

document.querySelector('#uj')
    .addEventListener('click', newGame);

