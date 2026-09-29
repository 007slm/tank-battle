export class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.element = document.createElement('div');
    this.element.className = 'explosion';
    this.element.innerHTML = '💥';
    this.element.style.left = `${this.x - 4}px`;
    this.element.style.top = `${this.y - 4}px`;

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    setTimeout(() => {
      this.destroy();
    }, 350);
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }
}
