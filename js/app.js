// VOTEमित्र — Main App Controller
// depends on: data.js, vrl.js, flowEngine.js, locationEngine.js

class App {
  constructor() {
    this.flowEngine = new FlowEngine((node, history) => this.renderNode(node, history));
    this.vrl = null;
    this.location = new LocationEngine();
    this.heroVisible = true;
  }

  init() {
    this.vrl = new VRLTracker('vrl-container');
    this.bindHero();
  }

  bindHero() {
    const btn = document.getElementById('hero-start-btn');
    if (btn) {
      btn.addEventListener('click', () => this.startJourney());
    }
  }

  startJourney() {
    const hero = document.getElementById('hero-section');
    const main = document.getElementById('main-app');
    hero.classList.add('hero-exit');
    setTimeout(() => {
      hero.style.display = 'none';
      main.classList.add('app-visible');
      this.flowEngine.start();
    }, 600);
  }

  renderNode(node, history) {
    this.vrl.update(node.vrl, node.step);
    this.renderBreadcrumbs(history, node);
    this.renderContent(node);
    this.renderBackButton();
  }

  renderBreadcrumbs() {
    const crumbs = this.flowEngine.getBreadcrumbs();
    const el = document.getElementById('breadcrumbs');
    if (crumbs.length <= 1) {
      el.innerHTML = '';
      return;
    }
    el.innerHTML = crumbs.map((c, i) =>
      `<span class="crumb ${c.active ? 'crumb-active' : 'crumb-link'}"
            ${!c.active ? `data-id="${c.id}"` : ''}>${c.label}</span>${i < crumbs.length - 1 ? '<span class="crumb-sep">›</span>' : ''}`
    ).join('');

    el.querySelectorAll('.crumb-link').forEach(link => {
      link.addEventListener('click', () => {
        const targetId = link.dataset.id;
        // Navigate back to that point
        while (this.flowEngine.currentNodeId !== targetId && this.flowEngine.canGoBack()) {
          this.flowEngine.goBack();
        }
      });
    });
  }

  renderContent(node) {
    const content = document.getElementById('flow-content');
    content.classList.remove('content-enter');
    void content.offsetWidth; // force reflow
    content.classList.add('content-enter');

    const isInit = node.id === 'init';

    content.innerHTML = `
      <div class="status-bar">
        <span class="status-step">Step: ${node.step}</span>
        <span class="status-vrl">Readiness: ${node.vrl}%</span>
      </div>

      <div class="context-block">
        <div class="context-label">Your Current Position</div>
        <p class="context-text">${node.context}</p>
      </div>

      <div class="guidance-block">
        <div class="guidance-label">${isInit ? 'How It Works' : 'Guidance'}</div>
        <p class="guidance-text">${node.guidance}</p>
      </div>

      ${node.actions.length > 0 ? `
        <div class="actions-block">
          <div class="actions-label">${isInit ? '' : 'Action Steps'}</div>
          <ol class="actions-list">
            ${node.actions.map((a, i) => `<li class="action-item" style="animation-delay:${i * 80}ms">${a}</li>`).join('')}
          </ol>
        </div>
      ` : ''}

      ${node.critical ? `
        <div class="critical-block">
          <div class="critical-icon">!</div>
          <div class="critical-content">
            <div class="critical-label">Important</div>
            <p class="critical-text">${node.critical}</p>
          </div>
        </div>
      ` : ''}

      <div class="options-block">
        <div class="options-label">${isInit ? 'Choose Your Situation' : 'What would you like to do next?'}</div>
        <div class="options-grid ${isInit ? 'options-init' : ''}">
          ${node.options.map((opt, i) => `
            <button class="option-card" data-next="${opt.next}" style="animation-delay:${i * 100 + 200}ms">
              <span class="option-letter">${String.fromCharCode(65 + i)}</span>
              <span class="option-text">${opt.label}</span>
              <span class="option-arrow">→</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    content.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.add('option-pressed');
        setTimeout(() => {
          this.flowEngine.navigateTo(card.dataset.next);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
      });
    });
  }

  renderBackButton() {
    const el = document.getElementById('back-btn');
    if (this.flowEngine.canGoBack()) {
      el.style.display = 'flex';
      el.onclick = () => this.flowEngine.goBack();
    } else {
      el.style.display = 'none';
    }
  }
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
