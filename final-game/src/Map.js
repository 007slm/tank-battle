import { Tile } from './Tile.js';
import { Collision } from './Collision.js';

export class GameMap {
  constructor(cols = 15, rows = 11, tileSize = 40) {
    this.cols = cols;
    this.rows = rows;
    this.tileSize = tileSize;
    this.tiles = [];
    this.typeNames = { 1: 'brick', 2: 'iron', 3: 'water', 4: 'grass' };
  }

  loadGrid(gridData) {
    // 销毁上一关残留的所有瓦片
    for (let t of this.tiles) t.destroy();
    this.tiles = [];

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const val = gridData[r][c];
        if (val !== 0) {
          const type = this.typeNames[val];
          this.tiles.push(new Tile(c, r, type, this.tileSize));
        }
      }
    }
  }

  isObstacleForTank(rect) {
    for (let tile of this.tiles) {
      if (tile.isAlive && (tile.type === 'brick' || tile.type === 'iron' || tile.type === 'water')) {
        if (Collision.isOverlap(rect, tile)) {
          return true;
        }
      }
    }
    return false;
  }

  checkBulletHit(bullet) {
    for (let tile of this.tiles) {
      if (tile.isAlive && (tile.type === 'brick' || tile.type === 'iron')) {
        if (Collision.isOverlap(bullet, tile)) {
          bullet.destroy();
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
