const source = document.querySelector('#source');
const destination = document.querySelector('#destination');
const copy = document.querySelector('button');

function handleCopy() {
  destination.value = source.value;
}

copy.addEventListener('click', handleCopy);
