import { Tank } from './Tank.js';
import { EnemyTank } from './EnemyTank.js';
import { GameMap } from './Map.js';
import { Collision } from './Collision.js';

export class Game {
  constructor() {
    this.mapWidth = 600;
    this.mapHeight = 440;
    this.map = new GameMap(15, 11, 40);
    this.player = new Tank(162, 362, 'player1', 3);
    
    this.enemies = [
      new EnemyTank(2, 2, 'enemy-light'),
      new EnemyTank(282, 2, 'enemy-heavy'),
      new EnemyTank(562, 2, 'enemy-light'),
    ];

    this.bullets = [];
    this.keys = {};

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
        const bullet = this.player.shoot();
        if (bullet) this.bullets.push(bullet);
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
    if (this.player.isAlive) {
      const isUp = this.keys['KeyW'] || this.keys['w'] || this.keys['ArrowUp'] || this.keys['arrowup'];
      const isDown = this.keys['KeyS'] || this.keys['s'] || this.keys['ArrowDown'] || this.keys['arrowdown'];
      const isLeft = this.keys['KeyA'] || this.keys['a'] || this.keys['ArrowLeft'] || this.keys['arrowleft'];
      const isRight = this.keys['KeyD'] || this.keys['d'] || this.keys['ArrowRight'] || this.keys['arrowright'];

      if (isUp) this.player.move('UP', this.map, this.mapWidth, this.mapHeight);
      else if (isDown) this.player.move('DOWN', this.map, this.mapWidth, this.mapHeight);
      else if (isLeft) this.player.move('LEFT', this.map, this.mapWidth, this.mapHeight);
      else if (isRight) this.player.move('RIGHT', this.map, this.mapWidth, this.mapHeight);

      this.player.update();
    }

    for (let enemy of this.enemies) {
      const enemyBullet = enemy.think(this.map);
      if (enemyBullet) {
        this.bullets.push(enemyBullet);
      }
    }

    for (let bullet of this.bullets) {
      bullet.update(this.map, this.mapWidth, this.mapHeight);

      if (!bullet.isAlive) continue;

      if (bullet.owner === 'player1') {
        for (let enemy of this.enemies) {
          if (enemy.isAlive && Collision.isOverlap(bullet, enemy)) {
            bullet.destroy();
            enemy.takeDamage(1);
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

    requestAnimationFrame(this.loop);
  }
}
