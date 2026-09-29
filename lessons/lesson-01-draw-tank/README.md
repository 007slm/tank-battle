# 第 1 课：类与对象 —— 在战场上创建你的第一辆坦克 🎨

欢迎来到坦克大战少儿编程第一课！今天我们将学习现代软件工程中最伟大的思想之一：**面向对象编程（OOP）**。

---

## 🎯 这一课学什么？
1. **什么是类（Class）**：类就像是汽车制造厂里的**“坦克设计图纸”**。
2. **什么是对象（Object / 实例）**：根据图纸造出来的**“真实的、看得见摸得着的实体坦克”**。
3. **对象的属性（Property）**：坦克的数据特征（位置 `x`, `y`、外观类型 `type`、朝向 `direction`）。
4. **DOM 实体绑定**：每个坦克对象都对应屏幕上的一个真实图片标签，右键审查元素就能看到它！

---

## 💡 生活中的小比喻：图纸与乐高积木

- 假设你有一张拼装乐高坦克的**图纸（Class Tank）**。
- 这张图纸规定了：坦克有横坐标、纵坐标、长宽尺寸和朝向。
- 只要你执行 `new Tank(280, 200)`，就会按照图纸立刻拼出一辆真实的**坦克积木（Object 实例）**，放到你的桌子（战场容器 `#battlefield`）上！
- 想要 10 辆坦克？不需要写 10 份重复的代码，只要 `new Tank(...)` 10 次就可以了！

---

## 💻 核心代码拆解 (`src/Tank.js`)

```javascript
export class Tank {
  constructor(x, y, type = 'player1') {
    this.x = x;                         // 属性：横向位置
    this.y = y;                         // 属性：纵向位置
    this.direction = 'UP';              // 属性：朝向向上
    
    // 1. 创建属于这个坦克的 DOM 图片节点
    this.element = document.createElement('div');
    this.element.className = `tank ${type}`;

    // 2. 把坦克放到战场容器中
    document.getElementById('battlefield').appendChild(this.element);

    // 3. 更新显示位置
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
}
```

在 `src/main.js` 中召唤坦克：
```javascript
import { Tank } from './Tank.js';

// 召唤一辆绿色玩家战车
const myTank = new Tank(280, 200, 'player1');
```

---

## 🧪 课后动手小挑战！
1. **换个位置出征**：打开 `src/main.js`，试着把坐标改成 `new Tank(50, 50, 'player1')`，看看战车是不是出现在了左上角？
2. **创建双人战队**：再写一行代码 `new Tank(400, 200, 'player2')`，造出一辆黄金战车！
3. **打开 F12 看看**：在浏览器里按 `F12`（或右键“检查”），在 Elements 树里找到 `<div class="tank player1">`，这就是你亲手创建的面向对象实体！
