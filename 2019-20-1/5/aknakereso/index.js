import { delegate, xyCoord } from './seged.js';
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

function handleMouseUp(e) {
    // 0 = left click
    if (e.button === 0) {
        checkField(e);
    // 2 = right click
    } else if (e.button === 2) {
        flagField(e);
    }
}

function checkField(e) {
    const coordinates = xyCoord(e);
    actualField.check(
        coordinates.x,
        coordinates.y
    );
    const html = render(actualField);
    aknakereso.innerHTML = html;
}

function flagField(e) {
    const coordinates = xyCoord(e);
    actualField.placeFlag(
        coordinates.x,
        coordinates.y
    );
    const html = render(actualField);
    aknakereso.innerHTML = html;
}

delegate(aknakereso, 'mouseup', 'td', handleMouseUp);

aknakereso.addEventListener(
    'contextmenu',
    e => e.preventDefault()
);

function saveGame() {
    actualField.save();
}

document.querySelector('#mentes')
    .addEventListener('click', saveGame);

function loadGame() {
    actualField.load();
    const html = render(actualField);
    aknakereso.innerHTML = html;
}

document.querySelector('#betoltes')
    .addEventListener('click', loadGame);
