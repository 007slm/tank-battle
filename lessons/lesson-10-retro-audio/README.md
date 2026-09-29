# 第 10 课：动感音效与复古街机 HUD 🎵🕹️

恭喜你来到了 10 节课程的终极结业课！在这一课中，我们将为游戏装上**纯代码合成的 8-bit 复古音效**与**顶部街机记分牌**，完成一部视听一体的游戏大作！

---

## 🎯 这一课学什么？
1. **纯代码声音合成（Web Audio API）**：无需下载任何音频文件，用数学波形振荡器实时合成开火、爆炸、拾取、通关音效！
2. **街机 HUD 计分板（`class HUD`）**：实时更新玩家得分、关卡数与剩余敌军数量。
3. **字符串补零技巧**：`String(score).padStart(6, '0')` 打造经典 6 位街机积分！

---

## 💻 核心代码拆解 (`src/HUD.js`)

```javascript
export class HUD {
  constructor() {
    this.score = 0;
    this.element = document.createElement('div');
    this.element.className = 'hud-bar';
    this.element.innerHTML = `
      <span>1P: <span id="hudScore">000000</span></span>
      <span>🚩 STAGE 1</span>
      <span>ENEMIES: <span id="hudEnemies">3</span></span>
    `;
    document.body.insertBefore(this.element, document.getElementById('battlefield'));
  }

  addScore(pts) {
    this.score += pts;
    document.getElementById('hudScore').innerText = String(this.score).padStart(6, '0');
  }
}
```

---

## 🧪 课后动手小挑战！
1. **争当神射手**：消灭战场上的全部 3 辆敌军，看看顶部得分是不是变成了 `000300`！
2. **改装击毁得分**：打开 `src/Game.js`，试着把击毁重装坦克的奖励加倍（`this.hud.addScore(300)`）！
