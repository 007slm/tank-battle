# 🎮 经典坦克大战：少儿 ES6 面向对象编程实战课 (Tank Battle)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
[![Zero Config](https://img.shields.io/badge/Build-Zero%20Config%20(No%20Webpack%2FVite)-brightgreen)](.)
[![Audio](https://img.shields.io/badge/Audio-Web%20Audio%20API-blue)](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/007slm/tank-battle/pulls)

为初学者与少儿量身打造的 **JavaScript (ES6) 坦克大战面向对象（OOP）编程实战教程** 与 **完整双人同屏复古街机游戏**。

本项目彻底告别传统游戏开发中晦涩难懂的 Canvas 图形数学坐标绘图，采用教学最推崇的 **“DOM + 图片实体面向对象架构”** —— 屏幕上的每一个坦克、每一颗子弹、每一块红砖都是一个看得见摸得着的真实对象实体！打开 F12 控制台审查元素即可实时调试，所见即所得。

---

## 🌟 核心特色

1. **直观具象的面向对象（OOP）教学**：
   - **类（Class）是图纸**：封装 `class Tank`, `class Bullet`, `class Tile`, `class Base`, `class PowerUp`。
   - **对象（Object）是实体**：`new Tank()` 构造函数直接创建真实 DOM 节点并挂载至战场，结构一清二楚。
   - **继承与多态**：`EnemyTank extends Tank`，通过代码复用轻松实现巡逻敌军与不同类型战车。
2. **零打包门槛，纯原生 ES6 模块化**：
   - 彻底摒弃 Webpack / Vite / Rollup 等繁琐配置与安装环节，浏览器直接加载原生 ES6 模块。
   - 打开即用，教学与演示毫无阻碍。
3. **纯代码程序化 8-bit 声效（Web Audio API）**：
   - 无需外置 MP3/WAV 音频文件，纯代码动态合成开火、爆炸、拾取道具与通关胜利音效，永不出现 404 资源丢失。
4. **阶梯式渐进教程（10 节课 + 终极完整版）**：
   - 从第 1 课的“绘制第一辆战车”到第 10 课的“音效与计分”，循序渐进搭建完整游戏体系。
5. **终极完整版游戏功能丰富**：
   - 支持 **1P 单人闯关** 与 **1P + 2P 双人同屏协作对战**。
   - 包含 **5 大特色关卡**（平原突围、水网封锁、丛林迷踪、钢铁要塞、终极决战）。
   - 丰富的掉落道具系统（⭐ 武器升级主炮三叉戟、🛡️ 金钟罩无敌护盾、💣 全屏手雷核弹、⏱️ 定身时钟）。

---

## 🕹️ 游戏操作指南

### 终极完整版操作按键

| 角色 | 移动控制 | 射击开火 | 特性说明 |
|:---|:---|:---|:---|
| **🟢 1P 玩家（翡翠绿战车）** | `W` `A` `S` `D` | `空格键 (Space)` 或 `J` | 经典主角战车，可升级主炮形态与拾取道具 |
| **🟡 2P 玩家（金黄色战车）** | `↑` `↓` `←` `→` 方向键 | `Enter` 回车键 | 需在顶部勾选开启【开启 2P 双人对战】 |

> **提示**：页面顶部支持随时选择 1~5 关卡切换、开启/关闭 2P 双人模式、以及一键静音/开启声音。

---

## 🚀 快速开始与本地运行

> ⚠️ **注意**：由于项目采用原生 ES6 模块（`import`/`export`），受现代浏览器的同源安全策略（CORS）限制，建议通过本地 HTTP 静态服务器访问，而非直接通过 `file://` 双击打开。

推荐使用以下任意一种快速方式启动本地服务：

### 方式 1：VS Code Live Server 插件（最推荐）
1. 在 VS Code 中打开本项目根目录。
2. 安装扩展插件 **Live Server**。
3. 右键点击 `index.html`，选择 **"Open with Live Server"**。

### 方式 2：使用 Node.js / npx
无需全局安装，在终端进入项目根目录运行：
```bash
npx serve .
# 或
npx http-server -p 3000
```
打开浏览器访问：`http://localhost:3000`

### 方式 3：使用 Python
若电脑安装了 Python，在项目根目录下运行：
```bash
# Python 3
python -m http.server 3000
```
打开浏览器访问：`http://localhost:3000`

---

## 🗺️ 10 节精品课程阶梯路线

| 课号 | 课程名称 | 面向对象核心知识点 | 游戏机制与视觉体验 | 快速体验 |
|:---:|:---|:---|:---|:---:|
| **第 01 课** | 类与对象初探 | `class` 概念、构造函数 `constructor`、属性 `this.x, this.y` | 战场上实例化生成第一辆翡翠绿战车 | [运行体验](./lessons/lesson-01-draw-tank/index.html) |
| **第 02 课** | 对象的方法 | 对象的方法 `move(dir)`、键盘事件监听 `keydown/keyup` | WASD 控制战车平滑四向行驶与防出界 | [运行体验](./lessons/lesson-02-tank-move/index.html) |
| **第 03 课** | 对象的创建与销毁 | 对象的生命周期、动态实例 `new Bullet()`、边界回收 `destroy()` | 空格键开火、发射子弹与自动销毁 | [运行体验](./lessons/lesson-03-fire-bullet/index.html) |
| **第 04 课** | 二维网格与地图对象 | 二维数组 `Grid`、瓦片类 `class Tile`、双重循环渲染 | 铺设红砖墙、坚固铁壁、水洼与隐蔽草丛 | [运行体验](./lessons/lesson-04-grid-map/index.html) |
| **第 05 课** | 物理碰撞检测 | AABB 矩形重叠算法、移动预判、地块击碎逻辑 | 战车撞墙阻挡、炮轰碎砖打通战术通道 | [运行体验](./lessons/lesson-05-collision/index.html) |
| **第 06 课** | 面向对象继承与敌人AI | 类继承 `extends`、`super()`、极简巡逻状态机 | 敌人自动漫步巡逻、撞墙自动换向与开火 | [运行体验](./lessons/lesson-06-enemy-ai/index.html) |
| **第 07 课** | 生命值与火花爆炸 | 属性 `this.hp`、动态血条更新、`class Explosion` 粒子 | 扣血受击、血量归零触发原地粒子爆炸 | [运行体验](./lessons/lesson-07-hp-explosion/index.html) |
| **第 08 课** | 基地保卫与胜负规则 | `class Base` 老鹰司令部、全局游戏状态机 | 守护基地老鹰雕像、全歼敌军胜利与结算 | [运行体验](./lessons/lesson-08-base-defense/index.html) |
| **第 09 课** | 神秘宝箱与战车变身 | `class PowerUp` 道具实体、战车形态升级、Buff 倒计时 | 拾取星星升级双发大炮、无敌护盾、全屏核弹 | [运行体验](./lessons/lesson-09-powerups/index.html) |
| **第 10 课** | 声波合成与街机记分 | 原生 Web Audio 声波合成器、`class HUD` 仪表盘 | 纯代码 8-bit 开火/爆炸音效与复古街机 HUD | [运行体验](./lessons/lesson-10-retro-audio/index.html) |
| **终极项目** | **超级坦克大战完整版** | 多关卡切换（Stage 1 ~ 5）、双人同屏对战（1P + 2P） | 战役征战、双人协作畅玩完整大作！ | [🎮 立即畅玩](./final-game/index.html) |

---

## 📖 小程序员必备 · 坦克大战英语单词速查表 🔤

> **💡 家长与小魔法师导读**：写代码就像用英语向电脑发出魔法指令！掌握这几个核心词汇，看代码就会像读故事一样轻松！

### 1. 游戏核心实体（你是谁？）
| 英文单词 | 发音助记 | 中文含义 | 代码中的作用与形象 |
|:---|:---|:---|:---|
| **Tank** | /tæŋk/ | 坦克 / 战车 | 游戏的主角与敌军战车 `class Tank` |
| **Enemy** | /ˈen.ə.mi/ | 敌人 / 敌军 | 敌方阵营坦克 `class EnemyTank` |
| **Bullet** | /ˈbʊl.ɪt/ | 子弹 / 炮弹 | 坦克发射出膛的飞行动弹 `class Bullet` |
| **Tile** | /taɪl/ | 瓦片 / 地块 | 构成战场的砖块、铁壁等网格方块 `class Tile` |
| **Base** | /beɪs/ | 基地 / 司令部 | 我们必须誓死守护的老鹰雕像 `class Base` 🦅 |
| **PowerUp** | /ˈpaʊ.ər.ʌp/ | 道具 / 宝箱 | 击毁敌人后掉落的强化道具 `class PowerUp` ⭐ |
| **Explosion** | /ɪkˈspləʊ.ʒən/ | 爆炸 / 火花 | 战车或砖块被摧毁时的爆炸特效 `class Explosion` 💥 |

### 2. 战车属性与特征（你有什么？）
| 英文单词 | 中文含义 | 代码示例 | 通俗解释 |
|:---|:---|:---|:---|
| **x, y** | 横坐标、纵坐标 | `this.x = 200;` | 战车在屏幕上的具体水平与垂直位置 |
| **width, height** | 宽度、高度 | `this.width = 36;` | 战车的身体有多宽、多高 |
| **speed** | 速度 | `this.speed = 3;` | 坦克每一步开多快（数值越大跑得越快） |
| **direction** | 方向 / 朝向 | `this.direction = 'UP';` | 炮头指向的方向（`UP` 上, `DOWN` 下, `LEFT` 左, `RIGHT` 右） |
| **hp (Health Point)** | 生命值 / 血量 | `this.hp = 3;` | 战车的装甲血量（被击中扣减） |
| **isAlive** | 是否存活 | `this.isAlive = true;` | `true` 代表活着，`false` 代表阵亡 |
| **cooldown** | 冷却时间 (CD) | `this.cooldown = 15;` | 开炮后的装填时间，防止无限制瞬间连发 |

### 3. 动作与技能方法（你能做什么？）
| 英文单词 | 中文含义 | 魔法代码 | 电脑执行的动作 |
|:---|:---|:---|:---|
| **move** | 移动 | `tank.move('UP')` | 命令坦克向指定的方向开动一步 |
| **shoot** | 射击 / 开火 | `tank.shoot()` | 从炮口创建并发射一颗新的子弹 |
| **think** | 思考 / 巡逻 | `enemy.think()` | 敌人大脑根据前方是否有障碍物决定往哪开 |
| **takeDamage** | 受到伤害 | `tank.takeDamage(1)` | 坦克被击中，扣减 1 点生命值 |
| **destroy** | 销毁 / 移除 | `brick.destroy()` | 从屏幕和内存中彻底删除该物体 |
| **upgrade** | 升级 / 强化 | `player.upgradeStar()` | 战车拾取星星后，升级为主炮双发/三叉戟 |
| **freeze** | 冰冻 / 定身 | `enemy.freeze(240)` | 敌人被时钟道具冰冻，定住无法动弹 |

### 4. 战场地形与宝箱道具
| 英文单词 | 中文含义 | 对应图标 | 战场特性 |
|:---|:---|:---|:---|
| **brick** | 红砖墙 | 🧱 | 普通掩体，可以被子弹一炮轰碎 |
| **iron** | 坚固铁壁 | ⚙️ | 坚不可摧，阻挡坦克也挡普通子弹 |
| **water** | 水面 / 河流 | 🌊 | 坦克开不过去，但子弹可以凌空飞过 |
| **grass** | 森林草丛 | 🌿 | 隐蔽草丛，坦克钻进去可以半隐身 |
| **star** | 五角星 | ⭐ | 武器升级道具，提高射速与炮弹数量 |
| **shield** | 金钟罩护盾 | 🛡️ | 获得 5 秒无敌光圈，免疫一切伤害 |
| **bomb** | 全屏手雷 | 💣 | 瞬间引爆并歼灭当前屏幕上的所有敌军 |
| **clock** | 定身时钟 | ⏱️ | 让所有敌人暂停行动 4 秒钟 |

### 5. 编程语法魔法词（核心代码地基）
| 语法单词 | 中文含义 | 通俗比喻 |
|:---|:---|:---|
| **class** | 类 | **设计图纸**（如：定义什么是坦克） |
| **constructor** | 构造函数 | **汽车组装流水线**（只要 `new` 一下，就会执行这里组装出新坦克） |
| **this** | 这个 / 自身 | **我自己**（如：`this.speed` 指我这辆战车自己的速度） |
| **extends** | 继承 | **站在巨人的肩膀上**（`EnemyTank extends Tank` 继承基础坦克所有能力） |
| **super** | 父类 | **召唤基类的能力**（子类调用父类的构造方法与能力） |
| **return** | 返回 / 交出 | 动作执行完后交出的结果（如：开炮后 `return` 交出一颗子弹） |
| **import / export** | 引入 / 导出 | 把别的工具箱（文件）里的积木借过来使用 |

---

## 📂 项目结构概览

```text
tank-battle/
├── index.html                   # 课程大厅导航主页
├── README.md                    # 项目说明文档与教学讲义
├── LICENSE                      # MIT 开源许可证
├── .gitignore                   # Git 忽略配置
├── final-game/                  # ⭐ 超级坦克大战：终极完整版
│   ├── index.html               # 完整版游戏入口（支持双人与关卡切换）
│   └── src/
│       ├── main.js              # 主入口与生命周期控制
│       ├── Game.js              # 游戏主循环、实体管理与胜负判定
│       ├── Tank.js              # 玩家战车类（含升级/形态/护盾）
│       ├── EnemyTank.js         # 敌方战车类（含巡逻 AI 与射击）
│       ├── Bullet.js            # 炮弹飞行动力学与命中判定
│       ├── Map.js & Tile.js     # 地图渲染与地形瓦片系统
│       ├── Base.js              # 老鹰基地司令部
│       ├── PowerUp.js           # 宝箱掉落道具
│       ├── Explosion.js         # 爆炸特效与粒子系统
│       ├── AudioSynth.js        # Web Audio API 8-bit 程序化音频合成器
│       ├── HUD.js               # 复古街机仪表盘与计分
│       └── levels.js            # 1~5 关卡地图与敌人波次配置
├── lessons/                     # 📚 10 节循序渐进实战课程
│   ├── lesson-01-draw-tank/     # 第 1 课：类与对象初探
│   ├── lesson-02-tank-move/     # 第 2 课：键盘控制移动
│   ├── lesson-03-fire-bullet/   # 第 3 课：开火射击与实体生命周期
│   ├── lesson-04-grid-map/      # 第 4 课：网格地图与瓦片搭建
│   ├── lesson-05-collision/     # 第 5 课：AABB 物理碰撞与破墙
│   ├── lesson-06-enemy-ai/      # 第 6 课：继承与敌人巡逻 AI
│   ├── lesson-07-hp-explosion/  # 第 7 课：血量与粒子爆炸
│   ├── lesson-08-base-defense/  # 第 8 课：基地防御与胜负规则
│   ├── lesson-09-powerups/      # 第 9 课：强化道具与形态升级
│   └── lesson-10-retro-audio/   # 第 10 课：8-bit 音效与 HUD 仪表盘
├── shared/                      # 公共辅助工具库
│   └── audio.js                 # 共享音效合成模块
└── styles/                      # 样式库
    ├── game.css                 # 游戏战场、实体及 UI 样式
    └── main.css                 # 课程主页导航样式
```

---

## 🤝 贡献与参与

欢迎对本项目提出建议、反馈 Issue 或提交 Pull Request：
1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 新建 Pull Request

---

## 📄 许可证

本项目采用 [MIT License](./LICENSE) 开源协议，欢迎广大教师、家长、编程爱好者免费用于教学、学习与二次创作。
