import { LitElement, html } from 'lit-element';
import { getListings } from '../../app';

class HomePage extends LitElement {
  
  static get properties() {
    return {
      loaded: {
        type: Boolean,
      }
    };
  }

  constructor() {
    super();

    document.addEventListener('load-listings', (e) => {
      getListings().then(listings => {
        this.listings = [...listings];
  
        this.performUpdate();
      })
    })
  }

  render() {
    return html`
      <listing-page .listings=${this.listings}></listing-page>
    `;
  }
}

customElements.define('home-page', HomePage);