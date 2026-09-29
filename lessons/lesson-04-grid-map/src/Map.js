import { Tile } from './Tile.js';

export class GameMap {
  constructor(cols = 15, rows = 11, tileSize = 40) {
    this.cols = cols;
    this.rows = rows;
    this.tileSize = tileSize;
    this.tiles = []; // 存放所有瓦片对象

    // 0=空地, 1=红砖(brick), 2=铁壁(iron), 3=水面(water), 4=草丛(grass)
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
}
