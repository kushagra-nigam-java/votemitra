// VOTEमित्र — Flow Engine
// depends on: data.js (FLOW_DATA)
class FlowEngine {
  constructor(onNavigate) {
    this.history = [];
    this.currentNodeId = null;
    this.onNavigate = onNavigate;
  }

  start() {
    this.history = [];
    this.navigateTo('init');
  }

  navigateTo(nodeId) {
    if (!FLOW_DATA[nodeId]) return;
    if (this.currentNodeId && this.currentNodeId !== nodeId) {
      this.history.push(this.currentNodeId);
    }
    this.currentNodeId = nodeId;
    const node = FLOW_DATA[nodeId];
    if (this.onNavigate) this.onNavigate(node, this.history);
  }

  goBack() {
    if (this.history.length === 0) return;
    const prevId = this.history.pop();
    this.currentNodeId = prevId;
    const node = FLOW_DATA[prevId];
    if (this.onNavigate) this.onNavigate(node, this.history);
  }

  canGoBack() {
    return this.history.length > 0;
  }

  getCurrentNode() {
    return FLOW_DATA[this.currentNodeId];
  }

  getBreadcrumbs() {
    const crumbs = this.history.map(id => ({
      id,
      label: FLOW_DATA[id]?.step || id
    }));
    if (this.currentNodeId) {
      crumbs.push({
        id: this.currentNodeId,
        label: FLOW_DATA[this.currentNodeId]?.step || this.currentNodeId,
        active: true
      });
    }
    return crumbs;
  }
}

// Global: FlowEngine
