// VOTEमित्र — VRL (Voter Readiness Level) Module
// depends on: nothing
class VRLTracker {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentVRL = 0;
    this.targetVRL = 0;
    this.currentStep = 'Start';
    this.animationFrame = null;
    this.render();
  }

  getStageInfo(vrl) {
    if (vrl <= 30) return { label: 'Getting Started', color: '#ef4444', glow: 'rgba(239,68,68,0.3)' };
    if (vrl <= 60) return { label: 'In Progress', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' };
    if (vrl <= 90) return { label: 'Almost Ready', color: '#3b82f6', glow: 'rgba(59,130,246,0.3)' };
    return { label: 'Fully Prepared', color: '#10b981', glow: 'rgba(16,185,129,0.3)' };
  }

  render() {
    const stage = this.getStageInfo(this.currentVRL);
    this.container.innerHTML = `
      <div class="vrl-widget">
        <div class="vrl-gauge-wrap">
          <svg class="vrl-gauge" viewBox="0 0 120 120">
            <circle class="vrl-track" cx="60" cy="60" r="52" />
            <circle class="vrl-fill" cx="60" cy="60" r="52"
              stroke="${stage.color}"
              stroke-dasharray="${(this.currentVRL / 100) * 326.73} 326.73"
              filter="url(#glow)" />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
          </svg>
          <div class="vrl-value" style="color:${stage.color}">${Math.round(this.currentVRL)}%</div>
        </div>
        <div class="vrl-info">
          <div class="vrl-label">Voter Readiness</div>
          <div class="vrl-stage" style="color:${stage.color}">${stage.label}</div>
          <div class="vrl-step">Step: ${this.currentStep}</div>
        </div>
      </div>
    `;
  }

  update(newVRL, stepName) {
    this.targetVRL = Math.min(100, Math.max(0, newVRL));
    this.currentStep = stepName || this.currentStep;
    this._animate();
  }

  _animate() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    const step = () => {
      const diff = this.targetVRL - this.currentVRL;
      if (Math.abs(diff) < 0.5) {
        this.currentVRL = this.targetVRL;
        this.render();
        return;
      }
      this.currentVRL += diff * 0.08;
      this.render();
      this.animationFrame = requestAnimationFrame(step);
    };
    step();
  }
}

// Global: VRLTracker
