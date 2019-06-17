import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { defaultStyles } from '../../tools/styles';

class ListingItem extends LitElement {

  static get properties() {
    return {
      module: {
        type: String
      }
    };
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        p, span, a, section, header, footer, div {
          color: var(--light-background);
        }
      `
    ]
  }

  render() {

    return html`
      ${unsafeHTML(this.module)}
    `;
  }
}

customElements.define('listing-item', ListingItem);