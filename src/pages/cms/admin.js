import { LitElement, html, css } from 'lit-element';
import { $auth, isAuthenticated } from '../../auth';
import { route } from '../../app';
import { defaultStyles } from '../../styles';
import './editor';
import './list';

class AdminPage extends LitElement {

  constructor() {
    super();

    $auth.subscribe(token => !isAuthenticated(token) && route("/login"));
  }

  static get styles() {
    return [
      defaultStyles,
      css``
    ]
  }

  render() {
    return html`  
      <list-page></list-page>
      <editor-page class="open"></editor-page>
    `;
  }
}

customElements.define('admin-page', AdminPage);