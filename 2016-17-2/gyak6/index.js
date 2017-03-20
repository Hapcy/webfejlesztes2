//Utility

function randomBetween(low, high) {
  const rand = Math.random();
  return low + Math.floor(rand * (high - low + 1));
}

//Initialize the canvas

const width = 400;
const height = 600;

const spaceshipCanvas = document.querySelector('#spaceship');
spaceshipCanvas.width = width;
spaceshipCanvas.height = height;
const ctx = spaceshipCanvas.getContext('2d');

//State

let state;

function moveSpaceship(spaceship) {
  spaceship.x += spaceship.vx;
  spaceship.y += spaceship.vy;
  if (spaceship.x < 0) {
    spaceship.x = 0;
  }
  if (spaceship.x > width) {
    spaceship.x = width;
  }
  if (spaceship.y < 0) {
    spaceship.y = 0;
  }
  if (spaceship.y > height) {
    spaceship.y = height;
  }
}

function createMeteor() {
  return {
    x: randomBetween(0, width),
    y: 0,
    vx: randomBetween(0,3),
    vy: randomBetween(1, 7)
  };
}

function moveMeteor(meteor) {
  meteor.x += meteor.vx;
  meteor.y += meteor.vy;
  if (meteor.x < 0 || meteor.x > width || meteor.y > height) {
    state.meteors.splice(state.meteors.indexOf(meteor), 1);
  }
}

function moveShot(shot) {
  shot.x += shot.vx;
  shot.y += shot.vy;
  if (shot.x < 0 || shot.x > width || shot.y < 0) {
    state.shots.splice(state.shots.indexOf(shot), 1);
  }
}

function meteorHitsSpaceship(meteor, spaceship) {
  if (meteor.x - 20 < spaceship.x && meteor.x + 20 > spaceship.x
   && meteor.y - 20 < spaceship.y && meteor.y + 20 > spaceship.y) {
     alert('Game over');
     init();
   }
}

function checkGameOver(state) {
  for(let i = 0; i < state.meteors.length; ++i) {
    meteorHitsSpaceship(state.meteors[i], state.spaceship);
  }
}

function checkShotMeteors(meteors, shots) {
  hits = [];
  for (meteor of meteors) {
    for (shot of shots) {
      if (meteor.x - 20 < shot.x && meteor.x + 20 > shot.x
      && meteor.y - 20 < shot.y && meteor.y + 20 > shot.y) {
        hits.push({
          meteor, shot,
        })
      }
    }
  }
  for (hit of hits) {
    shots.splice(shots.indexOf(hit.shot), 1);
    meteors.splice(meteors.indexOf(hit.meteor), 1);
  }
}

function stepState(state) {
  if (Math.random() > 0.9) {
    state.meteors.push(createMeteor());
  }
  moveSpaceship(state.spaceship);
  for(let i = 0; i < state.meteors.length; ++i) {
    moveMeteor(state.meteors[i]);
  }
  for(let i = 0; i < state.shots.length; ++i) {
    moveShot(state.shots[i]);
  }
  checkShotMeteors(state.meteors, state.shots);
  checkGameOver(state);
}

//Drawing


function drawSpaceship(spaceship) {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(spaceship.x-5, spaceship.y);
  ctx.quadraticCurveTo(spaceship.x, spaceship.y + 10, spaceship.x + 5, spaceship.y);
  ctx.lineTo(spaceship.x, spaceship.y - 20);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawMeteors(meteors) {
  ctx.save();
  for (let i = 0; i < meteors.length; ++i) {
    drawMeteor(meteors[i]);
  }
  ctx.restore();
}

function drawMeteor(meteor) {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.translate(meteor.x, meteor.y);
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawShots(shots) {
  ctx.save();
  for (let i = 0; i < shots.length; ++i) {
    drawShot(shots[i]);
  }
  ctx.restore();
}

function drawShot(shot) {
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.translate(shot.x, shot.y);
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawBackground() {
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,width,height);
  ctx.restore();
}

function drawState(state) {
  drawBackground();
  drawSpaceship(state.spaceship);
  drawMeteors(state.meteors);
  drawShots(state.shots);
}

//Handle movement

let pressedKeys = {
  'ArrowRight': 0,
  'ArrowLeft': 0,
  'ArrowUp': 0,
  'ArrowDown': 0,
  'Space': 0,
};

function stopMoving(e) {
  pressedKeys[e.code] = 0;
  e.preventDefault();
} 

function startMoving(e) {
  pressedKeys[e.code] = 1;
  e.preventDefault();
}

document.addEventListener('keydown', startMoving);
document.addEventListener('keyup', stopMoving);

//Binding model and view

function bindUIToModel(state) {
  setVelocity(state.spaceship);
  addShoot(state);
}

function setVelocity(spaceship) {
  spaceship.vx = spaceship.vy = 0;
  if (pressedKeys.ArrowUp) {
    spaceship.vy -= 3;
  }
  if (pressedKeys.ArrowDown) {
    spaceship.vy += 3;
  }
  if (pressedKeys.ArrowLeft) {
    spaceship.vx -= 3;
  }
  if (pressedKeys.ArrowRight) {
    spaceship.vx += 3;
  }
}

function addShoot(state) {
  if (pressedKeys.Space) {
    if (state.lastShot + 1000 < Date.now()) {
      state.lastShot = Date.now();
      state.shots.push({
        x: state.spaceship.x,
        y: state.spaceship.y,
        vx: state.spaceship.vx,
        vy: -9,
      }); 
    }
  }
}

//Game loop

function loop() {
  bindUIToModel(state);
  stepState(state);
  drawState(state);
  requestAnimationFrame(loop);
}

function init() {
  state = {
    spaceship: {
      x: width / 2,
      y: height - 20,
      vx: 0,
      vy: 0,
    },
    meteors: [],
    shots: [],
    lastShot: Date.now(),
  };
}

init();
loop();
