# 第 2 课：对象的方法 —— 键盘控制战车移动 🕹️

在第 1 课中，我们知道了对象有“属性”（数据）。在这一课中，我们要给对象赋予“方法”（技能与行为），让战车动起来！

---

## 🎯 这一课学什么？
1. **什么是方法（Method）**：方法就是对象能执行的**动作或技能**（例如坦克的 `move('UP')` 移动动作）。
2. **键盘事件监听（Event Listener）**：用 `keydown` 和 `keyup` 捕捉玩家按下的 `W A S D` 或方向键。
3. **游戏主循环（Game Loop）**：`requestAnimationFrame` 像电影放映机一样，每秒刷新 60 次画面。
4. **边界碰撞防护**：限制坦克的坐标，不能开出战场边缘。

---

## 💡 生活中的小比喻：遥控汽车与遥控器

- 坦克就像一辆**真实的遥控车**。
- 遥控车身上有马达（`move(dir)` 方法）。
- 你的键盘就像是**遥控器**。
- 当你按下前进键时，遥控器向小车发送信号，调用小车的 `move('UP')` 方法，小车内部的马达就会修改自己的坐标，向前行驶！

---

## 💻 核心代码拆解

### 1. 坦克的移动方法 (`src/Tank.js`)
```javascript
move(dir, mapWidth, mapHeight) {
  this.direction = dir;

  // 根据方向修改坐标
  if (dir === 'UP') this.y -= this.speed;
  else if (dir === 'DOWN') this.y += this.speed;
  else if (dir === 'LEFT') this.x -= this.speed;
  else if (dir === 'RIGHT') this.x += this.speed;

  // 边界保护（不能开出屏幕外）
  if (this.x < 0) this.x = 0;
  if (this.x > mapWidth - this.width) this.x = mapWidth - this.width;
  if (this.y < 0) this.y = 0;
  if (this.y > mapHeight - this.height) this.y = mapHeight - this.height;

  // 更新 DOM 坐标和车头旋转
  this.updatePosition();
}
```

### 2. 游戏主循环 (`src/Game.js`)
```javascript
loop() {
  if (this.keys['KeyW'] || this.keys['ArrowUp']) {
    this.player.move('UP', this.mapWidth, this.mapHeight);
  }
  // 每秒平滑刷新 60 帧
  requestAnimationFrame(this.loop);
}
```

---

## 🧪 课后动手小挑战！
1. **超级加速**：打开 `src/Tank.js`，找到 `this.speed = 3;`，把它改成 `this.speed = 8;`，体验极速狂飙的超能战车！
2. **改装倒车雷达**：思考一下，如果想让坦克向后开时速度慢一点（例如 `this.speed * 0.5`），应该怎么改代码？
