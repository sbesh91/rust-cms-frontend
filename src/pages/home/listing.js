import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { repeat } from 'lit-html/directives/repeat';
import { defaultStyles } from '../../tools/styles';

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

    this.lines = [
      ["2, 1", "98, 2", "100, 22", "0, 25"],
      ["4, 1", "95, 0", "92, 22", "3, 25"],
      ["0, 1", "98, 2", "100, 18", "0, 22"]
    ]
  }

  getPoints(index) {
    return this.lines[index % this.lines.length].join(" ");
  }

  getHref(item) {
    return item.href.replace('listings', 'articles');
  }

  listItem(item, index) {
    return html`
      <a href=${this.getHref(item)}>
        <section>
          ${unsafeHTML(item.module)}
        </section>
        
        <svg viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg">
          <polyline points=${this.getPoints(index)} />
        </svg>
      </a>
    `;
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        :host {
          display: block;
        }

        main {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 1rem;
        }

        main a:nth-of-type(2n+1) {
          grid-column: 2 / span 3;
        }

        main a:nth-of-type(2n) {
          grid-column: 1 / span 2;
        }

        @media only screen and (max-width: 600pxs) {
          main {
            grid-template-columns: repeat(6, 1fr);
          }

          main a:nth-of-type(2n+1) {
            grid-column: 2 / span 6;
          }

          main a:nth-of-type(2n) {
            grid-column: 1 / span 5;
          }  
        }

        a {
          position: relative;
          cursor: pointer;
        }

        section {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          padding: 4% 5%;
          max-width: 100%;
          color: var(--light-background);
          pointer-events: none;
        }

        section a {
          color: var(--light-background);
        }

        svg {
          max-width: 100%;  
          overflow: visible
        }
      `
    ]
  }

  // todo tombstoning
  render() {
    if (!this.listings) {
      this.listings = [];
    }

    return html`
      <main>
        ${repeat(this.listings, (i) => i.id, (i, index) => this.listItem(i, index))}
      </main>
    `;
  }
}

customElements.define('listing-page', ListingPage);