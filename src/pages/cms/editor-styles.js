import {
  css
} from 'lit-element';

export const editorStyles = css`
  @import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.47.0/codemirror.min.css);

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