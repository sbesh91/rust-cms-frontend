import { LitElement, html, css } from 'lit-element';
import { route } from '../../tools/router';
import { $auth, setToken, isAuthenticated } from '../../tools/auth';
import { adminStyles } from '../../tools/styles';
import { http } from '../../tools/http';

class LoginPage extends LitElement {

  constructor() {
    super();
    $auth.subscribe(token => isAuthenticated(token) && route("/admin"));
  }

  login(e) {
    e.preventDefault();
    const inputs = e.target.elements;

    const data = {
      "account_name": inputs["username"].value,
	    "password": inputs["password"].value
    };

    http.fetch({
      url: 'authenticate',
      data: data,
      method: 'POST'
    }).then(res => res.text())
      .then(response => setToken(response))
      .catch(error => console.error('Error:', error));
  }

  static get styles() {
    return [
      adminStyles,
      css`
        :host(.active) {
          z-index: 2;
        }

        form {
          display: flex;
          flex-direction: column;
          width: 200px;
        }

        input, button {
          margin: .5rem;
        }
      `
    ]
  }

  render() {
    return html`
      <form @submit=${(e) => this.login(e)}>
        <input type="text" name="username" placeholder="username" required />
        <input type="password" name="password" placeholder="password" required />
        <button type="submit">Login</button>
      </form>
    `;
  }
}

customElements.define('login-page', LoginPage);