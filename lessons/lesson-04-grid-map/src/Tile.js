/**
 * 地图瓦片类 (Tile)
 * 战场上的每一个红砖墙、铁壁、水洼、草丛都是一个独立的瓦片对象！
 */
export class Tile {
  constructor(col, row, type = 'brick', size = 40) {
    this.col = col;
    this.row = row;
    this.x = col * size;
    this.y = row * size;
    this.width = size;
    this.height = size;
    this.type = type; // 'brick' (红砖), 'iron' (铁壁), 'water' (水面), 'grass' (草丛)
    this.isAlive = true;

    // 创建 DOM 元素
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
