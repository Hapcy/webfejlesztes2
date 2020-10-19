const canvas = document.querySelector('#jatek');
const ctx = canvas.getContext('2d');

const images = {
  bird: new Image(),
  background: new Image(),
  pipeNorth: new Image(),
  pipeSouth: new Image(),
};

const MAX_POINTS_KEY = 'flappybird-max';

let isGameOver = false;
let points = 0;
let maxPoints = parseInt(localStorage.getItem(MAX_POINTS_KEY)) || 0; // default operátor (veszélyes, ha számokat tárolunk, mert 0 is defaultolódik)

const pipes = [];
const GAP = 150; // px, felső és alsó oszlop közötti rés
const PIPE_DISTANCE = 300; // px, egymást követő pipes közötti távolság
const PIPE_SPEED = -200; // px, az pipes vízszintes sebessége

const background = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  image: images.background
};

const bird = {
  x: 50,
  y: canvas.height / 2,
  vy: 0, // px/s
  ay: 450, // px/s^2
  width: 38,
  height: 26,
  image: images.bird
};

let prevTime = performance.now();

function gameLoop(now = performance.now()) {
  const dt = (now - prevTime) / 1000;
  prevTime = now;

  update(dt);
  draw();

  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}
function update(dt) {
  // függőleges mozgás
  // Sebesség módosítása: dv = a * dt
  // Pozíció módosítása: ds = v * dt
  bird.vy += bird.ay * dt;
  bird.y += bird.vy * dt;

  // kis extra, hogy flappy birdösebben mozogjon a madár
  if (bird.vy > 0) {
    bird.ay = 600;
  } else {
    bird.ay = 450;
  }

  // nem mozdulhat ki a játékból
  if (bird.y < 0) {
    bird.y = 0;
  }
  if ((bird.y + bird.height) > canvas.height) {
    isGameOver = true;
    bird.y = canvas.height - bird.height;
  }

  // Oszloppár hozzáadása
  // Ha az utolsó oszlop a canvas jobb szélétől OSZLOP_TAVOLSAG-ra eltávolodott,
  // akkor új oszlop hozzáadása
  const lastPipe = pipes[pipes.length - 1];
  if (lastPipe.x + lastPipe.width < canvas.width - PIPE_DISTANCE) {
    newPipe();
  }

  // pipes mozgatása
  pipes.forEach((pipe) => {
    // oszlop mozgatása OSZLOP_SEBESSEG-gel
    pipe.x += PIPE_SPEED * dt;
  });

  // pipes törlése
  // Ha a tömb elején lévő oszlop elhagyta a canvast, akkor vedd ki az első kettőt
  const firstPipe = pipes[0];
  if (firstPipe.x + firstPipe.width < 0) {
    points += 1;
    if (points > maxPoints) {
      maxPoints = points;
      localStorage.setItem(MAX_POINTS_KEY, maxPoints);
    }

    pipes.shift();
    pipes.shift();
  }

  isGameOver = isGameOver || pipes.some((pipe) => collides(pipe, bird));
}
function draw() {
  drawObject(background);

  drawBird(bird);

  pipes.forEach((pipe) => {
    drawPipe(pipe);
  });

  ctx.fillStyle = 'red';
  ctx.font = '50px serif';
  ctx.fillText(`${points} / ${maxPoints}`, 10, canvas.height - 50);

  if (isGameOver) {
    ctx.fillStyle = 'red';
    ctx.font = '100px serif';
    ctx.fillText('Vége', 10, 100);
  }
}

function drawBird({ x, y, image }) {
  ctx.drawImage(image, x, y, image.width, image.height);
}

function drawPipe({ x, y, width, height, image }) {
  let pipeY;
  if (y === 0) {
    pipeY = height - image.height;
  } else {
    pipeY = y;
  }
  ctx.drawImage(image, x, pipeY, image.width, image.height);
}

function drawObject({ x, y, width, height, image }) {
  // ctx.fillRect(x, y, width, height);
  ctx.drawImage(image, x, y, width, height);
}

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    bird.vy = -200;
  }
});

function random(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}
function newPipe() {
  const h = random(10, canvas.height / 2);
  pipes.push(
    {
      x: canvas.width,
      y: 0,
      width: 52,
      height: h,
      image: images.pipeNorth,
    },
    {
      x: canvas.width,
      y: h + GAP,
      width: 52,
      height: canvas.height - GAP - h,
      image: images.pipeSouth,
    },
  );
}

function collides(a, b) {
  return !(
    b.y + b.height < a.y ||
    a.x + a.width < b.x ||
    a.y + a.height < b.y ||
    b.x + b.width < a.x
  );
}

// Start
images.bird.src = 'images/bird.png';
images.background.src = 'images/bg.png';
images.pipeNorth.src = 'images/pipeNorth.png';
images.pipeSouth.src = 'images/pipeSouth.png';

newPipe();
gameLoop();
