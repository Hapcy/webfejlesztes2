//Globals

let width = 400;
let height = 600;

//Segédfüggvények

function $(sel) {
  return document.querySelector(sel);
}

function randomBetween(low, high) {
  const rand = Math.random();
  return low + Math.floor(rand * (high - low + 1));
}

function randomAroundZero(radius) {
  const rand = Math.random() - 0.5;
  return Math.floor(rand * (radius + 1));
}

//canvas init

const canvas = $('canvas');
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

//drawing - view

function drawBackground() {
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawSpaceship(spaceship) {
  ctx.save();

  let x = spaceship.x;
  let y = spaceship.y;

  ctx.translate(x, y);
  ctx.fillStyle = 'white';

  ctx.beginPath();
  ctx.moveTo(-5, 8);
  ctx.quadraticCurveTo(0, 12, 5, 8);
  ctx.lineTo(0, -7);
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}

function drawMeteor(meteor) {
  ctx.save();

  ctx.fillStyle = 'white';
  ctx.translate(meteor.x, meteor.y);

  ctx.beginPath();
  ctx.arc(0, 0, meteor.size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  ctx.restore();
}

function drawMeteors(meteors) {
  for (let i = 0; i < meteors.length; ++i) {
    drawMeteor(meteors[i]);
  }
}

function drawGame(state) {
  drawBackground();
  drawSpaceship(state.spaceship);
  drawMeteors(state.meteors);
  writeTime(state.startTime);
}

function writeTime(startTime) {
  $('#ido').innerHTML = Math.floor((Date.now() - startTime) / 1000);
}

//state - model

let state;

function createMeteor() {
  return {
    x: randomBetween(0, width),
    y: 0,
    vx: randomAroundZero(10),
    vy: randomBetween(5, 10),
    size: randomBetween(20, 40)
  };
}

function addMeteor(meteors) {
  if (Math.random() > 0.9) {
    meteors.push(createMeteor());
  }
}

function moveGameObject(obj) {
  obj.x += obj.vx;
  obj.y += obj.vy;
}

function meteorOutOfMap(meteor) {
  return meteor.x + meteor.size < 0 ||
         meteor.x - meteor.size > width ||
         meteor.y + meteor.size < 0 ||
         meteor.y - meteor.size > height;
}

function moveMeteor(meteor) {
  moveGameObject(meteor);
}

function moveMeteors(meteors) {
  let disappearedMeteors = [];
  for (let i = 0; i < meteors.length; ++i) {
    moveMeteor(meteors[i]);
    if (meteorOutOfMap(meteors[i])) {
      disappearedMeteors.push(i);
    }
  }
  for (let i = disappearedMeteors.length - 1; i >= 0; --i) {
    meteors.splice(disappearedMeteors[i], 1);
  }
}

function moveSpaceship(spaceship) {
  moveGameObject(spaceship);
  const x = spaceship.x;
  const y = spaceship.y;
  if (x < 0) {
    spaceship.x = 0;
  }
  if (x > width) {
    spaceship.x = width;
  }
  if (y < 0) {
    spaceship.y = 0;
  }
  if (y > height) {
    spaceship.y = height;
  }
}

function checkCollision(gameObj, meteors) {
  let collision = false;
  let i = 0;
  while (i < meteors.length && !collision) {
    const meteor = meteors[i];
    const xDistance = gameObj.x - meteor.x;
    const yDistance = gameObj.y - meteor.y;
    const xDSquare = xDistance * xDistance;
    const yDSquare = yDistance * yDistance;
    const distance = Math.sqrt(xDSquare + yDSquare);
    collision = distance < meteor.size;
    ++i;
  }
  return collision;
}

function stepGame(state) {
  moveMeteors(state.meteors);
  addMeteor(state.meteors);
  moveSpaceship(state.spaceship);
  state.gameOver = checkCollision(state.spaceship, state.meteors);
}

//eventListeners - bind

let buttonsPressed = {
  ArrowDown: 0,
  ArrowUp: 0,
  ArrowLeft: 0,
  ArrowRight: 0,
}

function checkButtonPress(e) {
  if (typeof buttonsPressed[e.code] === 'number') {
    buttonsPressed[e.code] = 1;
    e.preventDefault();
  }
}

function checkButtonRelease(e) {
  if (typeof buttonsPressed[e.code] === 'number') {
    buttonsPressed[e.code] = 0;
    e.preventDefault();
  }
}

document.addEventListener('keydown', checkButtonPress);
document.addEventListener('keyup', checkButtonRelease);

function bindSpeed(spaceship, buttonsPressed) {
  spaceship.vy = spaceship.vx = 0;
  if (buttonsPressed.ArrowDown === 1) {
    spaceship.vy += 3;
  }
  if (buttonsPressed.ArrowUp === 1) {
    spaceship.vy -= 3;
  }
  if (buttonsPressed.ArrowLeft === 1) {
    spaceship.vx -= 3;
  }
  if (buttonsPressed.ArrowRight === 1) {
    spaceship.vx += 3;
  }
}

//execute

function loop() {
  bindSpeed(state.spaceship, buttonsPressed);
  stepGame(state);
  drawGame(state);
  if (state.gameOver) {
    init();
  } else {
    requestAnimationFrame(loop);
  }
}

function init() {
  state = {
    spaceship: {
      x: width/2,
      y: height,
      vx: 0,
      vy: 0,
    },
    meteors: [],
    gameOver: false,
    startTime: Date.now(),
  }
  requestAnimationFrame(loop);
}

init();