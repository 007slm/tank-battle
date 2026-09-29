# 第 8 课：基地保卫战 —— 老鹰雕像与胜负结算 🦅

一款真正的游戏必须有“胜负判定”！在这一课中，我们将加入经典的**老鹰司令部基地**，并建立全局胜负规则！

---

## 🎯 这一课学什么？
1. **基地对象（`class Base`）**：在地图底部正中央放置老鹰雕像。
2. **基地摧毁与状态切换**：当子弹命中老鹰时，老鹰变成骷髅 `💀`，并触发大爆炸！
3. **全局游戏状态机（Game State）**：
   - `PLAYING`：战斗正在进行中；
   - `VICTORY`：所有敌军全灭，显示通关大捷幕布！
   - `GAMEOVER`：玩家阵亡或老鹰被毁，显示任务失败幕布！
4. **一键重开游戏**：点击按钮或按空格键调用 `location.reload()` 重新出征！

---

## 💻 核心代码拆解 (`src/Game.js`)

```javascript
// 胜负判定逻辑：
if (this.enemies.length === 0) {
  this.state = 'VICTORY';
  this.showEndBanner('🎉 战斗大捷 VICTORY！', '全歼敌军并守住了司令部！');
}

if (!this.player.isAlive || this.base.isDestroyed) {
  this.state = 'GAMEOVER';
  this.showEndBanner('💀 任务失败 GAME OVER', '基地失守或战车阵亡！');
}
```

---

## 🧪 课后动手小挑战！
1. **守卫老鹰**：消灭从上方下来的 3 辆敌军，千万不要让敌人的炮火打中老鹰！
2. **给基地加固铁壁**：打开 `src/Map.js`，试着把基地周围的三块红砖墙（代号 `1`）换成坚不可摧的铁壁（代号 `2`），造出一个无敌堡垒！
