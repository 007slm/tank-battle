/**
 * 坦克类 (Tank)
 * 这是一个面向对象的坦克类。在面向对象编程中，类（Class）就像是一张“坦克设计图纸”，
 * 我们可以用这张图纸在屏幕上造出一辆或多辆具体的坦克图片实体！
 */
export class Tank {
  /**
   * 构造函数：每当用 new Tank(...) 创建一辆新坦克时，就会执行这里的代码
   * @param {number} x - 坦克横坐标 (像素)
   * @param {number} y - 坦克纵坐标 (像素)
   * @param {string} type - 坦克类型 ('player1', 'player2', 'enemy-light', 'enemy-heavy')
   */
  constructor(x = 280, y = 200, type = 'player1') {
    this.x = x;                         // 属性：横坐标
    this.y = y;                         // 属性：纵坐标
    this.width = 36;                    // 属性：宽度
    this.height = 36;                   // 属性：高度
    this.direction = 'UP';              // 属性：朝向 ('UP', 'DOWN', 'LEFT', 'RIGHT')
    this.type = type;                   // 属性：外观类型

    // 1. 创建属于这个坦克的真实 DOM 图片节点
    this.element = document.createElement('div');
    this.element.className = `tank ${this.type}`;

    // 2. 把坦克放到战场容器中
    const battlefield = document.getElementById('battlefield');
    battlefield.appendChild(this.element);

    // 3. 更新坦克在屏幕上的显示位置
    this.updatePosition();
  }

  /**
   * 更新坦克在屏幕上的坐标和旋转角度
   */
  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    // 根据朝向设置旋转角度
    const angles = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 };
    this.element.style.transform = `rotate(${angles[this.direction]}deg)`;
  }

  /**
   * 销毁坦克：从屏幕中移除这个 DOM 元素
   */
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }
}
