import {
  LitElement,
  html,
  css
} from 'lit-element';
import {
  adminStyles
} from '../../tools/styles';
import {
  http
} from '../../tools/http';
import {
  editorStyles
} from "./editor-styles";
import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import {ifDefined} from 'lit-html/directives/if-defined';
import {
  article,
  listing
} from './templates';

class EditorPage extends LitElement {

  static get properties() {
    return {
      section: {
        type: Object
      }
    };
  }

  constructor() {
    super();
  }

  updated() {
    this.editor.setValue(this.section.module);
    this.editor.refresh();
  }

  firstUpdated() {
    this.editor = CodeMirror.fromTextArea(this.shadowRoot.querySelector('textarea'), {
      value: '',
      mode: 'text/html',
      theme: 'one-dark',
      lineNumbers: true,
      tabSize: 4,
      showCursorWhenSelecting: true
    });
  }

  static get styles() {
    return [
      adminStyles,
      editorStyles,
      css `
        :host {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          top: 0;
          left: 0;
          right: 0;
          max-height: 50vh;
          overflow: hidden;
          visibility: hidden;
          transition: 300ms var(--cubic) opacity;
        }

        :host(.open) {
          position: relative;
          max-height: none;
          overflow: unset;
          pointer-events: auto;
          opacity: 1;
          visibility: visible;
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

        .submit {
          grid-column: 2;
          position: sticky;
          bottom: -2rem;
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

  close() {
    document.dispatchEvent(new Event('close-section'))
  }

  submit(e) {
    e.preventDefault();
    const inputs = e.target.elements;

    const data = {
      section_type: inputs['section_type'].value,
      href: inputs['href'].value,
      module: this.editor.getValue()
    };

    let method = 'POST';

    if (this.section.id) {
      method = 'PUT';
      data.id = this.section.id;
    }

    http.fetch({
        url: 'sections',
        data: data,
        method: method
      }).then(res => res.json())
      .then(response => this.close())
      .catch(error => console.error('Error:', error));
  }

  render() {
    if (!this.section) {
      this.section = {
        module: '',
        href: '',
        section_type: ''
      }
    }

    return html `
      <header>
        <button class="small back" @click=${(e) => this.close()}>Back</button>
        Section
      </header>
      <form @submit=${(e) => this.submit(e)}>
        <select .value=${this.section.section_type} name="section_type" @change=${(e) => this.setSectionType(e.target.value)}>
          <option value="">select a type...</option>
          <option value="article">Article</option>
          <option value="listing">Listing</option>
        </select>
        <input value=${this.section.href} type="text" name="href" placeholder="href" required />
        <div class="codeEditor">
					<textarea name="module"></textarea>
        </div>
        <button class="submit" type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define('editor-page', EditorPage);