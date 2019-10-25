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
    ySpeed: 1.1,
};

const gravity = 1.00001;
const gap = 80;
const pipeSpeed = -2;

const pipes = [{
    x: canvas.width,
    y: -50,
}];

function drawScene() {
    ctx.clearRect(0, 0,
        canvas.width, canvas.height);
    
    if (bird.ySpeed <= 10) {
        bird.ySpeed += gravity;
    }
    bird.y += bird.ySpeed;
    ctx.drawImage(birdImage, bird.x, bird.y);


    for (let i = 0; i < pipes.length; ++i) {
        const pipe = pipes[i];
        pipe.x += pipeSpeed;
    }
    if (pipes[0] && pipes[0].x < -pipeUpper.width) {
        pipes.shift();
    }
    if (pipes[0] && pipes[0].x < 100 && pipes.length < 2) {
        pipes.push({
            x: canvas.width,
            y: -Math.floor(
                Math.random() * pipeUpper.height
            ),
        });
    }
    for (let i = 0; i < pipes.length; ++i) {
        const pipe = pipes[i];
        ctx.drawImage(pipeUpper, pipe.x, pipe.y);
        ctx.drawImage(
            pipeLower,
            pipe.x,
            pipe.y + pipeUpper.height + gap
        );
    }
    
    requestAnimationFrame(drawScene);
}

drawScene();

function keyupHandler(e) {
    if ([' ', 'Enter', 'ArrowUp'].includes(e.key)) {
        bird.ySpeed = -12;
    }
}

document.addEventListener('keyup', keyupHandler);

