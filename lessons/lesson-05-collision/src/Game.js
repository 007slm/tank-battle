import { Tank } from './Tank.js';
import { GameMap } from './Map.js';

export class Game {
  constructor() {
    this.mapWidth = 600;
    this.mapHeight = 440;
    this.map = new GameMap(15, 11, 40);
    this.player = new Tank(240, 380, 'player1');
    this.bullets = [];
    this.keys = {};

    this.setupKeyboard();
    this.loop = this.loop.bind(this);
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'Space' || e.code === 'KeyJ') {
        const bullet = this.player.shoot();
        if (bullet) this.bullets.push(bullet);
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop() {
    if (this.keys['KeyW'] || this.keys['ArrowUp']) {
      this.player.move('UP', this.map, this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyS'] || this.keys['ArrowDown']) {
      this.player.move('DOWN', this.map, this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
      this.player.move('LEFT', this.map, this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyD'] || this.keys['ArrowRight']) {
      this.player.move('RIGHT', this.map, this.mapWidth, this.mapHeight);
    }
    this.player.update();

    for (let bullet of this.bullets) {
      bullet.update(this.map, this.mapWidth, this.mapHeight);
    }
    this.bullets = this.bullets.filter(b => b.isAlive);

    requestAnimationFrame(this.loop);
  }
}
