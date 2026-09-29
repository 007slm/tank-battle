import { Tank } from './Tank.js';

export class Game {
  constructor() {
    this.mapWidth = 600;
    this.mapHeight = 440;
    this.player = new Tank(280, 360, 'player1');
    this.bullets = []; // 存放当前战场上所有正在飞行的子弹对象
    this.keys = {};
    this.updateConunt = 0
    this.setupKeyboard();
    this.loop = this.loop.bind(this);
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      // 按空格键或 J 键开火！
      if (e.code === 'Space' || e.code === 'KeyJ') {
        let bullet = this.player.shoot();
        if (bullet) {
          this.bullets.push(bullet); // 把新子弹放进数组管理
        }
        setTimeout(() => {
          bullet = this.player.shoot();
          if (bullet) {
            this.bullets.push(bullet); // 把新子弹放进数组管理
          }
        }, 300)

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
    // 1. 玩家移动
    if (this.keys['KeyW'] || this.keys['ArrowUp']) {
      this.player.move('UP', this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyS'] || this.keys['ArrowDown']) {
      this.player.move('DOWN', this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
      this.player.move('LEFT', this.mapWidth, this.mapHeight);
    } else if (this.keys['KeyD'] || this.keys['ArrowRight']) {
      this.player.move('RIGHT', this.mapWidth, this.mapHeight);
    }
    this.player.update();

    // 2. 遍历所有子弹，向前飞行一步
    for (let bullet of this.bullets) {

      bullet.update(this.mapWidth, this.mapHeight);


    }

    // 3. 从数组中清理已经死亡（飞出屏幕被销毁）的子弹
    this.bullets = this.bullets.filter(b => b.isAlive);

    requestAnimationFrame(this.loop);
  }
}
