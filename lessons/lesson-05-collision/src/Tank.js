import { Bullet } from './Bullet.js';

export class Tank {
  constructor(x = 162, y = 362, type = 'player1') {
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    this.speed = 3;
    this.direction = 'UP';
    this.type = type;
    this.cooldown = 0;

    this.element = document.createElement('div');
    this.element.className = `tank ${this.type}`;
    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    this.updatePosition();
  }

  move(dir, map, mapWidth = 600, mapHeight = 440) {
    this.direction = dir;

    // 转弯微调吸附，丝滑进通道
    if (dir === 'UP' || dir === 'DOWN') {
      const targetX = Math.round((this.x - 2) / 40) * 40 + 2;
      if (Math.abs(this.x - targetX) <= 6) this.x = targetX;
    } else if (dir === 'LEFT' || dir === 'RIGHT') {
      const targetY = Math.round((this.y - 2) / 40) * 40 + 2;
      if (Math.abs(this.y - targetY) <= 6) this.y = targetY;
    }

    let nextX = this.x;
    let nextY = this.y;

    if (dir === 'UP') nextY -= this.speed;
    else if (dir === 'DOWN') nextY += this.speed;
    else if (dir === 'LEFT') nextX -= this.speed;
    else if (dir === 'RIGHT') nextX += this.speed;

    if (nextX < 0 || nextX > mapWidth - this.width || nextY < 0 || nextY > mapHeight - this.height) {
      this.updatePosition();
      return false;
    }

    const tankRect = { x: nextX, y: nextY, width: this.width, height: this.height };
    if (map && map.isObstacleForTank(tankRect)) {
      this.updatePosition();
      return false;
    }

    this.x = nextX;
    this.y = nextY;
    this.updatePosition();
    return true;
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
