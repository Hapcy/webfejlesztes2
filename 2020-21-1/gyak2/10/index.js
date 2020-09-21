const raiseButton = document.querySelector('#raise');
const lowerButton = document.querySelector('#lower');
const current = document.querySelector('#current');
let value = 0;
const maximum = 15;
const minimum = -15;
writeValue();

function writeValue() {
  current.value = value;
  raiseButton.toggleAttribute('disabled', value === maximum);
  lowerButton.toggleAttribute('disabled', value === minimum);
}

function raise() {
  value += 1;
  writeValue();
}

function lower() {
  value -= 1;
  writeValue();
}

raiseButton.addEventListener('click', raise);
lowerButton.addEventListener('click', lower);
