import { LitElement, html, css } from 'lit-element';
import { defaultStyles } from '../../tools/styles';

class AboutPage extends LitElement {

  static get properties() {
    return {
      expanded: {
        type: Boolean,
      }
    };
  }

  constructor() {
    super();
  }

  static get styles() {
    return [
      defaultStyles,
      css`
        span {
          display: inline-block;
        }

        span.cursive {
          display: block;
          font-size: 1.5rem;
        }

        p {
          max-width: 600px;
          line-height: 1.75rem;
        }

        .contact {
          width: 60%;
          max-width: 450px;
        }

        .contact h3 {
          
        }

        .separator {
          width: 60%;
          max-width: 400px;
          margin: .5rem 0 2rem 0;
          border-bottom: 1px solid var(--dark-background);
        }

        .links {
          display: grid;
          grid: auto-flow dense / repeat(3, 4rem);
          grid-gap: 1rem;
        }
      `
    ]
  }

  body() {
    return html`
      <div class="spacer"></div>
      <div class="spacer"></div>

      <p>
        I've been a software engineer for a while now (2012 ish)
      </p>

      <div class="spacer"></div>

      <p>
        My career had humble beginnings with C# ASP.NET MVC
      </p>

      <p>
        It's been a wild ride through different technologies and different ideologies.  
        I currently work with docker, javascript, and loads of other fun things.
      </p>

      <div class="spacer"></div>

      <p>
        I work with a health care IT company (ImageMoverMD) and we do some pretty cool things.
        We specialize in automating and solving obscure imaging problems in medicine.
        Our software can handle workflows ranging from smart phone image capture to CD uploading (and a few other things I can't tell you about yet 😉)
      </p>      

      <div class="spacer"></div>

      <p>
        In my free time I do all sorts of things.  I always enjoy a new puzzle to solve or a new thought experiment to consider,
        but theres more!  Tennis and Skateboarding seem to be written into my fabric.  
        I just can't get away from them no matter how long I go between sessions.
        I make time to help people (always an open offer to chat).
        <span class="cursive spacer">P.S.</span>
        I have an adorable pupper and you should follow his instagram <a href="https://www.instagram.com/linusthepupper" target="_blank">linus the pupper</a>
      </p>

      <div class="spacer"></div>
      <div class="spacer"></div>

      <div class="contact">
        <h3>You can reach me here</h3>

        <div class="separator"></div>

        <div class="links">
          <a href="https://twitter.com/sbesh91" target="_blank">Twitter</a>
          <a href="https://www.github.com/sbesh91" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/steven-beshensky-b211127a/" target="_blank">Linkedin</a>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div>
        <h1>Hi, I'm Steven</h1>
        <h3>I'm a software engineer at this rad <a href="https://imagemovermd.com" target="_blank">startup</a></h3>
        
        ${this.expanded && this.body()}
      </div>
    `;
  }
}

customElements.define('about-page', AboutPage);