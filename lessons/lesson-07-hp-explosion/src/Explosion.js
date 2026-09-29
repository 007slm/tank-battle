/**
 * 爆炸特效类 (Explosion)
 * 坦克被摧毁时，在原地诞生一个绚丽的爆炸动画，播完后自动销毁！
 */
export class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // 创建爆炸 DOM 元素
    this.element = document.createElement('div');
    this.element.className = 'explosion';
    this.element.innerHTML = '💥';
    this.element.style.left = `${this.x - 4}px`;
    this.element.style.top = `${this.y - 4}px`;

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    // 0.35 秒后动画播放完毕，自动销毁
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
