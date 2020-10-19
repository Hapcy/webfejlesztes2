const addressInput = document.querySelector('#address');
const addressButton = document.querySelector('#addressButton');

const latInput = document.querySelector('#lat');
const lonInput = document.querySelector('#lon');
const coordButton = document.querySelector('#coordButton');

const weatherDiv = document.querySelector('#weather');

addressButton.addEventListener('click', getCoords);
coordButton.addEventListener('click', getWeather);

async function getCoords() {
  const address = addressInput.value;

  const resp = await fetch(`https://nominatim.openstreetmap.org/?q=${address}&format=json&limit=1`);
  const result = await resp.json();

  const lat = result[0].lat;
  const lon = result[0].lon;

  latInput.value = lat;
  lonInput.value = lon;
}

async function getWeather() {
  const lat = latInput.value;
  const lon = lonInput.value;

  const resp = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=a58e10ee2a5679d5629d56bc4d689512`);
  const result = await resp.json();

  const weather = JSON.stringify(result);

  weatherDiv.innerHTML = weather;
}
