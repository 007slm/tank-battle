export class Particle {
  constructor(x, y, color = '#ff7675') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2 + Math.random() * 3.5;
    this.life = 1.0;
    this.decay = 0.02 + Math.random() * 0.03;

    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.94;
    this.vy *= 0.94;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class Explosion {
  static create(x, y, count = 24) {
    const particles = [];
    const colors = ['#ff4757', '#ffa502', '#ff6348', '#ffffff', '#ffd32a', '#00f2fe'];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, color));
    }
    return particles;
  }
}
