import {
  LitElement,
  html,
  css
} from 'lit-element';
import {
  defaultStyles
} from '../../styles';
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

const editorStyles = css`
  @import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/codemirror.min.css);
  @import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/addon/lint/lint.min.css);
  .codeEditor {
    position: relative;
    overflow: hidden;
    height: calc(100vh - 9rem);
    width: 100%;
  }
  .codeEditor .lintError {
    box-sizing: border-box;
    background: #D86C74;
    color: #FFF;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
    padding: 0 2px 2px;
    font-family: "source-code-pro", Menlo, Consolas, Monaco, "Andale Mono", "Courier New", monospace;
    font-size: 11px;
    line-height: 1.4;
    animation: intro 150ms ease forwards 1;
    transform-origin: 0 0;
  }
  .codeEditor .lintError pre {
    margin: -1px 0 -6px;
  }
  @keyframes intro {
    from {
      transform: scaleY(0.001);
      opacity: 0;
    }
  }
  .codeEditor .CodeMirror {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #282C34;
    color: #ABB2BF;
  }
  .codeEditor .CodeMirror pre, .codeEditor .CodeMirror code, .codeEditor .CodeMirror .CodeMirror-linenumber {
    font-family: "source-code-pro", Menlo, Consolas, Monaco, "Andale Mono", "Courier New", monospace;
    font-size: 13px;
    line-height: 1.4;
  }
  .codeEditor .CodeMirror .CodeMirror-selected {
    background: #3E4451;
  }
  .codeEditor .CodeMirror .CodeMirror-line::selection,
  .codeEditor .CodeMirror .CodeMirror-line > span::selection,
  .codeEditor .CodeMirror .CodeMirror-line > span > span::selection {
    background: rgba(73, 72, 62, 0.99);
  }
  .codeEditor .CodeMirror .CodeMirror-gutters {
    background: #282C34;
    border-right: 1px solid #282C34;
  }
  .codeEditor .CodeMirror .CodeMirror-guttermarker {
    color: white;
  }
  .codeEditor .CodeMirror .CodeMirror-guttermarker-subtle {
    color: #d0d0d0;
  }
  .codeEditor .CodeMirror .CodeMirror-linenumber {
    color: #4B5363;
  }
  .codeEditor .CodeMirror .CodeMirror-cursor {
    border-left: 1px solid #528BFF;
  }
  .codeEditor .CodeMirror .cm-comment {
    color: #667689;
  }
  .codeEditor .CodeMirror .cm-atom {
    color: #64B6C3;
  }
  .codeEditor .CodeMirror .cm-number {
    color: #D19A66;
  }
  .codeEditor .CodeMirror .cm-property {
    color: #82A7BE;
  }
  .codeEditor .CodeMirror .cm-attribute {
    color: #A483E0;
  }
  .codeEditor .CodeMirror .cm-keyword {
    color: #D86C74;
  }
  .codeEditor .CodeMirror .cm-string,
  .codeEditor .CodeMirror .cm-string-2 {
    color: #98C379;
  }
  .codeEditor .CodeMirror .cm-variable {
    color: #ABB2BF;
  }
  .codeEditor .CodeMirror .cm-variable-2 {
    color: #C678DD;
  }
  .codeEditor .CodeMirror .cm-variable-3 {
    color: #64B6C3;
  }
  .codeEditor .CodeMirror .cm-def {
    color: #6CAFF2;
  }
  .codeEditor .CodeMirror .cm-bracket {
    color: #ABB2BF;
  }
  .codeEditor .CodeMirror .cm-tag {
    color: #D86C74;
  }
  .codeEditor .CodeMirror .cm-header {
    color: #ABB2BF;
  }
  .codeEditor .CodeMirror .cm-link {
    color: #98C379;
  }
  .codeEditor .CodeMirror .cm-error {
    background: #f92672;
    color: red;
  }
  .codeEditor .CodeMirror .CodeMirror-activeline-background {
    background: #2C323B;
  }
  .codeEditor .CodeMirror .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: #ABB2BF !important;
  }
`;

class EditorPage extends LitElement {

  constructor() {
    super();
  }

  firstUpdated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
    });

    this.editor = CodeMirror.fromTextArea(this.shadowRoot.querySelector('textarea'), {
      value: article,
      mode: 'application/javascript',
      theme: 'one-dark',
      lineNumbers: true,
      tabSize: 2,
      showCursorWhenSelecting: true,
      gutters: ['CodeMirror-lint-markers'],
      lint: true
    });

    // this.setSectionType('article');
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
    console.log(value);

    if (value === "article") {
      this.editor.setValue(article)
    } else {
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