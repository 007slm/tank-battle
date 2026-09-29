/**
 * 子弹类 (Bullet)
 * 子弹也是一个独立的面向对象实体！
 */
export class Bullet {
  constructor(x, y, direction, speed = 7, owner = 'player1') {
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.direction = direction;
    this.speed = speed;
    this.owner = owner;
    this.isAlive = true;

    // 1. 创建子弹 DOM 元素
    this.element = document.createElement('div');
    this.element.className = `bullet ${this.owner === 'player1' ? '' : 'enemy'}`;

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    this.updatePosition();
  }

  update(mapWidth = 600, mapHeight = 440) {
    if (!this.isAlive) return;

    if (this.direction === 'UP') this.y -= this.speed;
    else if (this.direction === 'DOWN') this.y += this.speed;
    else if (this.direction === 'LEFT') this.x -= this.speed;
    else if (this.direction === 'RIGHT') this.x += this.speed;

    // 检查是否飞出屏幕边界
    if (this.x < -10 || this.x > mapWidth + 10 || this.y < -10 || this.y > mapHeight + 10) {
      this.destroy();
    } else {
      this.updatePosition();
    }
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }

  destroy() {
    this.isAlive = false;
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }
}
