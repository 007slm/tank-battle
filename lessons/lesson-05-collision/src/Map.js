import { Tile } from './Tile.js';
import { Collision } from './Collision.js';

export class GameMap {
  constructor(cols = 15, rows = 11, tileSize = 40) {
    this.cols = cols;
    this.rows = rows;
    this.tileSize = tileSize;
    this.tiles = [];

    this.grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 2, 0, 1, 0, 2, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 4, 4, 4, 0, 3, 3, 3, 3, 3, 0, 4, 4, 4, 0],
      [0, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0],
      [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ];

    this.typeNames = { 1: 'brick', 2: 'iron', 3: 'water', 4: 'grass' };
    this.createTiles();
  }

  createTiles() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const val = this.grid[r][c];
        if (val !== 0) {
          const type = this.typeNames[val];
          this.tiles.push(new Tile(c, r, type, this.tileSize));
        }
      }
    }
  }

  // 检查坦克移动目标位置是否会撞上障碍物 (砖墙/铁壁/水洼)
  isObstacleForTank(rect) {
    for (let tile of this.tiles) {
      if (tile.isAlive && (tile.type === 'brick' || tile.type === 'iron' || tile.type === 'water')) {
        if (Collision.isOverlap(rect, tile)) {
          return true; // 发生碰撞，阻挡坦克！
        }
      }
    }
    return false;
  }

  // 检查子弹是否打中了砖墙或铁壁
  checkBulletHit(bullet) {
    for (let tile of this.tiles) {
      if (tile.isAlive && (tile.type === 'brick' || tile.type === 'iron')) {
        if (Collision.isOverlap(bullet, tile)) {
          bullet.destroy(); // 销毁子弹

          // 如果打中红砖墙，红砖被摧毁！
          if (tile.type === 'brick') {
            tile.destroy();
          }
          return true;
        }
      }
    }
    return false;
  }
}
