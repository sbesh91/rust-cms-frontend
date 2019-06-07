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

    this.line = "2, 1 98, 2 80, 97 0, 100";
  }

  getHref(item) {
    return item.href.replace('listings', 'articles');
  }

  listItem(item) {
    return html`
      <article>
        <section>
          ${unsafeHTML(item.module)}
          <a href=${this.getHref(item)}>Article</a>
        </section>

        <svg viewBox="0 0 100 25" xmlns="http://www.w3.org/2000/svg">
          <polyline #box points=${this.line} />
        </svg>
      </article>
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
          grid-gap 2rem;
        }

        main article:nth-of-type(2n+1) {
          grid-column: 2 / span 3;
        }

        main article:nth-of-type(2n) {
          grid-column: 1 / span 2;
        }

        @media only screen and (max-width: 600px) {
          main {
            grid-template-columns: repeat(6, 1fr);
          }

          main article:nth-of-type(2n) {
            grid-column: 2 / span 6;
          }

          main article:nth-of-type(2n+1) {
            grid-column: 1 / span 5;
          }  
        }

        article {
          position: relative;
        }

        section {
          position: absolute;
          z-index: 2;
          top: 0;
          left: 0;
          padding: 4% 5%;
          max-width: 100%;
          color: var(--light-background);
        }

        section a {
          color: var(--light-background);
        }

        svg {

          /* max-height: 100%; */
          max-width: 100%;  
        }

        svg polyline {
          fill: var(--dark-background);
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
        ${repeat(this.listings, (i) => i.id, (i, index) => this.listItem(i))}
      </main>
    `;
  }
}

customElements.define('listing-page', ListingPage);