import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';

export class TomStoryExample extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      _config: { type: Object },
      currentStep: { type: Number },
      oldStep:{ type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--tom-story-example-background-color);
      }

      main {
        flex-grow: 1;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
    this.currentStep = 0;
    this.oldSteps = [];
  }

  async connectedCallback() {
    super.connectedCallback();

    this._config = await fetch('src/storySteps.json').then(_ => _.json());
  }

  handleStep(step, option) {
    this.oldSteps.push(step);
    if(option) {
      this.currentStep = step.nextStep;
    } else {
      this.currentStep = step.option2;
    }

  }

  render() {
    return html`
      <main>
        <div class="logo">${openWcLogo}</div>
        <h1>${this.title}</h1>

         ${this._config ? 
          html`
            ${this._config.steps[this.currentStep].story} 
            <button @click=${() => this.handleStep(this._config.steps[this.currentStep], true)}>Next step</button>
            <button @click=${() => this.handleStep(this._config.steps[this.currentStep])}>Other step</button>` : `No config yet`
          }
          ${this.oldSteps && this.oldSteps.map((step) => html`${step.story}`)}
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}
