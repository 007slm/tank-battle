# 第 4 课：搭建战场 —— 二维数组与瓦片地图 🗺️

战场不能空荡荡的！在这一课中，我们将用**二维数组**来铺设红砖墙、坚固铁壁、蔚蓝水洼和隐身草丛！

---

## 🎯 这一课学什么？
1. **什么是瓦片系统（Tilemap）**：把大地图切成一个个 40×40 像素的小网格（瓦片）。
2. **二维数组（Grid）**：用行（Row）和列（Column）表示地图数据矩阵。
3. **数字代号映射**：
   - `0` ➡️ 空地（可自由通行）
   - `1` ➡️ 红砖墙（`brick`）
   - `2` ➡️ 坚固铁壁（`iron`）
   - `3` ➡️ 水面（`water`）
   - `4` ➡️ 草丛（`grass`）
4. **面向对象的 Tile 类**：每个砖块、铁壁都是一个具体的 `Tile` 实例！

---

## 💻 核心代码拆解 (`src/Map.js`)

```javascript
export class GameMap {
  constructor(cols = 15, rows = 11, tileSize = 40) {
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 1, 0],
      // ... 更多地图行数据
    ];
    this.createTiles();
  }

  createTiles() {
    // 遍历二维数组：双重 for 循环！
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const val = this.grid[r][c];
        if (val === 1) new Tile(c, r, 'brick');
        else if (val === 2) new Tile(c, r, 'iron');
        else if (val === 3) new Tile(c, r, 'water');
        else if (val === 4) new Tile(c, r, 'grass');
      }
    }
  }
}
```

---

## 🧪 课后动手小挑战！
1. **亲手改一张地图**：打开 `src/Map.js` 中的 `this.grid`，把第一行的几个 `0` 改成 `1`，看看屏幕上是不是多出了一排红砖墙！
2. **潜伏草丛**：开着坦克钻进草丛，感受半透明遮罩的隐蔽效果！
