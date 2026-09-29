import { Explosion } from './Explosion.js';

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

  destroy() {
    this.isDestroyed = true;
    this.element.className = 'base destroyed';
    this.element.innerHTML = '💀';
    new Explosion(this.x, this.y);
  }
}
