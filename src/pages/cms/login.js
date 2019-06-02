import { LitElement, html, css } from 'lit-element';
import { route } from '../../app';
import { $auth, setToken, isAuthenticated } from '../../auth';
import { adminStyles } from '../../styles';
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