import { LitElement, html, css } from "lit-element";
import { defaultStyles } from "../tools/styles";

class AppFooter extends LitElement {
  constructor() {
    super();
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        footer {
          font-size: 1.5rem;
          text-align: center;
        }
      `,
    ];
  }

  render() {
    return html`
      <footer>
        Site made with ❤️ by
        <a href="https://bsky.app/profile/sbesh.bsky.social" target="_blank"
          >me</a
        >.
      </footer>
    `;
  }
}

customElements.define("app-footer", AppFooter);
