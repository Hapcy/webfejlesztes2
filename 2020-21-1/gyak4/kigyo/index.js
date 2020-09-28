class Board {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.gameOver = true;
  }

  start() {
    this.gameOver = false;
    this.snake = new Snake();
    this.food = new Food(this.width, this.height);
  }

  step() {
    this.snake.move();

    if (!this.didSnakeEat()) {
      this.snake.shrink();
    }

    if (!this.isSnakeAlive()) {
      this.gameOver = true;
    }
  }

  didSnakeEat() {

  }

  isSnakeAlive() {

  }
}

class Snake {
  constructor(startingPosition = { x: 0, y: 0 }) {
    this.head = startingPosition;
    this.tail = [];
  }

  move() {

  }
}

class Food {
  constructor(width, height) {
    this.position = { x: random(0, width), y: random(0, height) };
  }
}

function random(min, max) {
  const zeroBasedIntervalEnd = max - min;
  const randomInZeroBasedInterval = Math.floor(Math.random() * (zeroBasedIntervalEnd + 1));
  return randomInZeroBasedInterval + min;
}

