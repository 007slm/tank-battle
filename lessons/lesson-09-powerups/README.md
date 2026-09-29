# 第 9 课：神秘宝箱 —— 道具掉落与战车升级 ⭐

在激烈的战斗中，消灭敌人有机会爆出神秘宝箱！在这一课中，我们将实现**4 种强大的战术道具**与**战车变身能力**！

---

## 🎯 这一课学什么？
1. **道具实体类（`class PowerUp`）**：
   - ⭐ **五角星**：升级武器！1星单发 ➡️ 2星快速连发 ➡️ 3星极速三叉戟巨炮！
   - 🛡️ **金钟罩**：获得 5 秒无敌护盾光圈，免受任何子弹伤害！
   - 💣 **全屏手雷**：引爆震撼弹，瞬间歼灭当前屏幕上的所有敌军！
   - ⏱️ **定身时钟**：冰冻所有敌人 4 秒，敌人无法移动也无法开火！
2. **拾取碰撞检测**：当坦克与宝箱矩形重叠时，调用 `power.destroy()` 并触发 `applyPowerUp(type)`。
3. **状态与倒计时管理**：护盾倒计时 `shieldTimer`、冰冻倒计时 `freezeTimer`。

---

## 💻 核心代码拆解

### 1. 道具效果生效 (`src/Game.js`)
```javascript
applyPowerUp(type) {
  if (type === 'star') {
    this.player.upgradeStar(); // 升级武器
  } else if (type === 'shield') {
    this.player.activateShield(300); // 5 秒护盾
  } else if (type === 'bomb') {
    // 💣 秒杀所有敌人
    for (let enemy of this.enemies) {
      new Explosion(enemy.x, enemy.y);
      enemy.destroy();
    }
    this.enemies = [];
  } else if (type === 'clock') {
    // ⏱️ 冰冻所有敌人
    for (let enemy of this.enemies) enemy.freeze(240);
  }
}
```

---

## 🧪 课后动手小挑战！
1. **开局捡星星**：开局在地图中央就有一个 ⭐，开过去捡起来，看看你的子弹射速是不是变得飞快！
2. **三叉戟散射**：再消灭敌人爆出星星升到 3 级，按空格键感受一炮发射 3 颗子弹的火力覆盖！
