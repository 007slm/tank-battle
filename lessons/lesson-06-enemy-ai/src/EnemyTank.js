import { Tank } from './Tank.js';

export class EnemyTank extends Tank {
  constructor(x = 2, y = 2, type = 'enemy-light') {
    super(x, y, type);
    this.speed = 1.2;
    this.direction = 'DOWN';
    this.cooldown = 40;
    this.turnCooldown = 0; // 转向防抖计时器，彻底防止原地疯狂转圈！
  }

  think(map) {
    if (!this.isAlive) return null;
    this.update();
    if (this.turnCooldown > 0) this.turnCooldown--;

    // 1. 尝试按当前方向继续前进
    const canMove = this.move(this.direction, map);

    // 2. 如果撞墙且不在冷却中，才换新方向
    if (!canMove && this.turnCooldown <= 0) {
      this.randomDirection();
      this.turnCooldown = 20; // 换向后至少尝试走 20 帧，平稳自然
    }

    // 3. 偶尔发射子弹
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
