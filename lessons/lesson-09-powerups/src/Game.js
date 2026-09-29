import { Tank } from './Tank.js';
import { EnemyTank } from './EnemyTank.js';
import { GameMap } from './Map.js';
import { Base } from './Base.js';
import { PowerUp } from './PowerUp.js';
import { Collision } from './Collision.js';
import { Explosion } from './Explosion.js';

export class Game {
  constructor() {
    this.mapWidth = 600;
    this.mapHeight = 440;
    this.map = new GameMap(15, 11, 40);
    this.base = new Base(280, 400, 40);
    this.player = new Tank(162, 362, 'player1', 3);
    
    this.enemies = [
      new EnemyTank(2, 2, 'enemy-light'),
      new EnemyTank(282, 2, 'enemy-heavy'),
      new EnemyTank(562, 2, 'enemy-light'),
    ];

    this.bullets = [];
    this.powerUps = [
      new PowerUp(200, 200, 'star'),
    ];
    this.keys = {};
    this.state = 'PLAYING';

    this.setupKeyboard();
    this.loop = this.loop.bind(this);
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.key) this.keys[e.key.toLowerCase()] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'Space' || e.code === 'KeyJ' || e.key === 'j' || e.key === 'J' || e.key === ' ') {
        if (this.state === 'PLAYING') {
          const bs = this.player.shoot();
          if (bs && bs.length > 0) this.bullets.push(...bs);
        } else {
          location.reload();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
      if (e.key) this.keys[e.key.toLowerCase()] = false;
    });
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop() {
    if (this.state === 'PLAYING') {
      if (this.player.isAlive) {
        const isUp = this.keys['KeyW'] || this.keys['w'] || this.keys['ArrowUp'] || this.keys['arrowup'];
        const isDown = this.keys['KeyS'] || this.keys['s'] || this.keys['ArrowDown'] || this.keys['arrowdown'];
        const isLeft = this.keys['KeyA'] || this.keys['a'] || this.keys['ArrowLeft'] || this.keys['arrowleft'];
        const isRight = this.keys['KeyD'] || this.keys['d'] || this.keys['ArrowRight'] || this.keys['arrowright'];

        if (isUp) this.player.move('UP', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (isDown) this.player.move('DOWN', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (isLeft) this.player.move('LEFT', this.map, this.base, this.mapWidth, this.mapHeight);
        else if (isRight) this.player.move('RIGHT', this.map, this.base, this.mapWidth, this.mapHeight);

        this.player.update();
      } else {
        this.state = 'GAMEOVER';
        this.showEndBanner('💀 任务失败 GAME OVER', '你的战车已被击毁！');
      }

      for (let power of this.powerUps) {
        if (power.isAlive && this.player.isAlive && Collision.isOverlap(this.player, power)) {
          power.destroy();
          this.applyPowerUp(power.type);
        }
      }
      this.powerUps = this.powerUps.filter(p => p.isAlive);

      for (let enemy of this.enemies) {
        const enemyBullet = enemy.think(this.map, this.base);
        if (enemyBullet) {
          this.bullets.push(enemyBullet);
        }
      }

      for (let bullet of this.bullets) {
        bullet.update(this.map, this.mapWidth, this.mapHeight);

        if (!bullet.isAlive) continue;

        if (!this.base.isDestroyed && Collision.isOverlap(bullet, this.base)) {
          bullet.destroy();
          this.base.destroy();
          this.state = 'GAMEOVER';
          this.showEndBanner('💀 基地沦陷 GAME OVER', '老鹰司令部已被敌军摧毁！');
          break;
        }

        if (bullet.owner === 'player1') {
          for (let enemy of this.enemies) {
            if (enemy.isAlive && Collision.isOverlap(bullet, enemy)) {
              bullet.destroy();
              const dead = enemy.takeDamage(1);
              if (dead && Math.random() < 0.5) {
                const types = ['star', 'shield', 'bomb', 'clock'];
                const randType = types[Math.floor(Math.random() * types.length)];
                this.powerUps.push(new PowerUp(enemy.x, enemy.y, randType));
              }
              break;
            }
          }
        } else if (bullet.owner !== 'player1') {
          if (this.player.isAlive && Collision.isOverlap(bullet, this.player)) {
            bullet.destroy();
            this.player.takeDamage(1);
          }
        }
      }

      this.bullets = this.bullets.filter(b => b.isAlive);
      this.enemies = this.enemies.filter(e => e.isAlive);

      if (this.enemies.length === 0) {
        this.state = 'VICTORY';
        this.showEndBanner('🎉 战斗大捷 VICTORY！', '恭喜你！成功守卫老鹰基地并歼灭所有敌军！');
      }
    }

    requestAnimationFrame(this.loop);
  }

  applyPowerUp(type) {
    if (type === 'star') {
      this.player.upgradeStar();
    } else if (type === 'shield') {
      this.player.activateShield(300);
    } else if (type === 'bomb') {
      for (let enemy of this.enemies) {
        new Explosion(enemy.x, enemy.y);
        enemy.destroy();
      }
      this.enemies = [];
    } else if (type === 'clock') {
      for (let enemy of this.enemies) {
        enemy.freeze(240);
      }
    }
  }

  showEndBanner(title, desc) {
    const overlay = document.createElement('div');
    overlay.className = 'game-overlay';
    overlay.innerHTML = `
      <h2>${title}</h2>
      <p>${desc}</p>
      <button onclick="location.reload()">👉 点击重新开始 👈</button>
    `;
    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(overlay);
  }
}
