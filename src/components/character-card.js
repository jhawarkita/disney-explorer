import { LitElement, html, css } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class CharacterCard extends LitElement {
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
    .card {
      border: 1px solid #ddd;
      border-radius: 12px;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      width: 250px;
    }
    
    .image-container {
      height: 200px;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .card-body {
      padding: 1rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }
    
    .info-row {
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .label {
      font-weight: bold;
      color: #555;
    }
    
    .movie-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.3rem;
      margin-top: 0.3rem;
    }
    
    .movie-tag {
      font-size: 0.8rem;
      color: #0066cc;
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
    }
    
    .favorite-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #ccc;
    }
    
    .favorite-btn.active {
      color: #0066cc;
    }

    .details-btn {
      background-color: #0066cc;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.3rem 0.7rem;
      font-size: 0.9rem;
      cursor: pointer;
    }
    
    .placeholder {
      background-color: #f5f5f5;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  `;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.dispatchEvent(new CustomEvent('character-favorite-toggle', {
      detail: {
        character: this.character,
        isFavorite: this.isFavorite
      },
      bubbles: true,
      composed: true
    }));
  }

  viewDetails() {
    this.dispatchEvent(new CustomEvent('character-view-details', {
      detail: {
        character: this.character
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.character || !this.character.name) {
      return html`<div class="card placeholder">No character data</div>`;
    }

    const { name, imageUrl, films = [], tvShows = [] } = this.character;    
    return html`
      <div class="card">
        <div class="image-container">
          <img src="${imageUrl}" alt="${name}" />
        </div>
        <div class="card-body">
          <h3>${name}</h3>
          ${films.length > 0 ? html`
            <div class="movies">
              <span class="label">Movies:</span>
              <div class="movie-list">
                ${films.map(movie => html`
                  <div class="movie-tag">${movie}</div>
                `)}
              </div>
            </div>
          ` : ''}
           ${tvShows.length > 0 ? html`
            <div class="movies">
              <span class="label">TV shows:</span>
              <div class="movie-list">
                ${tvShows.map(movie => html`
                  <div class="movie-tag">${movie}</div>
                `)}
              </div>
            </div>
          ` : ''}
        </div>
        <div class="actions">
          <button class="favorite-btn ${this.isFavorite ? 'active' : ''}" @click="${this.toggleFavorite}">
            ★
          </button>
          <button class="details-btn" @click="${this.viewDetails}">
            Details
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("character-card", CharacterCard);