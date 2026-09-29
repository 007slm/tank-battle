import { Tank } from './Tank.js';

export class Game {
  constructor() {
    this.mapWidth = 600;
    this.mapHeight = 440;
    this.player = new Tank(280, 360, 'player1');
    this.keys = {

    }; // 记录哪些按键当前被按下了

    this.setupKeyboard();
    this.loop = this.loop.bind(this);
  }

  // 监听键盘按键
  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }

  // 启动游戏主循环
  start() {
    requestAnimationFrame(this.loop);
  }

  // 游戏主心跳循环：每秒刷新 60 次
  loop() {
    // 检查按键，调用坦克的 move 方法
    if (this.keys['KeyW'] || this.keys['ArrowUp']) {
      this.player.move('UP', this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyS'] || this.keys['ArrowDown']) {
      this.player.move('DOWN', this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
      this.player.move('LEFT', this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyD'] || this.keys['ArrowRight']) {
      this.player.move('RIGHT', this.mapWidth, this.mapHeight);
    }

    // 继续下一帧循环
    requestAnimationFrame(this.loop);
  }
}
