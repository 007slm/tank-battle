import { Explosion } from './Explosion.js';

/**
 * 基地类 (Base)
 * 守护我方司令部老鹰雕像！老鹰若被击中，任务立刻失败！
 */
export class Base {
  constructor(x = 280, y = 400, size = 40) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
    this.isDestroyed = false;

    this.element = document.createElement('div');
    this.element.className = 'base';
    this.element.innerHTML = '🦅';
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);
  }

  // 基地被摧毁
  destroy() {
    this.isDestroyed = true;
    this.element.className = 'base destroyed';
    this.element.innerHTML = '💀';
    new Explosion(this.x, this.y);
  }
}
