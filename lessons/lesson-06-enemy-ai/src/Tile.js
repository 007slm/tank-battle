export class Tile {
  constructor(col, row, type = 'brick', size = 40) {
    this.col = col;
    this.row = row;
    this.x = col * size;
    this.y = row * size;
    this.width = size;
    this.height = size;
    this.type = type;
    this.isAlive = true;

    this.element = document.createElement('div');
    this.element.className = `tile ${this.type}`;
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);
  }

  destroy() {
    this.isAlive = false;
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }
}
