import {
    LitElement,
    html,
    css,
  } from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
  
  class SearchBar extends LitElement {
    static properties = {
      character: { type: Object },
      isFavorite: { type: Boolean },
    };
  
    constructor() {
      super();
      this.character = {};
      this.isFavorite = false;
      this.value = "";
      this.debounceInterval = null;
    }
  
    static styles = css`
      #search-input {
        flex: 1;
        padding: 0.7rem;
        border: 1px solid lightgray;
        border-radius: 4px;
        font-size: 1rem;
      }
    `;

    handleDebouncedSearch(e) {
        this.value = e.target.value;
        clearTimeout(this.debounceInterval);
        this.debounceInterval = setTimeout(() => {
          this.dispatchEvent(new CustomEvent('search', {
            detail: { value: this.value },
            bubbles: true,
            composed: true
          }));
        }, 1000);
      }
  
    render() {
      return html`
        <input
          type="text"
          id="search-input"
          placeholder="Search characters..."
          @input=${this.handleDebouncedSearch}
        />
      `;
    }
  }
  
  customElements.define("search-bar", SearchBar);
  