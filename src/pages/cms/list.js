import { LitElement, html, css } from 'lit-element';
import { adminStyles } from '../../styles';
import { $section } from './observers';
import {repeat} from 'lit-html/directives/repeat';

class ListPage extends LitElement {

  static get properties() {
    return {
      list: {
        type: Array
      }
    };
  }

  constructor() {
    super();
  }

  edit(e, item) {
    e.preventDefault();
    $section.next(item);
  }

  add(e) {
    e.preventDefault();
    document.dispatchEvent(new Event('add-section'))
  }

  static get styles() {
    return [
      adminStyles,
      css`
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
          transform: scale(.9, .9);
          transition: 300ms var(--cubic);
          transition-property: transform opacity;
          transition-delay: 50ms;
        }

        :host(.open) {
          position: relative;
          max-height: none;
          overflow: unset;
          pointer-events: auto;
          opacity: 1;
          visibility: visible;
          transform: none;
        }

        header button {
          width: 4rem;
          margin: 0 .5rem;
        }

        main > div {
          border: 1px solid var(--grey);
          border-radius: .25rem;
        }

        section {
          display: grid;
          grid-template-columns: 8rem 20rem 4rem;
          justify-content:space-between;
          align-items: center;
          padding: .5rem;
        }

        section.header {
          font-size: 1.1rem;
          font-weight: 700;
          padding: .75rem .5rem;
          background: var(--grey);
        }

        section:nth-of-type(2n) {
          background: var(--grey);
        }
      `
    ]
  }

  listItem(item) {
    return html `
      <section>
        <div>
          ${item.section_type}
        </div>
        <div>
          ${item.href}
        </div>
        <button class="small" @click=${(e) => this.edit(e, item)}>Edit</button>
      </section>
    `
  }

  render() {
    return html` 
      <header>
        Sections
        <button class="small" @click=${(e) => this.add(e)}>Add</button>
      </header> 
      <slot></slot>
      <main>
        <section class="header">
          <div>Type</div>
          <div>Href</div>
          <div></div>
        </section>
        <div>
          ${repeat(this.list, (i) => i.id, (i, index) => this.listItem(i))}
        </div>
      </main>
    `;
  }
}

customElements.define('list-page', ListPage);