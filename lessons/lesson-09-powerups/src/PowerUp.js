/**
 * 道具宝箱类 (PowerUp)
 * 击毁敌军可能掉落神秘宝箱，拾取后触发超级变身能力！
 */
export class PowerUp {
  constructor(x, y, type = 'star') {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.type = type; // 'star'(星星), 'shield'(护盾), 'bomb'(炸弹), 'clock'(时钟)
    this.isAlive = true;

    const icons = {
      star: '⭐',
      shield: '🛡️',
      bomb: '💣',
      clock: '⏱️',
    };

    // 1. 创建宝箱 DOM 节点
    this.element = document.createElement('div');
    this.element.className = 'power-up';
    this.element.innerHTML = icons[this.type] || '⭐';
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    // 10 秒后如果不拾取，宝箱自动消失
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
