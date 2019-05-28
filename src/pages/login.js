import { LitElement, html } from 'lit-element';
import { baseUrl, route } from '../app';
import { $auth, setToken, isAuthenticated } from '../auth';

class LoginPage extends LitElement {

  constructor() {
    super();
    console.log("login file");
    $auth.subscribe(token => isAuthenticated(token) && route("/admin"));
  }

  login(e) {
    e.preventDefault();
    const inputs = e.target.elements;

    const data = {
      "account_name": inputs["username"].value,
	    "password": inputs["password"].value
    };

    const url = `${baseUrl()}authenticate`

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text())
    .then(response => setToken(response))
    .catch(error => console.error('Error:', error));
  }

  render() {
    return html`
      <style>
        form {
          display: flex;
          flex-direction: column;
          width: 200px;
        }

        input, button {
          padding: .25rem;
          margin: .5rem;
        }
        
        button {
          display: inline-block;
        }
      </style>
      <form @submit=${(e) => this.login(e)}>
        <input type="text" name="username" placeholder="username" value="sbesh91" />
        <input type="password" name="password" placeholder="password" value="test" />
        <button type="submit">login</button>
      </form>
    `;
  }
}

customElements.define('login-page', LoginPage);