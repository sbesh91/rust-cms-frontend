import { LitElement, html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { repeat } from 'lit-html/directives/repeat';

class ListingPage extends LitElement {

  static get properties() {
    return {
      listings: {
        type: Array
      }
    };
  }
  
  constructor() {
    super();
  }

  getHref(item) {
    return item.href.replace('listings', 'articles');
  }

  listItem(item) {
    return html`
      <div>
        ${unsafeHTML(item.module)}
        <a href=${this.getHref(item)}>Article</a>
      </div>
    `;
  }

  // todo tombstoning
  render() {
    if (!this.listings) {
      this.listings = [];
    }

    return html`
      ${repeat(this.listings, (i) => i.id, (i, index) => this.listItem(i))}
    `;
  }
}

customElements.define('listing-page', ListingPage);