/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Premium sound synthesis engine utilizing the Web Audio API to produce gorgeous,
 * brand-cohesive, high-fidelity luxury audio notifications.
 *
 * Sound Profile Designs:
 * 1. Payment Gilt-Chime (Customer checkout success): An exquisite double-tap of shimmering
 *    frequencies (F#5 to A#5 to C#6) with harmonic metallic content resembling gold coins
 *    or custom high-end crystal glassware rings.
 * 2. Royal Staff Fanfare Alert (Admin new order drops): A deep, prestigious ascending arpeggio
 *    (C5 -> E5 -> G5 -> C6) with warm, organic woodwind-like timbre. Gently notifies staff of
 *    incoming celebrations.
 */

class LuxurySoundEngine {
  private activeCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy initialize to bypass initial lock warnings
    this.isMuted = localStorage.getItem('aqeelah_audio_muted') === 'true';
  }

  /**
   * Safe AudioContext initializer
   */
  private getContext(): AudioContext | null {
    if (this.isMuted) return null;

    if (!this.activeCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.activeCtx = new AudioCtxClass();
      }
    }

    // Handle browser auto-play gesture state locks
    if (this.activeCtx && this.activeCtx.state === 'suspended') {
      this.activeCtx.resume().catch(() => {
        // Safe silent bypass
      });
    }

    return this.activeCtx;
  }

  /**
   * Access mute status
   */
  public getMuteStatus(): boolean {
    return this.isMuted;
  }

  /**
   * Set mute status
   */
  public setMuteStatus(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('aqeelah_audio_muted', muted ? 'true' : 'false');
  }

  /**
   * Synthesize a premium luxury chime plucked note
   */
  private playPluckedChime(
    ctx: AudioContext,
    freq: number,
    startTime: number,
    duration: number,
    volume: number = 0.2,
    timbreType: 'crystal' | 'warm' = 'crystal'
  ) {
    // 1. Gain Node (Envelope controller)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, startTime);
    // Almost instant attack for clarity
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.006);
    // Smooth, long decay
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // 2. Primary Tone Oscillator
    const osc1 = ctx.createOscillator();
    osc1.frequency.setValueAtTime(freq, startTime);

    // 3. Crisp Secondary Harmonic (Adds metallic shimmer or timber warmth)
    const osc2 = ctx.createOscillator();
    
    if (timbreType === 'crystal') {
      // Golden Ratio Harmonic for sparkling crystalline ring
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.019, startTime); 
    } else {
      // Warm, soft square harmonic for woodwind-like roundness
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 1.5, startTime); // Fifth interval layer
    }

    // Split volumes between components
    const subGain1 = ctx.createGain();
    const subGain2 = ctx.createGain();

    subGain1.gain.setValueAtTime(0.7, startTime);
    subGain2.gain.setValueAtTime(0.25, startTime);

    // Assemble graph
    osc1.connect(subGain1);
    osc2.connect(subGain2);

    subGain1.connect(gainNode);
    subGain2.connect(gainNode);

    gainNode.connect(ctx.destination);

    // Trigger start and clean scheduling stop
    osc1.start(startTime);
    osc2.start(startTime);

    osc1.stop(startTime + duration + 0.1);
    osc2.stop(startTime + duration + 0.1);
  }

  /**
   * TRIGGER: Shimmering Payment Gilt-Chime
   * Perfect high-tea golden double bell tone. Played when payment clears.
   */
  public playPaymentSuccessSound() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Elegant crystal major 7th chord arpeggio played fast (double bell ring)
      const rootFreq = 587.33; // D5 (Bright & Elegant)
      const thirdFreq = 739.99; // F#5 (Bright, positive major)
      const fifthFreq = 880.00; // A5 (Resonating pristine)
      const octaveFreq = 1174.66; // D6 (Heavenly crystal peak)

      // Play soft gold cascading double bells
      this.playPluckedChime(ctx, rootFreq, now, 0.8, 0.15, 'crystal');
      this.playPluckedChime(ctx, thirdFreq, now + 0.04, 1.2, 0.18, 'crystal');
      this.playPluckedChime(ctx, fifthFreq, now + 0.12, 1.5, 0.20, 'crystal');
      this.playPluckedChime(ctx, octaveFreq, now + 0.18, 2.0, 0.12, 'crystal');

    } catch (err) {
      console.warn('Audio synthesis bypassed secure container constraints safely', err);
    }
  }

  /**
   * TRIGGER: Royal Staff Concierge Call Fanfare
   * Ascending velvet major triad. Welcomes staff when a new order registers.
   */
  public playNewOrderStaffSound() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Prestige ascending warm concierge notes (C5 -> E5 -> G5 -> C6)
      const c5 = 523.25;
      const e5 = 659.25;
      const g5 = 783.99;
      const c6 = 1046.50;

      // Soft, stately pace
      this.playPluckedChime(ctx, c5, now, 1.4, 0.22, 'warm');
      this.playPluckedChime(ctx, e5, now + 0.12, 1.6, 0.22, 'warm');
      this.playPluckedChime(ctx, g5, now + 0.24, 1.8, 0.24, 'warm');
      this.playPluckedChime(ctx, c6, now + 0.36, 2.5, 0.18, 'warm');

    } catch (err) {
      console.warn('Audio synthesis bypassed staff coordinates safely', err);
    }
  }
}

export const luxuryAudio = new LuxurySoundEngine();
