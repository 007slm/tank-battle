# 第 7 课：炮火对决 —— 生命值与火花爆炸 💥

战车不是纸糊的！在这一课中，我们将为坦克装上**装甲生命值（HP）**与**头顶血条**，并在战车阵亡时引爆华丽的爆炸动画！

---

## 🎯 这一课学什么？
1. **生命值属性（`this.hp` 与 `this.maxHp`）**：记录战车还能承受几次打击。
2. **扣血方法（`takeDamage(damage)`）**：
   - 扣减血量；
   - 实时计算百分比 `(this.hp / this.maxHp) * 100`，动态缩短血条；
   - 根据血量变色：满血绿色 ➡️ 掉血黄色 ➡️ 残血红色！
3. **爆炸特效类（`class Explosion`）**：面向对象的爆炸实体，通过 `setTimeout` 在 0.35 秒后自动销毁自己。

---

## 💻 核心代码拆解

### 1. 扣血与爆炸 (`src/Tank.js`)
```javascript
takeDamage(amount = 1) {
  this.hp -= amount;
  this.updateHpBar(); // 刷新头顶血条

  // 如果血量打光，引发大爆炸！
  if (this.hp <= 0) {
    this.hp = 0;
    new Explosion(this.x, this.y); // 原地创建爆炸对象！
    this.destroy();                // 移除坦克
    return true;                   // 阵亡标志
  }
  return false;
}
```

### 2. 爆炸对象的自动生命周期 (`src/Explosion.js`)
```javascript
export class Explosion {
  constructor(x, y) {
    this.element = document.createElement('div');
    this.element.className = 'explosion';
    this.element.innerHTML = '💥';
    // 0.35 秒后动画播放完毕，自我销毁
    setTimeout(() => {
      this.destroy();
    }, 350);
  }
}
```

---

## 🧪 课后动手小挑战！
1. **挑战重装坦克**：中间那辆橙色的大坦克有 2 点生命值，需要命中它 2 炮才能把它彻底消灭！
2. **改装超级厚甲**：打开 `src/Game.js`，把玩家的血量改成 `new Tank(240, 380, 'player1', 10)`，体验 10 点血的巨无霸战车！
