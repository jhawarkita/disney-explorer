import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

class CharacterProfile extends LitElement {
  static properties = {
    character: { type: Object },
  };

  constructor() {
    super();
    this.character = {};
  }

  static styles = css`
    .profile-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      background-color: #fff;
    }

    .profile-header {
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .character-name {
      font-size: 28px;
      color: #333;
      margin: 0;
    }

    .character-image-container {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }

    .character-image {
      width: 100%;
      max-width: 300px;
      object-fit: cover;
    }

    .detail-section {
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 6px;
      flex-grow: 1;
    }

    .detail-section div {
      margin-bottom: 10px;
      color: #555;
    }

    .detail-section div:first-child {
      font-weight: bold;
      font-size: 18px;
      color: #333;
    }

    .source-link {
      display: inline-block;
      color: #0066cc;
      text-decoration: none;
      margin-bottom: 10px;
      padding: 5px 0;
    }
  `;
  render() {
    const { name, imageUrl, sourceUrl, createdAt, updatedAt } = this.character;    

    return html`
      <div class="profile-container">
        <div class="profile-header">
          <h1 class="character-name">${name}</h1>
        </div>
        <div class="character-image-container">
          <img
            class="character-image"
            src="${imageUrl}"
            alt="${name}"
          />
          <div class="detail-section">
            <div>More Information</div>
            <a
              class="source-link"
              href="${sourceUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Disney Wiki
            </a>
            <div>
              Created:
              ${new Date(createdAt).toLocaleDateString()}
            </div>
            <div>
              Last updated:
              ${new Date(updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("character-profile", CharacterProfile);
