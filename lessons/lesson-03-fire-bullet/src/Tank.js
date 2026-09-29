import { Bullet } from './Bullet.js';

export class Tank {
  constructor(x = 280, y = 360, type = 'player1') {
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    this.speed = 10;
    this.direction = 'UP';
    this.type = type;
    this.cooldown = 0;

    this.element = document.createElement('div');
    this.element.className = `tank ${this.type}`;
    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    this.updatePosition();
  }

  move(dir, mapWidth, mapHeight) {
    this.direction = dir;
    if (dir === 'UP') this.y -= this.speed;
    else if (dir === 'DOWN') this.y += this.speed;
    else if (dir === 'LEFT') this.x -= this.speed;
    else if (dir === 'RIGHT') this.x += this.speed;

    if (this.x < 0) this.x = 0;
    if (this.x > mapWidth - this.width) this.x = mapWidth - this.width;
    if (this.y < 0) this.y = 0;
    if (this.y > mapHeight - this.height) this.y = mapHeight - this.height;

    this.updatePosition();
  }

  shoot() {
    if (this.cooldown > 0) return null;
    this.cooldown = 15;

    let bx = this.x + 14;
    let by = this.y + 14;
    if (this.direction === 'UP') by = this.y - 4;
    else if (this.direction === 'DOWN') by = this.y + 32;
    else if (this.direction === 'LEFT') bx = this.x - 4;
    else if (this.direction === 'RIGHT') bx = this.x + 32;

    return new Bullet(bx, by, this.direction, 7, this.type);
  }

  update() {
    if (this.cooldown > 0) this.cooldown--;
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    const angles = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 };
    this.element.style.transform = `rotate(${angles[this.direction]}deg)`;
  }
}
