class Board {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.gameOver = true;
  }

  start() {
    this.gameOver = false;
    this.snake = new Snake();
    this.generateFood();
  }

  step() {
    this.snake.move();

    if (!this.isFoodInSnake()) {
      this.snake.shrink();
    } else {
      this.generateFood();
    }

    if (!this.isSnakeAlive()) {
      this.gameOver = true;
    }
  }

  isFoodInSnake() {
    return this.snake.isSnakeCoordinate(this.food.position);
  }

  isSnakeAlive() {
    const { x, y } = this.snake.head;
    // kígyó feje valamelyik irányba lement a pályáról
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
      return false;
    }

    const selfCollision = this.snake.tail.some((tailPosition) =>
      isSamePosition(tailPosition, this.snake.head),
    );
    if (selfCollision) {
      return false;
    }

    return true;
  }

  generateFood() {
    while (!this.food || this.isFoodInSnake()) {
      this.food = new Food(this.width, this.height);
    }
  }

  changeSnakeDirection(direction) {
    this.snake.changeDirection(direction);
  }
}

class Snake {
  constructor(startingPosition = { x: 0, y: 0 }) {
    this.head = startingPosition;
    this.tail = [
      // az elején van a fejhez legközelebbi elem, a végén pedig a fejtől legtávolabbi elem
    ];
    this.direction = { x: 1, y: 0 };
  }

  move() {
    this.tail.unshift(this.head);
    this.head = {
      x: this.head.x + this.direction.x,
      y: this.head.y + this.direction.y,
    };
  }

  shrink() {
    this.tail.pop();
  }

  changeDirection(direction) {
    this.direction = direction;
  }

  isSnakeCoordinate(position) {
    // a fej van-e rajta
    if (isSamePosition(this.head, position)) {
      return true;
    }

    // a farok van-e rajta
    const isTailPosition = this.tail.some((tailPosition) =>
      isSamePosition(position, tailPosition),
    );
    if (isTailPosition) {
      return true;
    }

    return false;
  }
}

class Food {
  constructor(width, height) {
    this.position = { x: random(0, width - 1), y: random(0, height - 1) };
  }
}
