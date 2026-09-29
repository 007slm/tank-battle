import { Bullet } from './Bullet.js';
import { Explosion } from './Explosion.js';

export class Tank {
  constructor(x = 162, y = 402, type = 'player1', maxHp = 3) {
    this.x = x;
    this.y = y;
    this.width = 36;
    this.height = 36;
    this.speed = 3;
    this.direction = 'UP';
    this.type = type;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.cooldown = 0;
    this.isAlive = true;

    this.starLevel = 1;
    this.shieldTimer = 0;

    this.element = document.createElement('div');
    this.element.className = `tank ${this.type}`;

    this.hpBar = document.createElement('div');
    this.hpBar.className = 'hp-bar';
    this.hpFill = document.createElement('div');
    this.hpFill.className = 'hp-fill';
    this.hpBar.appendChild(this.hpFill);
    this.element.appendChild(this.hpBar);

    this.shieldElement = document.createElement('div');
    this.shieldElement.className = 'shield-effect';
    this.shieldElement.style.display = 'none';
    this.element.appendChild(this.shieldElement);

    const battlefield = document.getElementById('battlefield') || document.body;
    battlefield.appendChild(this.element);

    this.updatePosition();
    this.updateHpBar();
  }

  upgradeStar() {
    this.starLevel = Math.min(3, this.starLevel + 1);
  }

  activateShield(durationFrames = 300) {
    this.shieldTimer = durationFrames;
    this.shieldElement.style.display = 'block';
  }

  takeDamage(amount = 1) {
    if (this.shieldTimer > 0 || !this.isAlive) return false;

    this.hp -= amount;
    this.updateHpBar();

    if (this.starLevel > 1) this.starLevel--;

    if (this.hp <= 0) {
      this.hp = 0;
      new Explosion(this.x, this.y);
      this.destroy();
      return true;
    }
    return false;
  }

  updateHpBar() {
    const percent = Math.max(0, (this.hp / this.maxHp) * 100);
    this.hpFill.style.width = `${percent}%`;
    if (percent <= 35) this.hpFill.style.background = '#ff4757';
    else if (percent <= 60) this.hpFill.style.background = '#f1c40f';
    else this.hpFill.style.background = '#2ecc71';
  }

  move(dir, map, base, mapWidth = 600, mapHeight = 440) {
    this.direction = dir;

    // 【经典红白机手感优化：转弯智能吸附对齐网格】
    // 当上下开动时，如果 X 偏差在 6 像素以内，自动对齐到通道正中心，丝滑进入狭窄通道！
    if (dir === 'UP' || dir === 'DOWN') {
      const targetX = Math.round((this.x - 2) / 40) * 40 + 2;
      if (Math.abs(this.x - targetX) <= 6) {
        this.x = targetX;
      }
    } else if (dir === 'LEFT' || dir === 'RIGHT') {
      const targetY = Math.round((this.y - 2) / 40) * 40 + 2;
      if (Math.abs(this.y - targetY) <= 6) {
        this.y = targetY;
      }
    }

    let nextX = this.x;
    let nextY = this.y;

    if (dir === 'UP') nextY -= this.speed;
    else if (dir === 'DOWN') nextY += this.speed;
    else if (dir === 'LEFT') nextX -= this.speed;
    else if (dir === 'RIGHT') nextX += this.speed;

    // 地图边界检测
    if (nextX < 0 || nextX > mapWidth - this.width || nextY < 0 || nextY > mapHeight - this.height) {
      this.updatePosition();
      return false;
    }

    const tankRect = { x: nextX, y: nextY, width: this.width, height: this.height };

    // 地图障碍物检测
    if (map && map.isObstacleForTank(tankRect)) {
      this.updatePosition();
      return false;
    }

    // 基地老鹰阻挡检测
    if (base && !base.isDestroyed) {
      const isOverlapBase = (
        tankRect.x < base.x + base.width &&
        tankRect.x + tankRect.width > base.x &&
        tankRect.y < base.y + base.height &&
        tankRect.y + tankRect.height > base.y
      );
      if (isOverlapBase) {
        this.updatePosition();
        return false;
      }
    }

    // 成功移动
    this.x = nextX;
    this.y = nextY;
    this.updatePosition();
    return true;
  }

  shoot() {
    if (this.cooldown > 0 || !this.isAlive) return [];
    this.cooldown = this.starLevel === 1 ? 20 : this.starLevel === 2 ? 14 : 9;

    let bx = this.x + 14;
    let by = this.y + 14;
    if (this.direction === 'UP') by = this.y - 4;
    else if (this.direction === 'DOWN') by = this.y + 32;
    else if (this.direction === 'LEFT') bx = this.x - 4;
    else if (this.direction === 'RIGHT') bx = this.x + 32;

    const bullets = [];
    const speed = this.starLevel >= 2 ? 9 : 7;

    bullets.push(new Bullet(bx, by, this.direction, speed, this.type));

    if (this.starLevel === 3) {
      if (this.direction === 'UP' || this.direction === 'DOWN') {
        bullets.push(new Bullet(bx - 10, by, this.direction, speed, this.type));
        bullets.push(new Bullet(bx + 10, by, this.direction, speed, this.type));
      } else {
        bullets.push(new Bullet(bx, by - 10, this.direction, speed, this.type));
        bullets.push(new Bullet(bx, by + 10, this.direction, speed, this.type));
      }
    }

    return bullets;
  }

  update() {
    if (this.cooldown > 0) this.cooldown--;
    if (this.shieldTimer > 0) {
      this.shieldTimer--;
      if (this.shieldTimer <= 0) {
        this.shieldElement.style.display = 'none';
      }
    }
  }

  updatePosition() {
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
    const angles = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 };
    this.element.style.transform = `rotate(${angles[this.direction]}deg)`;
  }

  destroy() {
    this.isAlive = false;
    if (this.element && this.element.parentNode) {
      this.element.remove();
    }
  }
}
