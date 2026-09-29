import { Game } from './Game.js';
import { sound } from '../../shared/audio.js';

const game = new Game();
game.start();

// 关卡选择器
const levelSelect = document.getElementById('levelSelect');
if (levelSelect) {
  levelSelect.addEventListener('change', (e) => {
    game.loadLevel(Number(e.target.value));
  });
}

// 2P 双人模式开关
const twoPlayersToggle = document.getElementById('twoPlayersToggle');
if (twoPlayersToggle) {
  twoPlayersToggle.addEventListener('change', (e) => {
    game.twoPlayers = e.target.checked;
    game.hud.set2PMode(game.twoPlayers);
    game.loadLevel(game.currentLevel);
  });
}

// 静音开关
const muteBtn = document.getElementById('muteBtn');
if (muteBtn) {
  muteBtn.addEventListener('click', () => {
    const isMuted = sound.toggleMute();
    muteBtn.textContent = isMuted ? '🔇 静音' : '🔊 声音';
  });
}
