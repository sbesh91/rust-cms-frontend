import {
  LitElement,
  html,
  css
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map';
import {
  $auth,
  isAuthenticated
} from '../../auth';
import {
  route
} from '../../app';
import {
  defaultStyles
} from '../../styles';
import {
  http
} from '../../tools/http';
import './editor';
import './list';
import { $section } from './observers';


class AdminPage extends LitElement {

  constructor() {
    super();

    
    this.listPage = {
      open: true
    };
    this.editorPage = {
      open: false
    };
    

    this.list = [];

    $auth.subscribe(token => !isAuthenticated(token) && route("/login"));

    $section.subscribe(section => {
      this.listPage = { open: false };
      this.editorPage = { open: true };
      this.section = section;

      this.performUpdate();
    });

    document.addEventListener('add-section', () => {
      this.listPage = { open: false };
      this.editorPage = { open: true };
      this.section = {
        module: '',
        href: '',
        section_type: ''
      };
      
      this.performUpdate();
    });

    document.addEventListener('close-section', () => {
      this.listPage = { open: true };
      this.editorPage = { open: false };
      this.section = {
        module: '',
        href: '',
        section_type: ''
      };

      this.performUpdate();
    });

    http.fetch({
      url: 'sections?section_type=&href=',
      method: 'GET'
    }).then(res => res.json())
      .then(response => { 
        this.list = response;
        this.performUpdate();
      })
      .catch(error => console.error('Error:', error));
  }

  static get styles() {
    return [
      defaultStyles,
      css ``
    ]
  }

  render() {
    return html `  
      <list-page class=${classMap(this.listPage)} .list=${this.list}></list-page>
      <editor-page class=${classMap(this.editorPage)} .section=${this.section}></editor-page>
    `;
  }
}

customElements.define('admin-page', AdminPage);