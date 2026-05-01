// VOTEमित्र — Location Engine
// depends on: data.js (STATES_DATA)
class LocationEngine {
  constructor() {
    this.selectedState = null;
    this.selectedCity = null;
  }

  getStates() {
    return STATES_DATA;
  }

  setLocation(state, city) {
    this.selectedState = state;
    this.selectedCity = city || null;
  }

  getLocation() {
    return { state: this.selectedState, city: this.selectedCity };
  }

  getLocationLabel() {
    if (!this.selectedState) return 'Location not set';
    return this.selectedCity
      ? `${this.selectedCity}, ${this.selectedState}`
      : this.selectedState;
  }

  renderSelector(containerId, onSelect) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div class="location-selector">
        <label class="loc-label">Select Your State / UT</label>
        <select id="state-select" class="loc-select">
          <option value="">-- Choose State --</option>
          ${STATES_DATA.map(s => `<option value="${s}" ${this.selectedState === s ? 'selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    `;
    document.getElementById('state-select').addEventListener('change', (e) => {
      this.selectedState = e.target.value || null;
      if (onSelect) onSelect(this.getLocation());
    });
  }
}

// Global: LocationEngine
