import { LitElement, html, css } from 'lit-element';
import { getListings } from '../../app';
import { defaultStyles } from '../../tools/styles';

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

  static get styles() {
    return [
      defaultStyles,
      css`
        about-page {

        }

        listing-page {
          padding-top: 1rem;
        }
      `
    ]
  }

  render() {
    return html`
      <about-page></about-page>
      <listing-page .listings=${this.listings}></listing-page>
    `;
  }
}

customElements.define('home-page', HomePage);