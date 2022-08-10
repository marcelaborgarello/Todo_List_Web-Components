import { state } from "../../state";

class AddItemForm extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    const form = this.shadow.querySelector("form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.shadow.querySelector("input");
      const item = input?.value;
      // console.log(item);

      if (item) {
        state.addItem(item);
        input.value = "";
      }
    });
  }

  render() {
    this.shadow.innerHTML = `
      <form class="form">
          <input type="text" name="item" placeholder="Nuevo pendiente" class="input" />
          <button class="button">+</button>
      </form>
         `;

    const style = document.createElement("style");

    style.innerHTML = `
        .form {
            background-color: dodgerblue;
            padding: 20px;
            display: flex;
            gap: 16px;
            justify-content: center;
            margin:  20px;
            border-radius: 5px;
        }

        input {
            flex-grow: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
        }

        button {
            background-color: blue;
            color: white;
            width: 3rem;
            border: none;
            border-radius: 4px;
            font-size: 36px;
        }
    `;

    this.shadow.appendChild(style);
  }
}

customElements.define("add-item-form", AddItemForm);
