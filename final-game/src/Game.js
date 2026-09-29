import { Tank } from './Tank.js';
import { EnemyTank } from './EnemyTank.js';
import { GameMap } from './Map.js';
import { Base } from './Base.js';
import { PowerUp } from './PowerUp.js';
import { HUD } from './HUD.js';
import { Collision } from './Collision.js';
import { Explosion } from './Explosion.js';
import { LEVELS } from './levels.js';
import { sound } from '../../shared/audio.js';

export class Game {
  constructor() {
    this.mapWidth = 600;
    this.mapHeight = 440;
    this.currentLevel = 0;
    this.twoPlayers = false;

    this.hud = new HUD();
    this.map = new GameMap(15, 11, 40);
    this.base = new Base(280, 400, 40);
    this.player1 = null;
    this.player2 = null;

    this.enemies = [];
    this.bullets = [];
    this.powerUps = [];
    this.keys = {};
    this.state = 'PLAYING';

    this.setupKeyboard();
    this.loadLevel(0);
    this.loop = this.loop.bind(this);
  }

  loadLevel(levelIndex) {
    this.currentLevel = levelIndex;
    this.hud.setStage(levelIndex + 1);

    // 清理旧实体
    for (let b of this.bullets) b.destroy();
    for (let p of this.powerUps) p.destroy();
    for (let e of this.enemies) e.destroy();
    this.bullets = [];
    this.powerUps = [];
    this.enemies = [];

    // 重置地图瓦片
    const levelData = LEVELS[levelIndex];
    this.map.loadGrid(levelData.grid);

    // 重置老鹰基地
    if (this.base.isDestroyed) {
      this.base.destroy();
      this.base = new Base(280, 400, 40);
    }

    // 重置 1P 玩家 (出生在开阔空地 x: 162, y: 402)
    if (this.player1) this.player1.destroy();
    this.player1 = new Tank(162, 402, 'player1', 3);

    // 重置 2P 玩家 (出生在开阔空地 x: 402, y: 402)
    if (this.twoPlayers) {
      if (this.player2) this.player2.destroy();
      this.player2 = new Tank(402, 402, 'player2', 3);
    } else if (this.player2) {
      this.player2.destroy();
      this.player2 = null;
    }

    // 敌人出生在顶部开阔空地通道
    const count = levelData.enemyCount || 4;
    const spawnX = [2, 282, 562];
    for (let i = 0; i < count; i++) {
      const sx = spawnX[i % spawnX.length];
      const type = i % 2 === 1 ? 'enemy-heavy' : 'enemy-light';
      this.enemies.push(new EnemyTank(sx, 2, type));
    }

    this.powerUps.push(new PowerUp(280, 240, 'star'));
    this.hud.updateEnemies(this.enemies.length);
    this.state = 'PLAYING';
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      // 记录多种按键格式，彻底防止大小写或输入法导致失灵
      this.keys[e.code] = true;
      if (e.key) this.keys[e.key.toLowerCase()] = true;
      if (e.key) this.keys[e.key] = true;

      // 阻止方向键和空格键默认页面滚动行为
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      // 1P 开火: 空格 / J
      if (e.code === 'Space' || e.code === 'KeyJ' || e.key === 'j' || e.key === 'J' || e.key === ' ') {
        if (this.state === 'PLAYING' && this.player1 && this.player1.isAlive) {
          const bs = this.player1.shoot();
          if (bs && bs.length > 0) {
            this.bullets.push(...bs);
            sound.playShoot();
          }
        }
      }

      // 2P 开火: Enter / 小键盘 0
      if (e.code === 'Enter' || e.code === 'Numpad0' || e.key === 'Enter') {
        if (this.state === 'PLAYING' && this.twoPlayers && this.player2 && this.player2.isAlive) {
          const bs = this.player2.shoot();
          if (bs && bs.length > 0) {
            this.bullets.push(...bs);
            sound.playShoot();
          }
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      if (e.key) this.keys[e.key.toLowerCase()] = false;
      if (e.key) this.keys[e.key] = false;
    });
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop() {
    if (this.state === 'PLAYING') {
      // 1. 玩家 1 控制 (支持 W/A/S/D，以及单人模式下的方向键)
      if (this.player1 && this.player1.isAlive) {
        const isUp = this.keys['KeyW'] || this.keys['w'] || (!this.twoPlayers && (this.keys['ArrowUp'] || this.keys['arrowup']));
        const isDown = this.keys['KeyS'] || this.keys['s'] || (!this.twoPlayers && (this.keys['ArrowDown'] || this.keys['arrowdown']));
        const isLeft = this.keys['KeyA'] || this.keys['a'] || (!this.twoPlayers && (this.keys['ArrowLeft'] || this.keys['arrowleft']));
        const isRight = this.keys['KeyD'] || this.keys['d'] || (!this.twoPlayers && (this.keys['ArrowRight'] || this.keys['arrowright']));

        if (isUp) this.player1.move('UP', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (isDown) this.player1.move('DOWN', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (isLeft) this.player1.move('LEFT', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (isRight) this.player1.move('RIGHT', this.map, this.base, this.mapWidth, this.mapHeight);

        this.player1.update();
      }

      // 2. 玩家 2 控制 (双人模式下独占方向键)
      if (this.twoPlayers && this.player2 && this.player2.isAlive) {
        if (this.keys['ArrowUp']) this.player2.move('UP', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (this.keys['ArrowDown']) this.player2.move('DOWN', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (this.keys['ArrowLeft']) this.player2.move('LEFT', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (this.keys['ArrowRight']) this.player2.move('RIGHT', this.map, this.base, this.mapWidth, this.mapHeight);

        this.player2.update();
      }

      // 玩家全灭判定
      const p1Alive = this.player1 && this.player1.isAlive;
      const p2Alive = this.twoPlayers && this.player2 && this.player2.isAlive;
      if (!p1Alive && (!this.twoPlayers || !p2Alive)) {
        this.state = 'GAMEOVER';
        sound.playGameOver();
        this.showEndBanner('💀 任务失败 GAME OVER', '我方战车已全部阵亡！', false);
      }

      // 3. 拾取道具
      for (let power of this.powerUps) {
        if (power.isAlive) {
          if (p1Alive && Collision.isOverlap(this.player1, power)) {
            power.destroy();
            sound.playPowerUp();
            this.applyPowerUp(power.type, this.player1);
          } else if (p2Alive && Collision.isOverlap(this.player2, power)) {
            power.destroy();
            sound.playPowerUp();
            this.applyPowerUp(power.type, this.player2);
          }
        }
      }
      this.powerUps = this.powerUps.filter(p => p.isAlive);

      // 4. 敌人巡逻思考
      for (let enemy of this.enemies) {
        const enemyBullet = enemy.think(this.map, this.base);
        if (enemyBullet) {
          this.bullets.push(enemyBullet);
          sound.playShoot();
        }
      }

      // 5. 子弹飞行与碰撞
      for (let bullet of this.bullets) {
        bullet.update(this.map, this.mapWidth, this.mapHeight);

        if (!bullet.isAlive) continue;

        // 击中老鹰司令部
        if (!this.base.isDestroyed && Collision.isOverlap(bullet, this.base)) {
          bullet.destroy();
          this.base.destroy();
          this.state = 'GAMEOVER';
          sound.playGameOver();
          this.showEndBanner('💀 基地沦陷 GAME OVER', '老鹰司令部已被敌军摧毁！', false);
          break;
        }

        // 玩家子弹打敌人
        if (bullet.owner.startsWith('player')) {
          for (let enemy of this.enemies) {
            if (enemy.isAlive && Collision.isOverlap(bullet, enemy)) {
              bullet.destroy();
              const dead = enemy.takeDamage(1);
              if (dead) {
                sound.playExplosion();
                this.hud.addScore(bullet.owner, 100);
                if (Math.random() < 0.45) {
                  const types = ['star', 'shield', 'bomb', 'clock'];
                  const randType = types[Math.floor(Math.random() * types.length)];
                  this.powerUps.push(new PowerUp(enemy.x, enemy.y, randType));
                }
              } else {
                sound.playHit();
              }
              break;
            }
          }
        }
        // 敌人子弹打玩家
        else {
          if (p1Alive && Collision.isOverlap(bullet, this.player1)) {
            bullet.destroy();
            const dead = this.player1.takeDamage(1);
            if (dead) sound.playExplosion();
            else sound.playHit();
          } else if (p2Alive && Collision.isOverlap(bullet, this.player2)) {
            bullet.destroy();
            const dead = this.player2.takeDamage(1);
            if (dead) sound.playExplosion();
            else sound.playHit();
          }
        }
      }

      // 6. 清理
      this.bullets = this.bullets.filter(b => b.isAlive);
      this.enemies = this.enemies.filter(e => e.isAlive);
      this.hud.updateEnemies(this.enemies.length);

      // 7. 通关判定
      if (this.enemies.length === 0) {
        this.state = 'VICTORY';
        sound.playVictory();
        const isFinal = this.currentLevel === LEVELS.length - 1;
        const title = isFinal ? '🏆 全通关！超级坦克战神' : `🎉 第 ${this.currentLevel + 1} 关 大捷 VICTORY！`;
        const desc = isFinal ? '太棒了！你带领战队成功攻克了全部 5 大险要战役！' : '全歼敌军！点击进入下一关！';
        this.showEndBanner(title, desc, true);
      }
    }

    requestAnimationFrame(this.loop);
  }

  applyPowerUp(type, targetPlayer) {
    if (type === 'star') {
      targetPlayer.upgradeStar();
    } else if (type === 'shield') {
      targetPlayer.activateShield(300);
    } else if (type === 'bomb') {
      sound.playExplosion();
      for (let enemy of this.enemies) {
        new Explosion(enemy.x, enemy.y);
        enemy.destroy();
        this.hud.addScore('player1', 100);
      }
      this.enemies = [];
    } else if (type === 'clock') {
      for (let enemy of this.enemies) {
        enemy.freeze(240);
      }
    }
  }

  showEndBanner(title, desc, isWin) {
    const old = document.querySelector('.game-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.className = 'game-overlay';

    let btnText = '👉 重新开战 👈';
    let btnAction = () => this.loadLevel(this.currentLevel);

    if (isWin) {
      if (this.currentLevel < LEVELS.length - 1) {
        btnText = '🚀 前往下一关 ➡️';
        btnAction = () => {
          overlay.remove();
          this.loadLevel(this.currentLevel + 1);
        };
      } else {
        btnText = '🏆 再次从第 1 关开始挑战';
        btnAction = () => {
          overlay.remove();
          this.loadLevel(0);
        };
      }
    } else {
      btnAction = () => {
        overlay.remove();
        this.loadLevel(this.currentLevel);
      };
    }

    overlay.innerHTML = `
      <h2 style="color: ${isWin ? '#2ecc71' : '#ff4757'}">${title}</h2>
      <p>${desc}</p>
    `;

    const btn = document.createElement('button');
    btn.innerText = btnText;
    btn.onclick = btnAction;
    overlay.appendChild(btn);

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(overlay);
  }
}
