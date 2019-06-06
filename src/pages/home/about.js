import { LitElement, html, css } from 'lit-element';
import { defaultStyles } from '../../tools/styles';

class AboutPage extends LitElement {

  static get properties() {
    return {
      expanded: {
        type: Boolean,
      }
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [
      defaultStyles,
      css`

      `
    ]
  }

  paragraph() {
    return html`
      <p>
        This is the expanded section
      </p>
    `;
  }

  render() {
    return html`
      <div>
        <h1>Hi, I'm Steven</h1>
        <h3>I'm a software engineer at this rad <a href="https://imagemovermd.com" target="_blank">startup</a></h3>
        
        ${this.expanded && this.paragraph()}
      </div>
    `;
  }
}

customElements.define('about-page', AboutPage);