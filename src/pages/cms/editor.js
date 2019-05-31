import {
  LitElement,
  html,
  css
} from 'lit-element';
import {
  defaultStyles
} from '../../styles';
import { http } from '../../tools/http';
import { editorStyles } from "./editor-styles";
import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import {
  article,
  listing
} from './templates';

class EditorPage extends LitElement {

  constructor() {
    super();
  }

  firstUpdated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });

    this.editor = CodeMirror.fromTextArea(this.shadowRoot.querySelector('textarea'), {
      value: '',
      mode: 'text/html',
      theme: 'one-dark',
      lineNumbers: true,
      tabSize: 4,
      showCursorWhenSelecting: true
    });

    http.fetch({
      url: 'sections?section_type=&href=',
      method: 'GET'
    }).then(res => res.json())
      .then(response => console.log(response))
      .catch(error => console.error('Error:', error));
  }

  static get styles() {
    return [
      defaultStyles,
      editorStyles,
      css `
        :host {
          opacity: 0;
          pointer-events: none;
        }

        :host(.open) {
          opacity: 1;
          pointer-events: all;
        }

        form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
          max-width: 1024px;
        }

        .codeEditor {
          grid-column: 1 / span 2;
        }

        button {
          grid-column: 2;
        }
      `
    ]
  }

  setSectionType(value) {
    if (value === "article") {
      this.editor.setValue(article.getHTML())
    } 
    if (value === "listing") {
      this.editor.setValue(listing.getHTML())
    }
    this.editor.refresh();
  }

  submit(e) {
    e.preventDefault();
    const inputs = e.target.elements;

    const data = {
      section_type: inputs['section_type'].value,
      href: inputs['href'].value,
      module: this.editor.getValue()
    };

    http.fetch({
      url: 'sections',
      data: data,
      method: 'POST'
    }).then(res => res.json())
      .then(response => console.log(response))
      .catch(error => console.error('Error:', error));
  }

  render() {
    return html `
      <form @submit=${(e) => this.submit(e)}>
        <select name="section_type" @change=${(e) => this.setSectionType(e.target.value)}>
          <option>select a type...</option>
          <option value="article">Article</option>
          <option value="listing">Listing</option>
        </select>
        <input type="text" name="href" placeholder="href" required />
        <div class="codeEditor">
					<textarea name="module"></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define('editor-page', EditorPage);