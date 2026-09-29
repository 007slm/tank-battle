# 第 6 课：面向对象继承 —— 敌人巡逻 AI 登场 🤖

在前面的课程中，我们已经有了玩家战车。敌人的坦克长相不同、行为自动，但它们同样需要坐标、移动和发射子弹。这时，面向对象的最大杀手锏——**类继承（Inheritance）** 就登场了！

---

## 🎯 这一课学什么？
1. **什么是类继承（extends）**：子类继承父类的所有属性和方法，不用重新写一遍基础移动和绘制代码！
2. **super 关键字**：子类构造函数中调用 `super()`，初始化父类。
3. **极简巡逻 AI 状态机**：
   - 敌人笔直向前开；
   - **只有撞墙走不动了，才随机挑一个新方向！**
   - 偶尔开一枪。
4. **子弹击毁敌人**：玩家子弹打中敌人时，调用 `enemy.destroy()`，敌人从屏幕中瞬间消失！

---

## 💡 生活中的小比喻：汽车与无人驾驶汽车

- **父类 `Tank`**：是一辆基础汽车，拥有轮子、方向盘、油门（属性和移动方法）。
- **子类 `EnemyTank`**：是一辆装了自动驾驶芯片的汽车。它继承了所有基础汽车的功能，同时多了一颗“自动大脑”（`think()` 方法）！

---

## 💻 核心代码拆解 (`src/EnemyTank.js`)

```javascript
import { Tank } from './Tank.js';

export class EnemyTank extends Tank {
  constructor(x, y, type = 'enemy-light') {
    super(x, y, type); // 继承父类的初始化！
    this.speed = 1.2;  // 速度更慢，适合练习
    this.direction = 'DOWN';
  }

  think(map) {
    if (!this.isAlive) return null;
    this.update();

    // 1. 尝试向前移动
    const canMove = this.move(this.direction, map);

    // 2. 如果撞墙走不动，才换个新方向！
    if (!canMove) {
      this.randomDirection();
    }

    // 3. 偶尔发射一颗子弹
    if (Math.random() < 0.008) {
      return this.shoot();
    }
    return null;
  }
}
```

---

## 🧪 课后动手小挑战！
1. **全歼敌军**：在战场中移动并瞄准 3 辆巡逻敌人，把它们全部击毁！
2. **增加敌人数量**：打开 `src/Game.js`，在 `this.enemies` 数组里多添加两辆 `new EnemyTank(100, 60)`，挑战 5 辆敌军！
