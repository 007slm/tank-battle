# 第 5 课：实战碰撞 —— 阻挡障碍与炮轰碎砖 🧱

坦克不能穿墙，子弹打中红砖应该把红砖轰碎！在这一课中，我们将实现经典的 **AABB 矩形碰撞检测算法**！

---

## 🎯 这一课学什么？
1. **什么是 AABB 碰撞检测**：Axis-Aligned Bounding Box（轴对齐包围盒），用极简的 4 个条件判断两个矩形是否撞在一起。
2. **移动预判算法**：坦克在真正跨出这一步之前，先“假设”走到了 `nextX, nextY`，检查会不会撞墙；如果撞墙就停住，不穿墙！
3. **对象的销毁（Destroy）**：子弹打中红砖，红砖调用 `brick.destroy()`，自动从屏幕移除！
4. **铁壁防穿透**：铁壁很硬，子弹打中铁壁，子弹自己销毁，但铁壁完好无损。

---

## 💡 生活中的小比喻：盲杖探路

坦克就像一个拿着**探路盲杖**的勇士：
- 每次往前迈步前，盲杖先往前点一下（计算 `nextX, nextY`）。
- 如果盲杖点到了墙（`map.isObstacleForTank()` 为 true），脚就停住不走！
- 如果前面是空地，脚才真正迈过去（修改 `this.x = nextX`）。

---

## 💻 核心代码拆解

### 1. 矩形碰撞判断 (`src/Collision.js`)
```javascript
export class Collision {
  static isOverlap(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }
}
```

### 2. 子弹打碎红砖 (`src/Map.js`)
```javascript
checkBulletHit(bullet) {
  for (let tile of this.tiles) {
    if (tile.isAlive && Collision.isOverlap(bullet, tile)) {
      bullet.destroy(); // 销毁子弹
      if (tile.type === 'brick') {
        tile.destroy(); // 轰碎红砖！
      }
      return true;
    }
  }
  return false;
}
```

---

## 🧪 课后动手小挑战！
1. **开辟通道**：在游戏里连按空格键发射多颗子弹，把面前的红砖墙全部轰平，开辟一条畅通无阻的秘密走廊！
2. **测试铁壁**：向坚硬的银灰色铁壁开火，看看子弹打在铁壁上是不是立即消失，而铁壁丝毫不受损！
