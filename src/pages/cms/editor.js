import {
  LitElement,
  html,
  css
} from 'lit-element';
import {
  defaultStyles
} from '../../styles';
import { editorStyles } from "./editor-styles";
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import {
  article,
  listing
} from './templates';
import { JSHINT } from 'jshint'
window.JSHINT = JSHINT;

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
      mode: 'application/javascript',
      theme: 'one-dark',
      lineNumbers: true,
      tabSize: 2,
      showCursorWhenSelecting: true,
      gutters: ['CodeMirror-lint-markers'],
      lint: true
    });
    
    setTimeout(() => {
      this.editor.refresh();
    }, 16);
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

          max-width: 1024px;
        }
      `
    ]
  }

  setSectionType(value) {
    if (value === "article") {
      this.editor.setValue(article)
    } 
    if (value === "listing") {
      this.editor.setValue(listing)
    }
  }

  submit(e) {
    const inputs = e.target.elements;

    console.log(inputs);
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