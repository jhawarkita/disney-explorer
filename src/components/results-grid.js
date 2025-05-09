import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class ResultsGrid extends LitElement {
  static properties = {
    characters: { type: Array },
    favorites: { type: Array },
    loading: { type: Boolean },

  };

  constructor() {
    super();
    this.characters = [];
    this.favorites = [];
    this.loading = false;
  }

  static styles = css`
     .result-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
    }
    
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      color: #666;
    }
    
    .no-results {
      text-align: center;
      padding: 2rem;
      color: #666;
      font-size: 1.1rem;
    }
    
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `;

  render() {
    if (this.loading) {
      return html`
        <div class="loading">
          Loading Disney characters...
        </div>
      `;
    }

    if (!this.characters.length) {
      return html`
        <div class="no-results">
          No characters found.
        </div>
      `;
    }

    return html`
      <div class="result-container">
        ${this.characters.map((character) => {
          const isFavorite = this.favorites.some(fav => fav._id === character._id);
          
          return html`
            <character-card 
              .character=${character} 
              .isFavorite=${isFavorite}
            ></character-card>
          `;
        })}
      </div>
    `;
  }
}
customElements.define("results-grid", ResultsGrid);