const input = document.querySelector('#url');
const button = document.querySelector('button');
const image = document.querySelector('img');

// Eseménykezelő
function handleClick() {
  // 1. beolvasás
  const url = input.value;

  // 2. feldolgozás

  // 3. kiírás
  image.src = url;
}

button.addEventListener('click', handleClick);

