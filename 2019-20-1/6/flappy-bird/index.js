const canvas = document.querySelector('#jatek');
const ctx = canvas.getContext('2d');

const pipeUpper = new Image();
pipeUpper.src = 'images/pipeNorth.png';
const pipeLower = new Image();
pipeLower.src = 'images/pipeSouth.png';

const birdImage = new Image();
birdImage.src = 'images/bird.png';
const bird = {
    x: 50,
    y: 0,
    width: birdImage.width,
    height: birdImage.height,
    ySpeed: 1,
};

const gravity = 0.8;
const gap = 120;
const pipeSpeed = -2;

const pipes = [{
    x: canvas.width,
    y: -120,
}];

let gameOver = false;
let score = 0;

function drawScene() {
    ctx.clearRect(0, 0,
        canvas.width, canvas.height);
    
    // madár mozgatása
    if (bird.ySpeed <= 10) {
        bird.ySpeed += gravity;
    }
    bird.y += bird.ySpeed * 0.7;

    // talajjal ütközés ellenőrzése
    if ((bird.y + bird.height) >= canvas.height) {
        gameOver = true;
        bird.y = canvas.height - bird.height;
    }

    ctx.drawImage(birdImage, bird.x, bird.y);

    // pipeok új pozíciójának kiszámítása
    for (let i = 0; i < pipes.length; ++i) {
        const pipe = pipes[i];
        pipe.x += pipeSpeed;
    }
    if (pipes[0] && pipes[0].x < -pipeUpper.width) {
        pipes.shift();
        score += 1;
    }
    if (pipes[0] && pipes[0].x < 100 && pipes.length < 2) {
        pipes.push({
            x: canvas.width,
            y: -Math.floor(
                Math.random() * pipeUpper.height
            ),
        });
    }

    // pipe ütközés
    const collidingPipe = pipes.find(pipe => {
        const birdTop = bird.y;
        const birdLeft = bird.x;
        const birdRight = bird.x + bird.width;
        const birdBottom = bird.y + bird.height;

        const pipeLeft = pipe.x;
        const pipeRight = pipe.x + pipeUpper.width;
        const pipeTopStart = pipe.y + pipeUpper.height;
        const pipeBottomStart = pipeTopStart + gap;

        // felső pipepal ütközés

        if (birdRight >= pipeLeft
            && birdLeft <= pipeRight) {
            gameOver = birdTop <= pipeTopStart
                || birdBottom >= pipeBottomStart;
        }

    });

    // pipeok kirajzolása
    for (let i = 0; i < pipes.length; ++i) {
        const pipe = pipes[i];
        ctx.drawImage(pipeUpper, pipe.x, pipe.y);
        ctx.drawImage(
            pipeLower,
            pipe.x,
            pipe.y + pipeUpper.height + gap
        );
    }

    ctx.font = '50px serif';
    ctx.fillText(score.toString(), 0, 50);

    if (!gameOver) {
        requestAnimationFrame(drawScene);
    }
}

drawScene();

function keyupHandler(e) {
    if ([' ', 'Enter', 'ArrowUp'].includes(e.key)) {
        bird.ySpeed = -12;
    }
}

document.addEventListener('keyup', keyupHandler);

