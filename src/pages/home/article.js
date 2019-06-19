import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { defaultStyles } from '../../tools/styles';

class ArticlePage extends LitElement {
  
  constructor() {
    super();
    
    document.addEventListener('load-article', (e) => {
      this.article = { ...e.detail };
      
      this.performUpdate();
    });

    document.addEventListener('unload-article', () => {
      this.article = { module: "" };
      
      this.performUpdate();
    })
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        :host {
          transform-origin: center;
          max-width: 800px;
        }

        p, span, a, section, header, footer, div {
          color: var(--dark-background);
        }
      `
    ]
  }

  render() {
    if (!this.article) {
      return html``;
    }

    return html`
      <div>
        ${unsafeHTML(this.article.module)}
      </div>
    `;
  }
}

customElements.define('article-page', ArticlePage);