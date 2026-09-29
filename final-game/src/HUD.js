export class HUD {
  constructor() {
    this.score1 = 0;
    this.score2 = 0;

    this.element = document.createElement('div');
    this.element.className = 'hud-bar';
    this.element.innerHTML = `
      <span style="color:#2ecc71">1P: <span id="hudScore1">000000</span></span>
      <span id="hud2pBlock" style="color:#f1c40f; display:none;">2P: <span id="hudScore2">000000</span></span>
      <span style="color:#00f2fe">🚩 STAGE <span id="hudStage">1</span></span>
      <span style="color:#ff4757">ENEMIES: <span id="hudEnemies">4</span></span>
    `;

    document.body.insertBefore(this.element, document.getElementById('battlefield'));
    this.score1Span = document.getElementById('hudScore1');
    this.score2Span = document.getElementById('hudScore2');
    this.hud2pBlock = document.getElementById('hud2pBlock');
    this.stageSpan = document.getElementById('hudStage');
    this.enemiesSpan = document.getElementById('hudEnemies');
  }

  set2PMode(enable) {
    this.hud2pBlock.style.display = enable ? 'inline' : 'none';
  }

  setStage(stage) {
    this.stageSpan.innerText = stage;
  }

  addScore(playerType, pts) {
    if (playerType === 'player1') {
      this.score1 += pts;
      this.score1Span.innerText = String(this.score1).padStart(6, '0');
    } else {
      this.score2 += pts;
      this.score2Span.innerText = String(this.score2).padStart(6, '0');
    }
  }

  updateEnemies(count) {
    this.enemiesSpan.innerText = count;
  }
}
