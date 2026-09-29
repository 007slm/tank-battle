import { Tank } from './Tank.js';

export class EnemyTank extends Tank {
  constructor(x = 2, y = 2, type = 'enemy-light') {
    const isHeavy = type === 'enemy-heavy';
    const hp = isHeavy ? 2 : 1;
    super(x, y, type, hp);

    this.speed = isHeavy ? 1.0 : 1.2;
    this.direction = 'DOWN';
    this.cooldown = 40;
    this.turnCooldown = 0;
  }

  think(map) {
    if (!this.isAlive) return null;
    this.update();
    if (this.turnCooldown > 0) this.turnCooldown--;

    const canMove = this.move(this.direction, map);
    if (!canMove && this.turnCooldown <= 0) {
      this.randomDirection();
      this.turnCooldown = 20;
    }

    if (Math.random() < 0.008) {
      return this.shoot();
    }

    return null;
  }

  randomDirection() {
    const dirs = ['DOWN', 'DOWN', 'LEFT', 'RIGHT', 'UP'];
    const otherDirs = dirs.filter(d => d !== this.direction);
    this.direction = otherDirs[Math.floor(Math.random() * otherDirs.length)];
  }
}
