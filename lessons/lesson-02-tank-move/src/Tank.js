export class Tank {
  constructor(x = 162, y = 362, speed = 3) {
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    this.speed = speed;
    this.direction = 'UP';

    this.element = document.createElement('div');
    this.element.className = 'tank player1';
    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    this.updatePosition();
  }

  move(dir, mapWidth = 600, mapHeight = 440) {
    this.direction = dir;

    let nextX = this.x;
    let nextY = this.y;

    if (dir === 'UP') nextY -= this.speed;
    else if (dir === 'DOWN') nextY += this.speed;
    else if (dir === 'LEFT') nextX -= this.speed;
    else if (dir === 'RIGHT') nextX += this.speed;

    if (nextX >= 0 && nextX <= mapWidth - this.width) {
      this.x = nextX;
    }
    if (nextY >= 0 && nextY <= mapHeight - this.height) {
      this.y = nextY;
    }

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    const angles = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 };
    this.element.style.transform = `rotate(${angles[this.direction]}deg)`;
  }
}
