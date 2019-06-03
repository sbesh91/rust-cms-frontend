import { LitElement, html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

class ArticlePage extends LitElement {
  
  constructor() {
    super();
    
    document.addEventListener('load-article', (e) => {
      this.article = { ...e.detail };

      this.performUpdate();
    });
  }

  render() {
    if (!this.article) {
      return;
    }

    return html`
      <div>
        ${unsafeHTML(this.article.module)}
      </div>
    `;
  }
}

customElements.define('article-page', ArticlePage);