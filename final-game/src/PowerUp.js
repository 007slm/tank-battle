export class PowerUp {
  constructor(x, y, type = 'star') {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.type = type;
    this.isAlive = true;

    const icons = { star: '⭐', shield: '🛡️', bomb: '💣', clock: '⏱️' };

    this.element = document.createElement('div');
    this.element.className = 'power-up';
    this.element.innerHTML = icons[this.type] || '⭐';
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    setTimeout(() => {
      this.destroy();
    }, 10000);
  }

  destroy() {
    this.isAlive = false;
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }
}
