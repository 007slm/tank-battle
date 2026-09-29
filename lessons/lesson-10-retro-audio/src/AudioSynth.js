/**
 * 声音合成器 (AudioSynth)
 * 允许孩子实时调节声波类型、起始频率、结束频率与衰减时间，直观感受声音的物理本质！
 */
export class AudioSynth {
  constructor() {
    this.ctx = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * 自定义合成一段音效
   * @param {string} waveType - 'square', 'sine', 'triangle', 'sawtooth'
   * @param {number} startFreq - 起始音调频率 (Hz)
   * @param {number} endFreq - 结束音调频率 (Hz)
   * @param {number} duration - 持续时间 (秒)
   * @param {number} volume - 音量大小 (0.1 ~ 1.0)
   */
  playCustomTone(waveType = 'square', startFreq = 800, endFreq = 100, duration = 0.15, volume = 0.3) {
    this.ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(Math.max(20, startFreq), now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * 播放白噪声爆炸
   */
  playNoiseExplosion(duration = 0.4, cutoffFreq = 600) {
    this.ensureContext();
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(cutoffFreq, now);
    filter.frequency.exponentialRampToValueAtTime(40, now + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }
}
