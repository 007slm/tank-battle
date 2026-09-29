/**
 * 街机 HUD 计分板 (Heads-Up Display)
 * 负责在战场顶部实时更新得分、关卡和剩余敌军！
 */
export class HUD {
  constructor() {
    this.score = 0;
    this.stage = 1;

    // 创建顶部 HUD 条
    this.element = document.createElement('div');
    this.element.className = 'hud-bar';
    this.element.innerHTML = `
      <span style="color:#2ecc71">1P: <span id="hudScore">000000</span></span>
      <span style="color:#00f2fe">🚩 STAGE <span id="hudStage">1</span></span>
      <span style="color:#ff4757">ENEMIES: <span id="hudEnemies">3</span></span>
    `;

    document.body.insertBefore(this.element, document.getElementById('battlefield'));
    this.scoreSpan = document.getElementById('hudScore');
    this.stageSpan = document.getElementById('hudStage');
    this.enemiesSpan = document.getElementById('hudEnemies');
  }

  addScore(pts) {
    this.score += pts;
    this.scoreSpan.innerText = String(this.score).padStart(6, '0');
  }

  updateEnemies(count) {
    this.enemiesSpan.innerText = count;
  }
}
