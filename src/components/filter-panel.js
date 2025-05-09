import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class FilterPanel extends LitElement {
  static properties = {
    character: { type: Object },
    isFavorite: { type: Boolean },
  };

  constructor() {
    super();
    this.character = {};
    this.isFavorite = false;
  }

  static styles = css`
    .filter-controls {
      display: flex;
      gap: 1rem;
      margin-left: 1rem;
    }
    select {
      padding: 0.7rem;
      border: 1px solid lightgray;
      border-radius: 4px;
      font-size: 1rem;
    }
  `;
  handleFilterChange(e){
    this.dispatchEvent(new CustomEvent('filter', {
        detail: { value: e.target.value },
        bubbles: true,
        composed: true
      }));
  }

  render() {
    return html`
      <div class="filter-controls">
        <select id="filter-type" @change=${this.handleFilterChange}>
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="tvShow">TV Shows</option>
        </select>
      </div>
    `;
  }
}

customElements.define("filter-panel", FilterPanel);
